import axios, {InternalAxiosRequestConfig, AxiosHeaders} from 'axios';

const api = axios.create({
   baseURL: 'http://localhost:3001/api',
});

// Agregando tipado a las configuraciones del interceptor
api.interceptors.request.use(
   (config: InternalAxiosRequestConfig) => {
     const token = localStorage.getItem('token');
     if (token) {
      if (!config.headers) {
         config.headers = new AxiosHeaders();
       }
       config.headers['Authorization'] = `Bearer ${token}`;
     }
     return config;
   },
   (error) => {
     return Promise.reject(error);
   }
 );
 
 
 export default api;