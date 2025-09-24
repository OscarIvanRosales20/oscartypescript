import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { collection, getDocs } from "firebase/firestore";

interface Datos{
    Descripcion: string
    Valor:string
    id:string
}

interface IngresoProps{
    colecionBD:string
    nombreUsuario:string;
}
const  useDatos = ({nombreUsuario, colecionBD}:IngresoProps)=>{
    const [datos, setDatos] = useState<Datos[]>([]);
    const [loadingDatos, setLoading] = useState<boolean>(false)
    const [errorDatos, setError] = useState<string |null>(null)
    const {db} = useAuth()

    

    useEffect(() => {
        cargarDatos();
    }, [])
    
        const cargarDatos = async() =>{
            try{
               //Llamado a la API
               setLoading(true)
                const resp = await getDocs(collection(db, `${colecionBD}-${nombreUsuario}`))
                const data = resp.docs.map((doc) => ({
                    id: doc.id,
                    ...(doc.data() as Omit<Datos, 'id'>),
                }));
                setDatos(data);
                
            }catch (error) {
                console.error("Error al cargar usuarios:", error);
                setError("Error Cargando Usuarios"+ error)
            }finally{
                setLoading(false)
            }
    
        };
    
        return{
            datos, loadingDatos, errorDatos, recargarDatos: cargarDatos
        }
}

export default useDatos