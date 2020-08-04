import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

import './models/index.js'
import db from './services/mongo.js'
import router from './routes/index.js'

const start = async () => {
    try {
        dotenv.config()
        await db()
        // app initialization
        const app = express()


// Load view engine
        app.set('view engine', 'pug')
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({ extended: false }))
        app.use(express.static(path.join('ToDoList' + '../views')))
        app.use(router)

//start server
        const port = process.env.PORT
        app.listen(port, () => console.info("Server is running on the port:" + parseInt(port)))
    } catch (err) {
        console.error('CRITICAL ERROR:', err)
    }
}

start()
