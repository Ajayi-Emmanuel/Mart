const {sign, verify} = require("jsonwebtoken")
require("dotenv").config()


const createToken =  (user)=> {
    const accessToken = sign(
        {
            username: user.username, 
            id:user._id
        }, 
        process.env.JWT_SECRET
    )

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
            const validToken = verify(accessToken, process.env.JWT_SECRET)
            if(validToken){
                req.user = validToken.username;
                
                return next()
            }
        }catch(err){
            return res.status(400).json({error: err})
        }
    }

     
}

function verifyUser(username, password){
    const adminUsername = process.env.adminUsername
    const adminPassword = process.env.adminPassword
    if((username == adminUsername) && (password == adminPassword)){
        return true
    }else{
        return false
    }
}


module.exports = {createToken, verifyToken, verifyUser}