const { getCartById, addProductToCart, decreaseProductInCart, removeProductFromCart } = require('../managers/cartManager');

function socketManager(io) {
  io.on('connection', socket => {
    console.log('Usuario conectado');

     const cartId = 1;

      socket.on('getCart', () => {
      const cart = getCartById(cartId);
      socket.emit('cartUpdated', cart);
    });

     socket.on('increaseProduct', pid => {
      addProductToCart(cartId, pid);
      const updatedCart = getCartById(cartId);
      io.emit('cartUpdated', updatedCart);
    });

     socket.on('decreaseProduct', pid => {
      decreaseProductInCart(cartId, pid);
      const updatedCart = getCartById(cartId);
      io.emit('cartUpdated', updatedCart);
    });
    socket.on('removeProduct', pid => {
      removeProductFromCart(cartId, pid);
      const updatedCart = getCartById(cartId);
      io.emit('cartUpdated', updatedCart);
    });
  });
}


module.exports = socketManager;