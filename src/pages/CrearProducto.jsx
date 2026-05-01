import { useState, useEffect, useRef } from "react";
import { crearProducto, getProveedores } from "../api/api";
import { subirImagen } from "../api/cloudinary";
import ProductoForm from "../components/ProductoForm";
import { Link } from "react-router-dom";

export default function CrearProducto() {
  const [form, setForm] = useState({
    nombre: "",
    codigo: "",
    descripcion: "",
    categoria: "",
    unidadMedida: "",
    stockMinimo: 0,
    ubicacion: "",
    cantidad: "",
    proveedorId: "",
  });

  const [proveedores, setProveedores] = useState([]);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const fileRef = useRef();

  useEffect(() => {
    getProveedores().then(setProveedores);
  }, []);

  const handleSubmit = async () => {
    try {
      let imageUrl = "";

      if (file) {
        imageUrl = await subirImagen(file); // 🔥 ya devuelve URL
      }

      await crearProducto({
        ...form,
        proveedorId: form.proveedorId
          ? Number(form.proveedorId)
          : null,
        urlImagen: imageUrl,
      });

      alert("✅ Producto creado");

      // reset
      setForm({
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

      setFile(null);
      setPreview(null);
      if (fileRef.current) fileRef.current.value = "";

    } catch (error) {
      console.error(error);

      alert(error.message); // 🔥 ahora muestra "Codigo Duplicado"
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

        <h2 className="text-center m-0">Crear Producto</h2>
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
        textoBoton="Crear Producto"
      />
    </div>
  );
}