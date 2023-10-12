const cartRouter = require("express").Router()
const cartController = require("../controllers/cart.controller")


cartRouter.get('/cart/:id', cartController.addToCart)


cartRouter.get("/cart/delete/:id", cartController.deleteFromCart)
 
 
module.exports = cartRouter;