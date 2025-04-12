const productManager = require("./productManager.js");
const cartManager = require("./cartManager.js");

//agregar productos 

 // productManager.addProduct({ titulo:"Laptop",precio: 1500,categoría:"electrónica",stock: "0", disponible: true,descripción :"perfecta para viajar"});

//traer todos los productos

 //console.log(productManager.getProducts());

//producto x id

 //console.log(productManager.getProductById(5));

//actualizar producto

 //productManager.updateProduct(5, {nombre: "Laptop gamer", precio: "10000",categoria: "electrónica", stock: 0,disponible: true,descripcion: "perfecta para jugar"});

// borrar produtco

 //productManager.deleteProduct(5);

//crear carrito

//const nuevoCarrito = cartManager.createCart();
//console.log(nuevoCarrito);

//agregar productos al carrito

//cartManager.addProductToCart(nuevoCarrito.id, 1);
//cartManager.addProductToCart(nuevoCarrito.id, 3);
//cartManager.addProductToCart(nuevoCarrito.id, 1); este aunebta cantidad

//mostrar carrito por id

//console.log(cartManager.getCartById(nuevoCarrito.id));