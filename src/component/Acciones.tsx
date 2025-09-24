import '../App.css';
import { collection, addDoc } from "firebase/firestore";
import {db} from '../firebase-config'
import { useState } from 'react';
import { Button, Form, Stack } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';

export const Acciones = ()=>{

    const [datos, setDatos] = useState({funcion: '',descripcion:'', valor:''})
    const {usuarioActual} = useAuth()
    const {addNotification} = useNotifications()

    const notificacio = (titulo:string,valor: string)=>{
        addNotification(`Añadir ${titulo}`,`El valor de ${valor} Fue Ingresado Correctamente`, 'success')
    }
    const agregarInEg = async (funcion: string, descripcion:string, valor:string) => {
        try{
            if(funcion === 'Ingreso'){
                await addDoc(collection(db, `Ingresos-${usuarioActual?.displayName}`), {
                Descripcion: descripcion,
                Valor: valor,
            });
            }
            if(funcion === 'Egreso'){
                await addDoc(collection(db, `Egresos-${usuarioActual?.displayName}`), {
                Descripcion: descripcion,
                Valor: valor,
            });
            }
        }catch (error: any) {
            console.error("Error Add Ingreso or Egreso", error.code, error.message);
            throw error;
        }
        
    };
    return(
        <>
        <div className="vr"/>
        <Form>
            <Form.Group controlId='idAcciones'>
                <Stack direction='horizontal' className='m-2 ms-5'  >
                    <Form.Check className='me-5 ms-5' type={'radio'} label={'Ingreso'} id={`idIngreso`} name='Ingreso' value={'Ingreso'} checked={datos.funcion === 'Ingreso'} onChange={(e) => setDatos({...datos, funcion: e.target.value} )}/>
                    <Form.Check type={'radio'} label={'Egreso'} id={`idEgreso`} name='Egreso' value={'Egreso'} checked={datos.funcion === 'Egreso'} onChange={(e) => setDatos({...datos, funcion: e.target.value} )}/>
                </Stack>
                {datos.funcion !== ''&&(
                    <Stack direction='horizontal' className='m-5'>
                    
                <Form.Control type='text' placeholder='Ingresa Descripcion' value={datos.descripcion} onChange={(e) => setDatos({...datos, descripcion: e.target.value})}/>
                <Form.Control type='number' placeholder='Ingresa Valor Numerico' value={datos.valor} onChange={(e) => setDatos({...datos, valor: e.target.value})}/>
                {datos.descripcion !== '' && datos.valor !== ''&& (
                    <>
                    <Button className='m-2' onClick={(e) =>{
                        e.preventDefault()
                        agregarInEg(datos.funcion, datos.descripcion, datos.valor)
                        setDatos({funcion:'', valor:'', descripcion:''})
                        notificacio(datos.funcion, datos.valor)
                        }}>Añadir {datos.funcion}</Button>
                    </>
                )}
                </Stack>
                )}
                
                
                    
            </Form.Group>
        </Form>
        
        </>
    )
}