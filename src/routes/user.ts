import express from "express";
import { getMyProfile, login, logout, signup } from "../controllers/user";
import { isAuthenticated } from "../middleware/auth";

const router = express.Router();


router.post("/login", login);
router.post("/signup", signup);
router.get("/userProfile", isAuthenticated, getMyProfile);
router.get("/logout", isAuthenticated, logout);


router.get("/check", isAuthenticated, (req, res) => {
  res.json({
    success: true,
    user: {
      id: req.user._id,
      email: req.user.email,
      role: req.user.role,
    },
  });
});
export default router;
