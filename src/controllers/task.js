import mongoose from 'mongoose'
import {dateFormatting, dueDateValidation} from '../utils.js'

const Task = mongoose.model('Task')

export default {
  renderTasks(req, res) {
    try {
      return res.render('task.pug')
    } catch (err) {
      throw new Error(err)
    }
  },

  async createTask(req, res) {
    try {
      const {title, description, startDate, dueDate} = req.body

      dueDateValidation(startDate, dueDate)

      let newTask = new Task({
        title,
        description,
        owner: req.user._id,
        startDate: new Date(startDate),
        dueDate: new Date(dueDate)
      })
      await newTask.save()
      res.json(newTask)
    } catch (err) {
      console.error(err)
      res.status(500).send('Internal server error.')
    }
  },

  async getTask(req, res) {
    try {
      const {taskId} = req.params
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
      const { pagination, page } = req.query
      //check if there is pagination in request, if yes: convert the string into int, if no: set default 10
      const resPerPage = pagination
        ? parseInt(pagination)
        : 10

      //specifying the page, where we are currently searching
      const currentPage = page
        ? parseInt(page)
        : 1

      const tasks = await Task.find({owner: req.user._id})
        .sort({ createdAt: +1 })
        .skip((currentPage -1) * resPerPage) //for skipping all the tasks that are below the current number(result)
        .limit(resPerPage)
      res.json(tasks)
    } catch (err) {
      console.error(err)
      res.status(500).send('Internal server error.')
    }
  },
  async updateTask(req, res) {
    try {
      const {title, description, startDate, dueDate} = req.body
      const {taskId} = req.params._id
      let updatedFields = {}
      //assuming that we receive both start and due dates from FE. if at least one of them has been changed
      if (startDate || dueDate) {
        dueDateValidation(startDate, dueDate)
        updatedFields.dueDate = new Date(dueDate)
        updatedFields.startDate = new Date(startDate)
      }

      if (title) {
        updatedFields.title = title
      }

      if (description) {
        updatedFields.description = description
      }
      const task = await Task.findByIdAndUpdate(
        {
          owner: req.user._id,
          _id: taskId
        },
        {
          $set: updatedFields
        },
        {new: true}
      )
      if (!task) {
        throw {
          status: 404,
          message: 'Task is not found.'
        }
      }
      res.json(task)
    } catch (err) {
      if (err.status) {
        return res.status(err.status).send(err.message)
      }
      console.log(err)
      res.status(500).send('Internal server error.')
    }
  },
  async deleteTask(req, res) {
    try {
      const {taskId} = req.params
      await Task.findByIdAndDelete(
        {
          owner: req.user._id,
          _id: taskId
        }
      )
      res.send('Done')
    } catch (err) {
      if (err.status) {
        return res.status(err.status).send(err.message)
      }
      res.status(500).send('Internal server error.')
    }
  }
}



