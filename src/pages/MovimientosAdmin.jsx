import { useEffect, useState } from "react";
import { getMovimientos } from "../api/api";

export default function MovimientosAdmin() {

  const [movimientos, setMovimientos] = useState([]);

  useEffect(() => {
    getMovimientos().then((data) => {
      if (data) setMovimientos(data);
    });
  }, []);

  return (
    <div className="container mt-5">

      <h2 className="mb-4">Movimientos</h2>

      {/* 🖥️ TABLA (desktop) */}
      <div className="table-responsive d-none d-md-block">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Producto</th>
              <th>Tipo</th>
              <th>Cantidad</th>
              <th>Usuario</th>
              <th>Motivo</th>
            </tr>
          </thead>

          <tbody>
            {movimientos.map((m) => (
              <tr key={m.id}>
                <td>{new Date(m.fecha).toLocaleDateString("es-AR")}</td>
                <td>{m.producto}</td>
                <td>
                  <span className={
                    m.tipo === "SALIDA"
                      ? "text-danger"
                      : "text-success"
                  }>
                    {m.tipo}
                  </span>
                </td>
                <td>{m.cantidad}</td>
                <td>{m.usuario}</td>
                <td>{m.motivo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📱 CARDS (mobile) */}
      <div className="d-block d-md-none">
        {movimientos.map((m) => (
          <div key={m.id} className="card mb-3 shadow-sm">
            <div className="card-body">

              <h5 className="card-title">{m.producto}</h5>

              <p className="mb-1">
                <strong>Fecha:</strong>{" "}
                {new Date(m.fecha).toLocaleDateString("es-AR")}
              </p>

              <p className="mb-1">
                <strong>Tipo:</strong>{" "}
                <span className={
                  m.tipo === "SALIDA"
                    ? "text-danger"
                    : "text-success"
                }>
                  {m.tipo}
                </span>
              </p>

              <p className="mb-1">
                <strong>Cantidad:</strong> {m.cantidad}
              </p>

              <p className="mb-1">
                <strong>Usuario:</strong> {m.usuario}
              </p>

              <p className="mb-0">
                <strong>Motivo:</strong> {m.motivo}
              </p>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}