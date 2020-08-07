import express from 'express'
import {taskControllers} from '../controllers/index.js'

const taskRouter = new express.Router()

taskRouter.get('/', taskControllers.renderTasks)
taskRouter.post('/', taskControllers.createTask)
taskRouter.get('/list', taskControllers.listTasks)
taskRouter.get('/:taskId', taskControllers.getTask)
taskRouter.put('/:taskId', taskControllers.updateTask)
taskRouter.delete('/:taskId', taskControllers.deleteTask)

export default taskRouter



