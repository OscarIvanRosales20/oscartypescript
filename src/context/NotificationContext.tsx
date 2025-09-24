import { createContext, useContext, useState, ReactNode } from 'react';

import { Toast } from "react-bootstrap"

type Notification = {
  id: number;
  titulo:string
  mensaje: string;
  variante?: string; // 'success', 'danger', etc.
};

type NotificationContextType = {
  addNotification: (titulo: string,mensaje: string, variante?: string) => void;
};
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotifications must be used within NotificationProvider');
  return context;
};


export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (titulo:string,mensaje: string, variante: string = 'info') => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id,titulo, mensaje, variante }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      <div
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 9999,
        }}
      >
        {notifications.map((n) => (
          <Toast key={n.id} bg={n.variante} className=" custom-toast mb-2 show">
            <Toast.Header><strong>{n.titulo}</strong></Toast.Header>
            <Toast.Body>{n.mensaje}</Toast.Body>
          </Toast>
        ))}
      </div>
    </NotificationContext.Provider>
  );
}

export default Notification