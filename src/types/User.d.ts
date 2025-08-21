import { UserDocument } from "../models/User"; // ✅ Adjust path to your actual User model
import { Document } from "mongoose"


export interface AllUsers {
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  password: string;
  role: "admin" | "user" | "guest";
  otp?: Number;
  otp_expire?: Date;
}

// interface for methods
export interface UserMethods {
  comparePassword(enteredPAssword: string): Promise<boolean>;
  generateToken(): string;
}

// user.d.ts


declare global {
  namespace Express {
    interface Request {
      user?: UserDocument;
    }
  }
}

// user document type
export type UserDocument = Document & AllUsers & UserMethods