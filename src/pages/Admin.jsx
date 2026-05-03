import { Link } from "react-router-dom";
import { exportarProductos } from "../api/api";

const items = [
  { to: "/admin/crear", label: "Ingresar Producto Nuevo" },
  { to: "/productos", label: "Ingreso / Salida de Productos" },
  { to: "/movimientos", label: "Ver Movimientos" },
  { to: "/admin/stock-bajo", label: "Stock Bajo por Proveedor" },
  { to: "/admin/proveedores", label: "Registrar Proveedor" },
  { to: "/admin/productos", label: "Editar Productos" },
  { to: "/admin/usuarios", label: "Usuarios" },

  // 👉 NUEVO
  { action: "export", label: "Exportar a Excel" },
];

export default function Admin() {

const handleExport = async () => {
  const confirmar = window.confirm("¿Querés exportar el listado a Excel?");

  if (!confirmar) return;

  try {
    const blob = await exportarProductos();
    if (!blob) return;

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "productos.xlsx";
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.error(error);
    alert("Error al exportar a Excel");
  }
};

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center text-md-start">
        Panel de Administración
      </h1>

      <div className="row g-5 gx-5 gy-4">
        {items.map((item, i) => (
          <div key={i} className="col-12 col-sm-6 col-lg-4 col-xl-3">

            {item.action === "export" ? (
              <div
                onClick={handleExport}
                className="card h-100 shadow-sm admin-card"
                style={{ cursor: "pointer" }}
              >
                <div className="card-body d-flex align-items-center justify-content-center text-center">
                  <span className="fw-semibold">
                    {item.label}
                  </span>
                </div>
              </div>
            ) : (
              <Link to={item.to} className="text-decoration-none">
                <div className="card h-100 shadow-sm admin-card">
                  <div className="card-body d-flex align-items-center justify-content-center text-center">
                    <span className="fw-semibold">
                      {item.label}
                    </span>
                  </div>
                </div>
              </Link>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}