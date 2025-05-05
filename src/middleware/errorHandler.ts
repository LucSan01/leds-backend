import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/CustomErr";

const errorHandlerFunc = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.statusCode || 500;
  const message = err.message || "Some went wrong";
  res.status(status).json({ error: message });
};

export default errorHandlerFunc;
