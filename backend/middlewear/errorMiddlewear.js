import pkg from "@prisma/client";
const { PrismaClientKnownRequestError } = pkg;

const notFound = (req, res, next) => {
  res.status(404);
  const err = new Error(
    `request endpoint doesnot exist at : ${req.originalUrl}`
  );
  next(err);
};

const errorHandlingMiddleWear = (err, req, res, next) => {
  let statusCode = err.statusCode === 200 ? 500 : res.status;
  // why i am using this because let say if page not found then status code is 404 from above middlewear
  // so that i can send status code that is present in response(i.e.. res.status) that user is trying to access but if page is present and still error is comming then statuscode is 500 i.e internal server error
  console.log("first : statusCode : ==> ", err.statusCode, statusCode);
  let message = err.message;

  // Check if the error is related to a unique constraint violation
  if (err instanceof PrismaClientKnownRequestError && err.code === "P2002") {
    statusCode = 409; // Conflict due to violation of unique constraint
    message = "Unique constraint violation occurred";
  }

  // Provide error response
  res.status(statusCode).json({
    message,
    statusCode,
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });
};
export { notFound, errorHandlingMiddleWear };
