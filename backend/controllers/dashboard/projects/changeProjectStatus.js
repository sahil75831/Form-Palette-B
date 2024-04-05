import express from "express";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

const changeProjectStatus = async (req, res) => {
  console.log("changeProjectStatus hit...", req.params);
  const { projectID, visiblity } = req.params;
  console.log(
    "changeProjectStatus hit... ",
    projectID,
    visiblity,typeof visiblity
  );
  const changeStatus = await db.project.update({
    where: { id: projectID },
    data: { visiblity: visiblity==='false' ? true : false },
  });

  res.status(200).json({ message: "ok", changeStatus });
};

export { changeProjectStatus };
