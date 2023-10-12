const productRouter = require("express").Router()
const productController = require("../controllers/product.controller")


productRouter.get('/allProducts', productController.getAllProducts)

productRouter.get('/:id', productController.getProduct)

productRouter.get("/review/:id", productController.getProductReview)

productRouter.post("/review/:id", productController.postReview)


module.exports = productRouter;