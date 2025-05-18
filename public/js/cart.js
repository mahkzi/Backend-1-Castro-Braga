const socket = io();

document.addEventListener("DOMContentLoaded", () => {
  socket.emit('getCart');
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