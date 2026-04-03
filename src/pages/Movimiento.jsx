import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductoById } from "../api/api";

export default function Movimiento({ token }) {

  const { id } = useParams();

  const [producto, setProducto] = useState(null);

  useEffect(() => {
    getProductoById(id, token).then(setProducto);
  }, []);

  if (!producto) {
    return <p className="text-center mt-5">Cargando...</p>;
  }

return (
  <div className="container mt-5">

    <div className="p-4 shadow-sm bg-white"
      style={{
        borderRadius: "12px",
        border: "1px solid #e9ecef"
      }}
    >

      <h2 className="mb-4">Registrar Movimiento</h2>

      <div className="row align-items-center">

        {/* 🔵 INFO */}
        <div className="col-md-6">

          <h4>{producto.nombre}</h4>

          <p><strong>Código:</strong> {producto.codigo}</p>

          <p>
            <strong>Stock actual:</strong>{" "}
            <span className={producto.cantidad < producto.stockMinimo ? "text-danger" : ""}>
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
                padding: "10px"
              }}
            />
          ) : (
            <p className="text-muted">Sin imagen</p>
          )}

        </div>

      </div>

    </div>

  </div>
);
}