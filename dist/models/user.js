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
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const schema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: [true, "Please enter your First Name"],
    },
    lastName: {
        type: String,
        required: [true, "Please enter your Last Name"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: [true, "Email already taking"],
        validate: validator_1.default.isEmail,
    },
    phoneNo: {
        type: Number,
        required: [true, "Please enter a valid number"],
        minLength: [11, "Please enter 11 digite number"],
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [6, "Password must be at least 6 characters"],
        select: false,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
    otp: Number,
    otp_expire: Date,
});
// To hash the password install bcrypt  add the below code
// the code means before the user details are save the below func has to run
schema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // const hashedPassword = await bcrypt.hash(this.password, 10)
        // this.password = hashedPassword;
        // or
        if (!this.isModified("password"))
            return next();
        this.password = yield bcrypt_1.default.hash(this.password, 10);
    });
});
// Before a user can login the password has to be compared. the below code compare the password
schema.methods.comparePassword = function (enteredPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(enteredPassword, this.password);
    });
};
// Json web token
schema.methods.generateToken = function () {
    // const secret = process.env.JWT_SECRET
    // console.log(secret);
    if (!process.env.JWT_SECRET)
        throw new Error("JWT_SECRET not defined");
    return jsonwebtoken_1.default.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: "3d",
    });
};
exports.User = mongoose_1.default.model("User", schema);
