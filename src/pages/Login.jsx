import { useState } from "react";
import { login } from "../api/api";

export default function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const data = await login({ username, password });

    localStorage.setItem("token", data.token);
    localStorage.setItem("rol", data.rol);   // 🔥 importante
    setToken(data.token);
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>

      <input className="form-control mb-2"
        placeholder="Usuario"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input type="password" className="form-control mb-2"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="btn btn-dark" onClick={handleLogin}>
        Ingresar
      </button>
    </div>
  );
}