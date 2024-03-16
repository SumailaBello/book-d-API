// src/index.js
import express from 'express';
import dotenv from 'dotenv';
// import { connectToDb } from './config/database.js';
import { connectToDb } from './config/database.js';
import passport from "passport";
import cors from 'cors';

//ROUTES
import authRoute from './routes/authRoutes.js';
import userRoute from './routes/usersRoutes.js';
import appointmentRoute from './routes/appointmentRoutes.js'

dotenv.config();
// if (process.env.NODE_ENV != 'production') {
//   dotenv.config();
// }


const app = express();
//APP UTILS
app.use(express.urlencoded({extended: true}))
app.use(cors());
app.use(passport.initialize());
//enable use of json
app.use(express.json());

//port
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Express Server');
});

// handles routing to auth
app.use('/auth', authRoute);

// handles routing to user
app.use('/user', passport.authenticate('jwt', {session: false}), userRoute);

// handles routing to appointment
app.use('/appointment', appointmentRoute);

// app.get('/protected', passport.authenticate('jwt', {session: false}), (req, res) => {
//   res.status = 200;
//   res.send({
//      success: true,
//      user: {
//       id: req.user._id,
//       username: req.user.username,
//      } 
//   });
// })

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

connectToDb();