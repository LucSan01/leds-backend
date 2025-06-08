import { NextFunction, Request, Response } from "express";
import { User } from "../models/user";
import { CustomError } from "../utils/CustomErr";
import { sendToken } from "../utils/features";
import { asyncError } from "../middleware/errorHandler";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}
export const login = async (
  req: Request<{}, {}, LoginRequest>,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(
      new CustomError("Please enter your valid email and password", 400)
    );

  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new CustomError("Invalid email and password", 404));

  const isMatched = await user.comparePassword(password);
  if (!isMatched) {
    return next(new CustomError("Incorrect email or password"));
  }

  sendToken(user, res, "Login successful", 200);
  return;
};

//sign up logic
export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { firstName, lastName, email, password, phoneNo } = req.body;

  let user = await User.findOne({ email });
  if (user) return next(new CustomError("User already exist", 400));

  user = await User.create({
    firstName,
    lastName,
    email,
    password,
    phoneNo,
  });

  sendToken(user, res, "Registration successful", 201);

  // res.status(201).json({ success: true, message: "Registration succefull" });
};

//This is for logout
export const logout = asyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
      })
      .json({
        success: true,
        message: "Logged out successfully",
      });
  }
);

//This get user's profile
export const getMyProfile = asyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user._id);

    res.status(200).json({
      success: true,
      user,
    });
  }
);
