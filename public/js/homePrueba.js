document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".add-to-cart");

  buttons.forEach(btn => {
    btn.addEventListener("click", async () => {
      const productId = parseInt(btn.getAttribute("data-id"));
      const cartId = 1; 

      try {
        const res = await fetch(`/api/carts/${cartId}/product/${productId}`, {
          method: "POST"
        });
        const data = await res.json();
        alert(data.message || "Producto agregado");
      } catch (error) {
        console.error("Error al agregar al carrito", error);
      }
    });
  });
});