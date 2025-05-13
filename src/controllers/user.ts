import { NextFunction, Request, Response } from "express";
import { User } from "../models/user";
import { CustomError } from "../utils/CustomErr";
import { SignUpPayload } from "../types/User";

export const login = (req: Request, res: Response, next: NextFunction) => {
  res.send("work in progress ...");
};

//sign up logic
export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, email, password, phoneNo } =
      req.body;

    let user = await User.findOne({ email });
    if (user) return next(new CustomError("User already exist", 409));
    
    const newUser = await User.create({ firstName, lastName, email, password, phoneNo });
    await newUser.save();
    res.status(201).json({ message: "Registration succefull" });
    res.redirect("/login")
  } catch (error) {
    next(error);
    console.log(error);
  }
};
