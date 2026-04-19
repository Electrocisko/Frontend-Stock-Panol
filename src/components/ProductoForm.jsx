import { CATEGORIAS } from "../api/categorias";
import { UNIDADES, UNIDADES_LABELS } from "../api/unidades.js";

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
    const { name, value } = e.target;

    const numberFields = ["proveedorId", "stockMinimo", "cantidad"];

    setForm({
      ...form,
      [name]: numberFields.includes(name) ? Number(value) : value,
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

        {/* ✅ Unidad de medida como select */}
        <select
          name="unidadMedida"
          className="form-control mt-2"
          value={form.unidadMedida}
          onChange={handleChange}
        >
          <option value="">Seleccione unidad</option>
          {UNIDADES.map((u) => (
            <option key={u} value={u}>
              {UNIDADES_LABELS[u]}
            </option>
          ))}
        </select>

        <div className="mb-3">
          <div className="d-flex gap-3">

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