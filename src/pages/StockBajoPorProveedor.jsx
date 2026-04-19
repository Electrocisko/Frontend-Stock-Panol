import { useEffect, useState } from "react";
import { getProductos } from "../api/api";
import { Link } from "react-router-dom";

export default function StockBajoPorProveedor() {
  const [agrupados, setAgrupados] = useState({});

  useEffect(() => {
    const cargar = async () => {
      const productos = await getProductos();

      if (!productos) return;

      const resultado = productos.reduce((acc, p) => {
        // solo productos con problema de stock
        if (!p.stockBajo && !p.sinStock) return acc;

        const proveedor = p.proveedorNombre || "Sin proveedor";

        if (!acc[proveedor]) {
          acc[proveedor] = [];
        }

        acc[proveedor].push(p);

        return acc;
      }, {});

      setAgrupados(resultado);
    };

    cargar();
  }, []);

  return (
    <div className="container mt-4">
   <div className="position-relative mb-4">

  {/* Botón arriba izquierda */}
  <Link
    to="/admin"
    className="btn btn-outline-secondary btn-sm position-absolute start-0 top-0"
  >
    ← Volver
  </Link>

  {/* Título centrado */}
  <h2 className="text-center m-0">Stock Bajo por Proveedor</h2>

</div>

      {Object.keys(agrupados).length === 0 && (
        <p className="mt-3 text-muted">No hay productos con stock bajo</p>
      )}

      {Object.entries(agrupados).map(([proveedor, productos]) => (
        <div key={proveedor} className="mt-4">
          <h4 className="border-bottom pb-1">{proveedor}</h4>

          <ul className="list-group mt-2">
            {productos.map((p) => (
              <li
                key={p.id}
                className="list-group-item d-flex justify-content-between"
              >
                <span>{p.nombre}</span>

                {p.sinStock ? (
                  <span className="badge bg-danger">Sin stock</span>
                ) : (
                  <span className="badge bg-warning text-dark">
                    Stock bajo
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}