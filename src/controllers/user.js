import mongoose from 'mongoose'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import {validateEmail, validateUsername, checkPassword} from '../utils.js'

const User = mongoose.model('User')

export default {
  renderRegister(req, res) {
    return res.render('register.pug')
  },
  async registerController(req, res) {
    try {
      const {email, username, password} = req.body
      console.log(req.body)
      //do field validations
      if (!validateEmail(email)) {
        return res.status(422).send('Please enter valid email address')
      }
      if (!validateUsername(username)) {
        return res.status(422).send('Username cannot contain special characters, symbols or spaces')
      }
      if (!checkPassword(password)) {
        return res.status(422).send('Password should be at least 6 characters and contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character')
      }

      //check if user already exists
      const user = await User.findOne({email})

      if (user) {
        return res.render('register.pug', {
          err: [{msg: 'User with mentioned email already exists'}],
          username,
          email,
          password
        })
      }

      let newUser = new User({
        email,
        username
      })

      newUser.setPassword(password)
      await newUser.save()
      res.redirect('/login')
    } catch (err) {
      return res.render('register.pug', {
        errors: err
      })
    }
  },
  renderLogin(req, res) {
    return res.render('login.pug')
  },
  async loginController(req, res) {
    const {email, password} = req.body
    try {
      let searchField = 'username'
      if (validateEmail(email)) {
        searchField = 'email'
      }
      let user = await User.findOne({
        [searchField]: email
      })
      if (!user) {
        return res.status(400).send('User Not Exist')
      }
      if (!user.checkPassword(password)) {
        return res.status(400).send('Incorrect Credentials')
      }
      const payload = {
        id: user.id
      }
      const jwtToken = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: 3600
        },
      )
      res.setHeader("Authorization", `Bearer ${jwtToken}`)
      res.send()
    } catch (err) {
      return res.render('login.pug', {
        errors: err
      })
    }
  }
}
