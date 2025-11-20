import React from 'react';

function Filters({ 
  filter, 
  onFilterChange, 
  priorityFilter, 
  onPriorityFilterChange,
  stats 
}) {
  return (
    <div className="filters-section">
      <div className="filter-group">
        <label className="filter-label">Filtrar por estado:</label>
        <select 
          value={filter} 
          onChange={(e) => onFilterChange(e.target.value)}
          className="filter-select"
        >
          <option value="all">í³‹ Todas las tareas</option>
          <option value="pending">â³ Solo pendientes</option>
          <option value="completed">âœ… Solo completadas</option>
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">Filtrar por prioridad:</label>
        <select 
          value={priorityFilter} 
          onChange={(e) => onPriorityFilterChange(e.target.value)}
          className="filter-select"
        >
          <option value="all">í¾¯ Todas las prioridades</option>
          <option value="high">í´´ Alta prioridad</option>
          <option value="medium">í¿¡ Media prioridad</option>
          <option value="low">í¿¢ Baja prioridad</option>
        </select>
      </div>

      <div className="filter-info">
        í³Š Mostrando {stats.filtered} de {stats.total} tareas
        {stats.filtered !== stats.total && ' (filtradas)'}
      </div>
    </div>
  );
}

export default Filters;
