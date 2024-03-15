import {hashSync, compareSync} from "bcrypt";
import jwt from "jsonwebtoken";
// import {UserModel} from '../config/database.js';
import {userModel} from '../schema/UserSchema.js';

//importing the auth strategy from passport
import '../config/passport.js';

const errorMsg = 'Invalid Credentials';

//Login USER
export const loginUser = async (req, res) => {
    console.log(req.body)
    const user = await userModel.findOne({email: req.body.email})
    if(!user) {
        return res.status(401).send({
            success: false,
            message: errorMsg,
        })
    }

    //incorrect password
    if (!compareSync(req.body.password, user.password)) {
        res.status = 401;
        return res.send({
            success: false,
            message: errorMsg,
        })
    }

    const payload = {
        email: user.email,
        id: user._id,
    }

    //payload is basically the user details or object
    // RANDOM STRING IS THE SECRET USED FOR ENCRYPTION AND SHOULD BE A BETTER STRING
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1d"});

    const modifiedUser = user;
    //removing password from returned user object
    // delete modifiedUser.password;

    return res.status(200).send({
        success: true,
        message: "Logged in successfully!",
        data: {
            token: token,
            user: modifiedUser,
        },
    })
}
