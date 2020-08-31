import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

const User = mongoose.model('User')

export default async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      throw new Error('authHeader is missing')
    }
    const token = authHeader.split(' ')[1]
    let decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id)
    if (!user) {
      throw new Error('no such user')
    }
    req.user = user
    next()
  } catch (err) {
    res.status(401).send('unauthorized')
    console.log(err)
  }
}

