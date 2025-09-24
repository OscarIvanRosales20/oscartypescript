import {Navigate} from "react-router-dom"
import {ReactNode} from "react";
import {useAuth} from "../context/AuthContext"

interface ProtectedRouteProps{
    children: ReactNode | undefined
}
const ProtectedRoute = ({children}: ProtectedRouteProps)=>{
    const {usuarioActual}=useAuth()
    if(!usuarioActual){
        return <Navigate to="/"/>    
    }
    return usuarioActual ? <>{children}</> : <Navigate to="/dashboard" />;
}

export default ProtectedRoute