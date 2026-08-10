// auth.js
document.addEventListener('DOMContentLoaded', () => {
    // 1. Evitar ejecución redundante en la página de login
    if (window.location.pathname.endsWith('login.html')) {
        return; 
    }

    // 2. Obtener credenciales de sesión
    const rawCreds = localStorage.getItem('adminCredentials');
    if (!rawCreds) {
        window.location.href = 'login.html';
        return;
    }

    const sessionData = JSON.parse(rawCreds);
    const role = sessionData.role || 'admin'; // Por defecto admin si no existe (cuentas viejas)
    const currentUserName = sessionData.username.split('@')[0];

    // 3. Proteger Vistas Sensibles (Redirección forzada para Vendedores)
    const sensitivePages = ['proveedores.html', 'resumen.html'];
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (role === 'user' && sensitivePages.includes(currentPage)) {
        window.location.href = 'index.html';
        return;
    }

    // 4. Adaptación de la Interfaz (Header)
    const topbarUserSpan = document.querySelector('.topbar__user span:last-child');
    if (topbarUserSpan) {
        const roleLabel = role === 'admin' ? 'Admin' : 'Vendedor';
        topbarUserSpan.textContent = `${currentUserName} · ${roleLabel}`;
    }

    // 5. Adaptación del Menú Lateral (Ocultar Vistas Sensibles)
    if (role === 'user') {
        const sidebarLinks = document.querySelectorAll('.sidebar__link');
        sidebarLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === 'proveedores.html' || href === 'resumen.html') {
                link.style.display = 'none';
            }
        });
    }

    // 6. Configurar Cierre de Sesión
    const logoutLink = document.querySelector('.sidebar__link[href="login.html"]');
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('adminCredentials');
            // Si tuvieras un flag de sesión, también lo borrarías aquí:
            localStorage.removeItem('sessionActive'); 
            window.location.href = 'login.html';
        });
    }

    // Inyectar el rol en el objeto window para uso de otros scripts
    window.currentUserRole = role;

    // Función global solicitada para aplicar permisos estructurales
    window.aplicarPermisosRol = function() {
        if (window.currentUserRole === 'user') {
            document.body.classList.add('solo-vendedor');
            
            // Bloquear formularios e inputs (excepto búsqueda si la hubiera)
            const formularios = document.querySelectorAll('form:not(.search-form)');
            formularios.forEach(form => {
                const inputs = form.querySelectorAll('input, select, textarea, button[type="submit"]');
                inputs.forEach(input => {
                    input.disabled = true;
                    // Asegurar visualmente que están deshabilitados
                    input.classList.add('disabled-by-role');
                });
            });

            // Bloquear selects de estado (las tareas sí se pueden marcar)
            const extraElements = document.querySelectorAll('select[data-action="status"]');
            extraElements.forEach(el => {
                el.disabled = true;
                el.classList.add('disabled-by-role');
            });
        }
    };

    // Ejecutar inmediatamente
    window.aplicarPermisosRol();
});
