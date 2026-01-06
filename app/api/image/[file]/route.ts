import { NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  },
  region: "auto",
});

const BUCKET_NAME = process.env.R2_BUCKET_NAME; // Replace with your bucket name

export const GET = async (request: Request, { params }: { params: Promise<{ file: string }> }) => {
  try {
    const resolvedParams = await params;
    
    if (!resolvedParams) {
      return new Response(
        JSON.stringify({ message: "files should not be empty" }),
        {
          status: 404,
        },
      );
    }

    const { file } = resolvedParams;

    if (!file) {
      return new Response(
        JSON.stringify({ message: "file should not be empty" }),
        {
          status: 404,
        },
      );
    }

    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: file,
    });

    const url = await getSignedUrl(s3Client, command, {
      expiresIn: 60 * 60 * 2, // URL expires in 2 hours
    });

    return NextResponse.redirect(url);
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};
