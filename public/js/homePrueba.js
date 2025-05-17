document.addEventListener("DOMContentLoaded", () =>{
    const buttons = document.querySelectorAll(".add-to-cart");

    buttons.forEach(button =>{
        button.addEventListener("click", async () =>{
            const id     = button.dataset.id;
            const nombre = button.dataset.nombre;
            const precio = button.dataset.precio;

            try{
                const response = await fetch("/carrito",{
                    method: "POST", 
                    headers: {"Content-type": "application/json"},
                    body: JSON.stringify ({id, nombre, precio})
                });
                const result = await response.json();
                alert(result.message);
            }catch(error){
                console.error("hubo un error inesperado", error);
            }
        })
    })
})