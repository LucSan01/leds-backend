import express from "express";
import {errorHandlerFunc} from "./middleware/errorHandler";
import cors from "cors";
import cookieParser from "cookie-parser";

export const app = express();

const allowedOrigins = process.env.CORS_ORIGINS?.split(",") || [];

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      const vercelPreviewRegex = /^https:\/\/.*--leds-gray\.vercel\.app$/;
      if (allowedOrigins.includes(origin) || vercelPreviewRegex.test(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS POLICY: origin ${origin} Not allowed`));
      }
    },
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.redirect("https://leds-gray.vercel.app");
});


// user routes
import user from "./routes/user";

app.use("/api/user", user);


app.use(errorHandlerFunc);
