import { Request, Response, NextFunction, RequestHandler } from "express";
import { CustomError } from "../utils/CustomErr";

export const errorHandlerFunc = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  const status = err.statusCode || 500;
  const message = err.message || "Some went wrong";
  res.status(status).json({ error: message });
};

export const asyncError=(passedFunction:(req: Request, res: Response, next:NextFunction)=> Promise<any>): RequestHandler=>{
  return (req, res, next)=>{
    Promise.resolve(passedFunction(req, res, next)).catch(next)
  }
}
