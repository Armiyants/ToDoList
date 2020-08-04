import mongoose from 'mongoose'
import { taskScheme } from '/home/christine/WebstormProjects/ToDoList/src/models/task.js'
import bodyParser from 'body-parser'

const Task = mongoose.model('Task', taskScheme)

export default {
    async createTask(req, res) {
        const { title, duedate, description } = req.body
        //TODO::armiyants:: add validations
        let task = new Task(req.body)

        task.save((err) => {
            if (err) {
                console.log(err)
            } else {
                res.redirect('/')
            }
        })
    },

    async getTask(req, res) {
        try {
            const { taskId } = req.params
            const task = await Task.findOne({
                _id: taskId,
                owner: req.user._id
            })
            if (!task) {
                return res.status(404).send('Task not found.')
            }
            res.json(task)
        } catch (err) {
            console.error(err)
            res.status(500).send('Internal server error.')
        }
    },

    async listTasks(req, res) {
        try {
            const tasks = await Task.find({ owner: req.user._id })
            res.json(tasks)
        } catch (err) {

        }
    }
}

