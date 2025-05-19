const express = require ("express");
const router = express.Router();
const productManager = require ("../managers/productManager");
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
router.get("/cart", (req, res) => {
  const cartId = 1;
  const cart = getCartById(cartId);
  res.render("cart", { cart });
});

router.get("/", (req, res) => {
    res.redirect("/home");
  });

module.exports = router;