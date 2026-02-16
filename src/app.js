import express from 'express';
import dotenv from 'dotenv';
import crypto from 'crypto'
dotenv.config();
import connectDB from './config/database.js';


const app = express()

app.use(express.json())

let PORT = process.env.PORT || 7777;

app.use('/',(req,res)=>{
    res.send('Hellow from the server')
})
// console.log(crypto.randomBytes(32).toString('hex'))
await connectDB()
app.listen(PORT,(req,res)=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})