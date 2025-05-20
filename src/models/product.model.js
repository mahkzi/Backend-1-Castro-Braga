const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nombre: String,
  detalle: String,
  precio: Number,
  stock: Number
});

const productModel = mongoose.model('productos', productSchema, "productos");
module.exports = productModel;