import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductoById, registrarSalida } from "../api/api";

export default function Salida({ token }) {

  const { id } = useParams();
  const navigate = useNavigate();

  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [motivo, setMotivo] = useState("");

  useEffect(() => {
    getProductoById(id, token).then(setProducto);
  }, []);

  const handleSubmit = async () => {

    if (cantidad <= 0) {
      alert("Cantidad inválida");
      return;
    }

    try {
      await registrarSalida({
        productoId: id,
        cantidad,
        motivo
      }, token);

      alert("Salida registrada");

      navigate("/productos");

    // eslint-disable-next-line no-unused-vars
    } catch (e) {
      alert("Error al registrar salida");
     
    }
  };

  if (!producto) return <p className="text-center mt-5">Cargando...</p>;

  return (
    <div className="container mt-5">

      <div className="p-4 shadow-sm bg-white"
        style={{
          borderRadius: "12px",
          border: "1px solid #e9ecef"
        }}
      >

        {/* <h4 className="mb-2 text-center">Retirar Material</h4> */}

        {/* 🧱 INFO PRODUCTO */}
        <div className="text-center mb-4">
            <div className="d-flex align-items-center justify-content-center gap-4">
  <h4>{producto.nombre} - {producto.codigo}</h4>
       {producto.urlImagen && (
            <img
              src={producto.urlImagen}
              alt="producto"
              style={{
                maxHeight: "100px",
                objectFit: "contain",
                backgroundColor: "#f8f9fa",
                borderRadius: "8px",
                padding: "10px"
              }}
            />
          )}
            </div>

        
          
          <p className="mt-3">
            Stock actual:{" "}
            <strong className={producto.cantidad < producto.stockMinimo ? "text-danger" : ""}>
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
            onChange={(e) => setCantidad(e.target.value)}
          />
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