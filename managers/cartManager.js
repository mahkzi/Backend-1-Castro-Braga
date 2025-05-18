const fs = require('fs');
const path = require('path');
const productModel = require("../src/models/product.model");


const pathCarts = path.join(__dirname, "../data/cart.json");

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

 async function addProductToCart(cid, pid) {
  const carts = loadCart();
  const cart = carts.find(c => c.id === cid);
  if (!cart) {
    console.log(`Carrito con ID ${cid} no encontrado`);
    return null;
  }

  const producto = await productModel.findById(pid).lean();
  if (!producto) {
    console.log(`Producto con ID ${pid} no encontrado en MongoDB`);
    return null;
  }

  const productIndex = cart.products.findIndex(p => p.product === pid);
  if (productIndex !== -1) {
    const currentQty = cart.products[productIndex].quantity;
    if (currentQty + 1 > producto.stock) {
      console.log(`No se puede agregar más del stock disponible`);
      return null;
    }
    cart.products[productIndex].quantity += 1;
  } else {
    if (producto.stock < 1) {
      console.log(`No hay stock disponible`);
      return null;
    }

    cart.products.push({
      product: pid, 
      nombre: producto.nombre,
      precio: producto.precio,
      quantity: 1
    });
  }

  saveCart(carts);
  return cart;
}

  module.exports = {
    createCart,
    getCartById,
    addProductToCart
  };