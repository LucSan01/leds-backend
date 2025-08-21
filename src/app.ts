import { config } from "dotenv";
config({
  path: "./data/config.env",
});

import express, { Response, Request, NextFunction } from "express";
import { errorHandlerFunc } from "./middleware/errorHandler";
import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";

export const app = express();

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? [process.env.FRONTEND_PROD!]
    : [process.env.FRONTEND_DEV!];

const corsOptions: CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
  // origin: (origin, callback) => {
  //   if (!origin || allowedOrigins.includes(origin)) {
  //     callback(null, true);
  //   } else {
  //     callback(new Error(`Not allowed by CORS`));
  //   }
  // },
};
app.use(cors(corsOptions));
// Preflight for all routes
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// user routes

app.get("/", (req, res) => {
  res.send("Welcome to LEDS API");
});

import user from "./routes/user";

app.use("/api/user", user);

app.use(errorHandlerFunc);
