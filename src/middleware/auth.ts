import { Response, Request, NextFunction } from "express";
import { CustomError } from "../utils/CustomErr";
import jwt from 'jsonwebtoken';
import { User } from "../models/user";
import { asyncError } from "./errorHandler";
import { CustomizedJwtPayload } from "../types/jwt";
import { AuthRequest } from "../types/AuthRequest";

export const isAuthenticated = asyncError(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (!token) return next(new CustomError("User not logged in", 401));

    //   the below decode the token if user is found  and get the id of the userr
    const decodedData = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as CustomizedJwtPayload;

    const user = await User.findById(decodedData._id);

    if (!user) {
      return next(new CustomError("User not found", 404));
    }
    req.user = user;
    next();
  }
);
