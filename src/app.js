import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import connectDB from './config/database.js';
import authRouter from './routes/auth.routes.js';
import profileRoute from './routes/profile.routes.js';
import requestRouter from './routes/request.routes.js';


const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/user', authRouter)
app.use('/profile', profileRoute)
app.use('/connection', requestRouter)

let PORT = process.env.PORT || 7777;

app.use('/',(req,res)=>{
    res.send('Hellow from the server')
})

// console.log(crypto.randomBytes(32).toString('hex'))
await connectDB()
app.listen(PORT,(req,res)=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})