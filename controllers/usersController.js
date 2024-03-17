import {v4 as uuidv4} from "uuid";
import {userModel} from "../schema/UserSchema.js";
import {appointmentModel} from "../schema/AppointmentSchema.js";
import axios from "axios";
let users = [];

//ADD NEW USER
export const getAllUsers = (req, res) => {
    res.send(users);
    console.log(users);
}

//GET SPECIFIC USER BY ID
export const getUser = async (req, res) => {
    const {id} = req.params;
    try {
        const user = await userModel.findById(id);
        console.log(user);
        return res.status(200).send({
            success: true,
            message: 'Successful',
            user: user,
        })
    } 
    catch (err) {
        return res.status(500).send({
            success: false,
            message: 'Unable to find user',
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
    const {name, jobTitle, address, businessName, id} = req.body;
    try {
        const user = await userModel.findById(id);
        const updateUser = await userModel.findOneAndUpdate(
            {id: id}, 
            {
                name: name ?? user.name,
                jobTitle: jobTitle ?? user.jobTitle,
                address: address ?? user.address,
                businessName: businessName ?? user.businessName,
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

//GET AVAILABILITY
// export const getAvailability = async (req, res) => {
//     const {id} = req.params;
//     try {
//         const user = await userModel.findById({id: id});
//         return res.status(200).send({
//             success: true,
//             message: 'Successful',
//             data: user.availability,
//         })
//     }
//     catch(err) {
//         return res.status(500).send({
//             success: false,
//             message: 'Request failed',
//         })
//     }
// }

//ADD AVAILABILITY BY USER ID
export const addAvailability = async (req, res) => {
    // const {id} = req.params;
    const {date, uuid} = req.body;
    try {
        const user = await userModel.findById(userId)
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
        return res.status(200).send({
            success: true,
            message: 'Successful',
            data: updatedUser,
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

//DELETE AVAILABILITY
export const removeAvailability = async (req, res) => {
    // const {id} = req.params;
    const {date, userId} = req.body;
    try {
        const user = await userModel.findById(userId);
        const availability = user.availability.filter(item => item != date);
        const updatedUser = await userModel.findOneAndUpdate(
            {_id: userId}, 
            {
                availability: availability,
            },
            {
                new: true,
            }
        )
        return res.status(200).send({
            success: true,
            message: 'Successful',
            data: updatedUser,
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