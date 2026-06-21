
import api from '../../api/axios.js';

/** Aquí React no llama directo al backend desde el componente. Lo hace mediante un service, más ordenado. */
/**
 * React carga componente
    useEffect llama al backend
    Axios recibe datos
    setState guarda datos
    la tabla se actualiza
 */
export const obtenerLineasProceso = async () => {
    const response = await api.get('/lineas-proceso');
    return response.data;
}

export const crearLineasProceso = async (datos) => {
    const response = await api.post('/lineas-proceso', datos);
    return response.data;
}

export const actualizarLineaProceso = async (id, datos) => {
    const response = await api.put(`/lineas-proceso/${id}`, datos);
    return response.data;
}

export const eliminarLineaProceso = async (id) => {
    const response = await api.delete(`/lineas-proceso/${id}`);
    return response.data;
}