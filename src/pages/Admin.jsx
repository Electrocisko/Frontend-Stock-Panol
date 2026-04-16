import { Link } from "react-router-dom";

export default function Admin() {
  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center text-md-start">
        Panel de Administración
      </h1>

      <div className="d-flex flex-column flex-md-row gap-3">
        <Link to="/admin/crear" className="btn btn-outline-dark w-100">
          Crear Producto
        </Link>

        <Link to="/productos" className="btn btn-outline-dark w-100">
          Ver Productos
        </Link>

        <Link to="/movimientos" className="btn btn-outline-dark w-100">
          Ver Movimientos
        </Link>

        <Link to="/admin/stock-bajo" className="btn btn-outline-dark w-100">
          Stock Bajo por Proveedor
        </Link>

        <Link to="/admin/proveedores" className="btn btn-outline-dark w-100">
          Registrar Proveedor
        </Link>

        <Link to="/admin/productos" className="btn btn-outline-dark w-100">
          Editar Productos
        </Link>
      </div>
    </div>
  );
}
