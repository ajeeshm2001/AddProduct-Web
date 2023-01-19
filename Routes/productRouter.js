const { addProduct, getProducts, deleteProduct, editProduct } = require('../Controllers/productController')

const multer =  require('multer')

/*... PRODUCT IMAGE STORAGE ...*/
const storage = multer.diskStorage({
  destination:function(req,file,callback){
    callback(null,'pictures/productimages')
  },
  filename:function(req,file,cb){
    cb(null,file.originalname + '-' + Date.now())
  }
})
const upload = multer({storage:storage})
const router = require('express').Router()



// To add a Product
router.post('/addproduct',upload.any('image'),addProduct)

// To get all Products
router.get('/getproducts',getProducts)

//To delete a Product 
router.delete('/deleteproduct/:id',deleteProduct)

//To edit Product
router.put('/editproduct/:id',upload.any('image'),editProduct)

module.exports=router;