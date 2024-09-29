import { NextResponse } from "next/server";
import { S3 } from "aws-sdk";

const s3 = new S3({
  endpoint: process.env.R2_ENDPOINT,
  accessKeyId: process.env.R2_ACCESS_KEY_ID,
  secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  signatureVersion: "v4",
  region: "auto",
});

const BUCKET_NAME = "me-credit"; // Replace with your bucket name

export const GET = async (request: Request, { params }: { params: any }) => {
  try {
    const { file } = params;

    const url = s3.getSignedUrl("getObject", {
      Bucket: BUCKET_NAME,
      Key: file,
      Expires: 60 * 60 * 2, // URL expires in 2 hour
    });

    return NextResponse.redirect(url);
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};
