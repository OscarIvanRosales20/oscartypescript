import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

interface Usuario{
    id: string;
    Nombre:string;
    Correo: string;
}



export const useUsuario = ()=>{
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [loadingUsuarios, setLoading] = useState<boolean>(false)
    const [errorUsuarios, setError] = useState<string |null>(null)
    const {db} = useAuth()
    

    useEffect(() => {
        cargarUsuarios();
    }, [])

    const cargarUsuarios = async() =>{
        try{
           //Llamado a la API
           setLoading(true)
            const resp = await getDocs(collection(db, 'Usuarios12'))
            const users = resp.docs.map((doc) => ({
                id: doc.id,
                ...(doc.data() as Omit<Usuario, 'id'>),
            }));
            setUsuarios(users);
            
        }catch (error) {
            console.error("Error al cargar usuarios:", error);
            setError("Error Cargando Usuarios"+ error)
        }finally{
            setLoading(false)
        }

    };

    return{
        usuarios, loadingUsuarios, errorUsuarios, recargarUsuarios: cargarUsuarios
    }

}