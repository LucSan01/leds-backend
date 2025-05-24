"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const errorHandler_1 = require("./middleware/errorHandler");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
exports.app = (0, express_1.default)();
const allowedOrigins = [
    process.env.FRONTEND_URI_1,
    process.env.FRONTEND_URI_2,
];
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    }
};
// middleware
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use((0, cookie_parser_1.default)());
exports.app.use((0, cors_1.default)(corsOptions));
exports.app.get("/", (req, res, next) => {
    res.send("home page");
});
// user routes
const user_1 = __importDefault(require("./routes/user"));
exports.app.use("/api/user", user_1.default);
// https://leds-backend.onrender.com
exports.app.use(errorHandler_1.errorHandlerFunc);
