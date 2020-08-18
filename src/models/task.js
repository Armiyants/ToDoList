import mongoose from 'mongoose'

//creating task schema
export const taskScheme = mongoose.Schema({
    owner: {
      required: true,
      type: mongoose.Types.ObjectId
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true,
      max: 255
    },
    startDate: {
      type: Date,
      required: true
    },
    dueDate: {
      type: Date,
      required: true
    }
  }, {timestamps: true}
  // option creates a createdAt and updatedAt field on model
  // which will get automatically updated when our model changes
)

mongoose.model('Task', taskScheme)