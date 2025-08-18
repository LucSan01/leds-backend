import { config } from "dotenv";
config({
  path: "./data/config.env",
});

import express, { Response, Request, NextFunction } from "express";
import { errorHandlerFunc } from "./middleware/errorHandler";
import cookieParser from "cookie-parser";

export const app = express();

const allowedOrigins = [
  "https://leds-gray.vercel.app",
  "http://localhost:3000",
];

app.use((req: Request, res: Response, next: NextFunction): void => {
  const origin = req.headers.origin || "unknown origin";
  console.log("incoming request origin", req.headers.origin);

  if (origin && allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, x-Requested-With");
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    res.status(200).end();
  }

  next();
});



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// user routes
import user from "./routes/user";

app.use("/api/user", user);

app.use(errorHandlerFunc);
