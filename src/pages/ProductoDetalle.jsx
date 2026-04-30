import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductoById } from "../api/api";

export default function ProductoDetalle() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    getProductoById(id).then(setProducto);
  }, [id]);

  if (!producto) return <p>Cargando...</p>;

  return (
    <div className="container mt-4">
      <Link to="/admin/productos" className="btn btn-outline-secondary mb-3">
        ← Volver
      </Link>

      <div className="card shadow">
        <div className="row g-0">
          
          {/* Imagen */}
          <div className="col-md-4">
            <img
              src={producto.urlImagen}
              className="img-fluid rounded-start"
              alt={producto.nombre}
            />
          </div>

          {/* Info */}
          <div className="col-md-8">
            <div className="card-body">
              <h3 className="card-title">{producto.nombre}</h3>

              <p className="card-text text-muted">
                {producto.descripcion}
              </p>

              <hr />
                <p><strong>Código:</strong> {producto.codigo}</p>
              <p><strong>Stock:</strong> {producto.cantidad}</p>
                <p><strong>Unidad de medida:</strong> {producto.unidadMedida}</p>
              <p><strong>Categoría:</strong> {producto.categoria}</p>
                <p><strong>Ubicación:</strong> {producto.ubicacion}</p>
                <p><strong>Proveedor:</strong> {producto.proveedor}</p>

           

              {/* Botones */}
              <div className="d-flex gap-2 mt-3">
                <Link
                  to={`/admin/productos/editar/${producto.id}`}
                  className="btn btn-primary"
                >
                  Editar
                </Link>

                <Link
                  to={`/admin/movimientos/${producto.id}`}
                  className="btn btn-warning"
                >
                  Movimiento
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}