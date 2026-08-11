import { eliminar, existe, generarId, guardar, obtener } from './storage.js';
import { showConfirm } from './confirm.js';

const STORAGE_KEY = 'clientes';
const tableBody = document.getElementById('clientes-table-body');
const emptyState = document.getElementById('empty-state');
const toast = document.getElementById('toast');
const menuButton = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');

// Modal Elements
const modal = document.getElementById('client-modal');
const form = document.getElementById('client-form');
const modalTitle = document.getElementById('modal-title');
const idInput = document.getElementById('client-id');
const nameInput = document.getElementById('client-name');
const emailInput = document.getElementById('client-email');
const phoneInput = document.getElementById('client-phone');
const categoryInput = document.getElementById('client-category');

let toastTimer = null;

function renderClients() {
  const clientes = obtener(STORAGE_KEY, []);

  if (!clientes.length) {
    emptyState.hidden = false;
    tableBody.innerHTML = '';
    return;
  }

  emptyState.hidden = true;

  tableBody.innerHTML = clientes
    .map((cli) => `
      <tr>
        <td>#${cli.id}</td>
        <td>${cli.nombre}</td>
        <td>${cli.email}</td>
        <td>${cli.telefono}</td>
        <td>${cli.categoria}</td>
        <td>
          <div class="table__actions">
            <button class="btn btn--ghost btn--icon" type="button" data-action="edit" data-id="${cli.id}" aria-label="Editar ${cli.nombre}">
              <span class="material-symbols-outlined">edit</span>
            </button>
            <button class="btn btn--danger btn--icon" type="button" data-action="delete" data-id="${cli.id}" aria-label="Eliminar ${cli.nombre}">
              <span class="material-symbols-outlined">delete</span>
            </button>
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

function openModal(client = null) {
  resetErrors();
  form.reset();
  form.dataset.mode = client ? 'edit' : 'create';
  idInput.value = client?.id ?? '';

  if (client) {
    modalTitle.textContent = 'Editar cliente';
    nameInput.value = client.nombre;
    emailInput.value = client.email;
    phoneInput.value = client.telefono;
    categoryInput.value = client.categoria;
  } else {
    modalTitle.textContent = 'Nuevo cliente';
  }

  modal.hidden = false;
  document.body.classList.add('modal-open');
  window.requestAnimationFrame(() => {
    nameInput.focus();
  });
}

function closeModal() {
  modal.hidden = true;
  document.body.classList.remove('modal-open');
  form.reset();
  form.dataset.mode = 'create';
  idInput.value = '';
  resetErrors();
}

function saveClient(event) {
  event.preventDefault();

  if (window.currentUserRole !== 'admin') {
    showToast("No tienes permisos para modificar datos", "danger");
    return;
  }

  resetErrors();

  if (!form.checkValidity()) {
    form.querySelectorAll('input, select').forEach((input) => {
      if (!input.validity.valid) {
        showFieldError(input);
      }
    });
    return;
  }

  const clientes = obtener(STORAGE_KEY, []);
  const payload = {
    id: idInput.value || generarId(),
    nombre: nameInput.value.trim(),
    email: emailInput.value.trim(),
    telefono: phoneInput.value.trim(),
    categoria: categoryInput.value,
  };

  if (form.dataset.mode === 'edit' && idInput.value) {
    const index = clientes.findIndex((c) => c.id === payload.id);
    if (index >= 0) {
      clientes[index] = payload;
    }
    showToast('Cliente actualizado correctamente', 'success');
  } else {
    clientes.push(payload);
    showToast('Cliente creado correctamente', 'success');
  }

  guardar(STORAGE_KEY, clientes);
  renderClients();
  closeModal();
}

async function handleTableActions(event) {
  if (window.currentUserRole !== 'admin') {
    showToast("No tienes permisos para modificar datos", "danger");
    return;
  }

  const button = event.target.closest('button[data-action]');
  if (!button) return;

  const cliId = button.dataset.id;
  const clientes = obtener(STORAGE_KEY, []);
  const cli = clientes.find((item) => item.id === cliId);

  if (!cli) return;

  if (button.dataset.action === 'edit') {
    openModal(cli);
    return;
  }

  if (button.dataset.action === 'delete') {
    const pedidos = obtener('pedidos', []);
    const isInOrder = pedidos.some(pedido => pedido.clienteId === cliId);

    if (isInOrder) {
      showToast(`No se puede eliminar a ${cli.nombre} porque tiene uno o más pedidos asociados.`, "danger");
      return;
    }

    const confirmed = await showConfirm(`¿Deseas eliminar a ${cli.nombre}?`);
    if (confirmed) {
      const nuevos = clientes.filter((item) => item.id !== cliId);
      guardar(STORAGE_KEY, nuevos);
      showToast('Cliente eliminado', 'danger');
      renderClients();
    }
  }
}

// Event Listeners
form.addEventListener('submit', saveClient);
form.addEventListener('invalid', (event) => {
  event.preventDefault();
  showFieldError(event.target);
}, true);

form.querySelectorAll('input, select').forEach((input) => {
  input.addEventListener('input', () => {
    const group = input.closest('.form-group');
    const errorElement = group?.querySelector('.form-error');
    if (errorElement) errorElement.textContent = '';
  });
  input.addEventListener('blur', () => {
    if (!input.validity.valid) showFieldError(input);
  });
});

document.querySelectorAll('[data-open-modal]').forEach((button) => {
  button.addEventListener('click', () => {
    if (window.currentUserRole !== 'admin') {
      showToast("No tienes permisos para modificar datos", "danger");
      return;
    }
    openModal();
  });
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

if (tableBody) {
  tableBody.addEventListener('click', handleTableActions);
}

menuButton?.addEventListener('click', () => {
  sidebar?.classList.toggle('is-open');
});

if (sidebar) {
  sidebar.querySelectorAll('.sidebar__link').forEach((link) => {
    link.addEventListener('click', () => sidebar.classList.remove('is-open'));
  });
}

// Inicialización de Storage con cliente predeterminado
if (!existe(STORAGE_KEY)) {
  guardar(STORAGE_KEY, [DEFAULT_CLIENT]);
}

// Render Inicial
renderClients();
