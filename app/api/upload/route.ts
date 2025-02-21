import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import { spawn } from "child_process";

import { S3 } from "aws-sdk";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/auth";

const { v4: uuidv4 } = require("uuid");

const s3 = new S3({
  endpoint: process.env.R2_ENDPOINT,
  accessKeyId: process.env.R2_ACCESS_KEY_ID,
  secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  signatureVersion: "v4",
  region: "auto",
});

const BUCKET_NAME = process.env.R2_BUCKET_NAME;
const execPromise = promisify(exec);


const convertMovToMp4 = async (filePath: string): Promise<string> => {
  // Ensure the output file name is different
  const outputPath = filePath.replace(".mov", "-converted.mp4").replace(".mp4", "-converted.mp4");

  //console.log(`🔄 Starting FFmpeg conversion: ${filePath} → ${outputPath}`);

  return new Promise((resolve, reject) => {
    const ffmpeg = spawn("ffmpeg", [
      "-y", // Auto-overwrite
      "-i", filePath, // Input file
      "-vcodec", "h264", "-acodec", "aac",
      outputPath
    ]);

    ffmpeg.stdout.on("data", (data) => console.log(`📌 FFmpeg: ${data}`));
    ffmpeg.stderr.on("data", (data) => console.error(`⚠️ FFmpeg Error: ${data}`));

    ffmpeg.on("close", (code) => {
      if (code === 0) {
        //console.log(`✅ FFmpeg conversion successful: ${outputPath}`);
        resolve(outputPath);
      } else {
        reject(new Error(`FFmpeg failed with code ${code}`));
      }
    });

    ffmpeg.on("error", (err) => reject(new Error(`FFmpeg execution error: ${err.message}`)));
  });
};



export const POST = async (req: Request) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as Blob | null;

    if (!file) {
      return new Response(JSON.stringify({ error: "No file uploaded" }), { status: 400 });
    }

    const fileExtension = file.type.includes("video") ? ".mp4" : ".jpg";
    const fileName = `${uuidv4()}${fileExtension}`;
    const tempFilePath = path.join("/tmp", fileName);

    // Save the file temporarily before processing
    const buffer = Buffer.from(await file.arrayBuffer());

    fs.writeFileSync(tempFilePath, buffer);

    let finalFilePath = tempFilePath;

    // If the file is a .mov, convert it to .mp4
    if (file.type === "video/quicktime") {
      finalFilePath = await convertMovToMp4(tempFilePath);
    }

    // Upload to R2
    const fileBuffer = fs.readFileSync(finalFilePath);

    await s3
      .putObject({
        Bucket: BUCKET_NAME || "",
        Key: fileName,
        Body: fileBuffer,
        ContentType: file.type === "video/quicktime" ? "video/mp4" : file.type,
      })
      .promise();

    // Cleanup temp files
    fs.unlinkSync(tempFilePath);
    if (finalFilePath !== tempFilePath) {
      fs.unlinkSync(finalFilePath);
    }

    return new Response(JSON.stringify({ fileName, url: `https://${process.env.R2_BUCKET_NAME}.${process.env.R2_ENDPOINT}/${fileName}` }), {
      status: 200,
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};
