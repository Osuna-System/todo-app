import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { todoService } from '../services/api';
import TodoItem from '../components/TodoItem';
import Loading from '../components/Loading';

function Todos() {
  // Estados
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  // Cargar todos al montar el componente
  useEffect(() => {
    loadTodos();
  }, []);

  // Función para cargar todos
  const loadTodos = async () => {
    try {
      setLoading(true);
      setError('');
      const todosData = await todoService.getAll();
      setTodos(todosData);
    } catch (error) {
      setError(error.message);
      console.error('Error loading todos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Función para alternar estado completado
  const handleToggleComplete = async (id, completed) => {
    try {
      await todoService.patch(id, { completed: !completed });
      
      // Actualizar estado local
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === id ? { ...todo, completed: !completed } : todo
        )
      );
    } catch (error) {
      setError(error.message);
      console.error('Error updating todo:', error);
    }
  };

  // Función para eliminar todo
  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      return;
    }

    try {
      await todoService.delete(id);
      
      // Actualizar estado local
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    } catch (error) {
      setError(error.message);
      console.error('Error deleting todo:', error);
    }
  };

  // Filtrar todos
  const filteredTodos = todos.filter(todo => {
    const statusMatch = 
      filter === 'all' || 
      (filter === 'completed' && todo.completed) ||
      (filter === 'pending' && !todo.completed);
    
    const priorityMatch = 
      priorityFilter === 'all' || 
      todo.priority === priorityFilter;
    
    return statusMatch && priorityMatch;
  });

  // Contadores para estadísticas
  const stats = {
    total: todos.length,
    completed: todos.filter(todo => todo.completed).length,
    pending: todos.filter(todo => !todo.completed).length
  };

  if (loading) {
    return (
      <div className="page-container">
        <Loading message="Cargando tus tareas..." />
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Header de la página */}
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">Mis Tareas</h1>
          <p className="page-subtitle">
            Gestiona y organiza todas tus actividades
          </p>
        </div>
        <Link to="/add" className="btn btn-primary btn-lg">
          ➕ Nueva Tarea
        </Link>
      </div>

      {/* Mensaje de error */}
      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
          <button 
            onClick={loadTodos} 
            className="btn btn-secondary btn-sm"
          >
            Reintentar
          </button>
        </div>
      )}

      {/* Estadísticas */}
      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-card-icon">���</div>
          <div className="stat-card-content">
            <div className="stat-card-number">{stats.total}</div>
            <div className="stat-card-label">Total</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">✅</div>
          <div className="stat-card-content">
            <div className="stat-card-number">{stats.completed}</div>
            <div className="stat-card-label">Completadas</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">⏳</div>
          <div className="stat-card-content">
            <div className="stat-card-number">{stats.pending}</div>
            <div className="stat-card-label">Pendientes</div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="filters-section">
        <div className="filter-group">
          <label className="filter-label">Filtrar por estado:</label>
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">Todas las tareas</option>
            <option value="pending">Solo pendientes</option>
            <option value="completed">Solo completadas</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Filtrar por prioridad:</label>
          <select 
            value={priorityFilter} 
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">Todas las prioridades</option>
            <option value="high">Alta prioridad</option>
            <option value="medium">Media prioridad</option>
            <option value="low">Baja prioridad</option>
          </select>
        </div>

        <div className="filter-info">
          Mostrando {filteredTodos.length} de {todos.length} tareas
        </div>
      </div>

      {/* Lista de todos */}
      {filteredTodos.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">���</div>
          <h3 className="empty-state-title">
            {todos.length === 0 ? 'No hay tareas' : 'No hay tareas con estos filtros'}
          </h3>
          <p className="empty-state-description">
            {todos.length === 0 
              ? 'Comienza organizando tu día con tu primera tarea'
              : 'Prueba con otros filtros para ver más tareas'
            }
          </p>
          <Link to="/add" className="btn btn-primary">
            Crear Mi Primera Tarea
          </Link>
        </div>
      ) : (
        <div className="todos-list">
          {filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Todos;
