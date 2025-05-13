import express from "express";
import { config } from "dotenv";
import errorHandlerFunc from "./middleware/errorHandler";
import cors from "cors"

config({
  path: "./config.env",
});

export const app = express();

app.get("/", (req, res, next) => {
  res.send("home page");
});

// user routes
import user from "./routes/user";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "https://leds-gray.vercel.app/",
  credentials: true
}))
app.use("/api/user", user);

// https://leds-backend.onrender.com

app.use(errorHandlerFunc);
