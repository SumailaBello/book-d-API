import {Strategy, ExtractJwt} from "passport-jwt";
import passport from "passport";
// import {UserModel} from '../config/database.js';
import {userModel} from '../schema/UserSchema.js';
import dotenv from 'dotenv';

// to use .env variables
dotenv.config();

const JwtStrategy = Strategy;
//Verify token
let opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
// opts.secretOrKey = '0e2bbc16ec1aafc8e739a77b46ff22b9dc9f9729f25c4ddeacb656782ff4c9d6';
passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
    try {
        const val = await userModel.findById(jwt_payload.id);
        // console.log("VAL: ", done(val));
        if(val) return done(null, val)
        return(done(null, false));
    } 
    catch (err) {
        console.log(err);
        return done(err, false);
    }

    // try {
    //     const val = await UserModel.findOne({id: jwt_payload.id});
    //     console.log("VAL:", val)
    // } 
    // catch (err) {
    //     console.log(err);
    // }
    // UserModel.findOne({id: jwt_payload.id}, function(err, user) {
    //     if (err) {
    //         return done(err, false);
    //     }
    //     if (user) {
    //         return done(null, user);
    //     } else {
    //         return done(null, false);
    //         // or you could create a new account
    //     }
    // });
}));