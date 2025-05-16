import { NextFunction, Request, Response } from "express";
import { User } from "../models/user";
import { CustomError } from "../utils/CustomErr";

interface LoginRequest{
  email: string,
  password: string
}
export const login = async (req: Request<{}, {}, LoginRequest>, res: Response, next: NextFunction): Promise<any> => {

  const {email, password} = req.body;
  if (!email || !password) { return res.status(400).json({ success: false, message: "Email and password are required" })} 

  try {
    const user = await User.findOne({email}).select("+password")
    if(!user){return res.status(401).json({success: false, message: "User not found"})};
    
    
    // return res.status(200).json({ success: true, message: "Login successful" })
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }

}
  
    
  // try {
  
  //     if (!password) return next(new CustomError("Please enter password", 400));
  
  // } catch (error) {
    
  // }

//sign up logic
export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, email, password, phoneNo } =
      req.body;

    let user = await User.findOne({ email });
    if (user) return next(new CustomError("User already exist", 409));
    
    const newUser = await User.create({ firstName, lastName, email, password, phoneNo });
    await newUser.save();
    res.status(201).json({ message: "Registration succefull" });
    res.redirect("https://leds-gray.vercel.app/app/login")
  } catch (error) {
    next(error);
    console.log(error);
  }
};
