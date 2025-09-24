import { useNavigate } from 'react-router-dom';
import '../App.css';
import { useAuth } from '../context/AuthContext';
import { useModal } from '../context/ModalContext';
import useDatos from '../hook/useDatos';
import { Acciones } from './Acciones';
import LoadingError from './Globales/LoadingError';

type Gasto = {
  Descripcion: string;
  Valor: string; // valor como string
  id: string;
};

const sumarValoresDeGastos = (gastos: Gasto[]): number => {
    return gastos
        .map(gasto => parseFloat(gasto.Valor))
        .filter(valor => !isNaN(valor))
        .reduce((total, valor) => total + valor, 0);
};

export const PresupuestoDisponible = ()=>{
    const {usuarioActual} = useAuth()
    const {openModal} = useModal()

    const ingresosHook = useDatos({nombreUsuario:`${usuarioActual?.displayName}`, colecionBD:`Ingresos`})
    const egresosHook = useDatos({nombreUsuario:`${usuarioActual?.displayName}`, colecionBD:`Egresos`})
    const navigate = useNavigate()

    const {datos: ingresos, loadingDatos: loaDatos, errorDatos: errDatos} = ingresosHook
    const {datos: egresos, loadingDatos: loaDatosEgre, errorDatos: errDatosEgre} = egresosHook
    

    

    const totalIngresos = sumarValoresDeGastos(ingresos)
    const totalEgresos = sumarValoresDeGastos(egresos)
    const balance = totalIngresos - totalEgresos;
    
    const totalGeneral = totalIngresos + totalEgresos;
    const porcentajeIngresos = totalGeneral > 0 ? (totalIngresos / totalGeneral) * 100 : 0;
    const porcentajeEgresos = totalGeneral > 0 ? (totalEgresos / totalGeneral) * 100 : 0;




    const addInEgVer=()=>{
        openModal('Añadir Egreso/Ingreso',
            <>
            <Acciones/>
            </>
        )
    }

    return(
        <>
            <div className="cabecero">
                <LoadingError loading={loaDatos} error={errDatos} dato='Ingresos' />
                <LoadingError loading={loaDatosEgre} error={errDatosEgre} dato='Egresos' />
                <div className="presupuesto">
                    <h1>Presupuesto Disponible</h1>

                    <div className="presupuesto_valor" id="presupuesto">{`${balance.toFixed(2)}`}</div>
                

                    
                <div className={`presupuesto_ingreso limpiarEstilos`} onClick={(e) =>{
                    e.preventDefault()
                    navigate(`/Ingresos`)
                    }}>
                    <div className="presupuesto_egreso--texto ">{`Ingresos`}</div>
                    <div className="derecha limpiarEstilos">
                        <div className="presupuesto_egreso--valor" id="ingresos">{`+${totalIngresos}` }</div>
                        <div className="presupuesto_egreso--porcentaje" id="porcentaje">{`${porcentajeIngresos.toFixed(2)}`}</div>
                    </div>
                </div>

                <div className={ `presupuesto_egreso limpiarEstilos`} onClick={(e) =>{
                    e.preventDefault()
                    navigate(`/Egresos`)
                    }}>
                    <div className="presupuesto_egreso--texto ">{`Egresos`}</div>
                    <div className="derecha limpiarEstilos">
                        <div className="presupuesto_egreso--valor" id="egresos">{ `-${totalEgresos}`}</div>
                        <div className="presupuesto_egreso--porcentaje" id="porcentaje">{`${porcentajeEgresos.toFixed(2)}`}</div>
                    </div>
                </div>

                    
                    <div className="presupuestoAdd limpiarEstilos" onClick={addInEgVer}>
                        <div className="presupuesto_add--texto">Añadir</div>
                        <div className="derecha limpiarEstilos">
                            <div className="presupuesto_egreso--valor" id="egresos">Ingreso/Egreso</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
