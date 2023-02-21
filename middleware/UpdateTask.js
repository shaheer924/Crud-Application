const Task = require('./../models/taskModel')

const UpdateTask = async () => {
    const task = await Task.find()
    console.log(task)
}


module.exports = UpdateTask