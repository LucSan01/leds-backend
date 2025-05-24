import express from "express";
import {errorHandlerFunc} from "./middleware/errorHandler";
import cors, { CorsOptions } from "cors";
import cookieParser from "cookie-parser"

export const app = express();

const allowedOrigins: string[]=[
  process.env.FRONTEND_URI_1!,
  process.env.FRONTEND_URI_2!,
]
const corsOptions: CorsOptions={
  origin:(origin, callback)=>{

    if(!origin || allowedOrigins.includes(origin)){
      callback(null, true)
    }else{
      callback(new Error("Not allowed by CORS"))
    }
  }
}

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

app.get("/", (req, res, next) => {
  res.send("home page");
});

// user routes
import user from "./routes/user";

app.use("/api/user", user);

// https://leds-backend.onrender.com

app.use(errorHandlerFunc);
