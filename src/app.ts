import express from "express";
import { errorHandlerFunc } from "./middleware/errorHandler";
import cors from "cors";
import cookieParser from "cookie-parser";

export const app = express();

const allowedOrigins = [
  "http://localhost:3000", // dev frontend
  "https://leds-gray.vercel.app", // prod frontend
];
// middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// user routes
import user from "./routes/user";

app.use("/api/user", user);

app.use(errorHandlerFunc);
