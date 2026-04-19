import { useEffect, useState } from "react";
import { getProductos } from "../api/api";
import { useNavigate } from "react-router-dom";
import { CATEGORIAS } from "../api/categorias.js";
import ProductCard from "../components/ProductCard.jsx";
import { Link } from "react-router-dom";

export default function Productos({ token, username }) {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("");
  const navigate = useNavigate();
  const rol = localStorage.getItem("rol");
  const nombre = localStorage.getItem("nombre");

  useEffect(() => {
    getProductos(token).then((data) => {
      if (data) setProductos(data);
    });
  }, []);

  const productosFiltrados = productos
    .filter((p) => {
      const texto = busqueda.toLowerCase();

      const coincideBusqueda =
        p.codigo.toLowerCase().includes(texto) ||
        p.nombre.toLowerCase().includes(texto);

      const coincideCategoria = categoria ? p.categoria === categoria : true;

      return coincideBusqueda && coincideCategoria;
    })
    .sort((a, b) => {
      // 🔴 Sin stock primero
      if (a.sinStock && !b.sinStock) return -1;
      if (!a.sinStock && b.sinStock) return 1;

      // 🟡 Stock bajo después
      if (a.stockBajo && !b.stockBajo) return -1;
      if (!a.stockBajo && b.stockBajo) return 1;

      return 0;
    });

  return (
    <>
      <div className="container mt-5">
        <div className="position-relative mb-4">
          {/* Botón arriba izquierda */}
          <Link
            to="/admin"
            className="btn btn-outline-secondary btn-sm position-absolute start-0 top-0"
          >
            ← Volver
          </Link>

          {/* Título centrado */}
          <h2 className="text-center m-0">Productos</h2>
        </div>
        <p className="text-muted">LOGEADO: {nombre}</p>

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
              <ProductCard p={p} />
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
