// import { NextFunction, Request, Response } from "express";

export class CustomError extends Error {
  statusCode?: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
