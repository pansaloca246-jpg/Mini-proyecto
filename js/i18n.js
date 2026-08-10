const CRTECH_I18N_STORAGE_KEY = 'crtech-preferred-language';

const translations = {
  es: {
    language_label: 'Idioma',
    language_select: 'Seleccionar idioma',
    language_es: 'Español',
    language_en: 'English',
    welcome_message: 'Bienvenido al panel administrativo',
    dashboard_title: 'Dashboard Administrativo',
    dashboard_panel_admin: 'Panel administrativo',
    welcome_again: '¡Bienvenido de nuevo, Samu!',
    greeting_sub: 'Esperamos que tengas un excelente día.',
    metric_products_label: 'Productos',
    metric_products_detail: 'registrados en el inventario',
    metric_clients_label: 'Clientes',
    metric_clients_detail: 'registrados en el sistema',
    metric_providers_label: 'Proveedores',
    metric_providers_detail: 'activos en el sistema',
    metric_orders_label: 'Pedidos',
    metric_orders_detail: '$0.00 en ventas',
    metric_stock_alerts_label: 'Alertas de Stock',
    metric_stock_alerts_detail: 'productos con stock bajo (&le; 5)',
    welcome_dashboard_title: 'Bienvenida al dashboard',
    welcome_dashboard_desc: 'Aquí comienza tu panel operativo. Utiliza el menú lateral para acceder rápidamente a productos, clientes, proveedores y el resumen completo.',
    task_title: 'Tareas pendientes de hoy',
    new_task: 'Nueva Tarea',
    task_modal_title: 'Nueva Tarea',
    task_modal_cancel: 'Cancelar',
    task_modal_save: 'Guardar Tarea',
    alert_stock_low: 'Bajo stock',
    page_title_clients: 'CRUD de clientes',
    clients_subtitle: 'Gestión de clientes',
    clients_list_title: 'Listado de clientes',
    clients_list_desc: 'Aquí se muestra el listado principal para editar o eliminar clientes.',
    alert_clients_hint: 'Mantén la base de datos de clientes actualizada para un mejor servicio.',
    btn_new_client: 'Nuevo Cliente',
    search_clients: 'Buscar clientes por nombre o cédula...',
    empty_clients: 'No hay clientes registrados todavía. Crea el primero para empezar.',
    search_products: 'Buscar productos por nombre o código...',
    search_orders: 'Buscar pedidos por cliente...',
    search_providers: 'Buscar proveedores por nombre o contacto...',
    nav_home: 'Inicio',
    nav_products: 'Productos',
    nav_clients: 'Clientes',
    nav_providers: 'Proveedores',
    nav_orders: 'Pedidos',
    nav_summary: 'Resumen',
    nav_logout: 'Cerrar sesión',
    customers: 'Clientes',
    table_id: 'ID',
    table_name: 'Nombre',
    table_email: 'Correo',
    table_phone: 'Teléfono',
    table_category: 'Tipo de Cliente',
    table_actions: 'Acciones',
    modal_new_client_title: 'Registrar Nuevo Cliente',
    modal_new_client_desc: 'Completa los datos del cliente para guardarlo en el sistema.',
    modal_edit_client_title: 'Editar cliente',
    modal_client_name: 'Nombre / Empresa',
    modal_client_email: 'Correo Electrónico',
    modal_client_phone: 'Teléfono',
    modal_client_category: 'Tipo de Cliente',
    modal_option_select_type: 'Seleccione un tipo',
    modal_client_cancel: 'Cancelar',
    modal_client_save: 'Guardar',
    modal_client_close: 'Cerrar modal',
    confirm_title: '¿Estás seguro?',
    confirm_delete: 'Eliminar',
    confirm_cancel: 'Cancelar',
    toast_client_created: 'Cliente creado correctamente',
    toast_client_updated: 'Cliente actualizado correctamente',
    toast_client_deleted: 'Cliente eliminado',
    toast_client_blocked: 'No tienes permisos para modificar datos',
    edit_client: 'Editar {{name}}',
    delete_client: 'Eliminar {{name}}',
    client_delete_blocked: 'No se puede eliminar a {{name}} porque tiene uno o más pedidos asociados.',
    toast_provider_created: 'Proveedor creado correctamente',
    toast_provider_updated: 'Proveedor actualizado correctamente',
    toast_provider_deleted: 'Proveedor eliminado',
    edit_provider: 'Editar {{name}}',
    delete_provider: 'Eliminar {{name}}',
    toast_product_created: 'Producto creado correctamente',
    toast_product_updated: 'Producto actualizado correctamente',
    toast_product_deleted: 'Producto eliminado',
    toast_order_created: 'Pedido creado correctamente',
    toast_order_deleted: 'Pedido eliminado',
    toast_order_status: 'Estado actualizado',
    toast_order_error: 'Debes agregar al menos un producto.',
    toast_product_error_permissions: 'No tienes permisos para modificar datos',
    toast_product_selection_error: 'Revisa que todos los productos estén seleccionados y la cantidad sea válida.',
    login_empty_user: 'Por favor, ingresa tu usuario.',
    login_empty_pass: 'Por favor, ingresa tu contraseña.',
    login_invalid_user: 'Usuario inválido',
    login_invalid_password: 'Contraseña inválida',
    login_connecting: 'Conectando...',
    login_required_complete: 'Por favor, completa todos los campos.',
    login_password_short: 'La contraseña debe tener mínimo 6 caracteres.',
    login_passwords_mismatch: 'Las contraseñas no coinciden.',
    login_account_created: '¡Cuenta creada exitosamente! Inicia sesión.',
    client_unknown: 'Cliente Desconocido',
    product_deleted: 'Producto Eliminado',
    product_count_zero: '0 productos',
    product_count_one: '1 producto',
    product_count_many: '{{count}} productos',
    order_count_zero: '0 pedidos',
    order_count_one: '1 pedido',
    order_count_many: '{{count}} pedidos',
    provider_count: '0 proveedores',
    product_qty_label: 'Cantidad',
    product_total_text: 'Total',
    empty_product_list: 'No hay productos registrados todavía.',
    products_page_title: 'Productos',
    inventory_subtitle: 'Gestión de inventario',
    products_alert: 'Mantén el catálogo actualizado con stock, precios y categorías claras.',
    products_list_title: 'Listado de productos',
    empty_products: 'No hay productos registrados todavía. Crea el primero para empezar.',
    btn_new_product: 'Nuevo Producto',
    btn_save_product: 'Guardar producto',
    btn_add_product: 'Añadir producto',
    product_name_label: 'Nombre',
    product_category_label: 'Categoría',
    product_category_placeholder: 'Selecciona una categoría',
    product_price_label: 'Precio',
    product_stock_label: 'Stock',
    product_provider_label: 'Proveedor',
    product_provider_placeholder: 'Selecciona un proveedor',
    product_desc_label: 'Descripción',
    product_desc_help: 'La descripción es opcional, pero ayuda a detallar el estado del producto.',
    modal_product_new_title: 'Registrar Nuevo Producto',
    modal_product_desc: 'Completa los datos del producto para guardarlo en el inventario.',
    product_modal_title_new: 'Nuevo producto',
    product_modal_title_edit: 'Editar producto',
    edit_product: 'Editar {{name}}',
    delete_product: 'Eliminar {{name}}',
    product_delete_blocked: 'No se puede eliminar a {{name}} porque está asociado a uno o más pedidos.',
    product_action_delete: '¿Deseas eliminar {{name}}?',
    provider_modal_title_new: 'Nuevo proveedor',
    provider_modal_title_edit: 'Editar proveedor',
    provider_action_delete: '¿Deseas eliminar a {{name}}?',
    order_action_delete: '¿Deseas eliminar el pedido #{{id}}?',
    orders_page_title: 'Pedidos',
    orders_subtitle: 'Gestión de ventas',
    orders_list_title: 'Listado de pedidos',
    orders_alert: 'Los pedidos reflejan tus ventas en tiempo real. Gestiona sus estados de manera ágil.',
    orders_empty: 'No hay pedidos registrados todavía. Crea el primero para empezar.',
    orders_empty_title: 'No hay pedidos',
    orders_modal_title_new: 'Registrar Nuevo Pedido',
    orders_modal_product_title: 'Productos',
    order_products_row_placeholder: 'Selecciona un producto...',
    order_client_column: 'Cliente',
    order_date_column: 'Fecha',
    order_items_column: 'Artículos',
    order_total_column: 'Total',
    order_status_column: 'Estado',
    order_client_label: 'Cliente',
    order_select_client: 'Selecciona un cliente',
    order_status_label: 'Estado',
    order_row_remove_aria: 'Eliminar fila',
    order_add_product_aria: 'Añadir producto',
    status_pending: 'Pendiente',
    status_processing: 'En proceso',
    status_delivered: 'Entregado',
    order_total_items: 'Total Artículos',
    order_total: 'Total Pedido',
    order_cancel: 'Cancelar',
    order_save: 'Guardar pedido',
    order_delete_prompt: '¿Deseas eliminar el pedido #{{id}}?',
    order_delete_button: 'Eliminar pedido',
    provider_count_label: '0 proveedores',
    btn_new_provider: 'Nuevo Proveedor',
    providers_alert: 'Asegura un abastecimiento constante manteniendo el contacto con tus proveedores.',
    providers_list_title: 'Listado de proveedores',
    providers_list_desc: 'Aquí se muestra el listado principal para editar o eliminar proveedores.',
    empty_providers: 'No hay proveedores registrados todavía. Crea el primero para empezar.',
    provider_name_column: 'Empresa',
    provider_contact_column: 'Contacto',
    provider_phone_column: 'Teléfono',
    provider_category_column: 'Categoría',
    provider_modal_new_title: 'Registrar Nuevo Proveedor',
    provider_modal_desc: 'Completa los datos del proveedor para guardarlo en el sistema.',
    provider_name_label: 'Nombre / Empresa',
    provider_contact_label: 'Contacto',
    provider_phone_label: 'Teléfono',
    provider_category_label: 'Categoría',
    provider_category_placeholder: 'Seleccione una categoría',
    summary_subtitle: 'Resumen operativo',
    summary_title: 'Datos Generales',
    print_report: 'Imprimir Reporte',
    download_excel: 'Descargar en Excel',
    summary_products_title: 'Total Productos',
    summary_products_detail: 'Registrados en inventario',
    summary_clients_title: 'Total Clientes',
    summary_clients_detail: 'Base de datos de clientes',
    summary_providers_title: 'Total Proveedores',
    summary_providers_detail: 'Proveedores activos',
    summary_orders_title: 'Total Pedidos',
    summary_sales_detail: 'en ventas',
    summary_report_title: 'Acerca del Reporte',
    summary_report_desc: 'El archivo Excel consolidará toda la información almacenada localmente, organizándola en secciones por Productos, Clientes y Proveedores.',
    login_location: 'San José, Costa Rica',
    login_hero_title: 'Impulsando el futuro digital de Centroamérica',
    login_hero_desc: 'Accede al panel de control administrativo y gestiona tus recursos empresariales de forma inteligente, rápida y segura.',
    login_footer: '&copy; 2026 CR-Tech Systems. Todos los derechos reservados.',
    login_form_title: 'Bienvenido a CRTECH',
    login_form_subtitle: 'Inicia sesión o regístrate para acceder al panel administrativo',
    login_user: 'Usuario o Correo Electrónico',
    login_username_placeholder: 'ej. admin',
    login_password: 'Contraseña',
    login_password_placeholder: '••••••••',
    login_toggle_password: 'Mostrar contraseña',
    login_forgot: '¿La olvidaste?',
    login_register_cta_prefix: '¿No tienes cuenta?',
    login_register_cta: 'Regístrate aquí',
    login_remember: 'Recordar sesión',
    login_btn: 'Iniciar Sesión',
    register_form_title: 'Crear cuenta',
    register_form_subtitle: 'Regístrate para obtener acceso al panel administrativo.',
    register_name: 'Nombre Completo',
    register_email: 'Correo Electrónico',
    register_role: 'Perfil de Usuario',
    register_password_confirm: 'Confirmar Contraseña',
    register_button: 'Registrarse',
    login_reg_name_placeholder: 'ej. Juan Pérez',
    login_reg_email_placeholder: 'correo@ejemplo.com',
    login_reg_pass_placeholder: 'Mínimo 6 caracteres',
    login_reg_confirm_placeholder: 'Repite la contraseña',
    login_role_user: 'Vendedor / Usuario',
    login_role_admin: 'Administrador',
    login_existing_prefix: '¿Ya tienes cuenta?',
    login_existing: 'Inicia sesión',
    login_connecting: 'Conectando...',
    login_empty_user: 'Por favor, ingresa tu usuario.',
    login_empty_pass: 'Por favor, ingresa tu contraseña.',
    login_invalid_user: 'Usuario inválido',
    login_invalid_password: 'Contraseña inválida',
    login_required_complete: 'Por favor, completa todos los campos.',
    login_password_short: 'La contraseña debe tener mínimo 6 caracteres.',
    login_passwords_mismatch: 'Las contraseñas no coinciden.',
    login_account_created: '¡Cuenta creada exitosamente! Inicia sesión.',
    login_remember: 'Recordar sesión',
    login_btn: 'Iniciar Sesión',
    login_register_cta: '¿No tienes cuenta? Regístrate aquí',
    register_form_title: 'Crear cuenta',
    register_form_subtitle: 'Regístrate para obtener acceso al panel administrativo.',
    register_name: 'Nombre Completo',
    register_email: 'Correo Electrónico',
    register_role: 'Perfil de Usuario',
    register_password_confirm: 'Confirmar Contraseña',
    register_button: 'Registrarse',
    login_existing: '¿Ya tienes cuenta? Inicia sesión'
  },
  en: {
    language_label: 'Language',
    language_select: 'Select language',
    language_es: 'Español',
    language_en: 'English',
    welcome_message: 'Welcome to the admin dashboard',
    dashboard_title: 'Administrative Dashboard',
    dashboard_panel_admin: 'Administrative panel',
    welcome_again: 'Welcome back, Samu!',
    greeting_sub: 'We hope you have an excellent day.',
    metric_products_label: 'Products',
    metric_products_detail: 'registered in inventory',
    metric_clients_label: 'Clients',
    metric_clients_detail: 'registered in the system',
    metric_providers_label: 'Providers',
    metric_providers_detail: 'active in the system',
    metric_orders_label: 'Orders',
    metric_orders_detail: '$0.00 in sales',
    metric_stock_alerts_label: 'Stock Alerts',
    metric_stock_alerts_detail: 'products with low stock (&le; 5)',
    welcome_dashboard_title: 'Welcome to the dashboard',
    welcome_dashboard_desc: 'This is where your operations panel begins. Use the side menu to quickly access products, clients, suppliers and the full summary.',
    task_title: 'Tasks pending for today',
    new_task: 'New Task',
    task_modal_title: 'New Task',
    task_modal_cancel: 'Cancel',
    task_modal_save: 'Save Task',
    alert_stock_low: 'Low stock',
    page_title_clients: 'Client CRUD',
    clients_subtitle: 'Customer management',
    clients_list_title: 'Client list',
    clients_list_desc: 'This is the main list for editing or deleting clients.',
    alert_clients_hint: 'Keep the client database updated for better service.',
    btn_new_client: 'New Client',
    search_clients: 'Search clients by name or ID...',
    empty_clients: 'There are no registered clients yet. Create the first one to start.',
    nav_home: 'Home',
    nav_products: 'Products',
    nav_clients: 'Clients',
    nav_providers: 'Suppliers',
    nav_orders: 'Orders',
    nav_summary: 'Summary',
    nav_logout: 'Log out',
    customers: 'Customers',
    table_id: 'ID',
    table_name: 'Name',
    table_email: 'Email',
    table_phone: 'Phone',
    table_category: 'Customer Type',
    table_actions: 'Actions',
    modal_new_client_title: 'Register New Client',
    modal_new_client_desc: 'Complete the client information to save it in the system.',
    modal_edit_client_title: 'Edit client',
    modal_client_name: 'Name / Company',
    modal_client_email: 'Email',
    modal_client_phone: 'Phone',
    modal_client_category: 'Customer Type',
    modal_option_select_type: 'Choose a type',
    modal_client_cancel: 'Cancel',
    modal_client_save: 'Save',
    modal_client_close: 'Close modal',
    confirm_title: 'Are you sure?',
    confirm_delete: 'Delete',
    confirm_cancel: 'Cancel',
    toast_client_created: 'Client created successfully',
    toast_client_updated: 'Client updated successfully',
    toast_client_deleted: 'Client deleted',
    toast_client_blocked: 'You do not have permission to modify data',
    edit_client: 'Edit {{name}}',
    delete_client: 'Delete {{name}}',
    client_delete_blocked: 'Cannot delete {{name}} because it is associated with one or more orders.',
    toast_provider_created: 'Supplier created correctly',
    toast_provider_updated: 'Supplier updated correctly',
    toast_provider_deleted: 'Supplier deleted',
    edit_provider: 'Edit {{name}}',
    delete_provider: 'Delete {{name}}',
    toast_product_created: 'Product created successfully',
    toast_product_updated: 'Product updated successfully',
    toast_product_deleted: 'Product deleted',
    toast_order_created: 'Order created successfully',
    toast_order_deleted: 'Order deleted',
    toast_order_status: 'Status updated',
    toast_order_error: 'You must add at least one product.',
    toast_product_error_permissions: 'You do not have permission to modify data',
    toast_product_selection_error: 'Review all products have a valid selection and quantity.',
    login_empty_user: 'Please enter your username.',
    login_empty_pass: 'Please enter your password.',
    login_invalid_user: 'Invalid user',
    login_invalid_password: 'Invalid password',
    login_connecting: 'Connecting...',
    login_required_complete: 'Please complete all fields.',
    login_password_short: 'Password must be at least 6 characters long.',
    login_passwords_mismatch: 'Passwords do not match.',
    login_account_created: 'Account created successfully! Sign in.',
    client_unknown: 'Unknown Client',
    product_deleted: 'Deleted Product',
    product_count_zero: '0 products',
    product_count_one: '1 product',
    product_count_many: '{{count}} products',
    order_count_zero: '0 orders',
    order_count_one: '1 order',
    order_count_many: '{{count}} orders',
    provider_count: '0 suppliers',
    product_qty_label: 'Quantity',
    product_total_text: 'Total',
    empty_product_list: 'There are no registered products yet.',
    products_page_title: 'Products',
    inventory_subtitle: 'Inventory management',
    products_alert: 'Keep the catalog updated with clear stock, prices and categories.',
    products_list_title: 'Products list',
    empty_products: 'There are no products registered yet. Create the first one to start.',
    btn_new_product: 'New Product',
    btn_save_product: 'Save product',
    btn_add_product: 'Add product',
    product_name_label: 'Name',
    product_category_label: 'Category',
    product_category_placeholder: 'Choose a category',
    product_price_label: 'Price',
    product_stock_label: 'Stock',
    product_provider_label: 'Supplier',
    product_provider_placeholder: 'Choose a supplier',
    product_desc_label: 'Description',
    product_desc_help: 'The description is optional, but helps explain the product state.',
    modal_product_new_title: 'Register New Product',
    modal_product_desc: 'Complete the product information to save it to inventory.',
    product_modal_title_new: 'New product',
    product_modal_title_edit: 'Edit product',
    edit_product: 'Edit {{name}}',
    delete_product: 'Delete {{name}}',
    product_delete_blocked: 'Cannot delete {{name}} because it is associated with one or more orders.',
    product_action_delete: 'Do you want to delete {{name}}?',
    provider_modal_title_new: 'New supplier',
    provider_modal_title_edit: 'Edit supplier',
    provider_action_delete: 'Do you want to delete {{name}}?',
    order_action_delete: 'Do you want to delete order #{{id}}?',
    orders_page_title: 'Orders',
    orders_subtitle: 'Sales management',
    orders_list_title: 'Orders list',
    orders_alert: 'Orders reflect your sales in real time. Manage their statuses quickly.',
    orders_empty: 'There are no orders registered yet. Create the first one to start.',
    orders_empty_title: 'No orders',
    orders_modal_title_new: 'Register New Order',
    orders_modal_product_title: 'Products',
    order_products_row_placeholder: 'Choose a product...',
    order_client_column: 'Client',
    order_date_column: 'Date',
    order_items_column: 'Items',
    order_total_column: 'Total',
    order_status_column: 'Status',
    order_client_label: 'Client',
    order_select_client: 'Choose a client',
    order_status_label: 'Status',
    order_row_remove_aria: 'Remove row',
    order_add_product_aria: 'Add product',
    status_pending: 'Pending',
    status_processing: 'In process',
    status_delivered: 'Delivered',
    order_total_items: 'Total Items',
    order_total: 'Order Total',
    order_cancel: 'Cancel',
    order_save: 'Save order',
    order_delete_prompt: 'Do you want to delete order #{{id}}?',
    order_delete_button: 'Delete order',
    provider_count_label: '0 suppliers',
    login_location: 'San José, Costa Rica',
    login_hero_title: 'Driving the digital future of Central America',
    login_hero_desc: 'Access the administrative control panel and manage your business resources intelligently, quickly and securely.',
    login_footer: '&copy; 2026 CR-Tech Systems. All rights reserved.',
    login_form_title: 'Welcome to CRTECH',
    login_form_subtitle: 'Login or register to access the admin panel',
    login_user: 'User or email address',
    login_username_placeholder: 'e.g. admin',
    login_password: 'Password',
    login_password_placeholder: '••••••••',
    login_toggle_password: 'Show password',
    login_forgot: 'Forgot it?',
    login_register_cta_prefix: 'No account?',
    login_register_cta: 'Register here',
    login_remember: 'Remember Session',
    login_btn: 'Log In',
    register_form_title: 'Create account',
    register_form_subtitle: 'Register to get access to the admin panel.',
    register_name: 'Full name',
    register_email: 'Email address',
    register_role: 'User profile',
    register_password_confirm: 'Confirm Password',
    register_button: 'Register',
    login_reg_name_placeholder: 'e.g. John Doe',
    login_reg_email_placeholder: 'mail@example.com',
    login_reg_pass_placeholder: 'Minimum 6 characters',
    login_reg_confirm_placeholder: 'Repeat the password',
    login_role_user: 'Seller / User',
    login_role_admin: 'Administrator',
    login_existing_prefix: 'Already have an account?',
    login_existing: 'Login',
    login_connecting: 'Connecting...',
    login_empty_user: 'Please enter your username.',
    login_empty_pass: 'Please enter your password.',
    login_invalid_user: 'Invalid user',
    login_invalid_password: 'Invalid password',
    login_required_complete: 'Please complete all fields.',
    login_password_short: 'Password must be at least 6 characters long.',
    login_passwords_mismatch: 'Passwords do not match.',
    login_account_created: 'Account created successfully! Sign in.'
  }
};

function getBrowserLanguage() {
  const navigatorLanguage = navigator.language || navigator.userLanguage || 'es';
  return navigatorLanguage.toLowerCase().startsWith('en') ? 'en' : 'es';
}

function getStoredLanguage() {
  const savedLanguage = localStorage.getItem(CRTECH_I18N_STORAGE_KEY);
  if (savedLanguage && translations[savedLanguage]) {
    return savedLanguage;
  }

  return null;
}

function getInitialLanguage() {
  return getStoredLanguage() || getBrowserLanguage();
}

function replaceTemplate(tpl, data) {
  return tpl.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (_, key) => {
    return data[key] ?? '';
  });
}

function t(key, params = {}) {
  const lang = localStorage.getItem(CRTECH_I18N_STORAGE_KEY) || getBrowserLanguage();
  const dictionary = translations[lang] || translations.es;
  const phrase = dictionary[key] || translations.es[key] || key;
  return replaceTemplate(phrase, params);
}

function applyTranslations(lang = 'es') {
  const dictionary = translations[lang] || translations.es;

  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.getAttribute('data-i18n');
    const phrase = dictionary[key] || translations.es[key] || key;
    element.textContent = phrase;
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
    const key = element.getAttribute('data-i18n-placeholder');
    const phrase = dictionary[key] || translations.es[key] || key;
    element.placeholder = phrase;
  });

  document.querySelectorAll('[data-i18n-aria]').forEach((element) => {
    const key = element.getAttribute('data-i18n-aria');
    const phrase = dictionary[key] || translations.es[key] || key;
    element.setAttribute('aria-label', phrase);
  });

  const select = document.getElementById('language-select');
  if (select) {
    select.value = lang;
  }

  if (window.i18nRefreshCallbacks && window.i18nRefreshCallbacks.length) {
    window.i18nRefreshCallbacks.forEach((callback) => callback(lang));
  }
}

function registerI18nRefresh(callback) {
  if (!window.i18nRefreshCallbacks) {
    window.i18nRefreshCallbacks = [];
  }

  window.i18nRefreshCallbacks.push(callback);
}

function initI18n() {
  const topbar = document.querySelector('.topbar') || document.querySelector('.login-container');
  if (!topbar) {
    return;
  }

  const existingSelect = document.getElementById('language-select');
  if (!existingSelect) {
    const languageContainer = document.createElement('div');
    languageContainer.className = 'language-switcher';

    const languageLabel = document.createElement('label');
    languageLabel.className = 'language-switcher__label';
    languageLabel.setAttribute('for', 'language-select');
    languageLabel.textContent = translations.es.language_label;

    const languageSelect = document.createElement('select');
    languageSelect.id = 'language-select';
    languageSelect.className = 'language-selector';
    languageSelect.setAttribute('aria-label', translations.es.language_select);
    languageSelect.innerHTML = `
      <option value="es">${translations.es.language_es}</option>
      <option value="en">${translations.es.language_en}</option>
    `;

    languageContainer.appendChild(languageLabel);
    languageContainer.appendChild(languageSelect);

    if (topbar.classList && topbar.classList.contains('topbar')) {
      const user = topbar.querySelector('.topbar__user');
      if (user) {
        user.after(languageContainer);
      } else {
        topbar.appendChild(languageContainer);
      }
    } else if (topbar.classList && topbar.classList.contains('login-container')) {
      topbar.appendChild(languageContainer);
    }
  }

  const initialLanguage = getInitialLanguage();
  const languageSelect = document.getElementById('language-select');
  if (languageSelect) {
    languageSelect.addEventListener('change', (event) => {
      const nextLang = event.target.value;
      localStorage.setItem(CRTECH_I18N_STORAGE_KEY, nextLang);
      applyTranslations(nextLang);
    });
  }

  applyTranslations(initialLanguage);
}

window.getI18nText = t;
window.registerI18nRefresh = registerI18nRefresh;
window.applyTranslations = applyTranslations;
window.getCurrentLanguage = () => localStorage.getItem(CRTECH_I18N_STORAGE_KEY) || getBrowserLanguage();
document.addEventListener('DOMContentLoaded', initI18n);
