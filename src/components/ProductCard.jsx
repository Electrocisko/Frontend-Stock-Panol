import { getOptimizedImage } from "../api/cloudinary";

const ProductCard = ({ p }) => {
  return (
    <div
      className="card shadow-sm border-0"
      style={{
        height: "320px", // 🔥 ALTURA FIJA TOTAL
        overflow: "hidden",
      }}
    >
      {/* 🖼️ Imagen + overlay */}
      <div className="position-relative">
        {p.sinStock && (
          <span className="badge bg-danger position-absolute top-0 start-0 m-2">
            Sin stock
          </span>
        )}

        {!p.sinStock && p.stockBajo && (
          <span className="badge bg-warning text-dark position-absolute top-0 start-0 m-2">
            Stock bajo
          </span>
        )}

        {p.urlImagen ? (
          <img
            loading="lazy"
            src={getOptimizedImage(p.urlImagen, 300)}
            className="card-img-top"
            alt={p.nombre}
            style={{
              height: "140px",
              objectFit: "contain",
              padding: "10px",
            }}
          />
        ) : (
          <img
            src="Logo Vier.webp"
            className="card-img-top opacity-50"
            alt="Sin imagen"
            style={{
              height: "140px",
              objectFit: "contain",
              padding: "10px",
            }}
          />
        )}
      </div>

      {/* 📦 Info */}
      <div
        className="card-body d-flex flex-column"
        style={{
          overflow: "hidden", // 🔥 CLAVE
        }}
      >
        {/* 🔤 Título limitado fuerte */}
        <h6
          className="card-title mb-2"
          title={p.nombre}
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {p.nombre}
        </h6>

        {/* 📄 Info compacta */}
        <div
          style={{
            fontSize: "0.85rem",
            overflow: "hidden", // 🔥 evita crecimiento
          }}
        >
          <div className="text-muted">
            <strong>Código:</strong> {p.codigo}
          </div>

          <div className="text-muted">
            <strong>Categoría:</strong> {p.categoria}
          </div>
        </div>

        {/* 📊 Stock fijo abajo */}
        <div className="mt-auto">
          <span className="fw-bold">Stock: </span>
          <span
            className={
              p.sinStock
                ? "text-danger fw-bold"
                : p.stockBajo
                  ? "text-warning fw-bold"
                  : "text-success fw-bold"
            }
          >
            {p.cantidad}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
