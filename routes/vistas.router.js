const express = require ("express");
const router = express.Router();
const productModel = require ("../src/models/product.model")
const { getCartById } = require("../managers/cartManager");

router.get("/home", async (req, res) => {
  try {
    const products = await productModel.find().lean();
    res.render("home", { products }); 
  } catch (error) {
    console.error("Ocurrió un error inesperado", error);
    res.status(500).send("Error interno del servidor");
  }
});
const CART_ID = '682c903dacf893fbe6f80b29';

router.get("/cart", async (req, res) => {
  try {
    const cart = await getCartById(CART_ID);
    res.render("cart", { cart });
  } catch (error) {
    res.status(500).send("Error al cargar el carrito");
  }
});

router.get("/", (req, res) => {
    res.redirect("/home");
  });

module.exports = router;