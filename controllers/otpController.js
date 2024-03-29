// const otpGenerator = require('otp-generator');
// const OTP = require('../models/otpModel');
// const User = require('../models/userModel');
import otpGenerator from 'otp-generator';
import {otpModel} from '../schema/OtpSchema.js';
import {userModel} from '../schema/UserSchema.js';
import jwt from "jsonwebtoken";

//send otp to user
const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    // Check if user is already present
    const checkUserPresent = await userModel.findOne({ email: email });
    // If user not found with provided email
    if (!checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: 'User does not exist',
      });
    }

    //generate otp
    let otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    let result = await otpModel.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(4, {
        upperCaseAlphabets: false,
      });
      result = await otpModel.findOne({ otp: otp });
    }
    const otpPayload = { email, otp };
    const otpBody = await otpModel.create(otpPayload);
    console.log('OTP Sent successfully')
    console.log(res)
    return
    // return res.status(200).send({
    //   success: true,
    //   message: 'OTP sent successfully',
    //   otp,
    // });
  } catch (error) {
    console.log(error.message);
    // return res.status(500).json({ success: false, error: error.message });
  }
};

//resend otp to user
export const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    // Check if user is already present
    const checkUserPresent = await userModel.findOne({ email: email });
    // If user not found with provided email
    if (!checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: 'User does not exist',
      });
    }

    //generate otp
    let otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    let result = await otpModel.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(4, {
        upperCaseAlphabets: false,
      });
      result = await otpModel.findOne({ otp: otp });
    }
    const otpPayload = { email, otp };
    const otpBody = await otpModel.create(otpPayload);
    console.log('OTP Sent successfully')
    console.log(res)
    return res.status(200).send({
      success: true,
      message: 'OTP sent successfully',
      otp,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

//confirm user provided otp
export const confirmOtp = async (req, res) => {

    const { email, otp } = req.body;
    console.log('body', req.body)
    // Find the most recent OTP for the email
    const response = await otpModel.find({email: email }).sort({ createdAt: -1 }).limit(1);
    console.log('OTP', response)
    if (response.length === 0 || otp !== response[0].otp) {
      return res.status(400).send({
        success: false,
        message: 'The OTP is not valid',
      });
    }

    // Check if user is already present
    const user = await userModel.findOne({ email: email });
    const updateUser = await userModel.findOneAndUpdate(
        {email: email}, 
        {
            verified: true,
        },
        {
            new: true,
        }
    )
    console.log('updated user', updateUser);
    //generate token
    const payload = {
        email: user.email,
        id: user._id,
    }
    
    //payload is basically the user details or object
    // RANDOM STRING IS THE SECRET USED FOR ENCRYPTION AND SHOULD BE A BETTER STRING
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1d"});
    
    return res.status(200).send({
        success: true,
        message: "OTP Verification successful.",
        data: {
            token: token,
            user: updateUser,
        },
    })
};
  

export default sendOTP;