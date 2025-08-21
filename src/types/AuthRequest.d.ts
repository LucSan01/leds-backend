import { Request } from "express";
import { UserDocument } from "../types/User";

export interface AuthRequest extends Request {
  user?: UserDocument ;
}
