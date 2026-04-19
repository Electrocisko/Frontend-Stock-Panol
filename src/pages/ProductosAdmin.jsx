import { useEffect, useState } from "react";
import { getProductos } from "../api/api";
import { useNavigate } from "react-router-dom";
import { CATEGORIAS } from "../api/categorias";

export default function ProductosAdmin() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("");
  const navigate = useNavigate();

useEffect(() => {
  getProductos().then((data) => {
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
    <div className="container mt-5">
      <h2>Editar Productos</h2>

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

      {productosFiltrados.length === 0 && (
        <p className="text-center mt-4 text-muted">
          No se encontraron productos
        </p>
      )}

 <div className="table-responsive mt-3">
  <table className="table table-hover align-middle">
    <thead className="table-light">
      <tr>
        <th>Nombre</th>
        <th>Código</th>
        <th>Categoría</th>
        <th>Stock</th>
        <th>Ubicación</th>
      </tr>
    </thead>

<tbody>
  {productosFiltrados.map((p) => (
    <tr key={p.id}>
      <td className="text-start">{p.nombre}</td>
      <td>{p.codigo}</td>
      <td>{p.categoria}</td>

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

      <td>{p.ubicacion}</td>

      {/* 🔥 ACCIONES */}
      <td className="d-flex gap-2">
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={() => navigate(`/admin/editar/${p.id}`)}
        >
          Editar
        </button>

        <button
          className="btn btn-sm btn-outline-success"
          onClick={() => navigate(`/movimiento/${p.id}`)}
        >
          Mov
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
