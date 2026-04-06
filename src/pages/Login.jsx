import { useState } from "react";
import { login } from "../api/api";
import { useToast } from "../context/useToast";

export default function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { showToast } = useToast();

  const handleLogin = async () => {
    const res = await login({
      username,
      password,
    });

    if (!res.ok) {
      showToast(res.error, "error");
      return;
    }

    // 🔥 éxito
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("rol", res.data.rol);

    setToken(res.data.token);
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>

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

      <button className="btn btn-dark" onClick={handleLogin}>
        Ingresar
      </button>
    </div>
  );
}
