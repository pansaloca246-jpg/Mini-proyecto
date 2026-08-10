/**
 * Lógica de Autenticación de Usuario - CR-Tech Systems
 * Inicializa credenciales por defecto, valida inputs contra LocalStorage
 * y maneja estados de error e inicio de sesión exitoso.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializar credenciales por defecto en LocalStorage
    const DEFAULT_USER = 'admin';
    const DEFAULT_PASS = '1234';
    const STORAGE_KEY = 'adminCredentials';

    // Verificamos si ya existen credenciales guardadas en LocalStorage
    if (!localStorage.getItem(STORAGE_KEY)) {
        const initialCreds = {
            username: DEFAULT_USER,
            password: DEFAULT_PASS
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialCreds));
        console.log('Credenciales iniciales precargadas en LocalStorage:', initialCreds);
    }

    // Elementos del DOM
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('toggle-password');
    const eyeIcon = document.getElementById('eye-icon');
    const alertBox = document.getElementById('alert-box');
    const alertMessage = document.getElementById('alert-message');

    // 2. Funcionalidad de Mostrar/Ocultar Contraseña
    if (togglePasswordBtn && passwordInput && eyeIcon) {
        togglePasswordBtn.addEventListener('click', () => {
            const isPassword = passwordInput.getAttribute('type') === 'password';
            passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
            
            // Alternar icono de Lucide dinámicamente
            eyeIcon.setAttribute('data-lucide', isPassword ? 'eye-off' : 'eye');
            if (window.lucide) {
                window.lucide.createIcons();
            }
        });
    }

    // Función para mostrar alertas estilizadas
    function showAlert(message) {
        alertMessage.textContent = message;
        alertBox.classList.remove('hidden');
        
        // Efecto visual sutil de vibración/atención al mostrar el error
        alertBox.style.animation = 'none';
        // Forzar reflow para reiniciar la animación
        alertBox.offsetHeight; 
        alertBox.style.animation = 'shake 0.4s ease-in-out';
    }

    // Función para ocultar alertas
    function hideAlert() {
        alertBox.classList.add('hidden');
    }

    // 3. Escuchar el evento submit del formulario
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Previene la recarga de página
        hideAlert();

        const enteredUser = usernameInput.value.trim();
        const enteredPass = passwordInput.value.trim();

        // Validaciones previas de campos vacíos (HTML5 los valida pero reforzamos en JS)
        if (!enteredUser) {
            showAlert(t('login_empty_user'));
            usernameInput.focus();
            return;
        }
        if (!enteredPass) {
            showAlert(t('login_empty_pass'));
            passwordInput.focus();
            return;
        }

        // Obtener credenciales válidas desde LocalStorage
        let storedCreds = null;
        try {
            storedCreds = JSON.parse(localStorage.getItem(STORAGE_KEY));
        } catch (error) {
            console.error('Error al leer credenciales del LocalStorage:', error);
        }

        // Si por alguna razón no existen en LocalStorage (ej. borrado manual)
        if (!storedCreds) {
            storedCreds = { username: DEFAULT_USER, password: DEFAULT_PASS };
        }

        // 4. Validación detallada
        if (enteredUser !== storedCreds.username) {
            // Si el usuario no coincide
            showAlert(t('login_invalid_user'));
            usernameInput.focus();
        } else if (enteredPass !== storedCreds.password) {
            // Si el usuario coincide pero la contraseña no
            showAlert(t('login_invalid_password'));
            passwordInput.focus();
        } else {
            // Si ambas credenciales son correctas, simulamos un éxito de Login temporal
            const submitBtn = document.getElementById('submit-btn');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.style.opacity = '0.8';
                submitBtn.querySelector('span').textContent = t('login_connecting');
            }

            // Guardamos indicador de sesión activa en localStorage si se requiere
            if (document.getElementById('remember-me')?.checked) {
                localStorage.setItem('sessionActive', 'true');
            }

            // Redirección inmediata hacia el dashboard de productos
            setTimeout(() => {
                window.location.href = 'productos.html';
            }, 600);
        }
    });

    // Limpiar alertas al escribir en los inputs
    usernameInput.addEventListener('input', hideAlert);
    passwordInput.addEventListener('input', hideAlert);
});

// Estilos de animación keyframe inyectados dinámicamente para el efecto Shake del Alert
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20%, 60% { transform: translateX(-6px); }
        40%, 80% { transform: translateX(6px); }
    }
`;
document.head.appendChild(styleSheet);

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializar credenciales por defecto en LocalStorage
    const DEFAULT_USER = 'admin';
    const DEFAULT_PASS = '1234';
    const STORAGE_KEY = 'adminCredentials';

    if (!localStorage.getItem(STORAGE_KEY)) {
        const initialCreds = {
            username: DEFAULT_USER,
            password: DEFAULT_PASS,
            role: 'admin'
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialCreds));
    }

    // Elementos del DOM - Login
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('toggle-password');
    const eyeIcon = document.getElementById('eye-icon');
    const alertBox = document.getElementById('alert-box');
    const alertMessage = document.getElementById('alert-message');

    // Elementos del DOM - Toggle Animación
    const formPanel = document.getElementById('form-panel');
    const goToRegisterBtn = document.getElementById('go-to-register');
    const goToLoginBtn = document.getElementById('go-to-login');

    // Elementos del DOM - Registro
    const regForm = document.getElementById('register-form');
    const regAlertBox = document.getElementById('reg-alert-box');
    const regAlertMessage = document.getElementById('reg-alert-message');

    // Funcionalidad de Mostrar/Ocultar Contraseña
    if (togglePasswordBtn && passwordInput && eyeIcon) {
        togglePasswordBtn.addEventListener('click', () => {
            const isPassword = passwordInput.getAttribute('type') === 'password';
            passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
            eyeIcon.setAttribute('data-lucide', isPassword ? 'eye-off' : 'eye');
            if (window.lucide) window.lucide.createIcons();
        });
    }

    // Funciones para alertas
    function showAlert(box, messageEl, message, type = 'error') {
        messageEl.textContent = message;
        box.classList.remove('hidden');
        if (type === 'success') {
            box.style.background = 'rgba(0, 210, 255, 0.1)';
            box.style.border = '1px solid var(--primary)';
            box.style.color = 'var(--primary)';
            box.style.animation = 'none';
        } else {
            box.style.background = '';
            box.style.border = '';
            box.style.color = '';
            box.style.animation = 'none';
            box.offsetHeight; 
            box.style.animation = 'shake 0.4s ease-in-out';
        }
    }

    function hideAlerts() {
        alertBox?.classList.add('hidden');
        regAlertBox?.classList.add('hidden');
    }

    // Toggle de Animación
    goToRegisterBtn?.addEventListener('click', () => {
        hideAlerts();
        formPanel?.classList.add('is-registering');
    });

    goToLoginBtn?.addEventListener('click', () => {
        hideAlerts();
        formPanel?.classList.remove('is-registering');
    });

    // Login Submit
    loginForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        hideAlerts();

        const enteredUser = usernameInput.value.trim();
        const enteredPass = passwordInput.value.trim();

        if (!enteredUser) {
            showAlert(alertBox, alertMessage, t('login_empty_user'));
            usernameInput.focus();
            return;
        }
        if (!enteredPass) {
            showAlert(alertBox, alertMessage, t('login_empty_pass'));
            passwordInput.focus();
            return;
        }

        let storedCreds = JSON.parse(localStorage.getItem(STORAGE_KEY)) || { username: DEFAULT_USER, password: DEFAULT_PASS };

        if (enteredUser !== storedCreds.username) {
            showAlert(alertBox, alertMessage, 'Usuario inválido');
            usernameInput.focus();
        } else if (enteredPass !== storedCreds.password) {
            showAlert(alertBox, alertMessage, 'Contraseña inválida');
            passwordInput.focus();
        } else {
            const submitBtn = document.getElementById('submit-btn');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.style.opacity = '0.8';
                submitBtn.querySelector('span').textContent = t('login_connecting');
            }
            if (document.getElementById('remember-me')?.checked) {
                localStorage.setItem('sessionActive', 'true');
            }
            setTimeout(() => window.location.href = 'index.html', 600);
        }
    });

    // Registro Submit
    regForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        hideAlerts();

        const name = document.getElementById('reg-name').value.trim();
        const email = document.getElementById('reg-email').value.trim();
        const pass = document.getElementById('reg-password').value.trim();
        const role = document.getElementById('reg-role').value;
        const confirmPass = document.getElementById('reg-password-confirm').value.trim();

        if (!name || !email || !pass || !confirmPass) {
            showAlert(regAlertBox, regAlertMessage, t('login_required_complete'));
            return;
        }

        if (pass.length < 6) {
            showAlert(regAlertBox, regAlertMessage, t('login_password_short'));
            return;
        }

        if (pass !== confirmPass) {
            showAlert(regAlertBox, regAlertMessage, t('login_passwords_mismatch'));
            return;
        }

        // Guardar las nuevas credenciales que sobreescriben las actuales
        const newCreds = { username: email, password: pass, role: role };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newCreds));
        
        showAlert(regAlertBox, regAlertMessage, t('login_account_created'), 'success');
        
        setTimeout(() => {
            regForm.reset();
            formPanel.classList.remove('is-registering');
            hideAlerts();
            // Llenar el login con el correo recién creado
            usernameInput.value = email;
            passwordInput.focus();
        }, 1800);
    });

    usernameInput?.addEventListener('input', hideAlerts);
    passwordInput?.addEventListener('input', hideAlerts);
});
