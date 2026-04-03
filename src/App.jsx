import { useState } from "react";
import Login from "./pages/Login";
import Productos from "./pages/Productos";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return <Productos token={token} />;
}

export default App;
