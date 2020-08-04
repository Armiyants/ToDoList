import express from 'express'
import userRouter from './user.js'
import isAuth from '../middlewares/auth.js'
import taskRouter from './task.js'

const router = new express.Router()

//using respective routes
router.use('/task', isAuth, taskRouter)
router.use(userRouter)

export default router
