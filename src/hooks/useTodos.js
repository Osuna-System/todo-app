import { useState, useEffect } from 'react';
import { todoService } from '../services/api';

// Hook personalizado para manejar la lógica de todos
export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Cargar todos inicialmente
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
    } catch (err) {
      setError(err.message);
      console.error('Error loading todos:', err);
    } finally {
      setLoading(false);
    }
  };

  // Función para crear un nuevo todo
  const createTodo = async (todoData) => {
    try {
      const newTodo = await todoService.create(todoData);
      setTodos(prev => [newTodo, ...prev]);
      return newTodo;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Función para actualizar un todo
  const updateTodo = async (id, updates) => {
    try {
      const updatedTodo = await todoService.update(id, updates);
      setTodos(prev => prev.map(todo => 
        todo.id === id ? updatedTodo : todo
      ));
      return updatedTodo;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Función para alternar estado completado
  const toggleTodo = async (id, completed) => {
    try {
      const updatedTodo = await todoService.patch(id, { completed: !completed });
      setTodos(prev => prev.map(todo => 
        todo.id === id ? updatedTodo : todo
      ));
      return updatedTodo;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Función para eliminar un todo
  const deleteTodo = async (id) => {
    try {
      await todoService.delete(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Función para limpiar errores
  const clearError = () => {
    setError('');
  };

  return {
    todos,
    loading,
    error,
    loadTodos,
    createTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
    clearError
  };
};

// Hook para filtrar todos
export const useTodoFilters = (todos) => {
  const [filter, setFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  // Filtrar todos basado en los filtros activos
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

  // Estadísticas
  const stats = {
    total: todos.length,
    completed: todos.filter(todo => todo.completed).length,
    pending: todos.filter(todo => !todo.completed).length,
    filtered: filteredTodos.length
  };

  return {
    filter,
    setFilter,
    priorityFilter,
    setPriorityFilter,
    filteredTodos,
    stats
  };
};
