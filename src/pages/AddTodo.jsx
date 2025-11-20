import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { todoService, validationUtils } from '../services/api';
import Loading from '../components/Loading';

function AddTodo() {
  // Estados del formulario
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium'
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    // Limpiar errores cuando el usuario escribe
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  // Validar formulario
  const validateForm = () => {
    const validationErrors = validationUtils.validateTodo(formData);
    setErrors(validationErrors);
    return validationErrors.length === 0;
  };

  // Manejar env√≠o del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await todoService.create(formData);
      
      // Redirigir a la lista con mensaje de √©xito
      navigate('/todos', { 
        state: { 
          message: '¬°Tarea creada exitosamente! ‚úÖ',
          type: 'success'
        } 
      });
    } catch (error) {
      setErrors([error.message]);
      console.error('Error creating todo:', error);
    } finally {
      setLoading(false);
    }
  };

  // Contadores de caracteres
  const charCount = {
    title: formData.title.length,
    description: formData.description.length
  };

  if (loading) {
    return (
      <div className="page-container">
        <Loading message="Creando tu tarea..." />
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="form-container">
        {/* Header del formulario */}
        <div className="form-header">
          <h1 className="page-title">Crear Nueva Tarea</h1>
          <p className="page-subtitle">
            Organiza tu d√≠a agregando una nueva tarea
          </p>
        </div>

        {/* Mensajes de error */}
        {errors.length > 0 && (
          <div className="alert alert-error">
            <ul className="error-list">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="todo-form">
          {/* Campo T√≠tulo */}
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              T√≠tulo *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-input"
              placeholder="¬øQu√© necesitas hacer?"
              disabled={loading}
              maxLength={100}
            />
            <div className="form-hint">
              {charCount.title}/100 caracteres
              {charCount.title < 3 && ' (m√≠nimo 3 caracteres)'}
            </div>
          </div>

          {/* Campo Descripci√≥n */}
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Descripci√≥n
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-textarea"
              placeholder="Detalles adicionales de la tarea..."
              disabled={loading}
              maxLength={500}
              rows={4}
            />
            <div className="form-hint">
              {charCount.description}/500 caracteres
            </div>
          </div>

          {/* Campo Prioridad */}
          <div className="form-group">
            <label htmlFor="priority" className="form-label">
              Prioridad
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="form-select"
              disabled={loading}
            >
              <option value="low">Ìø¢ Baja Prioridad</option>
              <option value="medium">Ìø° Media Prioridad</option>
              <option value="high">Ì¥¥ Alta Prioridad</option>
            </select>
            <div className="form-hint">
              Selecciona la urgencia de esta tarea
            </div>
          </div>

          {/* Acciones del formulario */}
          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/todos')}
              className="btn btn-secondary"
              disabled={loading}
            >
              ‚Ü©Ô∏è Cancelar
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? '‚è≥ Creando...' : '‚úÖ Crear Tarea'}
            </button>
          </div>
        </form>

        {/* Vista previa */}
        {formData.title && (
          <div className="preview-section">
            <h3 className="preview-title">Vista Previa</h3>
            <div className={`todo-item preview ${formData.priority}`}>
              <div className="todo-checkbox-container">
                <input type="checkbox" className="todo-checkbox" disabled />
              </div>
              <div className="todo-content">
                <h3 className="todo-title">{formData.title}</h3>
                {formData.description && (
                  <p className="todo-description">{formData.description}</p>
                )}
                <div className="todo-meta">
                  <span className={`todo-priority priority-${formData.priority}`}>
                    {formData.priority === 'high' ? 'Alta' : 
                     formData.priority === 'medium' ? 'Media' : 'Baja'} Prioridad
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddTodo;
