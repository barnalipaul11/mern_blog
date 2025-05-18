import express from 'express'
import {createInterview ,showAllInterview,getInterviewById,deleteInterview} from '../controllers/Interviewblog.controller.js'


const InterviewRoute=express.Router()

InterviewRoute.post('/create',createInterview)
InterviewRoute.get('/',showAllInterview)
InterviewRoute.get('/:id', getInterviewById);
// routes/interviewRoutes.js
InterviewRoute.delete("/:id", deleteInterview);

export default InterviewRoute