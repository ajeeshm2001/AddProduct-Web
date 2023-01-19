const productModel = require("../Model/productModel");

module.exports.addProduct = (async(req,res)=>{
    try{
        const files =req.files;
        const image = files.map((file)=>file.filename)
        const {name,description,tax,price}= req.body;
        const MRP = Math.ceil(parseInt(price)+(parseInt(price)*(parseInt(tax)/100)))
        const product = await productModel.create({name,description,MRP,image})
        res.json({created:true,message:"Product Added Successfully"})

    }
    catch(err){
        res.json({error:err,created:false})
    }
})


module.exports.getProducts=(async(req,res)=>{
    try{
        const products = await productModel.find();
        res.json({product:products,status:true})
    }
    catch(err){
        res.json({error:err,status:false})
    }
})


module.exports.deleteProduct=(async(req,res)=>{
    try{
        const response = await productModel.deleteOne({_id:req.params.id})
            if(response.deletedCount===0){
                console.log(response);
                throw Error ("Product Deletion Failed")
            }else{
                res.json({status:true})
            }
    }catch(err){
        res.json({error:err.message,status:false})
    }
})


module.exports.editProduct = (async(req,res)=>{
    try{
        const  product = await productModel.findOne({_id:req.params.id})
        const {name,description,tax,price}= req.body;
        const MRP = Math.ceil(parseInt(price)+(parseInt(price)*(parseInt(tax)/100)))
        if(req.files!=0){
            const files =req.files;
            const image = files.map((file)=>file.filename)
            var products  = req.body;
            products.image=image
        }else{
            var products = req.body;
            products.image = product.image
        }
        const updateProduct = await productModel.findOneAndUpdate({_id:product._id},{
            name:name,
            description:description,
            MRP:MRP,
            image:products.image
        })
        res.json({updatestatus:true,message:"Product Updated Successfully"})
    }catch(err){
        res.json({error:err})
    }
   
})