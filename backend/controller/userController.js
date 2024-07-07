import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";


export const patientRegister = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, nic, dob, gender, password, role } = req.body;
    if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !nic ||
        !dob ||
        !gender ||
        !password ||
        !role
    ) {
        return next(new ErrorHandler("Please Fill Full Form!", 400));
    }

    const user = await User.findOne({ email });
    if (user) {
        return next(new ErrorHandler("User already Registered!", 400));
    }

    const hello = await User.create({
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        password,
        role,
    });
    // res.status(200).json({ message: "User created successfully" });
    generateToken(hello, "User created successfully", 200, res);
});
// function bna diya isko use krne ke liye router pr jao

export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password, confirmPassword, role } = req.body;
    if (!email || !password || !confirmPassword || !role) {
        return next(new ErrorHandler("Please Fill Full Form!", 400));
    }
    if (password !== confirmPassword) {
        return next(
            new ErrorHandler("Password & Confirm Password Do Not Match!", 400)
        );
    }
    // ab dhundenge mere database me email aur password h 
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid Email Or Password!", 400));
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid Email Or Password!", 400));
    }
    if (role !== user.role) {
        return next(new ErrorHandler(`User Not Found With This Role!`, 400));
    }
    // res.status(200).json({ message: "User login successfully" });
    generateToken(user, "User login successfully", 200, res);

});

// add new admin  function
export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, nic, dob, gender, password } =
        req.body;
    if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !nic ||
        !dob ||
        !gender ||
        !password
    ) {
        return next(new ErrorHandler("Please Fill Full Form!", 400));
    }

    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} With This Email Already Exists!`));
    }

    const admin = await User.create({   //agar admin nhi mila to new admin create krdo
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        password,
        role: "Admin",
    });
    res.status(200).json({
        success: true,
        message: "New Admin Registered"
    });
});

// add  new doctor 
export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Doctor Avatar Required!", 400));
    }
    const { docAvatar } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!allowedFormats.includes(docAvatar.mimetype)) {  //mimetype image ki extensin ko match krega allowedFormats se 
        return next(new ErrorHandler("File Format Not Supported!", 400));
    }
    const {
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        password,
        doctorDepartment,
    } = req.body;
    if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !nic ||
        !dob ||
        !gender ||
        !password ||
        !doctorDepartment ||
        !docAvatar
    ) {
        return next(new ErrorHandler("Please Fill Full Form!", 400));
    }
    const isRegistered = await User.findOne({ email });  //checking user khi already exist to nhi krta h 
    if (isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} already registered  with this email`, 400));
    }
    // ab cloudinary pr image ko post krna h 
    const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath);
    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error("Cloudinary Error:", cloudinaryResponse.error || "Unknown Cloudinary error");
        return next(new ErrorHandler("Failed To Upload Doctor Avatar To Cloudinary", 500));
    }
    const doctor = await User.create({
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        password,
        role: "Doctor",   //role static h 
        doctorDepartment,
        docAvatar: {   //doctavatar ek object h uski 2 values h
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        },
    });
    res.status(200).json({
        success: true,
        message: "New Doctor Registered",
        doctor,
    });
});

// get all doctors
export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
    const doctors = await User.find({ role: "Doctor" });
    res.status(200).json({
        success: true,
        doctors,
    });
});

// user ki sari details ko get krne ke liye 
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
});

// logout
// Logout function for dashboard admin
export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
    res
        .status(201)
        .cookie("adminToken", "", {     //cookie to null krdiya
            httpOnly: true,
            expires: new Date(Date.now()),
        })
        .json({
            success: true,
            message: "Admin Logged Out Successfully.",
        });
});

// Logout function for frontend patient
export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
    res
        .status(201)
        .cookie("patientToken", "", {
            httpOnly: true,
            expires: new Date(Date.now()),
        })
        .json({
            success: true,
            message: "Patient Logged Out Successfully.",
        });
});