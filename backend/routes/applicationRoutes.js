console.log("application.js");
import express from "express";
import authenticationRoutes from "./auth/authentication.js";
import dashboardRoutes from "./dashboard/dashboardRoutes.js";
const applicationRoutes = express.Router();

applicationRoutes.use("/authentication", authenticationRoutes);
applicationRoutes.use('/dashboard', dashboardRoutes)


export default applicationRoutes;
