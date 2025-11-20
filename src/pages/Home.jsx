import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const features = [
    {
      icon: '‚úÖ',
      title: 'Gesti√≥n Simple',
      description: 'Crea, edita y organiza tus tareas de manera intuitiva'
    },
    {
      icon: '‚ö°',
      title: 'R√°pido y Eficiente',
      description: 'Interfaz optimizada para m√°xima productividad'
    },
    {
      icon: 'ÌæØ',
      title: 'Enfocado en Ti',
      description: 'Prioriza lo que realmente importa'
    },
    {
      icon: 'Ì≥±',
      title: 'Acceso Universal',
      description: 'Funciona en todos tus dispositivos'
    }
  ];

  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Organiza tu vida con 
            <span className="gradient-text"> TodoApp</span>
          </h1>
          <p className="hero-description">
            La aplicaci√≥n perfecta para gestionar tus tareas diarias, 
            aumentar tu productividad y mantener el control de tus objetivos.
          </p>
          <div className="hero-actions">
            <Link to="/todos" className="btn btn-primary btn-lg">
              Comenzar Ahora
            </Link>
            <Link to="/add" className="btn btn-secondary btn-lg">
              Crear Primera Tarea
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="todo-preview">
            <div className="preview-item completed">
              <span>‚úÖ Aprender React</span>
            </div>
            <div className="preview-item">
              <span>Ì≥ù Hacer ejercicio</span>
            </div>
            <div className="preview-item">
              <span>Ìªí Comprar v√≠veres</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">¬øPor qu√© usar TodoApp?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number">+500</div>
            <div className="stat-label">Tareas gestionadas</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">99%</div>
            <div className="stat-label">Satisfacci√≥n usuarios</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Disponibilidad</div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
