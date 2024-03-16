import mongoose, { SchemaTypeOptions } from "mongoose";

const {Schema, model} = mongoose;

const appointmentSchema = new Schema({
uuid: {
    required: true,
    type: String,
    // default: uuidv4.
},
  email: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    // required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
    // required: true,
  }
});

export const appointmentModel = model("Appointment", appointmentSchema);