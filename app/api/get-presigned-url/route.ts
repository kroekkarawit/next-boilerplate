import { getServerSession } from "next-auth/next";
import { S3 } from "aws-sdk";

import { authOptions } from "@/lib/auth";

const { v4: uuidv4 } = require("uuid");

const s3 = new S3({
  endpoint: process.env.R2_ENDPOINT,
  accessKeyId: process.env.R2_ACCESS_KEY_ID,
  secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  signatureVersion: "v4",
  region: "auto",
});

const BUCKET_NAME = process.env.R2_BUCKET_NAME; // Replace with your bucket name

export const GET = async () => {
  try {
    const session = await getServerSession(authOptions);

    // Check if the user is authenticated
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const fileName = `${uuidv4()}.jpg`; // Assuming the file type is always .png

    const params = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      Expires: 60 * 60, // URL expiration time in seconds
      ContentType: "image/jpg", // Assuming the content type is always image/png
    };

    const presignedUrl = s3.getSignedUrl("putObject", params);

    return new Response(JSON.stringify({ presignedUrl, fileName }), {
      status: 200,
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};
