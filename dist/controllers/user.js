"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyProfile = exports.logout = exports.signup = exports.login = void 0;
const user_1 = require("../models/user");
const CustomErr_1 = require("../utils/CustomErr");
const features_1 = require("../utils/features");
const errorHandler_1 = require("../middleware/errorHandler");
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password)
        return next(new CustomErr_1.CustomError("Please enter your valid email and password", 400));
    const user = yield user_1.User.findOne({ email }).select("+password");
    if (!user)
        return next(new CustomErr_1.CustomError("Invalid email and password", 404));
    const isMatched = yield user.comparePassword(password);
    if (!isMatched) {
        return next(new CustomErr_1.CustomError("Incorrect email or password"));
    }
    (0, features_1.sendToken)(user, res, "Login successful", 200);
    return;
});
exports.login = login;
//sign up logic
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password, phoneNo } = req.body;
    let user = yield user_1.User.findOne({ email });
    if (user)
        return next(new CustomErr_1.CustomError("User already exist", 400));
    user = yield user_1.User.create({
        firstName,
        lastName,
        email,
        password,
        phoneNo,
    });
    (0, features_1.sendToken)(user, res, "Registration successful", 201);
    // res.status(201).json({ success: true, message: "Registration succefull" });
});
exports.signup = signup;
//This is for logout
exports.logout = (0, errorHandler_1.asyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res
        .status(200)
        .cookie("token", "", {
        expires: new Date(Date.now()),
    })
        .json({
        success: true,
        message: "Logged out successfully",
    });
}));
//This get user's profile
exports.getMyProfile = (0, errorHandler_1.asyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.User.findById(req.user._id);
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({
        success: true,
        user,
    });
}));
