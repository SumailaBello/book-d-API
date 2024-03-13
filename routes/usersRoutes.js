import express  from "express";
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from "../controllers/users.js";
import { notFoundHandler } from "../controllers/404Controller.js";

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

//NOT FOUND
router.all('*', notFoundHandler);

export default router