import express from "express";
import {
  changePassword,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  verifyAccount,
} from "../../controllers/auth/authenticationControllers.js";

const authenticationRoutes = express.Router();

authenticationRoutes.post("/register", registerUser);
authenticationRoutes.post("/login", loginUser);
authenticationRoutes.post("/verifyAccount", verifyAccount);
authenticationRoutes.post("/resetPassword", resetPassword);
authenticationRoutes.post("/changePassword", changePassword);
authenticationRoutes.post("/logout", logoutUser);

export default authenticationRoutes;
