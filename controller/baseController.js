class baseController {
    model

    constructor(model) {
        this.model = model
    }

    getAll = async (req, res, next) => {
        const data = await this.model.find(req.query)
        this.apiResponse('record fetched successfully', 200, res, data)
    }

    getById = async (req, res) => {
        const data = await this.model.findById(req.body.id)
        this.apiResponse('record fetched successfully', 200, res, data)
    }

    createOne = async (req, res) => {
        const data = await this.model.create(req.body)
        this.apiResponse('record created successfully', 200, res, data)
    }

    updateOne = async (req, res) => {
        const data = await this.model.update({_id: req.params.id}, req.body)
        this.apiResponse('record updated successfully', 200, res, data)
    }

    deleteOne = async (req, res) => {
        const data = await this.model.delete({_id: req.params.id})
        this.apiResponse('record deleted successfully', 200, res)
    }

    apiResponse(message, status, res, data = {}, token = undefined) {
        res.status(status).json({
            success: true,
            message,
            data,
            token
        })
    }
}

module.exports = baseController