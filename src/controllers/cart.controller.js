const productModel = require("../model/product.model")
const userModel = require("../model/user.model")
const cartModel = require("../model/cart.model")


exports.addToCart = async (req, res) => {
    const {id} = req.params;
    const username = req.user

    const product = await productModel.findOne({_id: id})
    const user = await userModel.findOne({username})

    const cartProduct = await cartModel.create({user, product})
    user.cart.push(product)
    user.save()
    
    res.redirect("/product/allProducts")
    
}

exports.deleteFromCart = async (req, res) => {
    const {id} = req.params;
    const username = req.user 
    const user = await userModel.findOne({username})

    const product = await cartModel.findOneAndDelete({product: id, user: user._id})
    
    user.cart.pop(id)
    user.save()
     
    res.redirect("/product/allProducts")
    
}

