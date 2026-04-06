import { Link } from "react-router-dom";

export default function Admin() {
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Panel de Administración</h1>

      <div className="d-flex gap-3">
        <Link to="/admin/crear" className="btn btn-outline-dark">
          Crear Producto
        </Link>

        <Link to="/productos" className="btn btn-outline-dark">
          Ver Productos
        </Link>

        <Link to="/movimientos" className="btn btn-outline-dark">
          Ver Movimientos
        </Link>
      </div>
    </div>
  );
}
