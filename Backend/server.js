const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const app = express();
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config();

// Global variables


// import routes

const authRoutes = require('./routes/auth')
const productsRoutes = require('./routes/productList')

// Importing middlewares
app.use(cors());
app.use(morgan('combined'));
app.use(bodyparser.json());


app.use('/api' , authRoutes);
app.use('/products' , productsRoutes);


mongoose.connect(process.env.DB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("connected to database")).catch(err => console.log(err));


// for 404 routes---------------------------------

app.use(function (req, res, next) {
    res.status(404).json({
        err: "page not found"
    })
});

//  Listening at port ------------------------

const port = 8080;
app.listen(port, () => {
    console.log(`listining at port ${port}`);
});


// mongodb+srv://<username>:<password>@amazon-clone.77xdg.mongodb.net/<dbname>?retryWrites=true&w=majority