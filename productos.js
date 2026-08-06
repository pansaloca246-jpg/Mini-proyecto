import { eliminar, existe, generarId, guardar, obtener } from './storage.js';

const STORAGE_KEY = 'productos';
const modal = document.getElementById('product-modal');
const form = document.getElementById('product-form');
const tableBody = document.getElementById('products-table-body');
const emptyState = document.getElementById('empty-state');
const countBadge = document.getElementById('product-count');
const modalTitle = document.getElementById('modal-title');
const toast = document.getElementById('toast');
const menuButton = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
const idInput = document.getElementById('product-id');
const nameInput = document.getElementById('product-name');
const categoryInput = document.getElementById('product-category');
const priceInput = document.getElementById('product-price');
const stockInput = document.getElementById('product-stock');
const descriptionInput = document.getElementById('product-description');

let toastTimer = null;

function renderProducts() {
  const productos = obtener(STORAGE_KEY, []);

  if (!productos.length) {
    emptyState.hidden = false;
    tableBody.innerHTML = '';
    countBadge.textContent = '0 productos';
    return;
  }

  emptyState.hidden = true;
  countBadge.textContent = `${productos.length} producto${productos.length > 1 ? 's' : ''}`;

  tableBody.innerHTML = productos
    .map((producto) => `
      <tr>
        <td>#${producto.id}</td>
        <td>${producto.name}</td>
        <td>${producto.category}</td>
        <td>$${Number(producto.price).toFixed(2)}</td>
        <td>${producto.stock}</td>
        <td>
          <div class="table__actions">
            <button class="btn btn--ghost btn--icon" type="button" data-action="edit" data-id="${producto.id}" aria-label="Editar ${producto.name}">✎</button>
            <button class="btn btn--danger btn--icon" type="button" data-action="delete" data-id="${producto.id}" aria-label="Eliminar ${producto.name}">🗑</button>
          </div>
        </td>
      </tr>
    `)
    .join('');
}

function showToast(message, type = 'success') {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.className = `toast toast--visible toast--${type}`;
  toastTimer = window.setTimeout(() => {
    toast.className = 'toast';
  }, 2500);
}

function resetErrors() {
  form.querySelectorAll('.form-error').forEach((element) => {
    element.textContent = '';
  });
}

function showFieldError(input) {
  const group = input.closest('.form-group');
  const errorElement = group?.querySelector('.form-error');

  if (errorElement) {
    errorElement.textContent = input.validationMessage || 'Este campo es inválido';
  }
}

function openModal(product = null) {
  resetErrors();
  form.reset();
  form.dataset.mode = product ? 'edit' : 'create';
  idInput.value = product?.id ?? '';

  if (product) {
    modalTitle.textContent = 'Editar producto';
    nameInput.value = product.name;
    categoryInput.value = product.category;
    priceInput.value = product.price;
    stockInput.value = product.stock;
    descriptionInput.value = product.description;
  } else {
    modalTitle.textContent = 'Nuevo producto';
  }

  modal.hidden = false;
  window.requestAnimationFrame(() => {
    nameInput.focus();
  });
}

function closeModal() {
  modal.hidden = true;
  form.reset();
  form.dataset.mode = 'create';
  idInput.value = '';
  resetErrors();
}

function saveProduct(event) {
  event.preventDefault();
  resetErrors();

  if (!form.checkValidity()) {
    form.querySelectorAll('input, select, textarea').forEach((input) => {
      if (!input.validity.valid) {
        showFieldError(input);
      }
    });
    return;
  }

  const productos = obtener(STORAGE_KEY, []);
  const payload = {
    id: idInput.value || generarId(),
    name: nameInput.value.trim(),
    category: categoryInput.value,
    price: Number(priceInput.value),
    stock: Number(stockInput.value),
    description: descriptionInput.value.trim(),
  };

  if (form.dataset.mode === 'edit' && idInput.value) {
    const index = productos.findIndex((producto) => producto.id === payload.id);
    if (index >= 0) {
      productos[index] = payload;
    }
    showToast('Producto actualizado correctamente', 'success');
  } else {
    productos.push(payload);
    showToast('Producto creado correctamente', 'success');
  }

  guardar(STORAGE_KEY, productos);
  renderProducts();
  closeModal();
}

function handleTableActions(event) {
  const button = event.target.closest('button[data-action]');

  if (!button) {
    return;
  }

  const productoId = button.dataset.id;
  const productos = obtener(STORAGE_KEY, []);
  const producto = productos.find((item) => item.id === productoId);

  if (!producto) {
    return;
  }

  if (button.dataset.action === 'edit') {
    openModal(producto);
    return;
  }

  if (window.confirm(`¿Deseas eliminar ${producto.name}?`)) {
    const nuevosProductos = productos.filter((item) => item.id !== productoId);
    guardar(STORAGE_KEY, nuevosProductos);
    showToast('Producto eliminado', 'danger');
    renderProducts();
  }
}

form.addEventListener('submit', saveProduct);
form.addEventListener('invalid', (event) => {
  event.preventDefault();
  showFieldError(event.target);
}, true);

form.querySelectorAll('input, select, textarea').forEach((input) => {
  input.addEventListener('input', () => {
    const group = input.closest('.form-group');
    const errorElement = group?.querySelector('.form-error');

    if (errorElement) {
      errorElement.textContent = '';
    }
  });
  input.addEventListener('blur', () => {
    if (!input.validity.valid) {
      showFieldError(input);
    }
  });
});

document.querySelectorAll('[data-open-modal]').forEach((button) => {
  button.addEventListener('click', () => openModal());
});

document.querySelectorAll('[data-close-modal]').forEach((button) => {
  button.addEventListener('click', closeModal);
});

modal.addEventListener('click', (event) => {
  if (event.target.classList.contains('modal__backdrop')) {
    closeModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (!modal.hidden && event.key === 'Escape') {
    closeModal();
  }
});

tableBody.addEventListener('click', handleTableActions);

menuButton?.addEventListener('click', () => {
  sidebar?.classList.toggle('is-open');
});

if (sidebar) {
  sidebar.querySelectorAll('.sidebar__link').forEach((link) => {
    link.addEventListener('click', () => sidebar.classList.remove('is-open'));
  });
}

if (!existe(STORAGE_KEY)) {
  guardar(STORAGE_KEY, []);
}

renderProducts();
