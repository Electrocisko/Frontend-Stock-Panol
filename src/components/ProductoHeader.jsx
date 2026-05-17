import { getOptimizedImage } from "../api/cloudinary";

export default function ProductoHeader({
  producto,
}) {
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body d-flex gap-3 align-items-center">

        <img
          src={
            producto.urlImagen
              ? getOptimizedImage(
                  producto.urlImagen,
                  200
                )
              : "/Logo Vier.webp"
          }
          alt={producto.nombre}
          style={{
            width: "110px",
            height: "110px",
            objectFit: "contain",
          }}
        />

        <div>
          <h4 className="mb-1">
            {producto.nombre}
          </h4>

          <div className="text-muted">
            Código: {producto.codigo}
          </div>

          <div>
            <strong>Stock:</strong>{" "}
            <span
              className={
                producto.sinStock
                  ? "text-danger fw-bold"
                  : producto.stockBajo
                  ? "text-warning fw-bold"
                  : "text-success fw-bold"
              }
            >
              {producto.cantidad}
            </span>{" "}
            {producto.unidadTexto}
          </div>

          <div className="mt-2">
            {producto.activo ? (
              <span className="badge bg-success">
                Activo
              </span>
            ) : (
              <span className="badge bg-danger">
                Inactivo
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}