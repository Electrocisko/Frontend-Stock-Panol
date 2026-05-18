const API_URL = import.meta.env.VITE_API_URL;

// ⏱️ Configuración del tiempo máximo de sesión (Ej: 8 horas)
const TIEMPO_EXPIRACION = 8 * 60 * 60 * 1000; 

// Función centralizada para limpiar todo cuando el token muera
const forzarCierreSesion = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("rol");
  localStorage.removeItem("username"); // Aseguramos consistencia con tu App.js
  localStorage.removeItem("token_expires");
  window.location.href = "/";
};

// ===============================
// LOGIN
// ===============================
export const login = async (data) => {
  try {
    const res = await fetch(`${API_URL}/usuarios/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const body = await res.json();

    if (!res.ok) {
      return {
        ok: false,
        error: body.message || body.detail || body.error || "Credenciales incorrectas",
      };
    }

    // 💡 IMPORTANTE: El guardado de datos lo vas a manejar en tu componente Login.js
    // Acá solo retornamos la data exitosa al componente.
    return {
      ok: true,
      data: body,
    };
  } catch (error) {
    console.error("Error login:", error);
    return {
      ok: false,
      error: "Error de conexión",
    };
  }
};

// ===============================
// FETCH CON AUTH (CENTRALIZADO)
// ===============================
export const fetchConAuth = async (endpoint, options = {}) => {
  // Cambiado todo a localStorage 🔐
  const token = localStorage.getItem("token");
  const expiresAt = localStorage.getItem("token_expires");
  const ahora = Date.now();

  // 1️⃣ Control de tiempo local: Si expiró antes de tirar la petición, limpia y saca al usuario
  if (expiresAt && ahora > parseInt(expiresAt)) {
    forzarCierreSesion();
    return null;
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  // 2️⃣ Control del Backend: Si Spring Boot devuelve 401, limpia y saca al usuario
  if (res.status === 401) {
    forzarCierreSesion();
    return null;
  }

  // Errores normales de la API
  if (!res.ok) {
    let errorMessage = "Error";
    try {
      const body = await res.json();
      errorMessage = body.message || body.detail || body.error || errorMessage;
    } catch {
      // Si no viene un JSON válido no rompe la app
    }
    throw new Error(errorMessage);
  }

  return res;
};

// ===============================
// PRODUCTOS
// ===============================
export const getProductos = async () => {
  const res = await fetchConAuth("/productos");
  if (!res) return null;
  return await res.json();
};

export const getProductosInactivos = async () => {
  const res = await fetchConAuth("/productos/inactivos");
  if (!res) return null;
  return await res.json();
};

export const getProductoById = async (id) => {
  const res = await fetchConAuth(`/productos/${id}`);
  if (!res) return null;
  return await res.json();
};

export const crearProducto = async (data) => {
  const res = await fetchConAuth("/productos", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res) return null;
  return await res.json();
};

export const actualizarProducto = async (id, data) => {
  const res = await fetchConAuth(`/productos/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  if (!res) return null;
  return await res.json();
};

// ===============================
// MOVIMIENTOS
// ===============================
export const registrarEntrada = async (data) => {
  const res = await fetchConAuth("/movimientos/entrada", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res) return null;
  return await res.json();
};

export const registrarSalida = async (data) => {
  const res = await fetchConAuth("/movimientos/salida", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res) return null;
  return await res.json();
};

export const getMovimientos = async () => {
  const res = await fetchConAuth("/movimientos");
  if (!res) return null;
  return await res.json();
};

// ===============================
// USUARIOS
// ===============================
export const getUsuarios = async () => {
  const res = await fetchConAuth("/usuarios");
  if (!res) return null;
  return await res.json();
};

export const registrarUsuario = async (data) => {
  const res = await fetch(`${API_URL}/usuarios/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const body = await res.json();

  if (!res.ok) {
    throw new Error(body.message || body.detail || "Error al registrar");
  }

  return body;
};

export const resetPassword = async (userId, newPassword) => {
  const res = await fetchConAuth(`/usuarios/${userId}/reset-password`, {
    method: "PUT",
    body: JSON.stringify({ newPassword }),
  });
  if (!res) return null;
  return await res.text();
};

// ===============================
// PROVEEDORES
// ===============================
export const crearProveedor = async (data) => {
  const res = await fetchConAuth("/proveedores", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res) return null;
  return await res.json();
};

export const getProveedores = async () => {
  const res = await fetchConAuth("/proveedores");
  if (!res) return null;
  return await res.json();
};

// ===============================
// EXPORTAR PRODUCTOS
// ===============================
export const exportarProductos = async () => {
  const res = await fetchConAuth("/productos/exportar", {
    method: "GET",
    headers: {},
  });
  if (!res) return null;
  return await res.blob();
};
