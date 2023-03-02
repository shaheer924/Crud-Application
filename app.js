const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const {connect} = require('mongoose')
const ErrorController = require('./middleware/ErrorController')
const scheduleTask = require('./middleware/UpdateTask')
const schedule = require('node-schedule');


const v1 = require('./router/v1')
const {HandleRoute} = require("./middleware/HandleRoute");

class App {
    app
    port
    constructor(port) {
        this.app = express()
        this.port = port

        this.initializeScheduleTask()
        this.initializeMiddleware()
        this.initializeDatabase()
        this.initializeRouter()
        this.initializeErrorHandler()
    }

    initializeMiddleware() {
        this.app.use(express.json())
        this.app.use(morgan('dev'))
        this.app.use(cors({
            origin: '*'
        }))
    }

    initializeRouter() {
        this.app.use('/api/v1/', v1)
        this.app.use('*', HandleRoute)

    }

    initializeDatabase() {
        connect('mongodb://mongo:UWEEcLtOj5ie62uyTEfN@containers-us-west-85.railway.app:7428',{
            useNewUrlParser: true
        }).then(()=> {
            console.log('Database connected successfully')
        }).catch()
    }

    initializeErrorHandler () {
        this.app.use(ErrorController)
    }

    initializeScheduleTask(){
        schedule.scheduleJob('* * * * * *', function(){  // this for one hour
            scheduleTask().then((r)=>{
                console.log('Schedule run at', new Date())
            }).catch(err=>{
                console.log(err)
            })
        });

    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('server is listening on port ', this.port)
        })
    }
}

module.exports = App
