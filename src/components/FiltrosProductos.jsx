import { CATEGORIAS } from "../api/categorias";

const FiltrosProductos = ({
  busqueda,
  setBusqueda,
  categoria,
  setCategoria,
}) => {
  return (
    <div className="row mb-3 g-2">
      
      {/* 🔍 BUSCADOR */}
      <div className="col-md-6">
        <input
          className="form-control"
          placeholder="Buscar por código o nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {/* 📂 CATEGORÍA */}
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
  );
};

export default FiltrosProductos;