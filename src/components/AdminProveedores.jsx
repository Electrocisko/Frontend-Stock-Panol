import { useState } from "react";
import { crearProveedor } from "../api/api";

export default function AdminProveedores() {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    email: "",
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombre.trim()) {
      setMensaje("El nombre es obligatorio");
      return;
    }

    const res = await crearProveedor(form);

    if (res) {
      setMensaje("Proveedor creado correctamente");
      setForm({ nombre: "", telefono: "", email: "" });
    } else {
      setMensaje("Error al crear proveedor");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Crear Proveedor</h2>

      <form onSubmit={handleSubmit}>
        {/* Nombre */}
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            name="nombre"
            className="form-control"
            value={form.nombre}
            onChange={handleChange}
          />
        </div>

        {/* Teléfono */}
        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input
            type="text"
            name="telefono"
            className="form-control"
            value={form.telefono}
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <button className="btn btn-dark w-100">
          Guardar
        </button>
      </form>

      {mensaje && (
        <div className="mt-3 alert alert-info">
          {mensaje}
        </div>
      )}
    </div>
  );
}