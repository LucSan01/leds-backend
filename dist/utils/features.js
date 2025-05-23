"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendToken = void 0;
const sendToken = (user, res, message, statusCode) => {
    const token = user.generateToken();
    res
        .status(statusCode)
        .cookie("token", token, {
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    })
        .json({ success: true, message: "Login successful ", token });
};
exports.sendToken = sendToken;
