const socket = io();

document.addEventListener("DOMContentLoaded", () => {
  socket.emit('updateCart');

  document.getElementById('clear-cart').addEventListener('click', e => {
    e.preventDefault();
    socket.emit('clearCart');
  });

  document.getElementById('finalize-purchase').addEventListener('click', async () => {
    try {
      const response = await fetch("/api/carts/682c903dacf893fbe6f80b29/finalize", { method: "POST" });
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
});

socket.on('cartUpdated', (cart) => {
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

function updateCartUI(cart) {
  const list = document.getElementById('cart-list');
  if (!list) return;

  if (!cart.products || cart.products.length === 0) {
    list.innerHTML = '<p>Tu carrito está vacío</p>';
    return;
  }

  list.innerHTML = '';

  cart.products.forEach(item => {
    const li = document.createElement('li');
    li.dataset.productId = item.product._id;
    li.innerHTML = `
      <strong>${item.product.nombre}</strong> - $${item.product.precio} x 
      <span class="quantity">${item.quantity}</span>
      <button class="btn-decrease" data-id="${item.product._id}">-</button>
      <button class="btn-increase" data-id="${item.product._id}">+</button>
      <button class="btn-remove" data-id="${item.product._id}">Eliminar</button>
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
