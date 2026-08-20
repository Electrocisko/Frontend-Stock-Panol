import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { crearProyecto } from "../api/api";

const NuevoProyecto = () => {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = async () => {
    if (!nombre.trim()) {
      alert("El nombre del proyecto es obligatorio");
      return;
    }

    try {
      await crearProyecto({
        nombre: nombre.trim(),
        descripcion: descripcion.trim(),
      });

      alert("Proyecto creado correctamente");

      navigate("/admin/proyectos");

    } catch (error) {
      console.error(error);
      alert(error.message || "Error al crear el proyecto");
    }
  };

  return (
    <div className="container py-4">

      <div className="mb-4">
        <Link
          to="/admin/proyectos"
          className="btn btn-outline-secondary btn-sm"
        >
          ← Volver
        </Link>
      </div>

      <div
        className="p-4 shadow-sm bg-white"
        style={{
          borderRadius: "12px",
          border: "1px solid #e9ecef",
        }}
      >
        <h2 className="mb-4">Nuevo Proyecto</h2>

        <div className="mb-3">
          <label className="form-label">Nombre</label>

          <input
            type="text"
            className="form-control border-secondary"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Descripción</label>

          <textarea
            className="form-control border-secondary"
            rows="3"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>

        <button
          className="btn btn-dark w-100"
          onClick={handleSubmit}
        >
          Crear Proyecto
        </button>

      </div>
    </div>
  );
};

export default NuevoProyecto;
