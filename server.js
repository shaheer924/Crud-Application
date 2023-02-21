const App = require('./app')
const dotenv = require('dotenv')

dotenv.config({path: './.env'})
const app = new App(process.env.PORT || 5000)
app.listen()