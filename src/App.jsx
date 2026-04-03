import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login";
import Productos from "./pages/Productos";
import CrearProducto from "./pages/CrearProducto";
import Movimientos from "./pages/Movimientos";
import Navbar from "./components/Navbar";
import Admin from "./pages/Admin";
import Movimiento from "./pages/Movimiento";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const rol = localStorage.getItem("rol");

  return (
    <BrowserRouter>
      {!token ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />

          <Routes>
            <Route path="/" element={<Navigate to="/productos" />} />

            <Route path="/productos" element={<Productos token={token} />} />

            <Route path="/movimientos" element={<Movimientos />} />

            <Route
              path="/movimiento/:id"
              element={<Movimiento token={token} />}
            />

            {/* 🔥 ADMIN */}
            <Route
              path="/admin"
              element={
                rol === "ADMIN" ? <Admin /> : <Navigate to="/productos" />
              }
            />

            <Route
              path="/admin/crear"
              element={
                rol === "ADMIN" ? (
                  <CrearProducto token={token} />
                ) : (
                  <Navigate to="/productos" />
                )
              }
            />
          </Routes>
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
