const userModel = require("../model/user.model")
const bcrypt = require("bcrypt")
const {createToken} = require("../middleware/checkAuth")

exports.loginUser = async (req, res) => {
    const {username, password} = req.body;

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

    const user = await userModel.findOne({username: username}).lean()
   
    if(!user){
        res.render("login",{
            error: "User not Found",
            admin: false
        })
    }else{

        if(await bcrypt.compare(password, user.password)){
           
            const accessToken = createToken(user)

            res.cookie("user-token", accessToken, 
            {
                httpOnly: true,
            })
            res.redirect("/product/allProducts")
        }else{
            res.render("login", {
                error: "Incorrect Password or username",
                admin: false
            })
        }
    } 
}

exports.signUp = (req, res) => {    
    
    const {
        firstname,
        lastname,
        username,
        email,
        phoneNumber,
        address,
        password
    } = req.body;

    userModel.create({
        firstname,
        lastname,
        username,
        email,
        phoneNumber,
        address,
        password
    }).then(()=> {
        res.redirect("/login")
    }).catch((err) => {
        res.render("signup",{
            error: "Error in registering"
        })
    })
}