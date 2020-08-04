import passportLocal from 'passport-local'
import User from '../models/user.js'
import bcrypt from 'bcryptjs'


const localStrategy = passportLocal.Strategy
