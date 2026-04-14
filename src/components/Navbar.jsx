import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

export default function Navbar({ setToken }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const rol = localStorage.getItem("rol");
  const isAdmin = rol === "ADMIN";

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    setToken(null);
    navigate("/");
  };

  return (
    <nav className="border-bottom bg-white">
      <div className="container d-flex justify-content-between align-items-center py-2">
        
        {/* 🔵 Logo */}
        <Link to="/productos" className="fw-bold">
          <img src="Logo Vier.webp" alt="Logo" height="30" />
        </Link>

        {/* 🍔 Botón mobile */}
        <button
          className="btn d-md-none"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        {/* 💻 Menu desktop */}
        <div className="d-none d-md-flex gap-4 align-items-center">
          
          {isAdmin && (
            <NavLink
              to="/admin"
              className="text-dark text-decoration-none"
            >
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

          {isAdmin && (
            <NavLink
              to="/movimientos"
              className={({ isActive }) =>
                isActive
                  ? "fw-bold text-dark text-decoration-none"
                  : "text-secondary text-decoration-none"
              }
            >
              Movimientos
            </NavLink>
          )}

          {isAdmin && (
            <NavLink
              to="/admin/crear"
              className="text-dark text-decoration-none"
            >
              Nuevo
            </NavLink>
          )}

          <span
            onClick={logout}
            className="text-danger"
            style={{ cursor: "pointer" }}
          >
            Logout
          </span>
        </div>
      </div>

      {/* 📱 Menu mobile */}
      {open && (
        <div className="border-top p-3 d-md-none d-flex flex-column gap-3">

          {isAdmin && (
            <NavLink
              to="/admin"
              onClick={() => setOpen(false)}
              className="text-dark text-decoration-none"
            >
              Admin
            </NavLink>
          )}

          <NavLink
            to="/productos"
            onClick={() => setOpen(false)}
            className="text-dark text-decoration-none"
          >
            Productos
          </NavLink>

          {isAdmin && (
            <NavLink
              to="/movimientos"
              onClick={() => setOpen(false)}
              className="text-dark text-decoration-none"
            >
              Movimientos
            </NavLink>
          )}

          {isAdmin && (
            <NavLink
              to="/admin/crear"
              onClick={() => setOpen(false)}
              className="text-dark text-decoration-none"
            >
              Nuevo
            </NavLink>
          )}

          <span
            onClick={logout}
            className="text-danger"
            style={{ cursor: "pointer" }}
          >
            Logout
          </span>
        </div>
      )}
    </nav>
  );
}
