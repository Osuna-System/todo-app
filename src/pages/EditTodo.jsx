import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { todoService, validationUtils } from '../services/api';
import Loading from '../components/Loading';

function EditTodo() {
  // Estados
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    completed: false
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  // Cargar todo al montar el componente
  useEffect(() => {
    loadTodo();
  }, [id]);

  // Funci√≥n para cargar todo
  const loadTodo = async () => {
    try {
      setLoading(true);
      setErrors([]);
      setNotFound(false);
      
      const todoData = await todoService.getById(id);
      setFormData(todoData);
    } catch (error) {
      if (error.message === 'Tarea no encontrada') {
        setNotFound(true);
      } else {
        setErrors([error.message]);
      }
      console.error('Error loading todo:', error);
    } finally {
      setLoading(false);
    }
  };

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
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

    setSaving(true);

    try {
      await todoService.update(id, formData);
      
      // Redirigir a la lista con mensaje de √©xito
      navigate('/todos', { 
        state: { 
          message: '¬°Tarea actualizada exitosamente! ‚ú®',
          type: 'success'
        } 
      });
    } catch (error) {
      setErrors([error.message]);
      console.error('Error updating todo:', error);
    } finally {
      setSaving(false);
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
        <Loading message="Cargando tarea..." />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <div className="empty-state-icon">‚ùå</div>
          <h3 className="empty-state-title">Tarea no encontrada</h3>
          <p className="empty-state-description">
            La tarea que intentas editar no existe o ha sido eliminada.
          </p>
          <button 
            onClick={() => navigate('/todos')}
            className="btn btn-primary"
          >
            Volver a Mis Tareas
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="form-container">
        {/* Header del formulario */}
        <div className="form-header">
          <h1 className="page-title">Editar Tarea</h1>
          <p className="page-subtitle">
            Modifica los detalles de tu tarea
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
              disabled={saving}
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
              disabled={saving}
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
              disabled={saving}
            >
              <option value="low">Ìø¢ Baja Prioridad</option>
              <option value="medium">Ìø° Media Prioridad</option>
              <option value="high">Ì¥¥ Alta Prioridad</option>
            </select>
            <div className="form-hint">
              Selecciona la urgencia de esta tarea
            </div>
          </div>

          {/* Campo Estado */}
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="completed"
                checked={formData.completed}
                onChange={handleChange}
                disabled={saving}
                className="checkbox-input"
              />
              <span className="checkbox-custom"></span>
              <span className="checkbox-text">
                Marcar como completada
              </span>
            </label>
          </div>

          {/* Informaci√≥n de la tarea */}
          <div className="todo-info">
            <h4>Informaci√≥n de la Tarea</h4>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Creada:</span>
                <span className="info-value">
                  {new Date(formData.createdAt).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Estado:</span>
                <span className="info-value">
                  {formData.completed ? '‚úÖ Completada' : '‚è≥ Pendiente'}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">ID:</span>
                <span className="info-value">#{id}</span>
              </div>
            </div>
          </div>

          {/* Acciones del formulario */}
          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/todos')}
              className="btn btn-secondary"
              disabled={saving}
            >
              ‚Ü©Ô∏è Cancelar
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={saving}
            >
              {saving ? '‚è≥ Guardando...' : 'Ì≤æ Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTodo;
