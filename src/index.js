const express = require("express");


const productController = require("./controllers/productController");

const app = express();


app.use("/product",productController);


module.exports = app;
