const userAdminRouter = require("express").Router()
const config = require("config")
const {createToken} = require("../middleware/checkAuth")



userAdminRouter.get("/login", (req, res) => {
    res.render("login", {
        error: false,
        admin: true
    })
})

userAdminRouter.post("/login", (req, res) => {
    const {username, password} = req.body
    const adminUser = config.get("adminUser")

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
    
    if((username == adminUser.adminUsername) && (password == adminUser.adminPassword)){
        
        res.redirect("/admin/allproduct")
    }else{
        res.render("login", {
            error: "Incorrect Password or username",
            admin: true
        })
    }
})

module.exports = userAdminRouter