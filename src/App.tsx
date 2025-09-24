import React from 'react';
import LoginPage from './pages/loginPage';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import NavbarPage from './pages/NavbarPage';
import { NotificationProvider } from './context/NotificationContext';
import { ThemeProvider } from './context/ThemeContext';
import { ModalProvider } from './context/ModalContext';
import ProtectedRoute from './context/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './context/AuthContext';
import RegistrarUsuario from './pages/RegistrarUsuario';

const App =()=> {
  return (
    <>
    <AuthProvider>
      <NotificationProvider>
        <ThemeProvider>
          <ModalProvider>
              <NavbarPage/>
            <Router>
              <Routes>
                <Route  path="/" element={<LoginPage /> }/>
                <Route path="/Registrar-Usuario" element={<RegistrarUsuario />}/>
                <Route path='dashboard' element={
                  <ProtectedRoute>
                    <Dashboard/>
                  </ProtectedRoute>
                }/>
                
              </Routes>
            </Router>
          </ModalProvider>
        </ThemeProvider>
      </NotificationProvider>
      
      
    </AuthProvider>
    </>
    
  );
}

export default App;
