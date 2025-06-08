import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import { AllUsers, UserMethods } from "../types/User";
import jwt from "jsonwebtoken";

const schema = new mongoose.Schema<AllUsers, {}, UserMethods>({
  firstName: {
    type: String,
    required: [true, "Please enter your First Name"],
  },
  lastName: {
    type: String,
    required: [true, "Please enter your Last Name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: [true, "Email already taking"],
    validate: validator.isEmail,
  },
  phoneNo: {
    type: Number,
    required: [true, "Please enter a valid number"],
    minLength: [11, "Please enter 11 digite number"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [6, "Password must be at least 6 characters"],
    select: false,
  },
  role: {
    type: String,
    enum: ["admin", "student", "user"],
    default: "user",
  },
  otp: Number,
  otp_expire: Date,
});

// To hash the password install bcrypt  add the below code
// the code means before the user details are save the below func has to run
schema.pre("save", async function (next) {
  // const hashedPassword = await bcrypt.hash(this.password, 10)
  // this.password = hashedPassword;
  // or
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

// Before a user can login the password has to be compared. the below code compare the password
schema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};
// Json web token
schema.methods.generateToken = function () {
  // const secret = process.env.JWT_SECRET
  // console.log(secret);
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET not defined");
  
return jwt.sign({ _id: this._id}, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

};

export const User = mongoose.model("User", schema);
