const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    MRP:{
        type:Number,
        required:true
    },
    image:{
        type:Array,
        required:true
    }
})

module.exports= mongoose.model("Products",productSchema)
