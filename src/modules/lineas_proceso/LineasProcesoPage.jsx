
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import { 
    obtenerLineasProceso,
    crearLineasProceso,
    actualizarLineaProceso,
    eliminarLineaProceso
} from './LineasProcesoService';

import LineasProcesoForm from './LineasProcesoForm';
import LineasProcesoTable from './LineasProcesoTable';

function LineasProcesoPage() {

    //agregamos un estado
    const [lineas, setLineas] = useState([]);

    //ESTADO EDITAR
    const [lineaEditando, setLineaEditando] = useState(null);

    //Luego le pasaremos la información a la tabla: el padre envía información al hijo/hijo recibe información.
    /**
     * React guarda información en memoria [lineas], contiene los datos [setLineas]
     * sirve para modificarlos
     */

    /**
     * Esta función se ejecuta cuando el formulario envía una nuena línea.
     */

    const cargarLineas = async () => {
        try {
            const respuesta = await obtenerLineasProceso();
            setLineas(respuesta.data);
        } catch (error) {
            console.log('ERROR AL CARGAR LÍNEAS: ', error)
        }
    }

    useEffect(() => {
        cargarLineas()
    }, [])

    const agregarLinea = async (datosFormulario) => {
        try {
           
            if(lineaEditando) {
                
                await actualizarLineaProceso(
                    lineaEditando.id, datosFormulario
                );

                Swal.fire({
                    icon: "success",
                    title: "Correcto",
                    text: "Línea actualizada correctamente",
                    timer: 1500,
                    showConfirmButton: false
                });

                await cargarLineas();

                setLineaEditando(null);

            } else {

                Swal.fire({
                    icon: "success",
                    title: "Correcto",
                    text: "Línea creada correctamente",
                    timer: 1500,
                    showConfirmButton: false
                });

                await crearLineasProceso(datosFormulario);

                await cargarLineas();
            }

        } catch (error) {

            Swal.fire({
                icon: "warning",
                title: "¡Hubo un error de validación!",
                text: "La línea no puede ir vacía",
                timer: 1500,
                showConfirmButton: false
            });

            console.log('Error al guardar línea: ', error)
        }
    }

    /**
     * Cuando hace click aquí: onClick={() => onEditar(linea)}
     * React envía la fila completa:
     * {
            id: 1,
            codigo: "LP-001",
            nombre: "Línea 1",
            descripcion: "Línea principal",
            estado: true
        }
        a: seleccionarLinea(linea)| entonces seleccionarLiea(linea) guarda esa fila en memoria
        ahora react tiene lineaEditando igual a: {...}.
     */
    const seleccionarLinea = (linea) => {
        setLineaEditando(linea);
    }

    const eliminarLinea = async (id) => {

        const resultado = await Swal.fire({
            title: "¿Está seguro?",
            text: "La línea de proceso será eliminada.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6"
        });

        if(!resultado.isConfirmed) {
            return;
        }

        try {

            await eliminarLineaProceso(id);

            await cargarLineas();

            Swal.fire({
                icon: "success",
                title: "Correcto",
                text: "Línea eliminada correctamente",
                timer: 1500,
                showConfirmButton: false
            });

        } catch (error) {
            console.log(
                'Error al eliminar línea:',
                error
            );

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo eliminar la línea"
            });
        }
    }

    return(
        <div>
            <h5 className="blue-text text-darken-3">
                Módulo: Líneas de Proceso
            </h5>
            <LineasProcesoForm onGuardar={ agregarLinea } lineaEditando={ lineaEditando}/>
            {/**Y Aquí estamos enviando datos al hijo / eso se llama props Padre -> envía | Hijo -> recibe */}
            <LineasProcesoTable lineas={ lineas } onEliminar={ eliminarLinea } onEditar={seleccionarLinea}/>
        </div>
    );
}

export default LineasProcesoPage;