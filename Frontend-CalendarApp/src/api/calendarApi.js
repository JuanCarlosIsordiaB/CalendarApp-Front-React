import axios from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_API_URL } = getEnvVariables();

//Lo usamos para no tener que poner VITE_API_URL cada vez que queramos ahcer una peticion
const calendarApi = axios.create({
    baseURL: VITE_API_URL
});

// Configurar Interceptores
calendarApi.interceptors.request.use( config => {

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config;
})

export default calendarApi;