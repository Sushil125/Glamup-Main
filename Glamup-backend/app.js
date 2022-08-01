//app js edited
const express = require('express')
const cors = require("cors")
const mongoose = require("mongoose")
const morgan = require("morgan")

const userRoutes = require("./routes/user.route.js")
const productRoutes = require("./routes/product.route.js")

const app = express()
app.use(cors())
app.use(morgan("tiny"))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static(__dirname))

app.use(userRoutes)
app.use(productRoutes)

mongoose.connect('mongodb://127.0.0.1:27017/GlamUp').then(()=>{
        app.listen(1025,()=>{
            console.log(`Server Started`)
        })
}).catch((err)=>{
    console.log(err)
})