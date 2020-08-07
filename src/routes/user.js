import express from 'express'
import {userControllers} from '../controllers/index.js'

const userRouter = new express.Router()

userRouter.post('/register', userControllers.registerController)
userRouter.get('/register', userControllers.renderRegister)
userRouter.get('/login', userControllers.renderLogin)
userRouter.post('/login', userControllers.loginController)
userRouter.post('/task/tandz/xndzor', userControllers.loginController)

export default userRouter
