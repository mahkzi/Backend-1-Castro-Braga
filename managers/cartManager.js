const fs = require('fs');
const path = require('path');

const pathCarts = path.join(__dirname, "cart.json");

function loadCart() {
    if (!fs.existsSync(pathCarts)) {
      fs.writeFileSync(pathCarts, JSON.stringify([]));
    }
    const info = fs.readFileSync(pathCarts, 'utf-8');
  return JSON.parse(info);
}


function saveCart(cart) {
    fs.writeFileSync(pathCarts, JSON.stringify(cart));
  }

  function createCart(){
    const carts = loadCart();
    const newId = carts.length > 0 ? carts[carts.length - 1].id + 1 : 1;
    const newCart = {id : newId, products:[]};
    carts.push(newCart);
    saveCart(carts);
    return newCart;
  }
  function getCartById(cid){
    const carts = loadCart();
    return carts.find(cart => cart.id === cid);
  };

  function addProductToCart(cid, pid){
    const carts = loadCart();
    const cart = carts.find(c => c.id === cid);
    if (!cart) {
      console.log(`carrito con ID ${cid} no encontrado`);
      return null;
    }
    const productIndex = cart.products.findIndex(p => p.product === pid);
    if (productIndex !== -1){
      cart.products[productIndex].quantity += 1;
    } else{
      cart.products.push({product:pid, quantity:1});
    }
    saveCart(carts);
    return cart;
  };

  module.exports = {
    createCart,
    getCartById,
    addProductToCart
  };