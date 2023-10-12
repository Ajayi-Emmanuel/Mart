const { isEmpty, isUndefined, isNull } = require("lodash")
const productModel = require("../model/product.model")
const productReviewModel = require("../model/productReview.model")
const userModel = require("../model/user.model")
const cartModel = require("../model/cart.model")

exports.getAllProducts = async (req, res) => {
    const products = await productModel.find()
    const username = req.user

    const user = await userModel.find({username})
    
    const cartProducts = await cartModel.find({user: user}).populate('product').populate('user')
    
    res.render("index", {
        products,
        username,   
        cartProducts
    })


}

exports.getProduct = async (req, res) => {
    const {id} = req.params;
    const username = req.user

    const user = await userModel.find({username})
    const product = await productModel.findOne({_id: id})
    const comments = await productReviewModel.find({product: product}).populate("user")
    const cartProducts = await cartModel.find({user: user}).populate('product').populate('user')
    
    
    if(isEmpty(comments)){
        isComment = false
    }else{
        isComment = true
    }
     
    res.render("showProd", {
        product,
        username,
        comments,
        isComment,
        cartProducts,
         
    })  

}

exports.getProductReview = async (req, res) => {
    const {id} = req.params;
    const username = req.user

    const user = await userModel.find({username})
    const product = await productModel.findOne({_id: id})
    const comments = await productReviewModel.find({product: product}).populate("user")
    const cartProducts = await cartModel.find({user: user}).populate('product').populate('user')
    

    res.render("showProd", {
        username,
        product,
        isComment: true,
        comments,
        cartProducts
    }) 
}


exports.postReview = async (req, res) => {
    const {id} = req.params;
    const {review} = req.body;
    const username = req.user

    const product = await productModel.findOne({_id: id})
    const user = await userModel.findOne({username})

    try{
        const reviewDetails = await productReviewModel.create({
            productReview: review,
            user, 
            product
        })
        product.productReview.push(reviewDetails)
        product.save()
        
    }catch(err){ 
        console.error(err)
    }
    
    res.redirect(`/product/review/${id}/#comment-section`)
      

}

