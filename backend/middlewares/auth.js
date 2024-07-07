import { catchAsyncErrors } from "./catchAsyncErrors.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "./errorMiddleware.js";
import { User } from "../models/userSchema.js";

// admin me har koi nya admin bnata rhega to uske liye kr rhe h 
// Middleware to authenticate dashboard users
export const isAdminAuthenticated = catchAsyncErrors(   //authentication function
    async (req, res, next) => {
        const token = req.cookies.adminToken;
        if (!token) {
            return next(new ErrorHandler("Dashboard User is not authenticated!", 400)
            );
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);  //agar token mil gya to upar wali condition run nhi kregi
        req.user = await User.findById(decoded.id);  //id is getting from userSchema.js
        // Authorization starts
        if (req.user.role !== "Admin") {
            return next(new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403));  //403 is forbidden 
        }
        next();
    });

// Middleware to authenticate frontend users
export const isPatientAuthenticated = catchAsyncErrors(
    async (req, res, next) => {
        const token = req.cookies.patientToken;
        if (!token) {
            return next(new ErrorHandler("User is not authenticated!", 400));
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decoded.id);
        if (req.user.role !== "Patient") {
            return next(new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403));
        }
        next();
    }
);