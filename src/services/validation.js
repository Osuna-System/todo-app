// Servicio de validaciones para formularios

export const todoValidation = {
  // Validar un todo completo
  validateTodo: (todoData) => {
    const errors = {};

    // Validar título
    if (!todoData.title || todoData.title.trim() === '') {
      errors.title = 'El título es obligatorio';
    } else if (todoData.title.length < 3) {
      errors.title = 'El título debe tener al menos 3 caracteres';
    } else if (todoData.title.length > 100) {
      errors.title = 'El título no puede tener más de 100 caracteres';
    }

    // Validar descripción
    if (todoData.description && todoData.description.length > 500) {
      errors.description = 'La descripción no puede tener más de 500 caracteres';
    }

    // Validar prioridad
    const validPriorities = ['low', 'medium', 'high'];
    if (!validPriorities.includes(todoData.priority)) {
      errors.priority = 'Prioridad no válida';
    }

    return errors;
  },

  // Validar solo el título (para validación en tiempo real)
  validateTitle: (title) => {
    if (!title || title.trim() === '') {
      return 'El título es obligatorio';
    }
    if (title.length < 3) {
      return 'El título debe tener al menos 3 caracteres';
    }
    if (title.length > 100) {
      return 'El título no puede tener más de 100 caracteres';
    }
    return '';
  },

  // Validar descripción (para validación en tiempo real)
  validateDescription: (description) => {
    if (description && description.length > 500) {
      return 'La descripción no puede tener más de 500 caracteres';
    }
    return '';
  },

  // Sanitizar datos del formulario
  sanitizeTodo: (todoData) => {
    return {
      title: (todoData.title || '').trim(),
      description: (todoData.description || '').trim(),
      priority: todoData.priority || 'medium',
      completed: Boolean(todoData.completed)
    };
  },

  // Verificar si el formulario es válido
  isFormValid: (todoData) => {
    const errors = todoValidation.validateTodo(todoData);
    return Object.keys(errors).length === 0;
  }
};

// Validaciones generales de formulario
export const formValidation = {
  // Validar email
  validateEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'El email es obligatorio';
    if (!emailRegex.test(email)) return 'El email no es válido';
    return '';
  },

  // Validar contraseña
  validatePassword: (password) => {
    if (!password) return 'La contraseña es obligatoria';
    if (password.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
    return '';
  },

  // Validar que no esté vacío
  required: (value, fieldName = 'Este campo') => {
    if (!value || value.toString().trim() === '') {
      return `${fieldName} es obligatorio`;
    }
    return '';
  },

  // Validar longitud mínima
  minLength: (value, min, fieldName = 'Este campo') => {
    if (value && value.length < min) {
      return `${fieldName} debe tener al menos ${min} caracteres`;
    }
    return '';
  },

  // Validar longitud máxima
  maxLength: (value, max, fieldName = 'Este campo') => {
    if (value && value.length > max) {
      return `${fieldName} no puede tener más de ${max} caracteres`;
    }
    return '';
  }
};

// Utilidades de validación
export const validationUtils = {
  // Combinar múltiples validaciones
  combineValidations: (...validations) => {
    for (const validation of validations) {
      if (validation) return validation;
    }
    return '';
  },

  // Mostrar errores de forma amigable
  formatErrors: (errors) => {
    return Object.values(errors).filter(error => error).join(', ');
  },

  // Verificar si hay errores
  hasErrors: (errors) => {
    return Object.values(errors).some(error => error);
  }
};

export default todoValidation;
