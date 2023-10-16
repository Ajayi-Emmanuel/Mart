const productModel = require("../model/product.model")
const adminRouter = require("express").Router()


adminRouter.get("/addproduct", (req, res) => {
    res.render("addprod", {
        msg: false
    })
})
adminRouter.post("/addproduct", async (req, res) => {
    const {
        productName,
        productPrice,
        quantity,
        productDescription
    } = req.body;
    
    try{
        const product = await productModel.create({
            productName,
            productPrice,
            quantity,
            productDescription
        })   
        res.render("addprod", {
            msg: "Product Saved Successfully to Database"
        })
    }catch(err){
        res.render("addprod", {
            msg: "Error storing product in database"
        })
    }
        
})

adminRouter.get('/allproduct', async (req, res) => {
    const products = await productModel.find()
    res.render("admin", {
        products
    })

})



adminRouter.get("/deleteProduct/:id", async (req, res) => {
    const {id} = req.params
    await productModel.findOneAndDelete({_id: id})
    res.redirect("/admin/allproduct")
})


adminRouter.get("/updateProduct/:id", async (req, res) => { 
    const {id} = req.params
    const getData = await productModel.findOne({_id: id})
    res.render("editProduct", {
        msg: false,
        product: getData
    })
})


adminRouter.post("/updateProduct/:id", async (req, res) => {
    const {id} = req.params;
    const {productName, productPrice, quantity, productDescription} = req.body 

    const updatedProduct = await productModel.updateOne({_id: id}, {productName, productPrice, quantity, productDescription})
    .then((updatedProduct) => {
        res.status(200).redirect("/admin/allproduct") 
    }).catch((err) => {
        res.status(200).redirect("/admin/update/:id") 
    })
})


adminRouter.post("/findProduct", async (req, res) => {
    const {productName} = req.body;
    const products = await productModel.find({productName: productName})
    res.render("admin", {
        products
    })

})


module.exports = adminRouter