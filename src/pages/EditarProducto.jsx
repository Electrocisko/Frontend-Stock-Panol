import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getProductoById,
  actualizarProducto,
  getProveedores,
} from "../api/api";
import { subirImagen } from "../api/cloudinary";
import ProductoForm from "../components/ProductoForm";

export default function EditarProducto() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    codigo: "",
    descripcion: "",
    categoria: "",
    unidadMedida: "",
    stockMinimo: 0,
    ubicacion: "",
    cantidad: 0,
    proveedorId: "",
  });

  const [proveedores, setProveedores] = useState([]);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const fileRef = useRef();

  // 🔹 cargar producto
  useEffect(() => {
    getProductoById(id).then((data) => {
      if (!data) return;

      setForm({
        nombre: data.nombre || "",
        codigo: data.codigo || "",
        descripcion: data.descripcion || "",
        categoria: data.categoria || "",
        unidadMedida: data.unidadMedida || "",
        stockMinimo: data.stockMinimo || 0,
        ubicacion: data.ubicacion || "",
        cantidad: data.cantidad || 0,
        proveedorId: data.proveedorId || "",
      });

      setPreview(data.urlImagen || null);
    });

    getProveedores().then((data) => {
      if (data) setProveedores(data);
    });
  }, [id]);

  // 🔹 guardar cambios
  const handleSubmit = async () => {
    let imageUrl = preview;

    if (file) {
      const img = await subirImagen(file);
      imageUrl = img.secure_url;
    }

    await actualizarProducto(id, {
      ...form,
      proveedorId: form.proveedorId
        ? Number(form.proveedorId)
        : null,
      urlImagen: imageUrl,
    });

    alert("Producto actualizado");

    navigate("/admin/productos"); // 🔥 volver
  };

  return (
    <div className="container mt-5">
      <h2>Editar Producto</h2>

      <ProductoForm
        form={form}
        setForm={setForm}
        proveedores={proveedores}
        onSubmit={handleSubmit}
        fileRef={fileRef}
        setFile={setFile}
        preview={preview}
        setPreview={setPreview}
        textoBoton="Actualizar Producto"
      />
    </div>
  );
}
