import { useEffect, useState } from "react";
import { getProductos } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Productos({ token }) {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();
  const rol = localStorage.getItem("rol");

  useEffect(() => {
    getProductos(token).then(setProductos);
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Productos</h2>

      <div className="row">
        {productos.map((p) => (
          <div
            key={p.id}
            className="col-md-4 mb-4"
            onClick={() => {
              if (rol === "OPERARIO") {
                navigate(`/salida/${p.id}`);
              } else {
                navigate(`/movimiento/${p.id}`);
              }
            }}
            style={{ cursor: "pointer" }}
          >
            <div className="card h-100 shadow-sm">
              {/* 🖼️ Imagen */}
              {p.urlImagen ? (
                <img
                  src={p.urlImagen}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "contain" }}
                />
              ) : (
                <div
                  className="d-flex align-items-center justify-content-center bg-light"
                  style={{ height: "200px" }}
                >
                  <span className="text-muted">Sin imagen</span>
                </div>
              )}

              {/* 📦 Info */}
              <div className="card-body">
                <h5 className="card-title">{p.nombre}</h5>
                <p className="card-text mb-1">
                  <strong>Código:</strong> {p.codigo}
                </p>
                <p className="card-text mb-1">
                  <strong>Stock:</strong> {p.cantidad}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
