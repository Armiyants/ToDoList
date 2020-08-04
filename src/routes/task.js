import express from 'express'
import { taskControllers } from '../controllers/index.js'

const taskRouter = new express.Router()

taskRouter.post('/', taskControllers.createTask)
taskRouter.get('/', taskControllers.listTasks)
taskRouter.get('/:taskId', taskControllers.getTask)

export default taskRouter



