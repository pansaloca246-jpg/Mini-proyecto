import { generarId, guardar, obtener } from './storage.js';

const STORAGE_KEY = 'proveedores';
const form = document.querySelector('.form-grid');
const idInput = document.getElementById('proveedor-id');
const nombreInput = document.getElementById('proveedor-nombre');
const contactoInput = document.getElementById('proveedor-contacto');
const telefonoInput = document.getElementById('proveedor-telefono');
const categoriaInput = document.getElementById('proveedor-categoria');
const formTitle = document.getElementById('form-title');
const toast = document.getElementById('toast');
const menuButton = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');

let toastTimer = null;

function showToast(message, type = 'success') {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.className = `toast toast--visible toast--${type}`;
  toastTimer = window.setTimeout(() => {
    toast.className = 'toast';
  }, 2500);
}

// Cargar datos si estamos en modo edición
const urlParams = new URLSearchParams(window.location.search);
const proveedorId = urlParams.get('id');

if (proveedorId) {
  const proveedores = obtener(STORAGE_KEY, []);
  const proveedor = proveedores.find(p => p.id === proveedorId);
  
  if (proveedor) {
    formTitle.textContent = 'Editar proveedor';
    idInput.value = proveedor.id;
    nombreInput.value = proveedor.nombre;
    contactoInput.value = proveedor.contacto;
    telefonoInput.value = proveedor.telefono;
    categoriaInput.value = proveedor.categoria;
  }
} else {
  formTitle.textContent = 'Crear nuevo proveedor';
}

form?.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const payload = {
    id: idInput.value || generarId(),
    nombre: nombreInput.value.trim(),
    contacto: contactoInput.value.trim(),
    telefono: telefonoInput.value.trim(),
    categoria: categoriaInput.value
  };

  const proveedores = obtener(STORAGE_KEY, []);
  
  if (proveedorId) {
    // Editar
    const index = proveedores.findIndex(p => p.id === proveedorId);
    if (index >= 0) {
      proveedores[index] = payload;
    } else {
      proveedores.push(payload);
    }
    showToast('Proveedor actualizado correctamente', 'success');
  } else {
    // Crear
    proveedores.push(payload);
    showToast('Proveedor creado correctamente', 'success');
  }

  guardar(STORAGE_KEY, proveedores);
  
  // Redirigir después de mostrar el toast
  setTimeout(() => {
    window.location.href = 'proveedores.html';
  }, 800);
});

menuButton?.addEventListener('click', () => {
  sidebar?.classList.toggle('is-open');
});

if (sidebar) {
  sidebar.querySelectorAll('.sidebar__link').forEach((link) => {
    link.addEventListener('click', () => sidebar.classList.remove('is-open'));
  });
}
