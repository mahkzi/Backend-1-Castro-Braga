const express = require('express');
const router = express.Router();
const cartManager = require('../managers/cartManager');

const CART_ID = '682c903dacf893fbe6f80b29'; 

router.get('/', async (req, res) => {
  const cart = await cartManager.getCartById(CART_ID);
  res.render('cart', { cart });
});
router.post('/api/carts/:cid/products/:pid', async (req, res) => {
  try {
    const cart = await cartManager.addProductToCart(req.params.cid, req.params.pid);
    res.json({ message: 'Producto agregado', cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post('/add/:pid', async (req, res) => {
  await cartManager.addProductToCart(CART_ID, req.params.pid);
  res.sendStatus(200);
});

router.post('/remove/:pid', async (req, res) => {
  await cartManager.removeProductFromCart(CART_ID, req.params.pid);
  res.sendStatus(200);
});

router.post('/decrease/:pid', async (req, res) => {
  await cartManager.decreaseProductQty(CART_ID, req.params.pid);
  res.sendStatus(200);
});

router.post('/clear', async (req, res) => {
  await cartManager.clearCart(CART_ID);
  res.sendStatus(200);
});

router.post('/api/carts/:cid/finalize', async (req, res) => {
  try {
    await cartManager.finalizePurchase(req.params.cid);
    res.json({ message: 'Compra finalizada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;