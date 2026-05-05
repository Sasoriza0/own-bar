import express from 'express';
import mongoose from "mongoose";
import cors from 'cors';
import cookieParser from "cookie-parser";  
import dotenv from 'dotenv';


import router from './routes/routes.js'; 


dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}))

app.use(express.json());

app.use(cookieParser());

app.use('/api', router)

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Successfully connected to DB!');
        app.listen(PORT, () => {
            console.log(`Servert started on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error(`Connection error ${error.message}`);
    });