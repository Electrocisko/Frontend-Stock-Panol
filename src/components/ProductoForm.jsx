import { CATEGORIAS } from "../api/categorias";

const ProductoForm = ({
  form,
  setForm,
  proveedores,
  onSubmit,
  fileRef,
  setFile,
  preview,
  setPreview,
  textoBoton = "Guardar",
}) => {
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="row">
      {/* 🟢 FORM */}
      <div className="col-md-6">

        <input
          name="nombre"
          className="form-control mb-2"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
        />

        <input
          name="codigo"
          className="form-control mb-2"
          placeholder="Código"
          value={form.codigo}
          onChange={handleChange}
        />

        <textarea
          name="descripcion"
          className="form-control mb-2"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
        />

        <select
          name="categoria"
          className="form-control"
          value={form.categoria}
          onChange={handleChange}
        >
          <option value="">Seleccionar categoría</option>
          {CATEGORIAS.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          name="proveedorId"
          className="form-control mt-2"
          value={form.proveedorId}
          onChange={handleChange}
        >
          <option value="">Seleccionar proveedor</option>
          {proveedores.map((prov) => (
            <option key={prov.id} value={prov.id}>
              {prov.nombre}
            </option>
          ))}
        </select>

        <input
          name="unidadMedida"
          className="form-control mb-2 mt-2"
          placeholder="Unidad de medida"
          value={form.unidadMedida}
          onChange={handleChange}
        />

<div className="mb-3">
  <div className="d-flex gap-3">
    
    {/* Stock mínimo */}
    <div className="w-100">
      <label className="form-label small text-muted">
        Stock mínimo
      </label>
      <input
        type="number"
        name="stockMinimo"
        className="form-control"
        value={form.stockMinimo}
        onChange={handleChange}
      />
    </div>

    {/* Stock actual */}
    <div className="w-100">
      <label className="form-label small text-muted">
        Cantidad Inicial
      </label>
      <input
        type="number"
        name="cantidad"
        className="form-control"
        value={form.cantidad}
        onChange={handleChange}
      />
    </div>

  </div>
</div>

        <input
          name="ubicacion"
          className="form-control mb-3"
          placeholder="Ubicación"
          value={form.ubicacion}
          onChange={handleChange}
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

        <button className="btn btn-dark w-100" onClick={onSubmit}>
          {textoBoton}
        </button>
      </div>

      {/* 🔵 PREVIEW */}
      <div className="col-md-6 d-flex align-items-center justify-content-center">
        {preview ? (
          <img
            src={preview}
            alt="preview"
            style={{ maxWidth: "100%", maxHeight: "400px" }}
          />
        ) : (
          <div className="text-muted text-center">
            <p>Vista previa de imagen</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductoForm;