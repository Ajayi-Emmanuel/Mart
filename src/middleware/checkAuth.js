const {sign, verify} = require("jsonwebtoken")
const config = require("config")


const createToken =  (user)=> {
    const accessToken = sign(
        {
            username: user.username, 
            id:user._id
        }, 
        config.get("JWT_SECRET"))

    return accessToken
}

const verifyToken = (req, res, next) => {
    const accessToken = req.cookies['user-token']
    if(!accessToken ) 
        return res.status(400).json({
            error: "User not Authenticated"
        })
    else{
        try{
            const validToken = verify(accessToken, config.get("JWT_SECRET"))
            if(validToken){
                req.user = validToken.username;
                
                return next()
            }
        }catch(err){
            return res.status(400).json({error: err})
        }
    }

    
}



module.exports = {createToken, verifyToken}