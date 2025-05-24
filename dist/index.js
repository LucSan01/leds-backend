"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const database_1 = require("./data/database");
const app_1 = require("./app");
const PORT = process.env.PORT || 5000;
(0, database_1.connectDB)();
// const PORT =process.env.PORT || 5000
app_1.app.listen(PORT, () => {
    console.log(`server listening on port: ${PORT}, in ${process.env.NODE_ENV} NODE`);
});
