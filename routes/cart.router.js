const express = require("express");
const router = express.Router();
const cartManager = require("../managers/cartManager");
const productManager = require("../managers/productManager");

router.post("/carrito/:cid/producto/:pid", (req, res)=>{
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);

    const product =productManager.getProductById(pid);
    if(!product){
        return res.status(404).json({message:"producto no encontrado"});
    }
    const UpdatedCart = cartManager.addProductToCart(cid, pid);
    if(!UpdatedCart){
        return res.status(404).json({message:"carrito no encontrado"});
    }
    res.json({message:`producto agregado a carrito correctamente`, carrito:UpdatedCart});
})

module.exports = router;