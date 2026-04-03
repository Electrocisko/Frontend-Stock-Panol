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
  const [preview, setPreview] = useState(null);

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
    setPreview(null);
  };



return (
  <div className="container mt-5">
    <h2>Nuevo Producto</h2>

    <div className="row">
      
      {/* 🟢 FORMULARIO */}
      <div className="col-md-6">

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

        <div className="mb-3 d-flex gap-3">

          <div className="d-flex align-items-center">
            <label className="form-label me-2 mb-0 text-nowrap">
              Stock Mínimo
            </label>
            <input
              type="number"
              className="form-control"
              style={{ width: "100px" }}
              value={stockMinimo}
              onChange={(e) => setStockMinimo(e.target.value)}
            />
          </div>

          <div className="d-flex align-items-center">
            <label className="form-label me-2 mb-0 text-nowrap">
              Cantidad
            </label>
            <input
              type="number"
              className="form-control"
              style={{ width: "100px" }}
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
            />
          </div>

        </div>

        <input
          className="form-control mb-3"
          placeholder="Ubicación (ej: Estante A3)"
          value={ubicacion}
          onChange={(e) => setUbicacion(e.target.value)}
        />

        <input
          type="file"
          ref={fileRef}
          className="form-control mb-3"
          onChange={(e) => {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);

            if (selectedFile) {
              setPreview(URL.createObjectURL(selectedFile));
            }
          }}
        />

        <button className="btn btn btn-dark w-100" onClick={handleSubmit}>
          Crear Producto
        </button>

      </div>

      {/* 🔵 PREVIEW */}
      <div className="col-md-6 d-flex align-items-center justify-content-center">

        {preview ? (
          <img
            src={preview}
            alt="preview"
            style={{
              maxWidth: "100%",
              maxHeight: "400px",
              borderRadius: "10px",
              border: "1px solid #ddd"
            }}
          />
        ) : (
          <div className="text-muted text-center">
            <p>Vista previa de imagen</p>
          </div>
        )}

      </div>

    </div>
  </div>
);
}
