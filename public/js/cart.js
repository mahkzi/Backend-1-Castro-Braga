const socket = io();

document.addEventListener("DOMContentLoaded", () => {
  socket.emit('getCart');
    const clearBtn = document.getElementById('clear-cart');
  if (clearBtn) {
    clearBtn.addEventListener('click', (e) => {
      e.preventDefault(); 
      socket.emit('clearCart');
    });
  }
    const finalizeBtn = document.getElementById("finalize-purchase");
      if (finalizeBtn) {
    finalizeBtn.addEventListener("click", async () => {
      try {
        const response = await fetch("/api/carts/1/purchase", {
          method: "POST",
        });

        const data = await response.json();

        if (response.ok) {
          Toastify({
            text: data.message || "Compra finalizada",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#4caf50",
            stopOnFocus: true,
          }).showToast();

          setTimeout(() => {
            window.location.href = "/home";
          }, 1000);
        } else {
          Toastify({
            text: data.error || "No se pudo finalizar la compra",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#e53935",
            stopOnFocus: true,
          }).showToast();
        }
      } catch (error) {
        console.error("Error en la compra:", error);
        Toastify({
          text: "Error del servidor",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "#e53935",
          stopOnFocus: true,
        }).showToast();
      }
    });
  }
});

socket.on('cartUpdated', cart => {
  updateCartUI(cart);
});

socket.on('cartCleared', () => {
  Toastify({
    text: "Carrito vaciado exitosamente. Redirigiendo a la tienda...",
    duration: 1000,
    close: false,
    gravity: "top", 
    position: "right", 
    backgroundColor: "#4caf50",
    stopOnFocus: true,
  }).showToast();
  setTimeout(() => {
    window.location.href = '/home';
  }, 1000);
});

socket.on('cartUpdated', cart => {
  updateCartUI(cart);
});


function updateCartUI(cart) {
  const list = document.getElementById('cart-list');
  if (!list) return;

  list.innerHTML = '';

  if (cart.products.length === 0) {
    list.innerHTML = '<p>Tu carrito está vacío</p>';
    return;
  }

  cart.products.forEach(p => {
    const li = document.createElement('li');
    li.setAttribute('data-product-id', p.product);
    li.innerHTML = `
      <strong>${p.nombre}</strong> - $${p.precio} x 
      <span class="quantity">${p.quantity}</span>
      <button class="btn-decrease" data-id="${p.product}">-</button>
      <button class="btn-increase" data-id="${p.product}">+</button>
      <button class="btn-remove" data-id="${p.product}">Eliminar</button>
    `;
    list.appendChild(li);
  });

  attachButtonListeners();
}


function attachButtonListeners() {
  document.querySelectorAll('.btn-increase').forEach(button => {
    button.onclick = () => {
      const pid = button.dataset.id;
      socket.emit('increaseProduct', pid);
    };
  });

  document.querySelectorAll('.btn-decrease').forEach(button => {
    button.onclick = () => {
      const pid = button.dataset.id;
      socket.emit('decreaseProduct', pid);
    };
  });

  document.querySelectorAll('.btn-remove').forEach(button => {
    button.onclick = () => {
      const pid = button.dataset.id;
      socket.emit('removeProduct', pid);
    };
  });
}
