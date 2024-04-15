require('dotenv').config()

const express = require("express")
const mongoose = require("mongoose")
const app = express()
const productRoute = require('./routes/productRoute.js')
const errorMiddleware = require('./middleware/errorMiddleware')
const cors = require('cors')

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 3001
const FRONTEND = process.env.FRONTEND
//const mconn = "mongodb+srv://ilinehc6:Mongoose$626@nodeapi.v8hrsre.mongodb.net/nodeapi?retryWrites=true&w=majority&appName=nodeapi"

var corsOptions = {
    origin: [FRONTEND, 'http://localhost:5173'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//routes:
app.use('/api/product', productRoute)
app.get('/', (req, res) =>{
    res.send('Hello NODE API')
})
app.get('/blog', (req,res) => {
    res.send('Hello Blog')
})
app.use(errorMiddleware)

// connect to mongo db first,  then listen on 3001 
mongoose.set("strictQuery", false)
mongoose.connect(MONGO_URL).then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, ()=> {
        console.log(`Node API app is running on port ${PORT}`)
    })
}).catch((error) => {
    console.error(error)
})