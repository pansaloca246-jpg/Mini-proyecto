const safeStorage = () => {
  if (typeof window === 'undefined' || !window.localStorage) {
    return null;
  }

  return window.localStorage;
};

export function obtener(clave, valorPorDefecto = []) {
  const storage = safeStorage();

  if (!storage) {
    return valorPorDefecto;
  }

  const rawValue = storage.getItem(clave);

  if (rawValue === null) {
    return valorPorDefecto;
  }

  try {
    return JSON.parse(rawValue);
  } catch (error) {
    console.warn(`No se pudo parsear ${clave}:`, error);
    return valorPorDefecto;
  }
}

export function guardar(clave, valor) {
  const storage = safeStorage();

  if (!storage) {
    return;
  }

  storage.setItem(clave, JSON.stringify(valor));
}

export function generarId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function eliminar(clave) {
  const storage = safeStorage();

  if (!storage) {
    return;
  }

  storage.removeItem(clave);
}

export function existe(clave) {
  const storage = safeStorage();

  if (!storage) {
    return false;
  }

  return storage.getItem(clave) !== null;
}
