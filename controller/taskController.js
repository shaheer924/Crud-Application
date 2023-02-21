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

        if(new Date(task.due_date) > new Date()){
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

    getAll = async (req, res, next) => {
        const data = await this.model.find(req.query).populate('user_id')
        this.apiResponse('record fetched successfully', 200, res, data)
    }
}

module.exports = new taskController()