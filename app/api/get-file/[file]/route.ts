import { NextRequest, NextResponse } from "next/server";
import { S3 } from "aws-sdk";

const s3 = new S3({
  endpoint: process.env.R2_ENDPOINT,
  accessKeyId: process.env.R2_ACCESS_KEY_ID,
  secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  signatureVersion: "v4",
  region: "auto",
});

const BUCKET_NAME = process.env.R2_BUCKET_NAME || "";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ file: string }> },
) {
  try {
    const resolvedParams = await params;
    const { file } = resolvedParams;

    if (!file) {
      return new NextResponse(
        JSON.stringify({ message: "File not provided" }),
        { status: 404 },
      );
    }

    // Check if the client sent a Range header (iOS Safari often does)
    const rangeHeader = req.headers.get("range");

    // Prepare S3 params
    const s3Params: S3.GetObjectRequest = {
      Bucket: BUCKET_NAME,
      Key: file,
    };

    // If there's a Range header, pass it to S3 so we can do a partial get
    if (rangeHeader) {
      s3Params.Range = rangeHeader;
    }

    // Fetch from S3 / R2
    const data = await s3.getObject(s3Params).promise();

    // Build basic headers
    const headers: Record<string, string> = {
      "Content-Type": data.ContentType || "application/octet-stream",
      "Access-Control-Allow-Origin": "*", // CORS
      "Access-Control-Expose-Headers": "Content-Range, Content-Length",
      "Cache-Control": "public, max-age=3600",
      "Accept-Ranges": "bytes",
    };

    // If S3 honored a Range request, S3 will return `ContentRange` and a 206 partial
    // We mirror that in our response so iOS sees correct partial content.
    let status = 200;

    if (data.ContentRange) {
      status = 206; // Partial Content
      headers["Content-Range"] = data.ContentRange;
    }

    // The length might come from ContentLength or from the partial range
    if (data.ContentLength != null) {
      headers["Content-Length"] = data.ContentLength.toString();
    }

    // Create the NextResponse with the body from S3 (data.Body)
    return new NextResponse(data.Body as Buffer, {
      status,
      headers,
    });
  } catch (err: any) {
    return new NextResponse(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
