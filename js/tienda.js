// Referencias del DOM
const productsGrid = document.getElementById('products-grid');
const searchInput = document.getElementById('search-input');
const emptyState = document.getElementById('empty-state');
const cartSidebar = document.getElementById('cart-sidebar');
const cartBackdrop = document.getElementById('cart-backdrop');
const btnOpenCart = document.getElementById('btn-open-cart');
const btnCloseCart = document.getElementById('btn-close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartCountBadge = document.getElementById('cart-count');
const cartTotalAmount = document.getElementById('cart-total-amount');
const btnCheckout = document.getElementById('btn-checkout');
const checkoutModal = document.getElementById('checkout-modal');
const btnCloseModal = document.getElementById('btn-close-modal');
const btnCancelCheckout = document.getElementById('btn-cancel-checkout');
const checkoutForm = document.getElementById('checkout-form');
const toast = document.getElementById('toast');

// Estado
let dbProducts = [];
let cart = []; // Estructura: { id, name, price, qty, maxStock, category }

// Utilidades LS
function leerLS(key, defaultValue = []) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
}

function guardarLS(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function generateId() {
    return Math.random().toString(36).substr(2, 5);
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
});

// Carga de productos
function cargarProductos() {
    dbProducts = leerLS('productos', []);
    renderProductos(dbProducts);
}

function renderProductos(productos) {
    if (productos.length === 0) {
        productsGrid.style.display = 'none';
        emptyState.hidden = false;
        return;
    }

    productsGrid.style.display = 'grid';
    emptyState.hidden = true;

    productsGrid.innerHTML = productos.map(p => {
        const outOfStock = Number(p.stock) <= 0;
        
        return `
            <article class="product-card">
                <div class="product-card__image">
                    <span class="material-symbols-outlined">inventory_2</span>
                </div>
                <div class="product-card__body">
                    <span class="product-category">${p.category}</span>
                    <h3 class="product-title">${p.name}</h3>
                    <p class="product-price">$${Number(p.price).toFixed(2)}</p>
                    ${outOfStock ? '<span class="badge-agotado">Agotado</span>' : `<p class="product-stock">Stock: ${p.stock}</p>`}
                    
                    <div class="product-actions">
                        <button class="btn-add-to-cart" 
                                onclick="addToCart('${p.id}')" 
                                ${outOfStock ? 'disabled' : ''}>
                            <span class="material-symbols-outlined">shopping_cart</span>
                            <span>Añadir</span>
                        </button>
                    </div>
                </div>
            </article>
        `;
    }).join('');
}

// Búsqueda
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtrados = dbProducts.filter(p => 
        p.name.toLowerCase().includes(term) || 
        p.category.toLowerCase().includes(term)
    );
    renderProductos(filtrados);
});

// Carrito UI
function toggleCart() {
    cartSidebar.classList.toggle('show');
    cartBackdrop.classList.toggle('show');
}

btnOpenCart.addEventListener('click', toggleCart);
btnCloseCart.addEventListener('click', toggleCart);
cartBackdrop.addEventListener('click', toggleCart);

// Lógica de Carrito
window.addToCart = function(productId) {
    const product = dbProducts.find(p => p.id === productId);
    if (!product || Number(product.stock) <= 0) return;

    const cartItem = cart.find(item => item.id === productId);
    
    if (cartItem) {
        if (cartItem.qty < Number(product.stock)) {
            cartItem.qty += 1;
            showToast('Cantidad actualizada');
        } else {
            showToast('Has alcanzado el stock máximo', 'error');
            return;
        }
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: Number(product.price),
            qty: 1,
            maxStock: Number(product.stock),
            category: product.category
        });
        showToast('Producto añadido al carrito');
    }

    actualizarCarrito();
};

window.updateQty = function(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    const newQty = item.qty + delta;
    if (newQty <= 0) {
        removeFromCart(productId);
    } else if (newQty > item.maxStock) {
        showToast('No hay más stock disponible', 'error');
    } else {
        item.qty = newQty;
        actualizarCarrito();
    }
};

window.removeFromCart = function(productId) {
    cart = cart.filter(i => i.id !== productId);
    actualizarCarrito();
    showToast('Producto eliminado');
};

function actualizarCarrito() {
    // Totales
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    
    cartCountBadge.textContent = totalItems;
    cartTotalAmount.textContent = `$${totalPrice.toFixed(2)}`;
    
    btnCheckout.disabled = cart.length === 0;

    // Render
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="cart-empty">
                <span class="material-symbols-outlined">shopping_cart</span>
                <p>Tu carrito está vacío</p>
            </div>
        `;
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item__img">
                    <span class="material-symbols-outlined">inventory_2</span>
                </div>
                <div class="cart-item__details">
                    <h4 class="cart-item__title">${item.name}</h4>
                    <p class="cart-item__price">$${item.price.toFixed(2)}</p>
                    <div class="cart-item__actions">
                        <div class="qty-controls">
                            <button class="qty-btn" onclick="updateQty('${item.id}', -1)">-</button>
                            <input class="qty-input" type="number" value="${item.qty}" readonly>
                            <button class="qty-btn" onclick="updateQty('${item.id}', 1)">+</button>
                        </div>
                        <button class="btn-icon btn-remove" onclick="removeFromCart('${item.id}')" aria-label="Eliminar">
                            <span class="material-symbols-outlined">delete</span>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Modal Checkout
function toggleCheckoutModal(show = true) {
    if (show) {
        checkoutModal.hidden = false;
        document.body.classList.add('modal-open');
    } else {
        checkoutModal.hidden = true;
        document.body.classList.remove('modal-open');
        checkoutForm.reset();
    }
}

btnCheckout.addEventListener('click', () => {
    toggleCart(); // Cierra el sidebar
    toggleCheckoutModal(true);
});

btnCloseModal.addEventListener('click', () => toggleCheckoutModal(false));
btnCancelCheckout.addEventListener('click', () => toggleCheckoutModal(false));

// Procesar Pago
checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const nombre = document.getElementById('client-name').value.trim();
    const email = document.getElementById('client-email').value.trim();
    const telefono = document.getElementById('client-phone').value.trim();

    // 1. Gestión del Cliente
    let clientes = leerLS('clientes', []);
    let cliente = clientes.find(c => c.email.toLowerCase() === email.toLowerCase());
    
    if (!cliente) {
        cliente = {
            id: generateId(),
            nombre,
            email,
            telefono,
            categoria: 'Cliente Web'
        };
        clientes.push(cliente);
        guardarLS('clientes', clientes);
    }

    // 2. Descontar Stock de Productos
    // Volvemos a leer por seguridad
    let productosActualizados = leerLS('productos', []);
    
    cart.forEach(cartItem => {
        const dbP = productosActualizados.find(p => p.id === cartItem.id);
        if (dbP) {
            dbP.stock = (Number(dbP.stock) - cartItem.qty).toString();
        }
    });
    guardarLS('productos', productosActualizados);

    // 3. Crear el Pedido
    let pedidos = leerLS('pedidos', []);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    
    const nuevoPedido = {
        id: generateId(),
        clienteId: cliente.id,
        productos: cart.map(c => ({ id: c.id, cantidad: c.qty })), // Referencia mínima
        fecha: new Date().toISOString(),
        total: totalPrice.toString(),
        estado: 'Pendiente'
    };
    
    pedidos.push(nuevoPedido);
    guardarLS('pedidos', pedidos);

    // 4. Limpiar y Confirmar
    cart = [];
    actualizarCarrito();
    cargarProductos(); // Refrescar stock en pantalla
    toggleCheckoutModal(false);
    showToast('¡Pedido completado con éxito!');
});

// Toast Notification
let toastTimer;
function showToast(message, type = 'success') {
    clearTimeout(toastTimer);
    toast.textContent = message;
    
    if (type === 'error') {
        toast.style.backgroundColor = 'var(--danger-color)';
    } else {
        toast.style.backgroundColor = 'var(--success-color)';
    }

    toast.classList.add('show');
    toastTimer = window.setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
