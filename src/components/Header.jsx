import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();

  // Funci√≥n para verificar si el link est√° activo
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <span className="logo-icon">‚úÖ</span>
          <h1 className="logo-text">TodoApp</h1>
        </div>

        {/* Navegaci√≥n */}
        <nav className="nav">
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            Ìø† Inicio
          </Link>
          <Link 
            to="/todos" 
            className={`nav-link ${isActive('/todos') ? 'active' : ''}`}
          >
            Ì≥ù Mis Tareas
          </Link>
          <Link 
            to="/add" 
            className={`nav-link ${isActive('/add') ? 'active' : ''}`}
          >
            ‚ûï Nueva Tarea
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
