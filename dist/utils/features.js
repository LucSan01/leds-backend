"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendToken = void 0;
const sendToken = (user, res, message, statusCode) => {
    const token = user.generateToken();
    res
        .status(statusCode)
        .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // ✅ only true on Render
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        // secure: process.env.NODE_ENV === "production",
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        // sameSite: "none",
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
exports.sendToken = sendToken;
