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
        const enteredPass = passwordInput.value;

        // Validaciones previas de campos vacíos (HTML5 los valida pero reforzamos en JS)
        if (!enteredUser) {
            showAlert('Por favor, ingresa tu usuario.');
            usernameInput.focus();
            return;
        }
        if (!enteredPass) {
            showAlert('Por favor, ingresa tu contraseña.');
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
            showAlert('Usuario inválido');
            usernameInput.focus();
        } else if (enteredPass !== storedCreds.password) {
            // Si el usuario coincide pero la contraseña no
            showAlert('Contraseña inválida');
            passwordInput.focus();
        } else {
            // Si ambas credenciales son correctas, simulamos un éxito de Login temporal
            const submitBtn = document.getElementById('submit-btn');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.style.opacity = '0.8';
                submitBtn.querySelector('span').textContent = 'Conectando...';
            }

            // Guardamos indicador de sesión activa en localStorage si se requiere
            if (document.getElementById('remember-me')?.checked) {
                localStorage.setItem('sessionActive', 'true');
            }

            // Redirección inmediata hacia index.html
            setTimeout(() => {
                window.location.href = 'index.html';
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
