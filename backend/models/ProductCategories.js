const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProductCategoriesSchema = new Schema({
    category: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    imageUrl: {
        type: String,
        require: true
    },
})

module.exports = mongoose.model("ProductCategories", ProductCategoriesSchema)