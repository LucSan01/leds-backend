"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({
    path: "./data/config.env",
});
const express_1 = __importDefault(require("express"));
const errorHandler_1 = require("./middleware/errorHandler");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
exports.app = (0, express_1.default)();
const allowedOrigins = [
    "https://leds-gray.vercel.app",
    "http://localhost:3000",
];
exports.app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (origin && allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
    }
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, x-Requested-With");
    res.header("Access-Control-Allow-Credentials", "true");
    if (req.method === "OPTIONS") {
        res.status(200).end();
    }
    console.log("incoming request origin", req.headers.origin);
    next();
});
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use((0, cookie_parser_1.default)());
// user routes
const user_1 = __importDefault(require("./routes/user"));
exports.app.use("/api/user", user_1.default);
exports.app.use(errorHandler_1.errorHandlerFunc);
