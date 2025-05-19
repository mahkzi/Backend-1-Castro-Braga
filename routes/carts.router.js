const express = require("express");
const router = express.Router();
const { addProductToCart, getCartById, clearCart } = require("../managers/cartManager");
const productModel = require("../src/models/product.model.js"); 


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

router.post("/api/carts/:cid/purchase", async (req, res) => {
    const cid = parseInt(req.params.cid);
    const cart = getCartById(cid);

    if (!cart || !cart.products.length) {
        return res.status(400).json({ error: "El carrito está vacío" });
    }

    try {
        for (const item of cart.products) {
            const producto = await productModel.findById(item.product);
            if (!producto) continue;

            if (producto.stock < item.quantity) {
                return res.status(400).json({
                    error: `Stock insuficiente para el producto ${producto.nombre}`,
                });
            }

            producto.stock -= item.quantity;
            await producto.save();
        }

        clearCart(cid);

        res.status(200).json({ message: "Compra realizada con éxito" });
    } catch (error) {
        console.error("Error al finalizar compra:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

module.exports = router;