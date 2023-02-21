const express = require('express')
const userController = require('./../controller/userController')
const AuthenticationMiddleware = require('./../middleware/AuthenticationMiddleware')
const taskController = require('./../controller/taskController')
const RoleMiddleware = require('./../middleware/RoleMiddleware')

const router = express.Router()

router.post('/user/login', userController.login)
router.all('*', AuthenticationMiddleware)
router.get('/user', userController.getAll)

router.get('/task',taskController.getAll)
router.get('/user/dashboard', userController.dashboard)
router.get('/task/complete/:id', taskController.completeTask)

//can only be used by superuser
router.all('*', RoleMiddleware)
router.post('/user/create-user', userController.createOne)
router.post('/task/create-task', taskController.createOne)
router.post('/user/disable-user/:id', userController.disableUser)


module.exports = router