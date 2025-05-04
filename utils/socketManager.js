const productManager = require("../managers/productManager");

function socketManager (io){
    io.on("connection", (socket) => {
        console.log("cliente conectado");

        socket.on("newProduct", (productData)=>{
            productManager.addProduct(productData);
            io.emit("updateProducts", productManager.getProducts());
        });

        socket.on("deleteProducts", (pid) => {
            productManager.deleteProduct(pid);
            io.emit("updateProducts", productManager.getProducts());
        });
    }); 
}

module.exports = socketManager;