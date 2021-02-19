const express = require('express');
const router = express.Router();

const {productfetch} =require('../controllers/productList')

router.get('/productfetch', productfetch);


module.exports = router;