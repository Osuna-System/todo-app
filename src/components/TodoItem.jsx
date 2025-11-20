import React from 'react';
import { Link } from 'react-router-dom';

function TodoItem({ todo, onToggleComplete, onDelete }) {
  // Funci√≥n para obtener la clase de prioridad
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return 'priority-medium';
    }
  };

  // Funci√≥n para obtener el texto de prioridad
  const getPriorityText = (priority) => {
    switch (priority) {
      case 'high':
        return 'Alta';
      case 'medium':
        return 'Media';
      case 'low':
        return 'Baja';
      default:
        return 'Media';
    }
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      {/* Checkbox para completar */}
      <div className="todo-checkbox-container">
        <input
          type="checkbox"
          className="todo-checkbox"
          checked={todo.completed}
          onChange={() => onToggleComplete(todo.id, todo.completed)}
          aria-label={todo.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
        />
      </div>

      {/* Contenido del todo */}
      <div className="todo-content">
        <h3 className={`todo-title ${todo.completed ? 'completed' : ''}`}>
          {todo.title}
        </h3>
        {todo.description && (
          <p className="todo-description">
            {todo.description}
          </p>
        )}
        <div className="todo-meta">
          <span className={`todo-priority ${getPriorityClass(todo.priority)}`}>
            {getPriorityText(todo.priority)}
          </span>
          <span className="todo-date">
            {new Date(todo.createdAt).toLocaleDateString('es-ES')}
          </span>
        </div>
      </div>

      {/* Acciones */}
      <div className="todo-actions">
        <Link 
          to={`/edit/${todo.id}`} 
          className="btn btn-secondary btn-sm"
          aria-label={`Editar tarea: ${todo.title}`}
        >
          ‚úèÔ∏è Editar
        </Link>
        <button 
          onClick={() => onDelete(todo.id)}
          className="btn btn-danger btn-sm"
          aria-label={`Eliminar tarea: ${todo.title}`}
        >
          Ì∑ëÔ∏è Eliminar
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
