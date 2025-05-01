const fs = require("fs");
const path = require("path");

const pathProductos = path.join(__dirname, "products.json");

function getProducts(){
    const productos = fs.readFileSync(pathProductos,"utf-8");
    return JSON.parse(productos);
};

function getProductById(pid){
    const productos = getProducts();
    return productos.find(producto => producto.id === pid)
};

function addProduct(product){
    const productos = getProducts();
    const newId = productos.length > 0 ? productos[productos.length - 1].id + 1 : 1;
    product.id = newId;
    productos.push(product);
    fs.writeFileSync(pathProductos,JSON.stringify(productos));
};

function updateProduct(pid, updatedFields){
    const productos = getProducts();
    const index = productos.findIndex(p => p.id === pid);

    if (index === -1) return
    productos[index] = {...productos[index], ...updatedFields, id : pid};
    fs.writeFileSync(pathProductos, JSON.stringify(productos));
    return productos[index];
};


function deleteProduct(pid){
    let productos = getProducts();
    productos = productos.filter(product => product.id !== pid);
    fs.writeFileSync(pathProductos,JSON.stringify(productos));
};

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
}