const userRouter = require("express").Router()
const userController = require("../controllers/user.controller")


userRouter.get("/", (req, res) => {
    res.render("landing")
})
userRouter.get("/login", (req, res) => {
    res.render("login.ejs", {
        error: false,
        admin: false
    })
})

userRouter.get("/signup", (req, res) => {
    res.render("signup.ejs", {
        error: false,
    })
})


userRouter.post("/login", userController.loginUser)

userRouter.post("/signup", userController.signUp)



module.exports = userRouter;