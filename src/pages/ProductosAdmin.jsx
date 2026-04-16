import { useEffect, useState } from "react";
import { getProductos } from "../api/api";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";

export default function ProductosAdmin() {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProductos().then(setProductos);
  }, []);

  return (
    <div className="container mt-5">
      <h2>Editar Productos</h2>

      <div className="row g-3">
        {productos.map((p) => (
          <div
            key={p.id}
            className="col-lg-3 col-md-4 col-sm-6"
            onClick={() => navigate(`/admin/editar/${p.id}`)}
            style={{ cursor: "pointer" }}
          >
            <ProductCard p={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
