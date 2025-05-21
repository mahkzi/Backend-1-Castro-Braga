const Cart = require("../src/models/cart.model");
const Product = require('../src/models/product.model');

const CART_ID = '...'; 

async function getOrCreateCart() {
  if (!CART_ID) {
    const newCart = await Cart.create({ products: [] });
    return newCart;
  }
  const cart = await Cart.findById(CART_ID).populate('products.product').lean();
  if (!cart) {
    const newCart = await Cart.create({ products: [] });
    return newCart;
  }
  return cart;
}

async function createCart() {
  const cart = new Cart({ products: [] });
  return await cart.save();
}

async function getCartById(cartId) {
  let cart = await Cart.findById(cartId).populate('products.product');
   console.log(JSON.stringify(cart, null, 2));
  if (!cart) {
    cart = await Cart.create({ products: [] });
  }
  return cart;
}

async function addProductToCart(cartId, productId) {
  const cart = await Cart.findById(cartId);
  const product = await Product.findById(productId);

  if (!product || product.stock <= 0) throw new Error('Producto no disponible');

  const existing = cart.products.find(p => p.product.equals(productId));

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.products.push({ product: productId, quantity: 1 });
  }

 await cart.save();
  return await Cart.findById(cartId).populate('products.product').lean();
}

async function updateQuantity(cartId, productId, delta) {
  const cart = await Cart.findById(cartId);
  const product = await Product.findById(productId);

  const item = cart.products.find(p => p.product.equals(productId));
  if (!item) throw new Error('Producto no está en el carrito');

  if (delta > 0 && product.stock >= item.quantity + 1) {
    item.quantity += 1;
  } else if (delta < 0 && item.quantity > 1) {
    item.quantity -= 1;
  } else {
    cart.products = cart.products.filter(p => !p.product.equals(productId));
  }

  return await cart.save();
}

async function removeProduct(cartId, productId) {
  const cart = await Cart.findById(cartId);
  cart.products = cart.products.filter(p => !p.product.equals(productId));
  return await cart.save();
}

async function clearCart(cartId) {
  const cart = await Cart.findById(cartId);
  cart.products = [];
  return await cart.save();
}

async function finalizePurchase(cartId) {
  const cart = await Cart.findById(cartId);
  for (const item of cart.products) {
    const product = await Product.findById(item.product);
    if (product.stock >= item.quantity) {
      product.stock -= item.quantity;
      await product.save();
    } else {
      throw new Error(`Stock insuficiente para ${product.title}`);
    }
  }
  cart.products = [];
  return await cart.save();
}
module.exports = {
  createCart,
  getCartById,
  addProductToCart,
  updateQuantity,
  removeProduct,
  clearCart,
  finalizePurchase,
  getOrCreateCart
};
