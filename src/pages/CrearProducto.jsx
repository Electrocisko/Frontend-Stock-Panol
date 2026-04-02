import { useState, useRef } from "react";
import { crearProducto } from "../api/api";
import { subirImagen } from "../api/cloudinary";

export default function CrearProducto({ token }) {
  const [nombre, setNombre] = useState("");
  const [codigo, setCodigo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [unidadMedida, setUnidadMedida] = useState("");
  const [stockMinimo, setStockMinimo] = useState(0);
  const [ubicacion, setUbicacion] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [file, setFile] = useState(null);

  const fileRef = useRef();

  const handleSubmit = async () => {
    let imageUrl = "";

    if (file) {
      const img = await subirImagen(file);
      imageUrl = img.secure_url;
    }

    await crearProducto(
      {
        nombre,
        codigo,
        descripcion,
        categoria,
        unidadMedida,
        stockMinimo,
        ubicacion,
        cantidad,
        urlImagen: imageUrl,
      },
      token,
    );

    alert("Producto creado");

    // 🔥 limpiar formulario
    setNombre("");
    setCodigo("");
    setDescripcion("");
    setCategoria("");
    setUnidadMedida("");
    setStockMinimo(0);
    setUbicacion("");
    setCantidad(0);
    setFile(null);
    fileRef.current.value = "";
  };

  console.log("ESTO"+import.meta.env.VITE_API_URL);

  return (
    <div className="container mt-5">
      <h2>Nuevo Producto</h2>

      <input
        className="form-control mb-2"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <input
        className="form-control mb-2"
        placeholder="Código"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
      />

      <textarea
        className="form-control mb-2"
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />

      <input
        className="form-control mb-2"
        placeholder="Categoría"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
      />

      <input
        className="form-control mb-2"
        placeholder="Unidad de medida (ej: m, kg, unidad)"
        value={unidadMedida}
        onChange={(e) => setUnidadMedida(e.target.value)}
      />

<div className="mb-3 d-flex justify-content-left align-items-center gap-3">
  {/* Grupo Stock Mínimo */}
  <div className="d-flex align-items-center">
    <label htmlFor="stockMinimo" className="form-label me-2 mb-0 text-nowrap">
      Stock Mínimo
    </label>
    <input
      id="stockMinimo"
      type="number"
      className="form-control"
      style={{ width: '100px' }} // Aquí controlas el ancho del input
      placeholder="0"
      value={stockMinimo}
      onChange={(e) => setStockMinimo(e.target.value)}
    />
  </div>

  {/* Grupo Cantidad */}
  <div className="d-flex align-items-center">
    <label htmlFor="cantidad" className="form-label me-2 mb-0 text-nowrap">
      Cantidad
    </label>
    <input
      id="cantidad"
      type="number"
      className="form-control"
      style={{ width: '100px' }} // Aquí controlas el ancho del input
      placeholder="0"
      value={cantidad}
      onChange={(e) => setCantidad(e.target.value)}
    />
  </div>
</div>

      <input
        className="form-control mb-2"
        placeholder="Ubicación (ej: Estante A3)"
        value={ubicacion}
        onChange={(e) => setUbicacion(e.target.value)}
      />

     

      <input
        type="file"
        ref={fileRef}
        className="form-control mb-3"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button className="btn btn-success" onClick={handleSubmit}>
        Crear Producto
      </button>
    </div>
  );
}
