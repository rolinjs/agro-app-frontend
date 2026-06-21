import { useState, useEffect } from "react";

function LineasProcesoForm( { onGuardar, lineaEditando }) {

  const [formulario, setFormulario] = useState({
    codigo: "",
    nombre: "",
    descripcion: ""
  });

  /**
   * Cada vez que lineaEditando cambie
   * ejecuta este codigo
   * cuando hiciste click en editar:
   * setLineaEditando(...) cambió.
   * entonces react ejecuta useEffect.
   * 
   */

  useEffect(() => {
    if(lineaEditando) {

      /**
       * Esto toma lineaEditando que vale:
       * {
            codigo: "LP-001",
            nombre: "Línea 1",
            descripcion: "Línea principal"
          }
          y lo copia al formulario
          ahora formulario vale:
          {
            codigo: "LP-001",
            nombre: "Línea 1",
            descripcion: "Línea principal"
          }
        y como tus inputs tienen value={formulario.codigo}
        React llena aumáticamente los inputs, por eso aparece la información en pantall
       */
      setFormulario({
        codigo: lineaEditando.codigo,
        nombre: lineaEditando.nombre,
        descripcion: lineaEditando.descripcion
      });
    }
  }, [lineaEditando]);

  const handleChange = (e) => {
    //Obtenemos el nombre del campo y su valor
    const { name, value } = e.target;

    //Actualizamos el estado del formulario
    setFormulario({
      ...formulario, //conservamos los valores actuales
      [name]: value //actualizamos únicamente el campo modificado
    });
  }

  const handleSubmit = (e) => {
    //Evita que el navegador recargue la página
    e.preventDefault();
    //Envía los datos al componente padre
    onGuardar(formulario);

    //Limpia el formulario
    setFormulario({
      codigo: "",
      nombre: "",
      descripcion: ""
    });
  }

  return (
    <div className="card">
      <div className="card-content">
        <span className="card-title">
          Registro de Línea de Proceso
        </span>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="input-field col s12 m4">
              <input
                id="codigo"
                type="text"
                name="codigo"
                placeholder="Ingrese código"
                value={formulario.codigo}
                onChange={handleChange}
              />
              <label htmlFor="codigo" className="active">
                Código
              </label>
            </div>

            <div className="input-field col s12 m4">
              <input
                id="nombre"
                type="text"
                name="nombre"
                placeholder="Ingrese nombre"
                value={formulario.nombre}
                onChange={handleChange}
              />
              <label htmlFor="nombre" className="active">
                Nombre
              </label>
            </div>

            <div className="input-field col s12 m4">
              <input
                id="descripcion"
                type="text"
                name="descripcion"
                placeholder="Ingrese descripción"
                value={formulario.descripcion}
                onChange={handleChange}
              />
              <label htmlFor="descripcion" className="active">
                Descripción
              </label>
            </div>
          </div>

          <div style={{ marginTop: "15px" }}>
            <button className="btn blue darken-3">
              { lineaEditando ? "Actualizar" : "Guardar"}
            </button>

            <button
              type="button"
              className="btn grey"
              style={{ marginLeft: "10px" }}
            >
              Limpiar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LineasProcesoForm;