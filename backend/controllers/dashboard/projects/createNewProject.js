import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";

const db = new PrismaClient();
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
});

async function getObj(key) {
  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
  });
  const url = await getSignedUrl(s3Client, command);
  console.log("url :: ", url);
  return url;
}

const createNewProject = asyncHandler(async (req, res) => {
  const {
    fileName_UUID,
    userId,
    title,
    description,
    startDate,
    endDate,
    visiblity,
  } = req.body;

  if (
    fileName_UUID &&
    userId &&
    title &&
    description &&
    startDate &&
    endDate &&
    visiblity
  ) {
    console.log("hello world");

    const brandImageUrl = await getObj(`uploads/brandImages/${fileName_UUID}`);

    // await db.project.deleteMany()
    const newProject = await db.project.create({
      data: {
        userId,
        brandImageUrl: `${brandImageUrl}`,
        title,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        visiblity: visiblity === "public" ? true : false,
      },
    });
    console.log("newProjet : ", newProject);
  }
  res.status(201).json({ mesage: "project created succesfully" });
});
export { createNewProject };
