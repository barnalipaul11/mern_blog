import express from 'express'
import { doLike, likeCount} from '../controllers/BlogLike.controller.js'

const LikeRoute = express.Router()

LikeRoute.post('/like',doLike)
LikeRoute.get('/get-like/:interviewid', likeCount)

export default LikeRoute