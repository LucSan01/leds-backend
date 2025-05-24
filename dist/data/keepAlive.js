"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const uri = process.env.MONGO_URI;
if (!uri) {
    console.error("MONGO_URI is not defined in environment variables.");
    process.exit(1);
}
const keepDbAlive = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(uri, {
            dbName: "lucsanEliteDynamicsDB",
        });
        console.log(`Db is always alive connection established`);
        setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            try {
                yield ((_a = mongoose_1.default.connection.db) === null || _a === void 0 ? void 0 : _a.admin().ping());
                console.log("MongoDB keep-alive ping sent");
            }
            catch (err) {
                console.log("Keep-alive ping failed", err.message);
                process.exit(1);
            }
        }));
    }
    catch (error) {
        console.log("Error found", error);
        process.exit(1);
    }
});
keepDbAlive();
