import { Link } from "react-router-dom";

export default function Navbar({ setToken }) {

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <nav className="navbar navbar-expand-lg ">

      <div className="container-fluid">

        <span className="navbar-brand"> <img src="\public\Logo Vier.webp" alt="Bootstrap" width="auto" height="30"/></span>

        {/* 🔥 botón hamburguesa */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* 🔥 menú colapsable */}
        <div className="collapse navbar-collapse" id="navbarNav">

          <div className="navbar-nav ms-auto gap-2">

            <Link className="btn btn-light" to="/productos">
              Productos
            </Link>

            <Link className="btn btn-light" to="/crear">
              Nuevo
            </Link>

            <Link className="btn btn-light" to="/movimientos">
              Movimientos
            </Link>

            <button className="btn btn-outline-danger" onClick={logout}>
              Logout
            </button>

          </div>

        </div>

      </div>
    </nav>
  );
}