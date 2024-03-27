import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";
import {
  generateOTP,
  hashPassword,
  matchPassword,
  supressKeys,
} from "../../utils/globalFunctions.js";
import { generateToken } from "../../utils/generateToken.js";
import { sendMail } from "../sendMail.js";
const db = new PrismaClient();

// @desc    registering a user
// @access  Public
// @route   /authentication/register
const registerUser = asyncHandler(async (req, res) => {
  // deleting db before everu operation

  await db.user.deleteMany();

  // deleting db before everu operation

  const { name, email, organisation, password, phoneNumber } = req.body;
  const hashedPassword = await hashPassword(password);
  const user = await db.user.create({
    data: {
      name,
      email,
      organisation,
      password: hashedPassword,
      phoneNumber,
    },
  });

  await sendMail(
    name,
    email,
    process.env.SENDER_EMAIL,
    user.id,
    "registerVerification"
  );
  return res.status(201).json({ message: true });
});

// @desc    login a user
// @access  Private
// @route   /authentication/login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userWithThisEmail = await db.user.findUnique({ where: { email } });
    console.log(userWithThisEmail);
    const isPasswordCorrect = await matchPassword(
      password,
      userWithThisEmail.password
    );
    if (userWithThisEmail && isPasswordCorrect) {
      return res.status(200).json({
        message: true,
        user: supressKeys(userWithThisEmail, [
          "password",
          "createdAt",
          "updatedAt",
          "id",
        ]),
      });
    } else {
      res.status(400);
      return res.json({ message: "Wrong Email or Password" });
    }
  } catch (error) {
    console.log("error : ", error);
  }
};

const verifyAccount = async (req, res) => {
  const { id } = req.body;
  const x = await db.user.findUnique({ where: { id } });

  if (!x) {
    return res.status(200).json({ message: false });
  }
  await db.user.update({ where: { id }, data: { emailVerified: true } });
  return res.status(200).json({ message: true });
};

// @desc    logout a user
// @access  Private
// @route   /authentication/logout
const logoutUser = async (req, res) => {
  res.cookie("jwt_auth", "", { expires: new Date(0), httpOnly: true });
  res.status(200).json({ message: "logout success" });
};

// @desc    update a user
// access   private
// @route   /authentication/update
const updateUser = async (req, res) => {
  // const { email }
};

const resetPassword = async (req, res) => {
  console.log("reset password api hit");
  const { email } = req.body;
  const userWithThisEmail = await db.user.findUnique({ where: { email } });

  if (userWithThisEmail) {
    await sendMail(
      userWithThisEmail.name,
      email,
      process.env.SENDER_EMAIL,
      userWithThisEmail.id,
      "resetPasswordVerification"
    );
    return res.status(200).json({ message: true });
  }
  return res.status(400).json({ message: false });
};
const changePassword = async (req, res) => {
  console.log("changePassword  api hit");
  const { userId, password, confirmpassword } = req.body;

  const userWithThisEmail = await db.user.findUnique({ where: { id: userId } });

  if (userWithThisEmail && password === confirmpassword) {
    const userWithUpdatedPassword = await db.user.update({
      where: { id: userId },
      data: { password: await hashPassword(password) },
    });
    return res.status(200).json({ message: true });
  }
  return res.status(400).json({ message: false });
};
export {
  registerUser,
  loginUser,
  logoutUser,
  verifyAccount,
  resetPassword,
  changePassword,
};
