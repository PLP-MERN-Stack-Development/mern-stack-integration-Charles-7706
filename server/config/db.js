// const mongoose = require('mongoose');
import mongoose from 'mongoose';
// require('dotenv').config();
import dotenv from 'dotenv';
dotenv.config();

async function connectDB(){
    try {
        await mongoose.connect(process.env.mongodb_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully...');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    }
};

export { connectDB, mongoose};