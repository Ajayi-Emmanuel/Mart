const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const productReviewSchema = new Schema({
    productReview: {
        type: String,
    },
    TimeStamp: {
        createdAt: {type: Date, default: Date.now()}
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "product"
    }
})


const productReviewModel = mongoose.model("productReview", productReviewSchema)

module.exports = productReviewModel;