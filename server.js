import "express-async-errors";

import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan, { format } from "morgan";
import mongoose from "mongoose";
import {StatusCodes} from "http-status-codes";

// public
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

// cookie parser
import cookieParser from "cookie-parser";

// routes
import authRouter from "./routes/auteRoutes.js";
import userRouter from "./routes/userRoutes.js"


// cloudinary
import cloudinary from 'cloudinary';
import errorHandler from "./middleware/errorHandler.js";
import { authenticateUser } from "./middleware/authenticateUser.js";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));

if(process.env.NODE_ENV === "development"){
    app.use(morgan('dev'));
  }

app.use(express.static(path.resolve(__dirname,"./client/dist")))
app.use(cookieParser());
app.use(express.json());
app.use(errorHandler);

// route
app.use("/api/v1/assign/users",authenticateUser, userRouter);
app.use("/api/v1/assign/auth", authRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'));
});


// not found error
app.use('*', (req, res) => {
    res.status(404).json({msg: "not found"});
});

// unexpected err
app.use((err, req, res, next) => {
    // console.log(err);
    const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    const msg = err.message || "something went wrong"
    res.status(statusCode).json({msg});
})


const port = process.env.PORT || 3000;

try {
    await mongoose.connect(process.env.MONGO_DB);
    app.listen(port, () => {
      console.log(`server running on PORT ${port}....`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  };