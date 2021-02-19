const express = require('express');
const router = express.Router();

// import controllers

const {signup , login , activate} = require('../controllers/auth')

// routes

router.post('/signup', signup);
router.post('/login', login);
router.post('/activate' , activate);



module.exports = router;