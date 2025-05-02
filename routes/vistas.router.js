const express = require ("express");
const router = express.Router();
const productManager = require ("../managers/productManager");

router.get("/home", (req, res)=>{
    const products = productManager.getProducts();
    res.render("home", {products});
});

router.get("/realtimeproducts", (req, res)=>{
const products = productManager.getProducts();
res.render("realimeproducts", {products});
});

module.exports = router;