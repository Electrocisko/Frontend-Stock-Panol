import { useEffect, useState } from "react";
import { getUsuarios, resetPassword } from "../api/api";

export default function UsuariosAdmin() {

  const [usuarios, setUsuarios] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newPassword, setNewPassword] = useState("");

  const token = localStorage.getItem("token");
  const rol = localStorage.getItem("rol");

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const data = await getUsuarios(token);
      setUsuarios(data);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleReset = (id) => {
    setSelectedUser(id);
  };

  const handleSubmit = async () => {
    try {
      await resetPassword(selectedUser, newPassword, token);
      alert("Password reseteado");
      setSelectedUser(null);
      setNewPassword("");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h2>Usuarios</h2>

      {usuarios.map(u => (
        <div key={u.id}>
         {u.username} - {String(u.rol)}

          {rol === "ADMIN" && (
            <button onClick={() => handleReset(u.id)}>
              Reset Password
            </button>
          )}
        </div>
      ))}

      {selectedUser && (
        <div style={{ marginTop: "20px" }}>
          <input
            type="password"
            placeholder="Nueva password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={handleSubmit}>Confirmar</button>
          <button onClick={() => setSelectedUser(null)}>Cancelar</button>
        </div>
      )}
    </div>
  );
}