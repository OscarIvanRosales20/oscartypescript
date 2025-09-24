import api from "../api";

// Obtener usuario actual
export const getUsuarioActual = async () => {
   const token = localStorage.getItem('token'); // Obtén el token almacenado
   if (!token) {
      throw new Error('Token no encontrado. Inicia sesión nuevamente.');
   }
   const response = await api.get('/usuario-actual',{
      headers:{
         Authorization: `Bearer ${token}`,
      },});
   return response.data;
};

export const loginService = async (credentials: { email: string; password: string }) => {
   try {
      const response = await api.post('/login', credentials); // Ajusta la URL según tu API
      return response.data.token; // Asegúrate de devolver el token o los datos esperados
   } catch (error) {
      console.error('Error in loginService:', error);
      throw error; // Propaga el error para que `login` lo maneje
   }
};