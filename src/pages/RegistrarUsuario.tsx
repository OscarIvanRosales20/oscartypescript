import { Button, Form } from "react-bootstrap"
import { useAuth } from "../context/AuthContext"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegistrarUsuario = () =>{
    const {registrarCorreoContraseña} = useAuth();
    const [newUser, setNewUser] = useState({ Nombre: "", Correo: "" });
    const navigate = useNavigate()
    return(
        <>
        <Form >
            <h1>
                Registrar Nuevo Usuario
            </h1>
            <Form.Group className="mb-3" controlId="formBasicEmail" >
            <Form.Control type="email" placeholder="Ingresa Correo Electronico" onChange={(e) => setNewUser({ ...newUser, Correo: e.target.value })}/>
            <Form.Text className="text-muted">
                Nunca compartiremos tu correo con alguien!!
            </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Ingresa Contraseña"onChange={(e) => setNewUser({ ...newUser, Nombre: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={(e)=> {
                e.preventDefault()
                registrarCorreoContraseña(newUser.Correo, newUser.Nombre)
                navigate('/dashboard')
            }}>
                Registrar
            </Button>

                </Form>
        </>
    )
}

export default RegistrarUsuario