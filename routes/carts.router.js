const express = require("express");
const router = express.Router();
const { addProductToCart } = require("../managers/cartManager");


router.post("/api/carts/:cid/products/:pid", async (req, res) => {
  const cid = parseInt(req.params.cid); 
  const pid = req.params.pid; 
  try {
    const updatedCart = await addProductToCart(cid, pid);
    if (!updatedCart) {
      return res.status(400).send({ error: "Su pedido a superado el stock disponible" });
    }
    res.status(200).send({ message: "El producto se ha agregado correctamente", cart: updatedCart });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error interno del servidor" });
  }
});

module.exports = router;