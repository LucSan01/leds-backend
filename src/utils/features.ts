import { Response } from "express";
import { UserDocument, } from "../types/User";

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
            expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        })
        .json({ success: true, message: "Login successful ", token });
};
