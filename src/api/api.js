const API_URL = import.meta.env.VITE_API_URL;

export const login = async (data) => {
  const res = await fetch(`${API_URL}/usuarios/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
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

export const getProductos = async (token) => {
  const res = await fetch(`${API_URL}/productos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  return res.json();
};
