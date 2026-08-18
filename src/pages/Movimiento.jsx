import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getProductoById,
  registrarEntrada,
  registrarSalida,
} from "../api/api";


export default function Movimiento({ token }) {
  const { id } = useParams();

  const [producto, setProducto] = useState(null);
  const [tipo, setTipo] = useState("SALIDA");
  const [cantidad, setCantidad] = useState(0);
  const [motivo, setMotivo] = useState("");

  useEffect(() => {
    getProductoById(id, token).then(setProducto);
  }, [id, token]);

  if (!producto) {
    return <p className="text-center mt-5">Cargando...</p>;
  }

  const handleSubmit = async () => {
    try {
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

      // 🔥 actualizar producto visualmente
      const actualizado = await getProductoById(id, token);
      setProducto(actualizado);

      // 🔥 limpiar campos
      setCantidad(0);
      setMotivo("");

    } catch (error) {
      console.error(error);

      alert(error.message || "Error al registrar movimiento");
    }
  };

  return (
    <div className="container mt-3 mt-md-5">
      <div
        className="p-3 p-md-4 shadow-sm bg-white"
        style={{
          borderRadius: "12px",
          border: "1px solid #e9ecef",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
  <Link
    to="/productos"
    className="btn btn-outline-secondary btn-sm"
  >
    ← Volver
  </Link>

  <h2 className="m-0 fs-5 text-center flex-grow-1">
    Registrar Movimiento
  </h2>
</div>
    

        <div className="row align-items-center">
          <div className="col-12 col-md-6">
            <h4 className="fs-6 fs-md-4">{producto.nombre}</h4>

            <p className="mb-1 small">
              <strong>Código: ppp</strong> {producto.codigo}
            </p>

            <p className="mb-1 small">
              <strong>Stock actual:</strong>{" "}
              <span
                className={
                  producto.cantidad < producto.stockMinimo
                    ? "text-danger"
                    : ""
                }
              >
                {producto.cantidad}
              </span>
            </p>
          </div>

          <div className="col-md-6 text-center d-none d-md-block">
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

      <div className="mt-3 mt-md-4">

        <div className="mb-2 mb-md-3">
          <label className="form-label small">Tipo</label>

          <select
            className="form-control form-control-sm"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            <option value="SALIDA">Salida</option>
            <option value="ENTRADA">Entrada</option>
          </select>
        </div>

        <div className="mb-2 mb-md-3">
          <label className="form-label small">Cantidad</label>

          <input
            type="number"
            className="form-control form-control-sm"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
          />
        </div>

        <div className="mb-2 mb-md-3">
          <label className="form-label small">Motivo</label>

          <input
            className="form-control form-control-sm"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
          />
        </div>

        <button
          className="btn btn-dark w-100 mt-2"
          onClick={handleSubmit}
        >
          Confirmar Movimiento
        </button>
      </div>
    </div>
  );
}
