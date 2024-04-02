import { PrismaClient } from "@prisma/client";
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
  console.log("url :: ", url)
  return url;
}


const createNewProject = async (req, res) => {
  console.log("createNewProject controller hit.");
  console.log("req.body : ", req.body);
  const {
    fileName_UUID,
    userId,
    title,
    description,
    startDate,
    endDate,
    visibility,
  } = req.body;

  if (
    
    userId &&
    title &&
    description &&
    startDate &&
    endDate &&
    visibility
  ) {

    // const newProject = await db.project.create({
    //   data: {
    //     userId,
    //     title,
    //     description,
    //     startDate,
    //     endDate,
    //     visibility,
    //   },
    // });
    // console.log("newProjet : ", newProject)
  }
  res.status(201).json({ mesage: "done" });
};
export { createNewProject };
