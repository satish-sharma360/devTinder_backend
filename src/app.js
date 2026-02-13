import express from 'express';

const app = express()

let PORT = process.env.PORT || 7777;

app.use('/hello',(req,res)=>{
    res.send('Hellow from the helo route')
})

app.use('/',(req,res)=>{
    res.send('Hellow from the server')
})
app.use('/test',(req,res)=>{
    res.send('Hellow from the test route')
})


app.listen(PORT,(req,res)=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})