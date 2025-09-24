import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { useAuth } from "../context/AuthContext"
import { useTheme } from "../context/ThemeContext"
import MenuTemas from "../component/MenuTemas"
import { useNotifications } from "../context/NotificationContext"



const NavbarPage = ()=>{
    const {usuarioActual,salir} = useAuth()
    const {addNotification} = useNotifications()
    const {theme} = useTheme()

    const notifi=()=>{
        addNotification('titulo',``, 'success')
    }
    return(
        <>
        {usuarioActual &&(
            <div >
                <Navbar expand="lg" style={{ background: theme.background, color: theme.color }} >
        <Container style={{ background: theme.background, color: theme.color }} >
            <Navbar.Brand href="/dashboard" style={{ backgroundColor: theme.background, color: theme.color }}>Gestión de Recursos Financieros</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ background: theme.background, color: theme.color }} />
            <Navbar.Collapse id="basic-navbar-nav"  style={{ backgroundColor: theme.color, color: theme.color }}>
            <Nav className="me-auto" style={{ background: theme.background, color: theme.color }}>
                <Nav.Link href="/Usuarios"  style={{ backgroundColor: theme.background, color: theme.color }}>Usuarios</Nav.Link>
                <Nav.Link href="/Registrar-Usuario" style={{ background: theme.background, color: theme.color }}>
                Registrar Usuarios</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown"  style={{ background: theme.background, color: theme.color }}>
                <NavDropdown.Item href="#action/3.1" style={{ background: theme.background, color: theme.color }}>Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2" style={{ background: theme.background, color: theme.color }}>
                    Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4" style={{ background: theme.background, color: theme.color }}>
                    Separated link
                </NavDropdown.Item>
                </NavDropdown>
                <Button as="a" variant="outline-danger"  onClick={()=>salir()}>
                    Salir
                </Button>
                <Button as="a" variant="outline-dark" onClick={()=>notifi()}>
                    Notificiacion
                </Button>
                <MenuTemas/>
            </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
            </div>
            
        )}
        
        </>
    )
}

export default NavbarPage