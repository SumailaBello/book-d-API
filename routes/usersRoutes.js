import express  from "express";
import { deleteUser, getAllUsers, getUser, updateUser } from "../controllers/usersController.js";
import { notFoundHandler } from "../controllers/404Controller.js";
import { addAvailability, getAppointments, getTeamMembers, removeAvailability } from "../controllers/usersController.js";

const router = express.Router();

//all routes in here are starting with /users
//GET ALL USERS
router.get('/', getAllUsers);

//GET USER INFO BY ID
router.get('/:id', getUser);

//DELETE USER
router.delete('/:id', deleteUser);

//UPDATE USER INFO
router.patch('/:id', updateUser);

//GET USER TEAM MEMBERS
router.get('/team/:id', getTeamMembers);

//GET USER APPOINTMENTS
router.get('/appointments/:id', getAppointments);

//GET USER AVAILABILITY BY USER ID
// router.get('/availability/:id', getAvailability);

//ADD USER AVAILABILITY
router.post('/availability/add', addAvailability);

//REMOVE USER AVAILABILITY
router.post('/availability/remove', removeAvailability);

//NOT FOUND
router.all('*', notFoundHandler);

export default router