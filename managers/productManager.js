const fs = require("fs");
const path = require("path");
const productModel = require("../src/models/product.model");

const pathProductos = path.join(__dirname, "../data/products.json");

function getProducts() {
        if (!fs.existsSync(pathProductos)) {
            fs.writeFileSync(pathProductos, "[]", "utf-8");
        }

        const productos = fs.readFileSync(pathProductos, "utf-8");
        return JSON.parse(productos);
    };

async function getProductById(pid) {
  try {
    const product = await productModel.findById(pid).lean();
    return product; 
  } catch (error) {
    console.error("Error en getProductById:", error);
    return null;
  }
}

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
    pid = Number(pid);
    let productos = getProducts();
    productos = productos.filter(product => Number(product.id) !==Number (pid));
    fs.writeFileSync(pathProductos,JSON.stringify(productos));
};

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
}