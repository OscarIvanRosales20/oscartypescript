import React from 'react';
import { Button, Spinner } from 'react-bootstrap';

interface LoadingErrorProps {
  loading: boolean;
  error: string | null;
  dato: string
}

const LoadingError= ({ loading, error, dato }:LoadingErrorProps) => {
  if (loading) {
    return (
        <>
        <Button variant="primary" disabled>
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          {`Cargando ${dato}...`}
        </Button>
        </>
      
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h1  >{error}</h1>
      </div>
    );
  }

  return null; // No se muestra nada si no hay loading ni error
};

export default LoadingError;