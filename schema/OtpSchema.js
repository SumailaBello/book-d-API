import mongoose, { SchemaTypeOptions } from "mongoose";
import sendVerificationEmail from "../utils/mailSender.js";

const {Schema, model} = mongoose;

const otpSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
    required: true,
  },
  expireAt: { 
    type: Date, 
    default: Date.now, 
    index: { expires: '300s' },
    required: true,
  }
});

// otpSchema.index({"createdAt": 1}, {expiresAfterSeconds: 10})

// otpSchema.index({'createdAt': 1}, {expireAfterSeconds: 10}) //expires and deleted after 5 minutes

otpSchema.pre("save", async function (next) {
  console.log("New document saved to the database");
  // Only send an email when a new otp document is created
  if (this.isNew) {
    //user email from user schema found in this.email
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});

export const otpModel = model("OTP", otpSchema);
// module.exports = mongoose.model("OTP", otpSchema);