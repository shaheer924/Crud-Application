const baseController = require('./baseController')
const User = require('./../models/userModel')
const AppError = require("../middleware/AppError");
const jwt = require("jsonwebtoken");
const Task = require("../models/taskModel");

class userController extends baseController {
    constructor() {
        super(User);
    }

    signToken (id) {
        return jwt.sign({ id }, 'i-am-happy-with-my-life-i-got-strawberry', {
            expiresIn: '2d'
        })
    }

    login = async (req, res,  next) => {
        try {
            const {username, password} = req.body

            const user = await this.model.findOne({username: username}).select('+password')

            const password_condition = await user.correctPassword(password, user.password)

            if(!password_condition) return next(new AppError('password is incorrect', 400))

            let token = await this.signToken(user._id)

            this.apiResponse('login successful', 200, res, user, token)
        } catch (e) {
            return next(new AppError('Error', 500, e))
        }

    }

    disableUser = async (req, res, next) =>{
        try{
            const id = req.params.id
            if(!id) return next(new AppError('please provide to disable user', 400))
            await this.model.update({_id: id}, {
                is_disable: true
            })
            this.apiResponse('user disabled successfully',200, res)
        }catch (e) {
            return next(new AppError('Error', 500, e))
        }
    }

    dashboard = async (req, res, next ) => {
        let data = []
        const user = await User.count()
        data.push({ title: 'Total Users', count: user})

        const task = await Task.count()
        data.push({title: 'Total Tasks', count: task})

        const pending = await Task.count({status: 'pending'})
        data.push({title: 'Total Pending Task', count: pending})

        const completed = await Task.count({status: 'completed'})
        data.push({title: 'Total Completed Task', count: completed})

        this.apiResponse('record fetched successfully', 200, res, data)
    }
}

module.exports = new userController()