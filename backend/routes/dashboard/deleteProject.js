import { PrismaClient } from "@prisma/client";
import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";

const db = new PrismaClient();

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
});

async function deleteOBJ(key) {
  const command = new DeleteObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
  });
  try {
    const deleteResponse = await s3Client.send(command);
    console.log("Object deleted successfully : ", deleteResponse);
  } catch (error) {
    console.error("Error deleting object:", error);
  }
}

const deleteProject = async (req, res) => {
  console.log("deleteProject hit..");
  const { deleteProjectID } = req.params;

  const imageUrl_projectToDelete = await db.project.findUnique({
    where: { id: deleteProjectID },
  });

  const key_object = imageUrl_projectToDelete.brandImageUrl.split(`https://${process.env.S3_BUCKET_NAME}.s3.ap-south-1.amazonaws.com/`)[1] ;

  await deleteOBJ(key_object);

  const projectToDelete = await db.project.delete({
    where: { id: deleteProjectID },
  });
  const newProjectsList = await db.project.findMany();

  res.json({ message: "ok", newProjectsList });
};
export { deleteProject };
