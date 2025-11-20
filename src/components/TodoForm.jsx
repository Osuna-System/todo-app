import React from 'react';

function TodoForm({ 
  formData, 
  errors, 
  touched, 
  onChange, 
  onBlur, 
  charCount,
  isEditing = false 
}) {
  return (
    <form className="todo-form">
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
          onChange={onChange}
          onBlur={onBlur}
          className={`form-input ${errors.title && touched.title ? 'error' : ''}`}
          placeholder="¬øQu√© necesitas hacer?"
          maxLength={100}
        />
        <div className="form-hint">
          {charCount.title}/100 caracteres
          {charCount.title < 3 && ' (m√≠nimo 3 caracteres)'}
        </div>
        {errors.title && touched.title && (
          <div className="field-error">{errors.title}</div>
        )}
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
          onChange={onChange}
          onBlur={onBlur}
          className={`form-textarea ${errors.description && touched.description ? 'error' : ''}`}
          placeholder="Detalles adicionales de la tarea..."
          maxLength={500}
          rows={4}
        />
        <div className="form-hint">
          {charCount.description}/500 caracteres
        </div>
        {errors.description && touched.description && (
          <div className="field-error">{errors.description}</div>
        )}
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
          onChange={onChange}
          onBlur={onBlur}
          className="form-select"
        >
          <option value="low">Ìø¢ Baja Prioridad</option>
          <option value="medium">Ìø° Media Prioridad</option>
          <option value="high">Ì¥¥ Alta Prioridad</option>
        </select>
        <div className="form-hint">
          Selecciona la urgencia de esta tarea
        </div>
      </div>

      {/* Campo Estado (solo en edici√≥n) */}
      {isEditing && (
        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="completed"
              checked={formData.completed}
              onChange={onChange}
              className="checkbox-input"
            />
            <span className="checkbox-custom"></span>
            <span className="checkbox-text">
              Marcar como completada
            </span>
          </label>
        </div>
      )}
    </form>
  );
}

export default TodoForm;
