const jwt = require('jsonwebtoken')
const User = require('./../models/userModel')
const AppError = require("./AppError");

module.exports = async (req, res, next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }

    if(!token) return next(new AppError('please provide auth token', 400))

    const {id} = await jwt.decode(token)

    const user = await User.findById(id)

    if(!user) return next(new AppError('unauthenticated', 400))

    req.user = user

    next()
}