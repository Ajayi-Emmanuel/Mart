const express = require("express");
const config =  require("config");
const connect = require("./utilities/connect")
const logger = require("./utilities/logger");
const userRoute = require("./routes/user.route");
const productRoute = require("./routes/product.route")
const adminRoute = require("./admin/admin.route")
const cartRoute = require("./routes/cart.route")
const {verifyToken} = require("./middleware/checkAuth")
const cookieParser = require("cookie-parser");
const userAdminRoute = require("./admin/useradmin.route");

const app = express();
app.use(express.json())
const port = config.get("port")

app.use(express.urlencoded({extended: true}))
app.use(cookieParser()); 
 
// declare routes
app.set('view engine', 'ejs') 
app.use("/admin", userAdminRoute)
app.use("/admin", adminRoute)              
app.use("/", userRoute)
app.use("/product", verifyToken, productRoute)
app.use("/", verifyToken, cartRoute)

app.listen(port, async ()=> {
    logger.info(`app is running on http://localhost:${port}`)

    await connect();

})