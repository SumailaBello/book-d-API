import {v4 as uuidv4} from "uuid";
import {userModel} from "../schema/UserSchema.js";
import {appointmentModel} from "../schema/AppointmentSchema.js";
import axios from "axios";
import sendNotificationEmail from "./notificationCntroller.js";
let users = [];

//ADD NEW USER
export const getAllUsers = (req, res) => {
    res.send(users);
    console.log(users);
}

//GET SPECIFIC USER BY UUID
export const getUser = async (req, res) => {
    const {id} = req.params;
    try {
        const user = await userModel.findOne({uuid: id});
        // console.log(user);
        return res.status(200).send({
            success: true,
            message: 'Successful',
            user: user,
        })
    } 
    catch (err) {
        console.log(err);
        return res.status(500).send({
            success: false,
            message: 'Unable to find user',
            error: err
        })
    }

    //complex db query and chaining
    // const userQuery = await userModel.where("age")
    //     .gt(12)
    //     .where("name").equals("John")
    //     .populate("bestFriend") //does what join does in sql. It populates the bestfriend field with the object from the model
    //     .limit(2)
    //     .select("age")
}

//DELETE SPECIFIC USER BY ID
export const deleteUser = async (req, res) => {
    const {id} = req.params;
    try {
        await userModel.findOneAndDelete({id: id});
        return res.status(200).send({
            success: true,
            message: "User deleted.",
        }) 
    } 
    catch (err) {
        return res.status(500).send({
            success: false,
            message: "Unable to delete user",
            error: err,
        }) 
    }
    
}

//UPDATE SPECIFIC USER BY ID
export const updateUser = async (req, res) => {
    // const {id} = req.params;
    const {name, jobTitle, address, businessName, uuid} = req.body;
    const patchBody = {
        name: name,
        jobTitle: jobTitle,
        address: address,
        businessName: businessName
    }
    try {
        const user = await userModel.findOne({uuid: uuid});
        const updateUser = await userModel.findOneAndUpdate(
            {uuid: uuid}, 
            {
                ...patchBody
            },
            {
                new: true,
            }
        )
        return res.status(200).send({
            success: true,
            message: "User updated successfully.",
            user: updateUser,
        }) 
    } 
    catch (err) {
        console.log(err)
        return res.status(500).send({
            success: false,
            message: "Request Error.",
            error: err,
        }) 
    }
}

//GET TEAM MEMBERS FOR A USER
export const getTeamMembers = async (req, res) => {
    try {
        const data = await axios.get('https://randomuser.me/api/?inc=picture,email,id,name,nat&results=10');
        return res.status(200).send({
            success: true,
            message: 'Successful',
            data: data.data,
        })
    }
    catch(err) {
        return res.status(500).send({
            success: false,
            message: 'Request failed',
            error: err,
        })
    }
}

//TOGGLE AVAILABILITY BY USER ID
export const toggleAvailability = async (req, res) => {
    // const {id} = req.params;
    const {date, uuid, mode} = req.body;
    try {
        const user = await userModel.findOne({uuid: uuid})
        if(mode == "add") {
            const updatedUser = await userModel.findOneAndUpdate(
                {
                    uuid: uuid
                },
                {
                    availability: [...user.availability, date]
                },
                {
                    new: true,
                }
                
            );
            //SENDS EMAIL NOTIFICATION
            sendNotificationEmail(user.email);
            return res.status(200).send({
                success: true,
                message: 'Successful',
                data: updatedUser,
            })
        }
        else if(mode == "remove") {
            const availability = user.availability.filter(item => item != date);
            const updatedUser = await userModel.findOneAndUpdate(
                {uuid: uuid}, 
                {
                    availability: availability,
                },
                {
                    new: true,
                }
            )
            //SENDS EMAIL NOTIFICATION
            sendNotificationEmail(user.email);
            return res.status(200).send({
                success: true,
                message: 'Successful',
                data: updatedUser,
            })
        }
    }
    catch(err) {
        console.log(err)
        return res.status(500).send({
            success: false,
            message: 'Request failed',
            error: err,
        })
    }
}

//GET APPOINTMENTS BY DATE FOR A USER
export const getAppointments = async (req, res) => {
    const {userId} = req.params;
    console.log(userId);
    // return
    try {
        const data = await appointmentModel.find({userId: userId})
        return res.status(200).send({
            success: true,
            message: 'Successful',
            data: data,
        })
    }
    catch(err) {
        return res.status(500).send({
            success: false,
            message: 'Request failed',
            error: err,
        })
    }
}