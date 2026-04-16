import { useState, useEffect, useRef } from "react";
import { crearProducto, getProveedores } from "../api/api";
import { subirImagen } from "../api/cloudinary";
import ProductoForm from "../components/ProductoForm";

export default function CrearProducto({ token }) {
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

  useEffect(() => {
    getProveedores().then((data) => {
      if (data) setProveedores(data);
    });
  }, []);

  const handleSubmit = async () => {
    let imageUrl = "";

    if (file) {
      const img = await subirImagen(file);
      imageUrl = img.secure_url;
    }

    await crearProducto(
      {
        ...form,
        proveedorId: form.proveedorId
          ? Number(form.proveedorId)
          : null,
        urlImagen: imageUrl,
      },
      token
    );

    alert("Producto creado");

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
    fileRef.current.value = "";
  };

  return (
    <div className="container mt-5">
      <h2>Nuevo Producto</h2>

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
