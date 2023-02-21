const AppError = require("./AppError");
exports.HandleRoute = (req, res, next) => {
    next(new AppError('no route found on this server',404))
}