const Product = require('../models/Products');

exports.productfetch = (req, res) => {
    Product.find().then((result) => res.status(200).json(result)).catch(err => res.status(404).json({
        message: "Data Not Found",
        err: err
    }));
}