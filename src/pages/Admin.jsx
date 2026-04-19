import { Link } from "react-router-dom";

const items = [
  { to: "/admin/crear", label: "Ingresar Producto Nuevo" },
  { to: "/productos", label: "Ingreso / Salida de Productos" },
  { to: "/movimientos", label: "Ver Movimientos" },
  { to: "/admin/stock-bajo", label: "Stock Bajo por Proveedor" },
  { to: "/admin/proveedores", label: "Registrar Proveedor" },
  { to: "/admin/productos", label: "Editar Productos" },
  { to: "/admin/usuarios", label: "Usuarios" },
];

export default function Admin() {
  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center text-md-start">
        Panel de Administración
      </h1>

      <div className="row g-5 gx-5 gy-4">
        {items.map((item, i) => (
          <div key={i} className="col-12 col-sm-6 col-lg-4 col-xl-3">
            <Link
              to={item.to}
              className="text-decoration-none"
            >
              <div className="card h-100 shadow-sm  admin-card">
                <div className="card-body d-flex align-items-center justify-content-center text-center">
                  <span className="fw-semibold">
                    {item.label}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}