import { config } from "dotenv";
config({
  path: "./data/config.env",
});

import express from "express";
import { errorHandlerFunc } from "./middleware/errorHandler";
import cors from "cors";
import cookieParser from "cookie-parser";

export const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://leds-gray.vercel.app"],
    credentials: true,
  })
);

// ✅ Load allowed origins from env
// const allowedOrigins = process.env.CORS_ORIGINS
//   ? process.env.CORS_ORIGINS.split(",").map((origin) => origin.trim())
//   : [];

// console.log("✅ Allowed Origins:", allowedOrigins);

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin) return callback(null, true); // allow Postman / server-to-server
//       if (allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         console.warn("❌ CORS blocked:", origin);
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true, // allow cookies/authorization headers
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   })
// );

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// user routes
import user from "./routes/user";

app.use("/api/user", user);

app.use(errorHandlerFunc);
