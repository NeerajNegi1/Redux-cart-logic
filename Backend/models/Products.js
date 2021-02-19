// product schema

const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

const Product = mongoose.model("Product", productsSchema)

module.exports = Product;