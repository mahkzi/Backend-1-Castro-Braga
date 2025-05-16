const express = require ("express");
const router = express.Router();
const productManager = require ("../managers/productManager");
const userModel = require ("../src/models/user.model")

router.get("/home", (req, res)=>{
    const products = productManager.getProducts();
    res.render("home", {products});
    
});

router.get("/homeprueba",async (req, res) =>{
  try{
let products = await userModel.find();
console.log(products);
res.send(({result:"success", payload:products}))
  }catch (error){
    console.error("ocurrió un error inesperado", error)
  }
})

router.get("/realtimeproducts", (req, res)=>{
const products = productManager.getProducts();
res.render("realimeproducts", {products});
});

router.get("/", (req, res) => {
    res.redirect("/home");
  });

module.exports = router;