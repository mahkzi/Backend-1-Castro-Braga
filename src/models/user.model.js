const mongoose = require ("mongoose");

const userSchema = new mongoose.Schema({
    nombre: String,
    precio: Number,
    stock: Number,
    detalle: String,
});

const userModel = mongoose.model("productos", userSchema, "productos");


module.exports = userModel