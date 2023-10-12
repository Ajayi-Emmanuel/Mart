const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const config =  require("config");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        unique: true
    },
    address: {
        type: String
    },
    cart: [{
        type: Schema.Types.ObjectId,
        ref: "product"
    }],
    password: {
        type: String,
        required: true,
        unique: true
    }
})

userSchema.pre("save", async function(next){
    let user = this;

    const salt = await bcrypt.genSalt(config.get("saltFactor"))
    const hash = await bcrypt.hashSync(user.password, salt)

    user.password = hash;

    return next();
})

userSchema.methods.isValidPassword = async function(password) {
    const user = this;

    return bcrypt.compare(password, user.password).catch((e) => false);
  
  }


const userModel = mongoose.model("User", userSchema)

module.exports = userModel;