console.log("application.js");
import express from "express";
import authenticationRoutes from "./auth/authentication.js";
const applicationRoutes = express.Router();

applicationRoutes.use("/authentication", authenticationRoutes);

export default applicationRoutes;
