import mongoose from 'mongoose'

//creating task schema
export const taskScheme = mongoose.Schema({
        owner: {
            required: true,
            type: mongoose.SchemaTypes.ObjectId
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    }
)

mongoose.model('Task', taskScheme)