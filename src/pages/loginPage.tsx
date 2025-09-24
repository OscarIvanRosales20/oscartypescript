import {  useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import {  useEffect, useState } from "react"
import Form from 'react-bootstrap/Form';
import {  Button } from "react-bootstrap";

const LoginPage =()=>{
    const {loginGoogle,  usuarioActual} = useAuth()
    const navigate = useNavigate()
    const [newUser, setNewUser] = useState({ Nombre: "", Correo: "" });
    


    useEffect(()=>{
        if(usuarioActual){
            navigate("/dashboard")
        }
    },[usuarioActual, navigate])


    return(

        <>
        

        <div>
            <h1>Iniciar Session</h1>
            {usuarioActual ? (
                <p>Redirigiendo a tu Dashboard...</p>
            ): (
                <>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail" >
                    <Form.Label>Correo Electronico</Form.Label>
                    <Form.Control type="email" placeholder="Ingresar Correo" onChange={(e) => setNewUser({ ...newUser, Correo: e.target.value })}/>
                    <Form.Text className="text-muted">
                        Nunca compartiremos tu correo con alguien!!
                    </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" placeholder="Contraseña"onChange={(e) => setNewUser({ ...newUser, Nombre: e.target.value })} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={(e)=> {
                        e.preventDefault()
                        navigate('/Registrar-Usuario')
                    }}>
                        Registrar
                    </Button>
                    <button onClick={(e) =>{
                        e.preventDefault()
                        loginGoogle()
                        }}>Login con Goggle y Firebase</button>
                </Form>
                </>
                
            )}

        </div>
        </>
        
    )
}

export default LoginPage