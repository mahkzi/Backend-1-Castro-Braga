const express = require("express");
const router = express.Router();
const { addProductToCart } = require("../managers/cartManager");


router.post("/api/carts/:cid/product/:pid", (req, res) => {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);

     const product = getProductById(pid);
    if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }

    if (product.stock <= 0) {
        return res.status(400).json({ message: "Sin stock disponible" });
    }

    const result = addProductToCart(cid, pid);

    if (!result) {
        return res.status(400).json({ message: "No se pudo agregar el producto al carrito" });
    }

    product.stock -= 1;
    const { updateProduct } = require("../managers/productManager");
    updateProduct(pid, { stock: product.stock });

    res.status(200).json({ message: "Producto agregado correctamente", cart: result });
});



const { getCartById } = require("../managers/cartManager");
const { getProductById } = require("../managers/productManager");

router.get("/cart/:cid", (req, res) => {
  const cid = parseInt(req.params.cid);
  const cart = getCartById(cid);

  if (!cart) {
    return res.status(404).send("Carrito no encontrado");
  }


  const productosDetallados = cart.products.map(item => {
    return {
    nombre: item.nombre,
    precio: item.precio,
    quantity: item.quantity,
    subtotal: item.precio * item.quantity
    };
  });


  const total = productosDetallados.reduce((sum, p) => sum + p.subtotal, 0);

  res.render("cart", {
    cart: {
      id: cid,
      products: productosDetallados
    },
    total
  });
});
module.exports = router;