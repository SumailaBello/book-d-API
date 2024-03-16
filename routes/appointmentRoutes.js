import express  from "express";
import { notFoundHandler } from "../controllers/404Controller.js";
import { addAppointment } from "../controllers/AppointmentController.js";

const router = express.Router();

//GET USER APPOINTMENTS
router.get('/add', addAppointment);

//NOT FOUND
router.all('*', notFoundHandler);

export default router