import express  from "express";
import { createUser } from "../controllers/registerController.js";
import { loginUser } from "../controllers/loginController.js";
import { notFoundHandler } from "../controllers/404Controller.js";
import { forgotPassword } from "../controllers/forgotPasswordController.js";
import sendOTP, { confirmOtp } from "../controllers/otpController.js";

const router = express.Router();

//all routes in here are starting with /auth

//REGISTER NEW USER
router.post('/register', createUser);

//LOGIN USER
router.post('/login', loginUser);

//REQUEST PASSWORD RESET
router.post('/forgot-password', forgotPassword);

//CONFIRM OTP
router.post('/confirm-otp', confirmOtp);

router.post('/sendEmail', sendOTP);

//NOT FOUND
router.all('*', notFoundHandler);

export default router