const config = require("config")
const mongoose = require("mongoose")
const logger = require("./logger")

async function connect (){
    const dbUri = config.get("dbUri")
    try{
        await mongoose.connect(dbUri)
        logger.info("Connection to Database Successfull")
    }catch(e){
        console.log(e)
        logger.info("Error connecting to Database")
        process.exit(1)
    } 
    
}

module.exports = connect