const {verifyUser} = require("../middleware/checkAuth")
const userAdminRouter = require("express").Router()
require("dotenv").config()



userAdminRouter.get("/login", (req, res) => {
    res.render("login", {
        error: false,
        admin: true
    })
})

userAdminRouter.post("/login", (req, res) => {
    const {username, password} = req.body

    if(!username){
        return res.status(400).send({
            error: "Email field must be filled!"
        })
    }
    if(!password){
        return res.status(400).send({
            error: "Password field must be filled!"
        })
    }
    if(username == "" || password == ""){
        return res.status(400).send({
            error: "Fill field completely"
        }) 
    }

    const isVerified = verifyUser(username, password)
    if(!isVerified){
        res.render("login", {
            error: "Incorrect Password or username",
            admin: true
        })
    }else{
        res.redirect("/admin/allproduct")
    }
    
})


module.exports = userAdminRouter