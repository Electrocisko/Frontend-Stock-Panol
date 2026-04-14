import { useState } from "react";
import { registrarUsuario } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await registrarUsuario(form);

    if (!res.ok) {
      setError(res.error);
      return;
    }

    // ✅ Registro exitoso
    navigate("/"); // vuelve al login
  };

  return (
    <div className="container mt-5">
      <h2>Registro</h2>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          name="nombre"
          placeholder="Nombre"
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="apellido"
          placeholder="Apellido"
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />

        <input
          type="password"
          className="form-control mb-2"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        {error && <p className="text-danger">{error}</p>}

        <button className="btn btn-primary">Registrarse</button>
      </form>
    </div>
  );
}