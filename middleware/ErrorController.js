module.exports = (err, req, res, next) => {
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        stack: err.stack,
        error_object: err.objectError,
        error: err
    })
}