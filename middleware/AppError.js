class AppError extends Error{
    message
    statusCode
    objectError
    constructor(message, statusCode, objectError=undefined) {
        super(message);
        this.message = message
        this.statusCode = statusCode
        this.objectError = objectError

        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = AppError