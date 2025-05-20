const cartManager = require('../managers/cartManager');
const CART_ID = '682c903dacf893fbe6f80b29';

const socketManager = (io) => {
  io.on('connection', async (socket) => {
    console.log('Cliente conectado');


    const cart = await cartManager.getCartById(CART_ID);
    socket.emit('cartUpdated', cart);


    socket.on('updateCart', async () => {
      const updatedCart = await cartManager.getCartById(CART_ID);
      io.emit('cartUpdated', updatedCart);
    });


    socket.on('increaseProduct', async (productId) => {
      try {
        await cartManager.updateQuantity(CART_ID, productId, 1);
        const updatedCart = await cartManager.getCartById(CART_ID);
        io.emit('cartUpdated', updatedCart);
      } catch (error) {
        socket.emit('error', error.message);
      }
    });


    socket.on('decreaseProduct', async (productId) => {
      try {
        await cartManager.updateQuantity(CART_ID, productId, -1);
        const updatedCart = await cartManager.getCartById(CART_ID);
        io.emit('cartUpdated', updatedCart);
      } catch (error) {
        socket.emit('error', error.message);
      }
    });

    socket.on('removeProduct', async (productId) => {
      try {
        await cartManager.removeProduct(CART_ID, productId);
        const updatedCart = await cartManager.getCartById(CART_ID);
        io.emit('cartUpdated', updatedCart);
      } catch (error) {
        socket.emit('error', error.message);
      }
    });


    socket.on('clearCart', async () => {
      try {
        await cartManager.clearCart(CART_ID);
        io.emit('cartUpdated', { products: [] });
        socket.emit('cartCleared');
      } catch (error) {
        socket.emit('error', error.message);
      }
    });
  });
};

module.exports = socketManager;
