import mongoose from 'mongoose'
mongoose.set("useFindAndModify", false)

export default () => {
    return new Promise((resolve, reject) => {
        mongoose.connect( process.env.DBURL, ({ useNewUrlParser: true, useUnifiedTopology: true }))
        let db = mongoose.connection

        //check connection
        db.once('open', () => {
            console.log('Connected to MongoDB')
            resolve()
        })
    })
}



