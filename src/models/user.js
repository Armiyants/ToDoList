import mongoose from 'mongoose'
import crypto from "crypto";

//creating user schema
export const userScheme = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    max: 100
  },
  password: {
    type: String,
    required: true,
    min: 6
  },
  salt: {
    type: String,
    required: true
  }
})

userScheme.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(5).toString('hex')
  this.password = _hash(password, this.salt)
}

userScheme.methods.checkPassword = function (password) {
  return this.password === _hash(password, this.salt)
}

const _hash = (password, salt) => {
  return crypto.createHmac('sha256', salt)
    .update(password)
    .digest('hex')
}
mongoose.model('User', userScheme)