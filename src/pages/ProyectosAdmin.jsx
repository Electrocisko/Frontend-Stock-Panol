import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProyectos, actualizarEstadoProyecto } from "../api/api";

const ProyectosAdmin = () => {
  const [proyectos, setProyectos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarProyectos();
  }, []);

  const cargarProyectos = async () => {
    try {
      const data = await getProyectos();
      setProyectos(data || []);
    } catch (error) {
      console.error(error);
      alert("Error al cargar los proyectos");
    } finally {
      setCargando(false);
    }
  };

  const cambiarEstado = async (id, nuevoEstado) => {
    try {
      await actualizarEstadoProyecto(id, nuevoEstado);

      await cargarProyectos();
    } catch (error) {
      console.error(error);
      alert(error.message || "Error al actualizar el estado");
    }
  };

  if (cargando) {
    return <p className="text-center mt-5">Cargando...</p>;
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Link to="/admin" className="btn btn-outline-secondary btn-sm">
          ← Volver
        </Link>

        <h2 className="m-0">Proyectos</h2>

        <Link to="/admin/proyectos/nuevo" className="btn btn-dark">
          + Nuevo Proyecto
        </Link>
      </div>

      {proyectos.length === 0 ? (
        <p className="text-center text-muted">No hay proyectos registrados.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead>
              <tr>
                <th>Proyecto</th>
                <th>Estado</th>
                <th>Fecha inicio</th>
                <th>Fecha fin</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {proyectos.map((proyecto) => (
                <tr key={proyecto.id}>
                  <td>{proyecto.nombre}</td>

                  <td>{proyecto.estado}</td>

                  <td>{proyecto.fechaInicio || "-"}</td>

                  <td>{proyecto.fechaFin || "-"}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <Link
                        to={`/admin/proyectos/${proyecto.id}/consumo`}
                        className="btn btn-outline-primary btn-sm"
                      >
                        Ver consumos
                      </Link>

                      {proyecto.estado === "EN_CURSO" && (
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() =>
                            cambiarEstado(proyecto.id, "FINALIZADO")
                          }
                        >
                          Finalizar
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProyectosAdmin;
