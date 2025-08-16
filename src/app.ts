import { config } from "dotenv";
config({
  path: "./data/config.env",
});

import express from "express";
import { errorHandlerFunc } from "./middleware/errorHandler";
import cors from "cors";
import cookieParser from "cookie-parser";

export const app = express();

const allowedOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(",")
  : [];

app.use(
  cors({
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow non-browser requests
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// user routes
import user from "./routes/user";

app.use("/api/user", user);

app.use(errorHandlerFunc);
