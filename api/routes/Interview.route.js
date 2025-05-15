import express from 'express'
import {createInterview } from '../controllers/Interviewblog.controller.js'


const InterviewRoute=express.Router()

InterviewRoute.post('/create',createInterview)


export default InterviewRoute