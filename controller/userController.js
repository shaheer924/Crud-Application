const baseController = require('./baseController')
const User = require('./../models/userModel')
const AppError = require("../middleware/AppError");
const jwt = require("jsonwebtoken");

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
}

module.exports = new userController()