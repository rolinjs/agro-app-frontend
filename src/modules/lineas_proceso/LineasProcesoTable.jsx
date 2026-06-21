
function LineasProcesoTable( { lineas, onEliminar, onEditar }) {
    /**
     * Ahora haremos que la tabla use los datos del padre con map().
     * Que está pasando:
     * lineas.map(...) recorre el arreglo
     * cada línea es un objeto y react pinta una fila <tr> por cada objeto
     * El key={line.id} ayud a React a identificar cada línea.
     */
    return(
        <div className="card">
            <div className="card-content">
                <span className="card-title">Listado de Líneas</span>
                <table className="striped responsive-table">
                    <thead>
                        <tr className="">
                            <th>Código</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        { lineas.map((linea) => (
                            <tr key={linea.id}>
                                <td>{linea.codigo}</td>
                                <td>{linea.nombre}</td>
                                <td>{linea.descripcion}</td>
                                <td>
                                    <span
                                        className={`new badge ${linea.estado ? "green" : "red"}`}
                                        data-badge-caption=""
                                    >
                                        { linea.estado ? "Activo" : "Inactivo"}
                                    </span>
                                </td>
                                <td>
                                    <button 
                                        className="btn-small blue darken-3"
                                        onClick={() => onEditar(linea)}
                                    >
                                        Editar
                                    </button>{" "}

                                    <button 
                                        className="btn-small red darken-2"
                                        onClick={() => onEliminar(linea.id)}
                                    >
                                        Eliminar
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default LineasProcesoTable;