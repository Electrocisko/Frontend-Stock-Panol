import { useState } from "react";
import { login } from "../api/api";
import { useToast } from "../context/useToast";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await login({
        username,
        password,
      });

      if (!res.ok) {
        showToast(res.error || "Error al iniciar sesión", "error");
        return;
      }

      // Guardado de credenciales nativas
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("rol", res.data.rol);
      localStorage.setItem("nombre", res.data.nombre);

      // ⏱️ CLAVE PARA MÓVIL: Guardamos cuándo expira (Ej: 8 horas)
      const expiracion = Date.now() + (8 * 60 * 60 * 1000);
      localStorage.setItem("token_expires", expiracion.toString());

      setToken(res.data.token);

      navigate("/productos");
    } catch (error) {
      console.error(error);
      showToast(error.message || "Error inesperado", "error");
    }
  };


  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="w-100"
        style={{ maxWidth: "400px" }}
      >
        <h2 className="text-center mb-4">Login</h2>

        <form onSubmit={handleLogin}>
          <input
            className="form-control mb-3"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="btn btn-dark w-100">
            Ingresar
          </button>
        </form>

        {/* 🔥 Ahora SIEMPRE visible */}
        <div className="mt-3 text-center">
          <span className="text-muted">
            ¿No tenés cuenta?
          </span>{" "}
          <Link
            to="/register"
            style={{
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Registrate
          </Link>
        </div>
      </div>
    </div>
  );
}