import express  from "express";
import { deleteUser, getAllUsers, getUser, updateUser } from "../controllers/usersController.js";
import { notFoundHandler } from "../controllers/404Controller.js";
import { getAppointments, getTeamMembers, toggleAvailability } from "../controllers/usersController.js";

const router = express.Router();

//all routes in here are starting with /users
//GET ALL USERS
router.get('/', getAllUsers);

//GET USER INFO BY UUID
router.get('/:id', getUser);

//DELETE USER
router.delete('/delete', deleteUser);

//UPDATE USER INFO
router.patch('/update', updateUser);

//GET USER TEAM MEMBERS
router.get('/team/:id', getTeamMembers);

//GET USER APPOINTMENTS
router.get('/appointments/:id', getAppointments);

//GET USER AVAILABILITY BY USER ID
// router.get('/availability/:id', getAvailability);

//TOGGLE USER AVAILABILITY
router.post('/availability/toggle', toggleAvailability);

//NOT FOUND
router.all('*', notFoundHandler);

export default router