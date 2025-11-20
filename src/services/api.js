// Configuración base de la API
const API_BASE = 'http://localhost:3001';

// Servicios para Todas las operaciones CRUD de todos
export const todoService = {
  // Obtener todos los todos
  getAll: async () => {
    const response = await fetch(`${API_BASE}/todos`);
    if (!response.ok) {
      throw new Error('Error al cargar las tareas');
    }
    return await response.json();
  },

  // Obtener un todo por ID
  getById: async (id) => {
    const response = await fetch(`${API_BASE}/todos/${id}`);
    if (!response.ok) {
      throw new Error('Tarea no encontrada');
    }
    return await response.json();
  },

  // Crear nuevo todo
  create: async (todoData) => {
    const response = await fetch(`${API_BASE}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...todoData,
        createdAt: new Date().toISOString()
      }),
    });
    if (!response.ok) {
      throw new Error('Error al crear la tarea');
    }
    return await response.json();
  },

  // Actualizar todo
  update: async (id, todoData) => {
    const response = await fetch(`${API_BASE}/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoData),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar la tarea');
    }
    return await response.json();
  },

  // Actualizar parcialmente todo (para toggle completed)
  patch: async (id, updates) => {
    const response = await fetch(`${API_BASE}/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar la tarea');
    }
    return await response.json();
  },

  // Eliminar todo
  delete: async (id) => {
    const response = await fetch(`${API_BASE}/todos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Error al eliminar la tarea');
    }
    return await response.json();
  }
};

// Re-exportar las validaciones desde el archivo de validaciones
export { todoValidation as validationUtils } from './validation.js';
