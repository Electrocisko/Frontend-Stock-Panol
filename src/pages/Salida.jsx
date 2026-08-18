import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getProductoById,
  registrarSalida,
  getProyectosEnCurso,
} from "../api/api";
import { useToast } from "../context/useToast";

export default function Salida({ token }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [motivo, setMotivo] = useState("");
  const [proyectos, setProyectos] = useState([]);
  const [proyectoId, setProyectoId] = useState("");

  useEffect(() => {
    getProductoById(id, token).then(setProducto);

    getProyectosEnCurso(token).then(setProyectos);
  }, [id, token]);

  const handleSubmit = async () => {
    if (cantidad <= 0) {
      showToast("Cantidad inválida", "error");
      return;
    }

    try {
      await registrarSalida({
        productoId: id,
        cantidad,
        motivo,
        proyectoId: proyectoId === "" ? null : Number(proyectoId),
      });

      showToast("Salida registrada", "success");

      setTimeout(() => {
        navigate("/productos");
      }, 2000);
    } catch (error) {
      showToast(error.message || "Error", "error");
    }
  };

  if (!producto) return <p className="text-center mt-5">Cargando...</p>;

  return (
    <div className="container mt-5">
      <div
        className="p-4 shadow-sm bg-white"
        style={{
          borderRadius: "12px",
          border: "1px solid #e9ecef",
        }}
      >
        {/* <h4 className="mb-2 text-center">Retirar Material</h4> */}

        {/* 🧱 INFO PRODUCTO */}
        <div className="text-center mb-4">
          <div className="d-flex align-items-center justify-content-center gap-4">
            <h4>
              {producto.nombre}
            </h4>
            {producto.urlImagen && (
              <img
                src={producto.urlImagen}
                alt="producto"
                style={{
                  maxHeight: "100px",
                  objectFit: "contain",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "8px",
                  padding: "10px",
                }}
              />
            )}
          </div>

          <p className="mt-3">
            Stock actual:{" "}
            <strong
              className={
                producto.cantidad < producto.stockMinimo ? "text-danger" : ""
              }
            >
              {producto.cantidad}
            </strong>
          </p>
        </div>

        {/* 🔢 CANTIDAD */}
        <div className="mb-3">
          <label className="form-label">Cantidad que retira</label>
          <input
            type="number"
            className="form-control form-control-lg"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
          />
        </div>

        {/* 🏗️ PROYECTO / DESTINO */}
        <div className="mb-3">
          <label className="form-label">Proyecto </label>

          <select
            className="form-select"
            value={proyectoId}
            onChange={(e) => setProyectoId(e.target.value)}
          >
            <option value="">Uso taller</option>

            {proyectos.map((proyecto) => (
              <option key={proyecto.id} value={proyecto.id}>
                {proyecto.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* 📝 MOTIVO */}
        <div className="mb-4">
          <label className="form-label">Motivo</label>
          <input
            className="form-control"
            placeholder="Ej: Producción, armado, cliente..."
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
          />
        </div>

        {/* 🔥 BOTÓN GRANDE */}
        <button
          className="btn btn-dark w-100 py-3"
          style={{ fontSize: "1.2rem" }}
          onClick={handleSubmit}
        >
          RETIRAR MATERIAL
        </button>
      </div>
    </div>
  );
}
