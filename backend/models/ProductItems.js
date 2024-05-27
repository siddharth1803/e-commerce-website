const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProductItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    features: [{
        type: String,
        required: true
    }],
    price: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    images: [{
        url: String,
        filename: String
    }],
    warrantyInfo: {
        type: String,
    },
    specifications: [{
        type: String,
    }],
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Ratings'
        }
    ],
    rating: {
        type: String,
        default: "0"
    },
    brand: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    material: {
        type: String,
        required: true
    },
    sizes: [{
        type: String,
        enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
    }]

})

module.exports = mongoose.model("ProductItems", ProductItemSchema)