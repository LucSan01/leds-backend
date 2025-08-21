import { Response } from "express";
import { UserDocument } from "../types/User";

export const sendToken = (
  user: UserDocument,
  res: Response,
  message: string,
  statusCode: number
) => {
  const token = user.generateToken();

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false, // ✅ only true on Render
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    })
    .json({
      success: true,
      message,
      token,
      user: {
        id: user._id,
        email: user.email,
      }, // ✅ include role here
    });
};
