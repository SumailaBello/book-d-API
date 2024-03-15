// import {UserModel} from '../config/database.js';
import {userModel} from '../schema/UserSchema.js';
import {hashSync, compareSync, genSaltSync} from "bcrypt";
import {v4 as uuidv4} from "uuid";
import sendVerificationEmail from '../utils/mailSender.js';
import sendOTP from './otpController.js';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

//REGISTER USER
export const createUser = async (req, res) => {
    console.log('Register post request');
    console.log(req.body);
    // Check if user is already present
    const userObj = await userModel.findOne({ email: req.body.email });
    // If user found with provided email
    if (userObj) {
      return res.status(401).json({
        success: false,
        message: 'User is already registered',
      });
    }
    const saltRounds = 10;
    const salt = genSaltSync(saltRounds);
    const userToDb = new userModel({
        ...req.body,
        password: hashSync(req.body.password, salt),
        uuid: uuidv4(),
    })

    try {
        const user = await userToDb.save();
        
        //sends otp to registered user
        sendOTP(req, res)
        //return response to users
        return res.status(200).send({
            success: true,
            message: "User Registration successful.",
            user: user,
        })
    } 
    catch (err) {
        return res.send({
            success: false,
            message: "Something went wrong",
            error: err,
        })
    }

}
