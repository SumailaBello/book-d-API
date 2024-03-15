import {userModel} from '../schema/UserSchema.js';
import {otpModel} from '../schema/OtpSchema.js';
import {hashSync, compareSync, genSaltSync} from "bcrypt";
import {v4 as uuidv4} from "uuid";
import sendVerificationEmail from '../utils/mailSender.js';
import sendOTP from './otpController.js';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

//RESET USER PASSWORD
export const resetPassword = async (req, res) => {
    console.log('Reset password post request');
    console.log(req.body);
    const {otp, password} = req.body;
    const response = await otpModel.find({otp: otp }).sort({ createdAt: -1 }).limit(1);
    console.log('OTP', response);
    if (response.length === 0 || otp !== response[0].otp) {
      return res.status(400).send({
        success: false,
        message: 'The OTP is not valid',
      });
    }

    const saltRounds = 10;
    const salt = genSaltSync(saltRounds);

    try {
        // update user if present
        const updatedUser = await userModel.findOneAndUpdate(
            {email: response[0].email}, 
            {
                password: hashSync(password, salt),
            },
            {
                new: true,
            }
        )
        // If user found
        if (updatedUser) {
            return res.status(200).send({
                success: true,
                message: 'Password reset successfully',
            });
        }
    } 
    catch (err) {
        return res.status(401).json({
            success: false,
            message: 'An error occured',
            error: err,
        });
    }


}
