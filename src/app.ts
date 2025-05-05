import express from "express";
import { config } from "dotenv";
// import user from

config({
  path: "./config.env",
});
export const app = express();

app.get("/", (req, res, next) => {
  res.send("home page");
});
// user routes
import user from "./routes/user";
import errorHandlerFunc from "./middleware/errorHandler";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", user);

app.use(errorHandlerFunc);
