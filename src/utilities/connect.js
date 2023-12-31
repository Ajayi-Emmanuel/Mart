const mongoose = require("mongoose")
const logger = require("./logger")
require("dotenv").config()

async function connect (){
    const dbUri = process.env.dbUri
    try{
        await mongoose.connect(dbUri)
        logger.info("Connection to Database Successfull")
    }catch(e){
        logger.info("Error connecting to Database")
        process.exit(1)
    } 
    
}

module.exports = connect