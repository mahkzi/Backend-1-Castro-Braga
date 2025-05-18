document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".add-to-cart");

    buttons.forEach(button => {
        button.addEventListener("click", async () => {
          const productId = button.getAttribute("data-id");
            const cartId = 1;

            try {
                const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
                    method: "POST"
                });

                const data = await response.json();
                 console.log(data);
                if (response.ok) {
                    alert(data.message);
                } else {
                    alert(`Error: ${data.error || 'No se pudo agregar el producto'}`);
                }
            } catch (error) {
                console.error("Error al agregar producto al carrito", error);
                alert("Error del servidor");
            }
        });
    });
});