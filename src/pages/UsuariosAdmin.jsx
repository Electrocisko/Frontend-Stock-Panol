import { useEffect, useState } from "react";
import { getUsuarios, resetPassword } from "../api/api";
import { Table, Button, Modal, Form, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function UsuariosAdmin() {
  const [usuarios, setUsuarios] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [show, setShow] = useState(false);

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

  const handleOpen = (id) => {
    setSelectedUser(id);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setSelectedUser(null);
    setNewPassword("");
  };

  const handleSubmit = async () => {
    try {
      await resetPassword(selectedUser, newPassword, token);
      alert("Password reseteado");
      handleClose();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="container py-4">
 <div className="position-relative mb-4">

  {/* Botón arriba izquierda */}
  <Link
    to="/admin"
    className="btn btn-outline-secondary btn-sm position-absolute start-0 top-0"
  >
    ← Volver
  </Link>

  {/* Título centrado */}
  <h2 className="text-center m-0">Usuarios</h2>

</div>

      <Table hover responsive>
        <thead>
          <tr>
            <th className="text-start">Usuario</th>
            <th>Username</th>
            <th>Rol</th>
            {rol === "ADMIN" && <th className="text-end">Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td className="text-start">
                {u.nombre} {u.apellido}
              </td>
              <td>{u.username}</td>
              <td>
                <Badge bg="secondary">{u.rol}</Badge>
              </td>
              {rol === "ADMIN" && (
                <td className="text-end">
                  <Button
                    variant="outline-dark"
                    size="sm"
                    onClick={() => handleOpen(u.id)}
                  >
                    Reset Password
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Resetear Password</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Control
            type="password"
            placeholder="Nueva password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="dark" onClick={handleSubmit}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
