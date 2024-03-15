import {hashSync, compareSync} from "bcrypt";
import jwt from "jsonwebtoken";
// import {UserModel} from '../config/database.js';
import {userModel} from '../schema/UserSchema.js';

//importing the auth strategy from passport
import '../config/passport.js';
import sendOTP from "./otpController.js";

const errorMsg = 'User does not exist';

//FORGOT PASSWORD
export const forgotPassword = async (req, res) => {
    console.log(req.body);
    const user = await userModel.findOne({email: req.body.email})
    if(!user) {
        return res.status(401).send({
            success: false,
            message: errorMsg,
        })
    }

    // send otp to user 
    await sendOTP(req, res);
    return res.status(200).send({
        success: true,
        message: "Request successful!",
        user: user,
    })

    //payload is basically the user details or object
    // RANDOM STRING IS THE SECRET USED FOR ENCRYPTION AND SHOULD BE A BETTER STRING
    // const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1d"})

    // return res.status(200).send({
    //     success: true,
    //     message: "Logged in successfully!",
    //     token: "Bearer " + token,
    // })
}
