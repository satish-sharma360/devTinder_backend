import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/database.js';


const app = express()

let PORT = process.env.PORT || 7777;

app.use('/',(req,res)=>{
    res.send('Hellow from the server')
})


await connectDB()
app.listen(PORT,(req,res)=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})