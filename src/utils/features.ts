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
      secure: process.env.NODE_ENV === "production",
      expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      sameSite: "none",
    })
    .json({
      success: true,
      message,
      user: {
        id: user._id,
        email: user.email,
      }, // ✅ include role here
    });
};
