const socket = io();

const form = document.getElementById("product-form");
const productList = document.getElementById("product-list");

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const formData = new formData(form);
const product = {
    nombre: formData.get("nombre"),
    precio: parseFloat(formData.get("precio"))
};

socket.emit("newProduct", product);
form.reset();
});

socket.on("updateProducts", (products)=>{
    productList.innerHTML = "";
    products.forEach((p)=>{
        const li = document.createElement("li");
        li.textContent = `${p.nombre} - $${p.precio}`;
        productList.appendChild(li);
    });
});
