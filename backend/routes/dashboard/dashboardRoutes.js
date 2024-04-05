import express from "express";
import { createNewProject } from "../../controllers/dashboard/projects/createNewProject.js";
import { throwSignedURL } from "./S3getSignedURLGenerator.js";
import { listAllProjects } from "../../controllers/dashboard/projects/listAllProjects.js";
import { changeProjectStatus } from "../../controllers/dashboard/projects/changeProjectStatus.js";
import { deleteProject } from "./deleteProject.js";
const dashboardRoutes = express.Router();

dashboardRoutes.get("/projects/listAllProjects/:id", listAllProjects);
dashboardRoutes.delete("/projects/deleteProject/:deleteProjectID", deleteProject);
dashboardRoutes.post("/projects/createNewProject", createNewProject);
dashboardRoutes.post(
  "/projects/changeProjectStatus/:projectID/:visiblity",
  changeProjectStatus
);
dashboardRoutes.post(
  "/projects/createNewProject/throwSignedURL",
  throwSignedURL
);

export default dashboardRoutes;
