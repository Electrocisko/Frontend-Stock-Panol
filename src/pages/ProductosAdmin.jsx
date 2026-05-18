import { useEffect, useState } from "react";
import { getProductos, getProductosInactivos } from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import { CATEGORIAS } from "../api/categorias";

export default function ProductosAdmin() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("");
  const [mostrarInactivos, setMostrarInactivos] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const cargarProductos = async () => {
      const data = mostrarInactivos
        ? await getProductosInactivos()
        : await getProductos();

      if (data) setProductos(data);
    };

    cargarProductos();
  }, [mostrarInactivos]);

  const productosFiltrados = productos
    .filter((p) => {
      const texto = busqueda.toLowerCase();

      const coincideBusqueda =
        p.codigo.toLowerCase().includes(texto) ||
        p.nombre.toLowerCase().includes(texto);

      const coincideCategoria = categoria
        ? p.categoria === categoria
        : true;

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
    <div className="container-fluid px-2 mt-3">
      {/* Header */}
      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <Link
            to="/admin"
            className="btn btn-outline-secondary btn-sm"
          >
            ← Volver
          </Link>

          <h2 className="m-0 fs-5 text-center flex-grow-1">
            Editar Productos
          </h2>
        </div>

        {/* Botones activos/inactivos */}
        <div className="d-flex flex-column flex-sm-row gap-2">
          <button
            className={`btn btn-sm ${
              !mostrarInactivos
                ? "btn-dark"
                : "btn-outline-dark"
            }`}
            onClick={() => setMostrarInactivos(false)}
          >
            Activos
          </button>

          <button
            className={`btn btn-sm ${
              mostrarInactivos
                ? "btn-danger"
                : "btn-outline-danger"
            }`}
            onClick={() => setMostrarInactivos(true)}
          >
            Inactivos
          </button>
        </div>
      </div>

      {/* Buscador + filtro */}
      <div className="row mb-3 g-2">
        <div className="col-12 col-md-6">
          <input
            className="form-control"
            placeholder="Buscar..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <select
            className="form-control"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">Todas las categorías</option>

            {CATEGORIAS.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {productosFiltrados.length === 0 && (
        <p className="text-center mt-4 text-muted">
          No se encontraron productos
        </p>
      )}

      {/* Tabla */}
      <div className="table-responsive">
        <table className="table table-hover align-middle table-sm small">
          <thead className="table-light">
            <tr>
              <th>Nombre</th>
              <th>Código</th>

              <th className="d-none d-md-table-cell">
                Categoría
              </th>

              <th>Stock</th>

              <th className="d-none d-md-table-cell">
                Ubicación
              </th>

              <th></th>
            </tr>
          </thead>

          <tbody>
            {productosFiltrados.map((p) => (
              <tr key={p.id}>
                <td className="text-start">
                  {p.nombre}
                </td>

                <td>{p.codigo}</td>

                <td className="d-none d-md-table-cell">
                  {p.categoria}
                </td>

                <td>
                  <span
                    className={
                      p.sinStock
                        ? "text-danger fw-bold"
                        : p.stockBajo
                        ? "text-warning fw-bold"
                        : "text-success"
                    }
                  >
                    {p.cantidad}
                  </span>
                </td>

                <td className="d-none d-md-table-cell">
                  {p.ubicacion}
                </td>

                <td>
                  <button
                    className="btn btn-sm btn-outline-primary px-2"
                    onClick={() =>
                      navigate(`/admin/editar/${p.id}`)
                    }
                  >
                    Abrir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}