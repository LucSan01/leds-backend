import express from "express";
import { getMyProfile, login, logout, signup } from "../controllers/user";
import { isAuthenticated } from "../middleware/auth";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/userProfile", isAuthenticated, getMyProfile);
router.get("/logout", isAuthenticated, logout);

export default router;
