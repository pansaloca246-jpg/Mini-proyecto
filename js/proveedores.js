import { eliminar, existe, generarId, guardar, obtener } from './storage.js';
import { showConfirm } from './confirm.js';

const STORAGE_KEY = 'proveedores';
const tableBody = document.getElementById('proveedores-table-body');
const emptyState = document.getElementById('empty-state');
const toast = document.getElementById('toast');
const menuButton = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');

// Modal Elements
const modal = document.getElementById('provider-modal');
const form = document.getElementById('provider-form');
const modalTitle = document.getElementById('modal-title');
const idInput = document.getElementById('provider-id');
const nameInput = document.getElementById('provider-name');
const contactInput = document.getElementById('provider-contact');
const phoneInput = document.getElementById('provider-phone');
const categoryInput = document.getElementById('provider-category');

let toastTimer = null;

// Proveedor inicial predeterminado si no hay nada guardado
const DEFAULT_PROVIDER = {
  id: '1',
  nombre: 'Tech Supply S.A.',
  contacto: 'Ana Pérez',
  telefono: '+57 300 123 4567',
  categoria: 'Electrónica'
};

function renderProviders() {
  const proveedores = obtener(STORAGE_KEY, []);

  if (!proveedores.length) {
    emptyState.hidden = false;
    tableBody.innerHTML = '';
    return;
  }

  emptyState.hidden = true;

  tableBody.innerHTML = proveedores
    .map((prov) => `
      <tr>
        <td>#${prov.id}</td>
        <td>${prov.nombre}</td>
        <td>${prov.contacto}</td>
        <td>${prov.telefono}</td>
        <td>${prov.categoria}</td>
        <td>
          <div class="table__actions">
            <button class="btn btn--secondary btn--icon" type="button" data-action="edit" data-id="${prov.id}" aria-label="Editar ${prov.nombre}">
              <span class="material-symbols-outlined">edit</span>
            </button>
            <button class="btn btn--danger btn--icon" type="button" data-action="delete" data-id="${prov.id}" aria-label="Eliminar ${prov.nombre}">
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

function openModal(provider = null) {
  resetErrors();
  form.reset();
  form.dataset.mode = provider ? 'edit' : 'create';
  idInput.value = provider?.id ?? '';

  if (provider) {
    modalTitle.textContent = 'Editar proveedor';
    nameInput.value = provider.nombre;
    contactInput.value = provider.contacto;
    phoneInput.value = provider.telefono;
    categoryInput.value = provider.categoria;
  } else {
    modalTitle.textContent = 'Nuevo proveedor';
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

function saveProvider(event) {
  event.preventDefault();
  resetErrors();

  if (!form.checkValidity()) {
    form.querySelectorAll('input, select').forEach((input) => {
      if (!input.validity.valid) {
        showFieldError(input);
      }
    });
    return;
  }

  const proveedores = obtener(STORAGE_KEY, []);
  const payload = {
    id: idInput.value || generarId(),
    nombre: nameInput.value.trim(),
    contacto: contactInput.value.trim(),
    telefono: phoneInput.value.trim(),
    categoria: categoryInput.value,
  };

  if (form.dataset.mode === 'edit' && idInput.value) {
    const index = proveedores.findIndex((p) => p.id === payload.id);
    if (index >= 0) {
      proveedores[index] = payload;
    }
    showToast('Proveedor actualizado correctamente', 'success');
  } else {
    proveedores.push(payload);
    showToast('Proveedor creado correctamente', 'success');
  }

  guardar(STORAGE_KEY, proveedores);
  renderProviders();
  closeModal();
}

async function handleTableActions(event) {
  const button = event.target.closest('button[data-action]');
  if (!button) return;

  const provId = button.dataset.id;
  const proveedores = obtener(STORAGE_KEY, []);
  const prov = proveedores.find((item) => item.id === provId);

  if (!prov) return;

  if (button.dataset.action === 'edit') {
    openModal(prov);
    return;
  }

  if (button.dataset.action === 'delete') {
    const confirmed = await showConfirm(`¿Deseas eliminar a ${prov.nombre}?`);
    if (confirmed) {
      const nuevos = proveedores.filter((item) => item.id !== provId);
      guardar(STORAGE_KEY, nuevos);
      showToast('Proveedor eliminado', 'danger');
      renderProviders();
    }
  }
}

// Event Listeners
form.addEventListener('submit', saveProvider);
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

// Inicialización de Storage con proveedor predeterminado
if (!existe(STORAGE_KEY)) {
  guardar(STORAGE_KEY, [DEFAULT_PROVIDER]);
}

// Render Inicial
renderProviders();
