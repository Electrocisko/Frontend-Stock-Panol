import { useState } from "react";
import { registrarUsuario } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    username: "",
    password: "",
    checkpassword:""
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

  if (form.password !== form.checkpassword) {
    setError("No coincide password");
    return;
  }

  try {

    const data = {
      "nombre": form.nombre,
      "apellido": form.apellido,
      "username": form.username,
      "password": form.password
    }

    await registrarUsuario(data);

    // Registro exitoso
    navigate("/");
  } catch (err) {
    setError(err.message);
  }
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

                <input
          type="password"
          className="form-control mb-2"
          name="checkpassword"
          placeholder="Reingrese Password"
          onChange={handleChange}
        />

        {error && <p className="text-danger">{error}</p>}

        <button className="btn btn-primary">Registrarse</button>
      </form>
    </div>
  );
}