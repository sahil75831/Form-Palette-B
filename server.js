import express from "express";
import config from "dotenv/config";
import applicationRoutes from "./backend/routes/applicationRoutes.js";
import cors from "cors";
import {
  errorHandlingMiddleWear,
  notFound,
} from "./backend/middlewear/errorMiddlewear.js";

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use("/", applicationRoutes);

app.use(notFound);
app.use(errorHandlingMiddleWear);

app.listen(PORT, () => {
  console.log(`app is listening to port : ${PORT}`);
});
