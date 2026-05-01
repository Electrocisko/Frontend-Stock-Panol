import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
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
    urlImagen: "", // 🔥 IMPORTANTE
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
        urlImagen: data.urlImagen || "", // 🔥 clave
      });

      setPreview(data.urlImagen || null);
    });

    getProveedores().then((data) => {
      if (data) setProveedores(data);
    });
  }, [id]);

  // 🔹 guardar cambios
  const handleSubmit = async () => {
    try {
      let imageUrl = form.urlImagen; // 🔥 SIEMPRE partir de acá

      if (file) {
        imageUrl = await subirImagen(file); // 🔥 nueva imagen
      }

      await actualizarProducto(id, {
        ...form,
        proveedorId: form.proveedorId
          ? Number(form.proveedorId)
          : null,
        urlImagen: imageUrl || null,
      });

      alert("Producto actualizado");
      navigate("/admin/productos");

    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="position-relative mb-4">

        <Link
          to="/admin"
          className="btn btn-outline-secondary btn-sm position-absolute start-0 top-0"
        >
          ← Volver
        </Link>

        <h2 className="text-center m-0">Editar</h2>
      </div>

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
