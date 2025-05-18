const mongoose = require ("mongoose");

const productSchema = new mongoose.Schema({
    nombre: String,
    precio: Number,
    stock: Number,
    detalle: String,
});

const productModel = mongoose.model("productos", productSchema, "productos");


module.exports = productModel