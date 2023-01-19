const express = require('express')
const mongoose = require('mongoose')
const productRouter = require('./Routes/productRouter')
const app = express();


app.listen(4000,()=>{
    console.log("Server Connected to 4000 Port");
})

mongoose.connect('mongodb://0.0.0.0:27017/LeeyetProduct',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Database Connected");
}).catch((err)=>{
    console.log(err.message);
})


app.use(express.json())
app.use('/',productRouter)
