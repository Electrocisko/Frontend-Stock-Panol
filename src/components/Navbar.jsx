import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

export default function Navbar({ setToken }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/")
  };

  const rol = localStorage.getItem("rol");

  return (
    <nav className="border-bottom bg-white">
      <div className="container d-flex justify-content-between align-items-center py-2">
        {/* Logo */}
        <Link to="/productos" className="fw-bold">
          {" "}
          <img
            src="Logo Vier.webp"
            alt="Logo"
            width="auto"
            height="30"
          />
        </Link>

        {/* 🔥 Hamburger */}
        <button className="btn d-md-none" onClick={() => setOpen(!open)}>
          ☰
        </button>

        {/* 🔥 Menu desktop */}
        <div className="d-none d-md-flex gap-4">
          {rol === "ADMIN" && (
            <NavLink to="/admin" className="text-dark text-decoration-none">
              Admin
            </NavLink>
          )}

          <NavLink
            to="/productos"
            className={({ isActive }) =>
              isActive
                ? "fw-bold text-dark text-decoration-none"
                : "text-secondary text-decoration-none"
            }
          >
            Productos
          </NavLink>

         { rol==="ADMIN"&&( <NavLink
            to="/movimientos"
            className={({ isActive }) =>
              isActive
                ? "fw-bold text-dark text-decoration-none"
                : "text-secondary text-decoration-none"
            }
          >
            Movimientos
          </NavLink>)}

          <span
            onClick={logout}
            className="text-danger"
            style={{ cursor: "pointer" }}
          >
            Logout
          </span>
        </div>
      </div>

      {/* 🔥 Menu mobile */}
      {open && (
        <div className="border-top p-3 d-md-none d-flex flex-column gap-3">
          <NavLink
            to="/productos"
            onClick={() => setOpen(false)}
            className="text-dark text-decoration-none"
          >
            Productos
          </NavLink>

          <NavLink
            to="/crear"
            onClick={() => setOpen(false)}
            className="text-dark text-decoration-none"
          >
            Nuevo
          </NavLink>

          <NavLink
            to="/movimientos"
            onClick={() => setOpen(false)}
            className="text-dark text-decoration-none"
          >
            Movimientos
          </NavLink>

          <span onClick={logout} className="text-danger">
            Logout
          </span>
        </div>
      )}
    </nav>
  );
}
