import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="page-container">
      <div className="not-found-container">
        <div className="not-found-content">
          <div className="not-found-icon">Ì¥ç</div>
          <h1 className="not-found-title">P√°gina No Encontrada</h1>
          <p className="not-found-description">
            Lo sentimos, la p√°gina que est√°s buscando no existe o ha sido movida.
          </p>
          <div className="not-found-actions">
            <Link to="/" className="btn btn-primary btn-lg">
              Ìø† Volver al Inicio
            </Link>
            <Link to="/todos" className="btn btn-secondary btn-lg">
              Ì≥ù Ir a Mis Tareas
            </Link>
          </div>
          <div className="not-found-code">
            Error 404
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
