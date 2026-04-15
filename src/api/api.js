const API_URL = import.meta.env.VITE_API_URL;

export const login = async (data) => {
  const res = await fetch(`${API_URL}/usuarios/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const body = await res.json();

  // 🔥 ERROR (ej: 401)
  if (!res.ok) {
    return {
      ok: false,
      error: body.detail || "Error",
    };
  }

  // 🔥 OK
  return {
    ok: true,
    data: body,
  };
};

export const crearProducto = async (data, token) => {
  const res = await fetch(`${API_URL}/productos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

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

  return res; // 🔥 importante devolver res, no json
};

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

    // 🔥 TOKEN VENCIDO / NO AUTORIZADO
    if (res.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("rol");

      // redirigir al login
      window.location.href = "/";

      return null; // 🔥 cortar ejecución
    }

    return res;
  } catch (error) {
    console.error("Error de red:", error);

    // opcional: podés también limpiar sesión
    localStorage.removeItem("token");
    localStorage.removeItem("rol");

    window.location.href = "/";

    return null;
  }
};

export const getMovimientos = async () => {
  const res = await fetchConAuth("/movimientos");

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