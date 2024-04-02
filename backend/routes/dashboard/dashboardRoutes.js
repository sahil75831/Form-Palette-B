import express from "express";
import { createNewProject } from "../../controllers/dashboard/projects/createNewProject.js";
import { throwSignedURL } from "./S3getSignedURLGenerator.js";
const dashboardRoutes = express.Router();


dashboardRoutes.post('/projects/createNewProject', createNewProject)
dashboardRoutes.post('/projects/createNewProject/throwSignedURL', throwSignedURL)

export default dashboardRoutes