document.addEventListener("DOMContentLoaded", () =>{
    const buttons = document.querySelectorAll(".add-to-cart");

    buttons.forEach(button =>{
        button.addEventListener("click", async () =>{
            const productId     = button.dataset.id;
            const nombre = button.dataset.nombre;
            const precio = parseFloat(button.dataset.precio);
            const cartId = 1;

            try{
                const response = await fetch(`/carrito/${cartId}/producto/${productId}`,{
                    method: "POST", 
                    headers: {"Content-type": "application/json"},
                    body: JSON.stringify ({productId, nombre, precio})
                });

                const result = await response.json();
                alert(result.message);
            }catch(error){
                console.error("hubo un error inesperado", error);
            }
        })
    })
})