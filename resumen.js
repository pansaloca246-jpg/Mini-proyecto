import { obtener } from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
  // Cargar datos
  const productos = obtener('productos', []);
  const clientes = obtener('clientes', []);
  const proveedores = obtener('proveedores', []);

  // Actualizar UI
  const elProductos = document.getElementById('resumen-productos');
  const elClientes = document.getElementById('resumen-clientes');
  const elProveedores = document.getElementById('resumen-proveedores');

  if (elProductos) elProductos.textContent = productos.length;
  if (elClientes) elClientes.textContent = clientes.length;
  if (elProveedores) elProveedores.textContent = proveedores.length;

  // Lógica de exportación a CSV (Excel lo lee nativamente)
  const exportBtn = document.getElementById('export-btn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      let csvContent = '\uFEFF'; // BOM para que Excel lea los acentos (UTF-8) correctamente

      // Sección Productos
      csvContent += '--- PRODUCTOS ---\n';
      csvContent += 'ID,Nombre,Categoría,Precio,Stock,Estado\n';
      productos.forEach(p => {
        csvContent += `"${p.id}","${p.name || p.nombre}","${p.category || p.categoria}","${p.price || p.precio}","${p.stock}","${p.status || p.estado}"\n`;
      });
      csvContent += '\n\n';

      // Sección Clientes
      csvContent += '--- CLIENTES ---\n';
      csvContent += 'ID,Nombre,Email,Teléfono,Empresa,Estado\n';
      clientes.forEach(c => {
        csvContent += `"${c.id}","${c.nombre}","${c.email}","${c.telefono}","${c.empresa}","${c.estado}"\n`;
      });
      csvContent += '\n\n';

      // Sección Proveedores
      csvContent += '--- PROVEEDORES ---\n';
      csvContent += 'ID,Nombre,Contacto,Teléfono,Categoría,Estado\n';
      proveedores.forEach(p => {
        csvContent += `"${p.id}","${p.nombre}","${p.contacto}","${p.telefono}","${p.categoria}","${p.estado}"\n`;
      });

      // Crear Blob y link de descarga
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'Reporte_CR_Tech.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
});
