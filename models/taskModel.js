const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title is required']
    },
    description: {
        type: String,
        required: [true, 'description is required']
    },
    user_id: {
        type: mongoose.ObjectId,
        ref: 'User'
    },
    due_date: {
        type: String,
        required: [true, 'due date is required']
    },
    status: {
        type: String,
        default: 'pending',
    }
})

const Task = mongoose.model('tasks', taskSchema)

module.exports = Task