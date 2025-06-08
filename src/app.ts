import express from "express";
import {errorHandlerFunc} from "./middleware/errorHandler";
import cors from "cors";
import cookieParser from "cookie-parser";

export const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URI_1,
  process.env.FRONTEND_URI_2,
].filter(Boolean);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
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

app.get("/", (req, res, next) => {
  res.send("home page");
});

// user routes
import user from "./routes/user";

app.use("/api/user", user);


app.use(errorHandlerFunc);
