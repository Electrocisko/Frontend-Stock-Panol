import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login";
import Register from "./components/Register"; // 🔥 IMPORTANTE
import Productos from "./pages/Productos";
import CrearProducto from "./pages/CrearProducto";
import MovimientosAdmin from "./pages/MovimientosAdmin";
import Navbar from "./components/Navbar";
import Admin from "./pages/Admin";
import Movimiento from "./pages/Movimiento";
import Salida from "./pages/Salida";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const rol = localStorage.getItem("rol");

  return (
    <BrowserRouter>

      {/* 🔥 Navbar solo si hay login */}
      {token && <Navbar setToken={setToken} />}

      <Routes>
        {/* 🔐 públicas */}
        <Route path="/" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />

        {/* 🔒 privadas */}
        <Route
          path="/productos"
          element={token ? <Productos token={token} /> : <Navigate to="/" />}
        />

        <Route
          path="/movimientos"
          element={
            token && rol === "ADMIN"
              ? <MovimientosAdmin />
              : <Navigate to="/" />
          }
        />

        <Route
          path="/salida/:id"
          element={token ? <Salida token={token} /> : <Navigate to="/" />}
        />

        <Route
          path="/movimiento/:id"
          element={token ? <Movimiento token={token} /> : <Navigate to="/" />}
        />

        <Route
          path="/admin"
          element={
            token && rol === "ADMIN" ? <Admin /> : <Navigate to="/" />
          }
        />

        <Route
          path="/admin/crear"
          element={
            token && rol === "ADMIN"
              ? <CrearProducto token={token} />
              : <Navigate to="/" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;