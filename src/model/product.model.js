const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName: {
        type: String,
        required: true,
        unique: true
    },
    productPrice: {
        type: String,
        required: true
    },
    productImage: {
        type: String
    },
    quantity: {
        type: Number,
        required: true
    },
    productReview: [{
        type: Schema.Types.ObjectId,
        ref: "productReview"
    }],
    productDescription: {
        type: String,
        required: true,
        unique: true
    }
})


const productModel = mongoose.model("product", productSchema)

module.exports = productModel;