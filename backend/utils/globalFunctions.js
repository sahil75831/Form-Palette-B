import bcrypt from "bcrypt";

const hashPassword = async (plainTextPassword) => {
  const salt = await bcrypt.genSalt(10);
  console.log("salt : ", salt);
  const hashedPassword = await bcrypt.hash(plainTextPassword, salt);
  console.log("hashedPassword : ", hashedPassword);
  return hashedPassword;
};

const matchPassword = async (plainTextPassword, hashedPassword) => {
  const isMatched = await bcrypt.compare(plainTextPassword, hashedPassword);
  if (isMatched) {
    return true;
  }
  return false;
};

const generateOTP = () => {
  return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
};

const supressKeys = (obj, keys) => {
  let filteredObj = {};
  for (let key in obj) {
    if (!keys.includes(key)) {
      filteredObj[key] = obj[key];
    }
  }
  return filteredObj;
};
export { hashPassword, matchPassword, generateOTP, supressKeys };
