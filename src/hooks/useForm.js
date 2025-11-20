import { useState } from 'react';
import { validationUtils } from '../services/api';

// Hook personalizado para manejar formularios
export const useForm = (initialState = {}, validateFn = null) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validación por defecto si no se proporciona una función
  const defaultValidate = (data) => {
    const validationErrors = validationUtils.validateTodo(data);
    const errorObj = {};
    validationErrors.forEach(error => {
      if (error.includes('título')) errorObj.title = error;
      else if (error.includes('descripción')) errorObj.description = error;
      else errorObj.general = error;
    });
    return errorObj;
  };

  const validate = validateFn || defaultValidate;

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Marcar el campo como touched
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Limpiar error del campo cuando el usuario escribe
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Manejar blur (cuando el campo pierde el foco)
  const handleBlur = (e) => {
    const { name } = e.target;
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Validar el campo individual
    const fieldErrors = validate(formData);
    setErrors(prev => ({
      ...prev,
      [name]: fieldErrors[name] || ''
    }));
  };

  // Validar todo el formulario
  const validateForm = () => {
    const formErrors = validate(formData);
    setErrors(formErrors);
    
    // Marcar todos los campos como touched para mostrar errores
    const allTouched = {};
    Object.keys(formData).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    return Object.keys(formErrors).length === 0;
  };

  // Resetear el formulario
  const resetForm = (newState = initialState) => {
    setFormData(newState);
    setErrors({});
    setTouched({});
  };

  // Establecer valores manualmente
  const setFieldValue = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Obtener si el campo tiene error y fue touched
  const getFieldProps = (name) => ({
    value: formData[name] || '',
    onChange: handleChange,
    onBlur: handleBlur,
    error: errors[name],
    touched: touched[name]
  });

  return {
    formData,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
    setFieldValue,
    getFieldProps,
    setFormData // Para casos especiales donde se necesita setear todo el form
  };
};

// Hook específico para formularios de todos
export const useTodoForm = (initialTodo = null) => {
  const initialState = initialTodo || {
    title: '',
    description: '',
    priority: 'medium',
    completed: false
  };

  const { formData, errors, touched, handleChange, handleBlur, validateForm, resetForm, setFieldValue, getFieldProps, setFormData } = useForm(initialState);

  // Contadores de caracteres
  const charCount = {
    title: formData.title.length,
    description: formData.description.length
  };

  // Validaciones específicas para todos
  const validateTodo = (data) => {
    const errors = {};

    if (!data.title || data.title.trim() === '') {
      errors.title = 'El título es obligatorio';
    } else if (data.title.length < 3) {
      errors.title = 'El título debe tener al menos 3 caracteres';
    } else if (data.title.length > 100) {
      errors.title = 'El título no puede tener más de 100 caracteres';
    }

    if (data.description && data.description.length > 500) {
      errors.description = 'La descripción no puede tener más de 500 caracteres';
    }

    return errors;
  };

  return {
    formData,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm: () => validateForm(validateTodo),
    resetForm,
    setFieldValue,
    getFieldProps,
    setFormData,
    charCount
  };
};
