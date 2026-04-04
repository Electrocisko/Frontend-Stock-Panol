import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductoById, registrarEntrada, registrarSalida } from "../api/api";

export default function Movimiento({ token }) {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [tipo, setTipo] = useState("SALIDA");
  const [cantidad, setCantidad] = useState(0);
  const [motivo, setMotivo] = useState("");

  useEffect(() => {
    getProductoById(id, token).then(setProducto);
  }, []);

  if (!producto) {
    return <p className="text-center mt-5">Cargando...</p>;
  }

  const handleSubmit = async () => {
    const data = {
      productoId: id,
      cantidad,
      motivo,
    };

    if (tipo === "ENTRADA") {
      await registrarEntrada(data, token);
    } else {
      await registrarSalida(data, token);
    }

    alert("Movimiento registrado");
  };

  return (
    <div className="container mt-5">
      <div
        className="p-4 shadow-sm bg-white"
        style={{
          borderRadius: "12px",
          border: "1px solid #e9ecef",
        }}
      >
        <h2 className="mb-4">Registrar Movimiento</h2>

        <div className="row align-items-center">
          {/* 🔵 INFO */}
          <div className="col-md-6">
            <h4>{producto.nombre}</h4>

            <p>
              <strong>Código:</strong> {producto.codigo}
            </p>

            <p>
              <strong>Stock actual:</strong>{" "}
              <span
                className={
                  producto.cantidad < producto.stockMinimo ? "text-danger" : ""
                }
              >
                {producto.cantidad}
              </span>
            </p>
          </div>

          {/* 🖼️ IMAGEN */}
          <div className="col-md-6 text-center">
            {producto.urlImagen ? (
              <img
                src={producto.urlImagen}
                alt="producto"
                style={{
                  maxWidth: "100%",
                  maxHeight: "220px",
                  objectFit: "contain",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "8px",
                  padding: "10px",
                }}
              />
            ) : (
              <p className="text-muted">Sin imagen</p>
            )}
          </div>
        </div>
      </div>
      <div className="mt-4">

  {/* 🔹 Tipo */}
  <div className="mb-3">
    <label className="form-label">Tipo</label>
    <select
      className="form-control"
      value={tipo}
      onChange={(e) => setTipo(e.target.value)}
    >
      <option value="SALIDA">Salida</option>
      <option value="ENTRADA">Entrada</option>
    </select>
  </div>

  {/* 🔹 Cantidad */}
  <div className="mb-3">
    <label className="form-label">Cantidad</label>
    <input
      type="number"
      className="form-control"
      value={cantidad}
      onChange={(e) => setCantidad(e.target.value)}
    />
  </div>

  {/* 🔹 Motivo */}
  <div className="mb-3">
    <label className="form-label">Motivo</label>
    <input
      className="form-control"
      value={motivo}
      onChange={(e) => setMotivo(e.target.value)}
    />
  </div>

  {/* 🔥 Botón */}
  <button className="btn btn-dark w-100" onClick={handleSubmit}>
    Confirmar Movimiento
  </button>

</div>
    </div>


    
  );
}
