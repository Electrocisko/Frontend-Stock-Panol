import { useEffect, useState } from "react";
import { getMovimientos } from "../api/api";

export default function MovimientosAdmin() {

  const [movimientos, setMovimientos] = useState([]);

  useEffect(() => {
    getMovimientos().then((data) => {
      if (data) setMovimientos(data);
      console.log(data)
    });
  }, []);

  return (
    <div className="container mt-5">

      <h2 className="mb-4">Movimientos</h2>

      <div className="table-responsive">

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

                <td>{new Date(m.fecha).toLocaleString()}</td>

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

    </div>
  );
}