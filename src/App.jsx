import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login";
import Productos from "./pages/Productos";
import CrearProducto from "./pages/CrearProducto";
import Movimientos from "./pages/Movimientos";
import Navbar from "./components/Navbar";

function App() {

  const [token, setToken] = useState(localStorage.getItem("token"));

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
            <Route path="/crear" element={<CrearProducto token={token} />} />
            <Route path="/movimientos" element={<Movimientos />} />
          </Routes>
        </>
      )}

    </BrowserRouter>
  );
}

export default App;
