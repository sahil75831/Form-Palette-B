import jwt from "jsonwebtoken";
const generateToken = async (res, userID, key) => {
  const token = jwt.sign({ userID }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });

  res.cookie(key, token, {
    httpOnly: true,
    sameSite: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export { generateToken };
