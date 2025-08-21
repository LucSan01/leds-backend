import { config } from "dotenv";
config({
  path: "./data/config.env",
});

import express, { Response, Request, NextFunction } from "express";
import { errorHandlerFunc } from "./middleware/errorHandler";
import cookieParser from "cookie-parser";

export const app = express();

import cors from "cors";

const allowedOrigins = ['https://leds-gray.vercel.app', 'http://localhost:3000'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      // Allow requests without origin or from allowedOrigins
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// app.use(cors(corsOptions));
// // Preflight for all routes
// app.options("*", cors(corsOptions));

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
