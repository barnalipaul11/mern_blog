import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import mongoose from 'mongoose';
import AuthRoute from './routes/Auth.route.js';
import UserRoute from './routes/User.route.js';
import InterviewRoute from './routes/Interview.route.js';
import OpportunityRoute from './routes/OpportunityRoute.js';

dotenv.config()

const PORT=process.env.PORT
const app=express()

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials:true
}))



mongoose.connect(process.env.MONGODB_CONN,{dbName:'mern-blog'})
    .then(()=>console.log('Database connected'))
    .catch(err=>console.log(err))
    app.use('/api/auth',AuthRoute)


app.use('/api/auth',AuthRoute)
app.use('/api/user',UserRoute)
app.use('/api/interviews',InterviewRoute)
app.use('/api/opportunity', OpportunityRoute)
    
app.listen(PORT,()=>{
    console.log('Server running on port:',PORT)
})


app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500
    const message=err.message || 'Internal server error.'
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})