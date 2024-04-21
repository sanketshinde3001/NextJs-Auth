require('dotenv').config();
import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection
        connection.on('connected', () =>{
            console.log('Connected to MongoDB');
        })

        // Notes [1]

        connection.on('error', (err) =>{
            console.log('Error connecting to MongoDB', err);
            process.exit();
        })
    } catch (error) {
        console.log('Something went wrong in connecting to DB', error);
    }
}