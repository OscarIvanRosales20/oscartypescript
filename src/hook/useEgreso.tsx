import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

interface Egreso{
    Descripcion:string;
    Valor: string
}

const useEgreso = ()=>{
    const [egresos, setEgresos] = useState<Egreso[]>([]);
    const [loadingEgresos, setLoading] = useState<boolean>(false)
    const [errorEgresos, setError] = useState<string |null>(null)
    const {db} = useAuth()
    
    useEffect(() => {
        cargarEgresos();
    }, [])
        
    const cargarEgresos = async() =>{
        try{
            //Llamado a la API
            setLoading(true)
            const resp = await getDocs(collection(db, 'Egresos'))
            const ingres = resp.docs.map((doc) => ({
                id: doc.id,
                ...(doc.data() as Omit<Egreso, 'id'>),
            }));
            setEgresos(ingres);
            
        }catch (error) {
            console.error("Error al cargar usuarios:", error);
            setError("Error Cargando Usuarios"+ error)
        }finally{
            setLoading(false)
        }

    };

    return{
        egresos,
        loadingEgresos,
        errorEgresos,
        recargarEgresos: cargarEgresos
    }
}

export default useEgreso