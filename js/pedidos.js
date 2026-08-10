import { eliminar, existe, generarId, guardar, obtener } from './storage.js';
import { showConfirm } from './confirm.js';

const STORAGE_KEY = 'pedidos';
const modal = document.getElementById('order-modal');
const form = document.getElementById('order-form');
const tableBody = document.getElementById('orders-table-body');
const emptyState = document.getElementById('empty-state');
const countBadge = document.getElementById('order-count');
const modalTitle = document.getElementById('modal-title');
const toast = document.getElementById('toast');
const idInput = document.getElementById('order-id');
const clientSelect = document.getElementById('order-client');
const statusSelect = document.getElementById('order-status');
const productRowsContainer = document.getElementById('product-rows');
const btnAddProduct = document.getElementById('btn-add-product');
const totalItemsEl = document.getElementById('total-items');
const totalPriceEl = document.getElementById('total-price');

let toastTimer = null;

// Helpers
function showToast(message, type = 'success') {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.className = `toast toast--visible toast--${type}`;
  toastTimer = window.setTimeout(() => toast.className = 'toast', 2500);
}

function getClientName(id) {
  const c = obtener('clientes', []).find(x => x.id === id);
  return c ? c.nombre : 'Cliente Desconocido';
}

function getProductName(id) {
  const p = obtener('productos', []).find(x => x.id === id);
  return p ? p.name : 'Producto Eliminado';
}

function getProductPrice(id) {
  const p = obtener('productos', []).find(x => x.id === id);
  return p ? Number(p.price) : 0;
}

// Render Table
function renderOrders() {
  const pedidos = obtener(STORAGE_KEY, []);

  if (!pedidos.length) {
    emptyState.hidden = false;
    tableBody.innerHTML = '';
    countBadge.textContent = '0 pedidos';
    return;
  }

  emptyState.hidden = true;
  countBadge.textContent = `${pedidos.length} pedido${pedidos.length > 1 ? 's' : ''}`;

  tableBody.innerHTML = pedidos.map((pedido) => {
    const totalArticulos = pedido.productos.reduce((sum, p) => sum + p.cantidad, 0);
    return `
      <tr>
        <td>#${pedido.id}</td>
        <td>${getClientName(pedido.clienteId)}</td>
        <td>${new Date(pedido.fecha).toLocaleDateString()}</td>
        <td>${totalArticulos}</td>
        <td>$${Number(pedido.total).toFixed(2)}</td>
        <td>
          <select class="select" data-action="status" data-id="${pedido.id}">
            <option value="Pendiente" ${pedido.estado === 'Pendiente' ? 'selected' : ''}>Pendiente</option>
            <option value="En proceso" ${pedido.estado === 'En proceso' ? 'selected' : ''}>En proceso</option>
            <option value="Entregado" ${pedido.estado === 'Entregado' ? 'selected' : ''}>Entregado</option>
          </select>
        </td>
        <td>
          <div class="table__actions">
            <button class="btn btn--danger btn--icon" type="button" data-action="delete" data-id="${pedido.id}" aria-label="Eliminar pedido">
              <span class="material-symbols-outlined">delete</span>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
  
  if (window.aplicarPermisosRol) window.aplicarPermisosRol();
}

// Modal and Form Logic
function calculateTotals() {
  let totalItems = 0;
  let totalPrice = 0;

  productRowsContainer.querySelectorAll('.order-product-row').forEach(row => {
    const select = row.querySelector('.product-select');
    const qtyInput = row.querySelector('.product-qty');
    const subtotalEl = row.querySelector('.product-subtotal');

    const price = getProductPrice(select.value);
    const qty = Number(qtyInput.value) || 0;
    const subtotal = price * qty;
    
    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    totalItems += qty;
    totalPrice += subtotal;
  });

  totalItemsEl.textContent = totalItems;
  totalPriceEl.textContent = totalPrice.toFixed(2);
}

function addProductRow(productoId = '', cantidad = 1) {
  const productos = obtener('productos', []);
  const row = document.createElement('div');
  row.className = 'order-product-row';

  const selectHTML = `
    <select class="select product-select" required>
      <option value="">Selecciona un producto...</option>
      ${productos.map(p => `<option value="${p.id}" ${p.id === productoId ? 'selected' : ''}>${p.name} ($${Number(p.price).toFixed(2)})</option>`).join('')}
    </select>
  `;

  row.innerHTML = `
    ${selectHTML}
    <input type="number" class="input product-qty" min="1" value="${cantidad}" required />
    <span class="product-subtotal">$0.00</span>
    <button class="btn btn--danger btn--icon btn-remove-row" type="button" aria-label="Eliminar fila">
      <span class="material-symbols-outlined">close</span>
    </button>
  `;

  row.querySelector('.product-select').addEventListener('change', calculateTotals);
  row.querySelector('.product-qty').addEventListener('input', calculateTotals);
  row.querySelector('.btn-remove-row').addEventListener('click', () => {
    row.remove();
    calculateTotals();
  });

  productRowsContainer.appendChild(row);
  calculateTotals();
}

function openModal() {
  form.reset();
  idInput.value = '';
  productRowsContainer.innerHTML = '';
  
  // Load clients
  const clientes = obtener('clientes', []);
  clientSelect.innerHTML = '<option value="">Selecciona un cliente</option>' + 
    clientes.map(c => `<option value="${c.id}">${c.nombre}</option>`).join('');

  addProductRow();
  modal.hidden = false;
  document.body.classList.add('modal-open');
}

function closeModal() {
  modal.hidden = true;
  document.body.classList.remove('modal-open');
}

function saveOrder(event) {
  event.preventDefault();

  if (window.currentUserRole !== 'admin') {
    alert("No tienes permisos para modificar datos");
    return;
  }

  const rows = Array.from(productRowsContainer.querySelectorAll('.order-product-row'));
  if (rows.length === 0) {
    alert("Debes agregar al menos un producto.");
    return;
  }

  const orderProducts = rows.map(row => {
    const select = row.querySelector('.product-select');
    const qtyInput = row.querySelector('.product-qty');
    return {
      productoId: select.value,
      cantidad: Number(qtyInput.value),
      precio: getProductPrice(select.value)
    };
  });

  if (orderProducts.some(p => !p.productoId || p.cantidad <= 0)) {
    alert("Revisa que todos los productos estén seleccionados y la cantidad sea válida.");
    return;
  }

  const payload = {
    id: idInput.value || generarId(),
    clienteId: clientSelect.value,
    estado: statusSelect.value,
    fecha: new Date().toISOString(),
    productos: orderProducts,
    total: Number(totalPriceEl.textContent)
  };

  const pedidos = obtener(STORAGE_KEY, []);
  pedidos.push(payload); // Currently we only create, not edit existing ones (as per requirements)
  guardar(STORAGE_KEY, pedidos);

  showToast('Pedido creado correctamente', 'success');
  renderOrders();
  closeModal();
}

async function handleTableActions(event) {
  const target = event.target;
  const prodId = target.dataset.id;
  const pedidos = obtener(STORAGE_KEY, []);
  const pedidoIndex = pedidos.findIndex(p => p.id === prodId);

  if (pedidoIndex === -1) return;

  if (target.dataset.action === 'delete') {
    if (window.currentUserRole !== 'admin') {
      alert("No tienes permisos para modificar datos");
      return; // Bloqueo extra de seguridad
    }
    const confirmed = await showConfirm(`¿Deseas eliminar el pedido #${prodId}?`);
    if (confirmed) {
      pedidos.splice(pedidoIndex, 1);
      guardar(STORAGE_KEY, pedidos);
      showToast('Pedido eliminado', 'danger');
      renderOrders();
    }
  }

  if (target.dataset.action === 'status') {
    if (window.currentUserRole !== 'admin') {
      alert("No tienes permisos para modificar datos");
      renderOrders(); // Revert visual change
      return;
    }
    pedidos[pedidoIndex].estado = target.value;
    guardar(STORAGE_KEY, pedidos);
    showToast('Estado actualizado', 'success');
  }
}

// Event listeners
btnAddProduct.addEventListener('click', () => addProductRow());
form.addEventListener('submit', saveOrder);
document.querySelectorAll('[data-open-modal]').forEach(b => b.addEventListener('click', () => {
  if (window.currentUserRole !== 'admin') {
    alert("No tienes permisos para modificar datos");
    return;
  }
  openModal();
}));
document.querySelectorAll('[data-close-modal]').forEach(b => b.addEventListener('click', closeModal));
tableBody.addEventListener('change', handleTableActions);
tableBody.addEventListener('click', (e) => {
  if (e.target.closest('button')) handleTableActions({ target: e.target.closest('button') });
});

renderOrders();
