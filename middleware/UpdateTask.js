const Task = require('./../models/taskModel')

const UpdateTask = async () => {
    const task = await Task.find({status: 'pending'})
    for(let tasks of task){

        if(new Date(tasks.due_date) < new Date()){
            console.log("Here running", tasks._id, new Date(tasks.due_date) > new Date())
            await Task.update({_id: tasks._id},{
                status: 'expired'
            })
        }
    }
    console.log('Successfully updated ')
}


module.exports = UpdateTask
