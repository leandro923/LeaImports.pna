
const carrito = {};
const carritoBoton = document.getElementById('carritoBoton');
const contadorCarrito = document.getElementById('contadorCarrito');
const carritoPanel = document.getElementById('carritoPanel');
const listaCarrito = document.getElementById('listaCarrito');
const totalCarrito = document.getElementById('totalCarrito');
const btnHacerPedido = document.getElementById('btnHacerPedido');

// Actualiza contador del carrito
function actualizarContador() {
  const totalCantidad = Object.values(carrito).reduce((acc, item) => acc + item.cantidad, 0);
  if (totalCantidad > 0) {
    contadorCarrito.style.display = 'inline-block';
    contadorCarrito.textContent = totalCantidad;
  } else {
    contadorCarrito.style.display = 'none';
  }
}

// Actualiza el listado del carrito dentro del panel
function actualizarCarrito() {
  listaCarrito.innerHTML = '';
  let total = 0;
  for (let key in carrito) {
    const item = carrito[key];
    const itemTotal = item.precio * item.cantidad;
    total += itemTotal;
    const li = document.createElement('li');
    li.style.display = 'flex';
    li.style.justifyContent = 'space-between';
    li.style.marginBottom = '8px';
    li.textContent = `${item.nombre} x${item.cantidad} — $${itemTotal.toLocaleString('es-AR')}`;
    listaCarrito.appendChild(li);
  }
  totalCarrito.textContent = `Total: $${total.toLocaleString('es-AR')}`;
  actualizarContador();
}

// Manejar click en botones de agregar carrito
document.querySelectorAll('button.boton').forEach(btn => {
  btn.addEventListener('click', () => {
    const nombre = btn.dataset.nombre;
    const precio = parseInt(btn.dataset.precio);
    if (carrito[nombre]) {
      carrito[nombre].cantidad += 1;
    } else {
      carrito[nombre] = { nombre, precio, cantidad: 1 };
    }
    actualizarCarrito();
  });
});

// Toggle panel carrito al hacer clic en ícono fijo
carritoBoton.addEventListener('click', () => {
  if (carritoPanel.style.display === 'none' || carritoPanel.style.display === '') {
    carritoPanel.style.display = 'flex';
  } else {
    carritoPanel.style.display = 'none';
  }
});

// Botón hacer pedido: abrir WhatsApp con resumen
btnHacerPedido.addEventListener('click', () => {
  if (Object.keys(carrito).length === 0) {
    alert('Tu carrito está vacío.');
    return;
  }
  const numeroWhatsApp = '5493412345678'; // Cambia por tu número real
  let mensaje = '¡Hola! Quisiera hacer el siguiente pedido:%0A';
  for (let key in carrito) {
    mensaje += `*${carrito[key].nombre}* x${carrito[key].cantidad}%0A`;
  }
  window.open(`https://wa.me/${numeroWhatsApp}?text=${mensaje}`, '_blank');
});

