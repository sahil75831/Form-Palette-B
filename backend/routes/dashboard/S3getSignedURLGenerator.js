import express from "express";
import { v4 as uuidv4 } from "uuid";
const createSignedURL = express.Router();

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

async function putObj(fileName, contentType) {
  console.log("put obj hit");

  console.log("file name ::: ", fileName)
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `uploads/brandImages/${fileName}`,
    ContentType: contentType,
  });
  const url = await getSignedUrl(s3Client, command);

  return url;
}

const throwSignedURL = async (req, res) => {

  console.log("put obj hit : ");
  console.log("put obj hit : ", req.body);

  const fileName = req.body.fileName;
  const signed_url = await putObj(fileName, "image/jpg");

  res.json({ signed_url });
};
export { throwSignedURL };
