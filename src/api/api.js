const API_URL = import.meta.env.VITE_API_URL;

// LOGIN
export const login = async (data) => {
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
      error: body.detail || "Error",
    };
  }

  return {
    ok: true,
    data: body,
  };
};

// FETCH CON AUTH (centralizado)
export const fetchConAuth = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    if (res.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("rol");
      window.location.href = "/";
      return null;
    }

    return res;
  } catch (error) {
    console.error("Error de red:", error);

    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    window.location.href = "/";

    return null;
  }
};

// PRODUCTOS
export const getProductos = async () => {
  const res = await fetchConAuth("/productos");
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

// MOVIMIENTOS
export const registrarEntrada = async (data) => {
  const res = await fetchConAuth("/movimientos/entrada", {
    method: "POST",
    body: JSON.stringify(data),
  });

  return res;
};

export const registrarSalida = async (data) => {
  const res = await fetchConAuth("/movimientos/salida", {
    method: "POST",
    body: JSON.stringify(data),
  });

  return res;
};

export const getMovimientos = async () => {
  const res = await fetchConAuth("/movimientos");
  if (!res) return null;
  return await res.json();
};

// USUARIOS
export const getUsuarios = async () => {
  const res = await fetchConAuth("/usuarios");

  if (!res) return null;
  if (!res.ok) throw new Error("Error al obtener usuarios");

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
    return {
      ok: false,
      error: body.detail || "Error al registrar",
    };
  }

  return {
    ok: true,
    data: body,
  };
};

export const resetPassword = async (userId, newPassword) => {
  const res = await fetchConAuth(`/usuarios/${userId}/reset-password`, {
    method: "PUT",
    body: JSON.stringify({ newPassword }),
  });

  if (!res) return null;
  if (!res.ok) throw new Error("Error al resetear password");

  return await res.text();
};

// PROVEEDORES
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