import {v4 as uuidv4} from "uuid";
import {userModel} from "../schema/UserSchema.js";
let users = [];

//ADD NEW USER
export const getAllUsers = (req, res) => {
    res.send(users);
    console.log(users);
}

//ADD NEW USER
export const createUser = async (req, res) => {
    console.log("POST ROUTE REACHED");
    const user = req.body;
    const userWithId = {...user, id: uuidv4()};
    users.push(userWithId);
    //SAVING to DB
    try {
        const userDB = await userModel.create({
            name: user.firstName + " " + user.lastName, 
            age: user.age, 
            uuid: uuidv4(), 
            email: user.email,
        });
        console.log(userDB)
    } 
    catch (err) {
        console.log(err.message)
    }

    res.send(`User with the name ${user.firstName} added to the database`);
    // console.log(req.body);
    // console.log(req);
}

//GET SPECIFIC USER BY ID
export const getUser = async (req, res) => {
    const {id} = req.params;
    const foundUser = users.find((user)=> user.id === id);
    const userDb = await userModel.findById(id);
    console.log(userDb);
    res.send(foundUser);
    console.log(id);

    //complex db query and chaining
    const userQuery = await userModel.where("age")
        .gt(12)
        .where("name").equals("John")
        .populate("bestFriend") //does what join does in sql. It populates the bestfriend field with the object from the model
        .limit(2)
        .select("age")
}

//DELETE SPECIFIC USER BY ID
export const deleteUser = (req, res) => {
    const {id} = req.params;
    users = users.filter((user)=> user.id !== id);
    res.send(`Deleted user with ${id} successfully`);
}

//UPDATE SPECIFIC USER BY ID
export const updateUser = async (req, res) => {
    const {id} = req.params;
    const {firstName, lastName, age} = req.body;
    const userDb = await userModel.findById(id);
    userDb.save() //save after running logic to update object
    console.log(userDb);
    const user = users.find((user) => user.id === id);

    if(firstName) user.firstName = firstName;
    if(lastName) user.lastName = lastName;
    if(age) user.age = age;

    res.send(`User with the id ${id} has been updated`);
}