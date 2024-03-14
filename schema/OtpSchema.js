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
    default: Date.now(),
    // expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
  },
  expireAt: {
    type: Date,
    default: Date.now() + (1000*60*5) // for 5 mins
  }
});

otpSchema.pre("save", async function (next) {
  console.log("New document saved to the database");
  // Only send an email when a new otp document is created
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});

export const otpModel = model("OTP", otpSchema);
// module.exports = mongoose.model("OTP", otpSchema);