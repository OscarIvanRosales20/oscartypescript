// ModalContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

type ModalState = {
  title: string;
  body: ReactNode;
  show: boolean;
};

type ModalContextType = {
  openModal: (title: string, body: ReactNode) => void;
  closeModal: () => void;
};


const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal debe usarse dentro de ModalProvider');
  return context;
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState<ModalState>({ title: '', body: null, show: false });

  const openModal = (title: string, body: ReactNode) => {
    setModal({ title, body, show: true });
  };

  const closeModal = () => {
    setModal((prev) => ({ ...prev, show: false }));
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Modal show={modal.show} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modal.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modal.body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </ModalContext.Provider>
  );
};
