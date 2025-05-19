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
                    Toastify({
                        text: data.message || "Producto agregado",
                        duration: 2000,
                        gravity: "top",
                        position: "right",
                        backgroundColor: "#4caf50", 
                        stopOnFocus: true
                    }).showToast();
                } else {
                    Toastify({
                        text: `Error: ${data.error || "No se pudo agregar el producto"}`,
                        duration: 3000,
                        gravity: "top",
                        position: "right",
                        backgroundColor: "#e53935", 
                        stopOnFocus: true
                    }).showToast();
                }
            } catch (error) {
                console.error("Error al agregar producto al carrito", error);
                 Toastify({
                    text: "Error del servidor",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "#e53935", 
                    stopOnFocus: true
                }).showToast();
            }
        });
    });
});