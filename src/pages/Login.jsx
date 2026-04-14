import { useState } from "react";
import { login } from "../api/api";
import { useToast } from "../context/useToast";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { showToast } = useToast();
  const navigate = useNavigate(); // 🔥 IMPORTANTE

  const handleLogin = async (e) => {
    e.preventDefault(); // 🔥 evita recarga

    const res = await login({
      username,
      password,
    });

    if (!res.ok) {
      showToast(res.error, "error");
      return;
    }

    // 🔥 guardar sesión
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("rol", res.data.rol);

    // 🔥 actualizar estado global
    setToken(res.data.token);

    // 🔥 REDIRECCIÓN (esto te faltaba)
    navigate("/productos");
  };

 return (
  <div
    className="container d-flex flex-column"
    style={{ minHeight: "100vh" }}
  >
    {/* 🔝 CONTENIDO CENTRAL */}
    <div className="mt-5">
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          className="form-control mb-2"
          placeholder="Usuario"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-2"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-dark w-100">
          Ingresar
        </button>
      </form>
    </div>

    {/* 🔻 FOOTER (empujado abajo) */}
    <div className="mt-auto mb-3 text-center text-muted">
      ¿No tenés cuenta?{" "}
      <Link to="/register" style={{ fontWeight: "bold" }}>
        Registrate
      </Link>
    </div>
  </div>
);
}