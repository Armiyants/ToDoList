import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

const User = mongoose.model('User')

export default async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      throw err
    }
    const token = authHeader.split(' ')[1]
    let decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id)
    next()
  } catch (err) {
    res.status(401).send('unauthorized')
  }
}

