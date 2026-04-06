import { useEffect, useState } from "react";
import { getProductos } from "../api/api";
import { useNavigate } from "react-router-dom";
import { CATEGORIAS } from "../api/categorias.js";

export default function Productos({ token }) {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("");
  const navigate = useNavigate();
  const rol = localStorage.getItem("rol");

  useEffect(() => {
    getProductos(token).then((data) => {
      if (data) setProductos(data);
        console.log(data)
    });
  }, []);



  const productosFiltrados = productos.filter((p) => {
    const texto = busqueda.toLowerCase();

    const coincideBusqueda =
      p.codigo.toLowerCase().includes(texto) ||
      p.nombre.toLowerCase().includes(texto);

    const coincideCategoria = categoria ? p.categoria === categoria : true;

    return coincideBusqueda && coincideCategoria;
  });

  return (
    <>
      <div className="container mt-5">
        <h2>Productos</h2>

        <div className="row mb-3 g-2">
          {/* 🔍 BUSCADOR GENERAL */}
          <div className="col-md-6">
            <input
              className="form-control"
              placeholder="Buscar por código o nombre..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          {/* 📂 FILTRO CATEGORÍA */}
          <div className="col-md-6">
            <select
              className="form-control"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="">Todas</option>

              {CATEGORIAS.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row g-3">
          {productosFiltrados.map((p) => (
            <div
              key={p.id}
              className="col-lg-3 col-md-4 col-sm-6"
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
                    style={{ height: "160px", objectFit: "contain" }}
                  />
                ) : (
                  <div
                    className="d-flex align-items-center justify-content-center bg-light"
                    style={{ height: "160px" }}
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
                    <strong>Categoría:</strong> {p.categoria}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Stock:</strong> {p.cantidad}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {productosFiltrados.length === 0 && (
            <p className="text-center mt-4 text-muted">
              No se encontraron productos
            </p>
          )}
        </div>
      </div>
    </>
  );
}
