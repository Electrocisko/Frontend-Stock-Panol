import { useState } from "react";
import Login from "./pages/Login";
import CrearProducto from "./pages/CrearProducto";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return <CrearProducto token={token} />;
}

export default App;
