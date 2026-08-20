import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getConsumoProyecto, getProyectoById ,  getMovimientosPorProyecto} from "../api/api";

const ConsumoProyecto = () => {
  const { id } = useParams();

  const [consumos, setConsumos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [proyecto, setProyecto] = useState(null);
  const [movimientos, setMovimientos] = useState([]);

  useEffect(() => {
    cargarDatos();
  }, [id]);

const cargarDatos = async () => {
  try {
    const proyectoData = await getProyectoById(id);
    const consumosData = await getConsumoProyecto(id);
    const movimientosData = await getMovimientosPorProyecto(id);

    setProyecto(proyectoData);
    setConsumos(consumosData || []);
    setMovimientos(movimientosData || []);

  } catch (error) {
    console.error(error);
    alert("Error al cargar el proyecto");
  } finally {
    setCargando(false);
  }
};

  const cargarConsumos = async () => {
    try {
      const data = await getConsumoProyecto(id);
      setConsumos(data || []);
    } catch (error) {
      console.error(error);
      alert("Error al cargar los consumos");
    } finally {
      setCargando(false);
    }
  };

  if (cargando) {
    return <p className="text-center mt-5">Cargando...</p>;
  }

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center mb-4">
        <Link
          to="/admin/proyectos"
          className="btn btn-outline-secondary btn-sm"
        >
          ← Volver
        </Link>


        <h2 className="m-0 flex-grow-1 text-center">Consumo del Proyecto {proyecto?.nombre}</h2>
      
      </div>

  <p>
  Estado:{" "}
  {proyecto?.estado === "EN_CURSO" ? (
    <span>
      En curso
    </span>
  ) : (
    <span >
      Finalizado
    </span>
  )}
</p>

      {consumos.length === 0 ? (
        <p className="text-center text-muted">
          Este proyecto todavía no tiene consumos registrados.
        </p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad consumida</th>
              </tr>
            </thead>

            <tbody>
              {consumos.map((item) => (
                <tr key={item.productoId}>
                  <td>{item.producto}</td>

                  <td>
                    {item.cantidadTotal} {item.unidadTexto}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <h4 className="mt-5 mb-3">
  Historial de retiros
</h4>

{movimientos.length === 0 ? (
  <p className="text-muted">
    No hay movimientos registrados para este proyecto.
  </p>
) : (
  <div className="table-responsive">
 <table className="table table-bordered align-middle">
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Tipo</th>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Usuario</th>
          <th>Motivo</th>
        </tr>
      </thead>

      <tbody>
        {movimientos.map((mov) => (
          <tr key={mov.id}>
            <td>
              {new Date(mov.fecha).toLocaleString("es-AR")}
            </td>

            <td>
              {mov.tipo === "SALIDA" ? (
                <span className="badge bg-danger">
                  Salida
                </span>
              ) : (
                <span className="badge bg-success">
                  Entrada
                </span>
              )}
            </td>

            <td>{mov.producto}</td>

            <td>{mov.cantidad}</td>

            <td>{mov.usuario}</td>

            <td>{mov.motivo || "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}
    </div>
  );
};

export default ConsumoProyecto;
