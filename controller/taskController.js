const baseController = require('./baseController')
const Task = require('./../models/taskModel')
const AppError = require("../middleware/AppError");

class taskController extends baseController{
    constructor() {
        super(Task);
    }

    completeTask = async (req, res, next) => {
        const taskId = req.params.id

        const task = await this.model.findOne({_id: taskId})

        if(task.due_date > Date.now()){
            await this.model.update({_id: taskId}, {
                status: 'completed'
            })
        } else {
            await this.model.update({_id: taskId}, {
                status: 'expired'
            })
            return next(new AppError('Task already Expired', 400))
        }

        this.apiResponse('Task completed successfully', 200, res)
    }
}

module.exports = new taskController()