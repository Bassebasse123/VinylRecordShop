import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import recordsRouter from "./routes/recordsRouter.js";
import cartRouter from "./routes/cartRouter.js";
import usersRouter from "./routes/usersRouter.js";

import {
  globalErrorHandler,
  routeNotFound,
} from "./middlewares/errorHandlers.js";

//^ Load environment variables
dotenv.config();

//^ Creat aan instatnce of Express
const app = express();

//^ Middleware setup
app.use(express.json({ limit: "1MB" }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://vinylrecordshop-fe.onrender.com"],
    credentials: true,
  })
);

//^ Routes handlers
app.use("/records", recordsRouter);
app.use("/carts", cartRouter);
app.use("/users", usersRouter);

//^ Error handling middlewares
app.use(routeNotFound);
app.use(globalErrorHandler);

//^ Setup server listening port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

const uri = process.env.DB_URI;

mongoose.connect(uri);
mongoose.connection
  .on("error", console.error)
  .on("open", () =>
    console.log(`Conntected to MongoDB / ${mongoose.connection.name}`)
  );
