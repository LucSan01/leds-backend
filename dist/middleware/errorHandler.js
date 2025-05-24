"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncError = exports.errorHandlerFunc = void 0;
const errorHandlerFunc = (err, req, res, next) => {
    const status = err.statusCode || 500;
    const message = err.message || "Some went wrong";
    res.status(status).json({ error: message });
};
exports.errorHandlerFunc = errorHandlerFunc;
const asyncError = (passedFunction) => {
    return (req, res, next) => {
        Promise.resolve(passedFunction(req, res, next)).catch(next);
    };
};
exports.asyncError = asyncError;
