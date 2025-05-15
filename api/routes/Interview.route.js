import express from 'express'
import {createInterview ,showAllInterview} from '../controllers/Interviewblog.controller.js'


const InterviewRoute=express.Router()

InterviewRoute.post('/create',createInterview)
InterviewRoute.get('/',showAllInterview)

export default InterviewRoute