import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login";
import Register from "./components/Register";
import Productos from "./pages/Productos";
import CrearProducto from "./pages/CrearProducto";
import MovimientosAdmin from "./pages/MovimientosAdmin";
import Navbar from "./components/Navbar";
import Admin from "./pages/Admin";
import Movimiento from "./pages/Movimiento";
import Salida from "./pages/Salida";
import AdminProveedores from "./components/AdminProveedores";
import StockBajoPorProveedor from "./pages/StockBajoPorProveedor";
import ProductosAdmin from "./pages/ProductosAdmin";
import EditarProducto from "./pages/EditarProducto";

// 🔥 Wrapper para usar location
function AppContent({ token, setToken }) {
  const location = useLocation();
  const rol = localStorage.getItem("rol");

  // 🔥 Ocultar navbar en login/register
  const hideNavbar =
    location.pathname === "/" || location.pathname === "/register";

  return (
    <>
      {/* 🔥 Navbar solo si corresponde */}
      {token && !hideNavbar && <Navbar setToken={setToken} />}

      <Routes>
        {/* 🔐 públicas */}
        <Route
          path="/"
          element={
            token ? <Navigate to="/productos" /> : <Login setToken={setToken} />
          }
        />

        <Route
          path="/register"
          element={token ? <Navigate to="/productos" /> : <Register />}
        />

        {/* 🔒 privadas */}
        <Route
          path="/productos"
          element={token ? <Productos token={token} /> : <Navigate to="/" />}
        />

        <Route
          path="/movimientos"
          element={
            token && rol === "ADMIN" ? (
              <MovimientosAdmin />
            ) : (
              <Navigate to="/" />
            )
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

        {/* 🔧 ADMIN */}
        <Route
          path="/admin"
          element={token && rol === "ADMIN" ? <Admin /> : <Navigate to="/" />}
        />

        <Route
          path="/admin/crear"
          element={
            token && rol === "ADMIN" ? (
              <CrearProducto token={token} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* ✅ NUEVO: proveedores */}
        <Route
          path="/admin/proveedores"
          element={
            token && rol === "ADMIN" ? (
              <AdminProveedores />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/admin/stock-bajo"
          element={
            token && rol === "ADMIN" ? (
              <StockBajoPorProveedor />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/admin/productos"
          element={
            token && rol === "ADMIN" ? <ProductosAdmin /> : <Navigate to="/" />
          }
        />

        <Route
          path="/admin/editar/:id"
          element={
            token && rol === "ADMIN" ? <EditarProducto /> : <Navigate to="/" />
          }
        />

        {/* 🔥 fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <BrowserRouter>
      <AppContent token={token} setToken={setToken} />
    </BrowserRouter>
  );
}

export default App;
