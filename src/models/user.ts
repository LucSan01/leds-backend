import mongoose from "mongoose";
import validator from "validator";

const schema = new mongoose.Schema({
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
    enum: ["admin", "user"],
    default: "user",
  },
  otp: Number,
  otp_expire: Date,
});

export const User = mongoose.model("User", schema);
