const AppError = require("./AppError");
module.exports = (req, res, next) => {
    if(req.user.role_id === 'admin' || req.user.role_id === 'parent'){
        next()
    } else {
        return next(new AppError('This route can only be accessible by Admin',400))
    }
}