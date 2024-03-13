// src/index.js
import express from 'express';
import dotenv from 'dotenv';
// import { connectToDb } from './config/database.js';
import { connectToDb } from './config/database.js';
import passport from "passport";
import cors from 'cors';

//ROUTES
import authRoute from './routes/authRoutes.js';

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
app.use(express.json())

//port
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Express Server');
});

// handles routing to auth
app.use('/auth', authRoute);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

connectToDb();