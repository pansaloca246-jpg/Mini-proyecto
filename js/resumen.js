import { obtener } from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
  // Cargar datos
  const productos = obtener('productos', []);
  const clientes = obtener('clientes', []);
  const proveedores = obtener('proveedores', []);
  const pedidos = obtener('pedidos', []);

  // Actualizar UI
  const elProductos = document.getElementById('resumen-productos');
  const elClientes = document.getElementById('resumen-clientes');
  const elProveedores = document.getElementById('resumen-proveedores');
  const elPedidos = document.getElementById('resumen-pedidos');
  const elVentas = document.getElementById('resumen-ventas');

  if (elProductos) elProductos.textContent = productos.length;
  if (elClientes) elClientes.textContent = clientes.length;
  if (elProveedores) elProveedores.textContent = proveedores.length;
  
  if (elPedidos) elPedidos.textContent = pedidos.length;
  if (elVentas) {
    const totalVentas = pedidos.reduce((sum, p) => sum + (p.estado !== 'Pendiente' ? Number(p.total) : 0), 0);
    elVentas.innerHTML = `<span aria-hidden="true">↑</span> $${totalVentas.toLocaleString('es-CR', { minimumFractionDigits: 2 })} en ventas (Proc/Entr)`;
  }

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
      csvContent += '\n\n';

      // Sección Pedidos
      csvContent += '--- PEDIDOS ---\n';
      csvContent += 'ID,ClienteID,Fecha,Estado,Total,Cant. Productos\n';
      pedidos.forEach(p => {
        const cantProductos = p.productos.reduce((sum, prod) => sum + prod.cantidad, 0);
        csvContent += `"${p.id}","${p.clienteId}","${new Date(p.fecha).toLocaleDateString()}","${p.estado}","${p.total}","${cantProductos}"\n`;
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
