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

      

      // 🔴 error controlado (tu formato actual)
      if (!res.ok) {
        showToast(res.error || "Error al iniciar sesión", "error");
        return;
      }

      // ✅ éxito
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("rol", res.data.rol);
      localStorage.setItem("nombre", res.data.nombre);

      setToken(res.data.token);

      navigate("/productos");

    } catch (error) {
      // 🔥 por si algún día login usa throw
      console.error(error);
      showToast(error.message || "Error inesperado", "error");
    }
  };

  return (
    <div
      className="container d-flex flex-column"
      style={{ minHeight: "100vh" }}
    >
      <div className="mt-5">
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <input
            className="form-control mb-2"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            className="form-control mb-2"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="btn btn-dark w-100">
            Ingresar
          </button>
        </form>
      </div>

      <div className="mt-auto mb-3 text-center text-muted">
        ¿No tenés cuenta?{" "}
        <Link to="/register" style={{ fontWeight: "bold" }}>
          Registrate
        </Link>
      </div>
    </div>
  );
}