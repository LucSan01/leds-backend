"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post("/login", user_1.login);
router.post("/signup", user_1.signup);
router.get("/userProfile", auth_1.isAuthenticated, user_1.getMyProfile);
exports.default = router;
