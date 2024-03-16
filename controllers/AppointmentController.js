import {v4 as uuidv4} from "uuid";
import {userModel} from "../schema/UserSchema.js";
import {appointmentModel} from "../schema/AppointmentSchema.js";

//ADD APPOINTMENT FOR A USER
export const addAppointment = async (req, res) => {
    const body = req.body;
    try {
        const data = await appointmentModel.create({
            ...body,
            uuid: uuidv4(),
        })
        return res.status(200).send({
            success: false,
            message: 'Successful',
            data: data,
        })
    }
    catch(err) {
        return res.status(500).send({
            success: false,
            message: 'Request failed',
        })
    }
}