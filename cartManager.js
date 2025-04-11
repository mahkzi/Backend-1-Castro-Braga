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