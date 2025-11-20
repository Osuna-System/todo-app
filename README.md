cat > README.md << 'EOF'

# ✅ Todo App - Gestión Inteligente de Tareas

Una aplicación moderna de gestión de tareas construida con React, React Router y API REST. Diseñada para ayudarte a organizar tu día de manera eficiente y productiva.

![Todo App](https://img.shields.io/badge/React-18.2.0-blue) ![React Router](https://img.shields.io/badge/React_Router-6.8.0-green) ![Vite](https://img.shields.io/badge/Vite-4.1.0-purple)

## Capturas del Proyecto

![alt text](image.png)
![alt text](image-1.png)
![alt text](image-2.png)

## 🚀 Características Principales

### ✅ Funcionalidades Implementadas

- **📱 Navegación SPA** - React Router para navegación fluida entre páginas
- **➕ Crear Tareas** - Formulario con validación en tiempo real
- **📋 Listar Tareas** - Vista completa de todas tus actividades
- **🎯 Gestión de Estado** - Marcar tareas como completadas/pendientes
- **🗑️ Eliminar Tareas** - Con diálogo de confirmación
- **✅ Validaciones** - Formularios con validación robusta
- **⏳ Estados de Carga** - Feedback visual durante operaciones
- **🚨 Manejo de Errores** - Mensajes amigables y opción de reintento

### 🏆 Retos Completados

- **✏️ Edición Completa** - Modificar tareas existentes con formulario dedicado
- **🔍 Sistema de Filtros** - Filtrar por estado y prioridad con contadores

## 🛠️ Tecnologías Utilizadas

- **Frontend:** React 18, React Router DOM 6
- **Build Tool:** Vite 4
- **API:** JSON Server (REST API)
- **Estilos:** CSS3 con variables personalizadas
- **Gestión de Estado:** React Hooks (useState, useEffect)
- **Validación:** Sistema personalizado de validaciones

## 📦 Instalación y Configuración

### Prerrequisitos

- Node.js 16+
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
   git clone https://github.com/tu-usuario/todo-app.git
   cd todo-app
   Instalar dependencias

npm install
Ejecutar la aplicación

# Terminal 1: Servidor de API

npm run server

# Terminal 2: Aplicación React

npm run dev
Abrir en el navegador

Aplicación: http://localhost:5173

API: http://localhost:3001/todos

🎮 Uso de la Aplicación
Páginas Disponibles
Página Ruta Descripción
🏠 Inicio / Página de bienvenida con información
📝 Mis Tareas /todos Lista completa con filtros y acciones
➕ Nueva Tarea /add Formulario para crear nuevas tareas
✏️ Editar Tarea /edit/:id Formulario para modificar tareas existentes
Funcionalidades por Página
📝 Mis Tareas (/todos)
Ver lista completa de tareas

Estadísticas en tiempo real (total, completadas, pendientes)

Filtros por estado (todas/pendientes/completadas)

Filtros por prioridad (alta/media/baja)

Acciones por tarea (editar, eliminar, toggle completado)

➕ Nueva Tarea (/add)
Formulario con validación en tiempo real

Vista previa de la tarea

Selección de prioridad

Contadores de caracteres

Mensajes de error descriptivos

✏️ Editar Tarea (/edit/:id)
Carga automática de datos existentes

Mismo nivel de validación que creación

Información adicional de la tarea

Posibilidad de marcar como completada

🗂️ Estructura del Proyecto
text
todo-app/
├── src/
│ ├── components/ # Componentes reutilizables
│ │ ├── Header.jsx # Navegación principal
│ │ ├── TodoItem.jsx # Item individual de tarea
│ │ ├── TodoForm.jsx # Formulario reutilizable
│ │ ├── Filters.jsx # Componente de filtros
│ │ └── Loading.jsx # Estados de carga
│ ├── pages/ # Páginas de la aplicación
│ │ ├── Home.jsx # Página de inicio
│ │ ├── Todos.jsx # Lista de tareas
│ │ ├── AddTodo.jsx # Crear tarea
│ │ ├── EditTodo.jsx # Editar tarea
│ │ └── NotFound.jsx # Página 404
│ ├── services/ # Lógica de negocio y API
│ │ ├── api.js # Servicios de API REST
│ │ └── validation.js # Sistema de validaciones
│ ├── hooks/ # Hooks personalizados
│ │ ├── useTodos.js # Gestión de estado de tareas
│ │ └── useForm.js # Gestión de formularios
│ ├── styles/ # Archivos de estilos
│ │ ├── globals.css # Variables y estilos globales
│ │ ├── components.css # Estilos de componentes
│ │ └── utils.css # Utilidades y páginas
│ ├── App.jsx # Componente principal
│ └── main.jsx # Punto de entrada
├── db.json # Base de datos JSON
└── package.json # Dependencias y scripts
🔧 API Endpoints
La aplicación consume los siguientes endpoints REST:

Método Endpoint Descripción
GET /todos Obtener todas las tareas
GET /todos/:id Obtener tarea específica
POST /todos Crear nueva tarea
PUT /todos/:id Actualizar tarea completa
PATCH /todos/:id Actualización parcial
DELETE /todos/:id Eliminar tarea
Ejemplo de Estructura de Tarea
json
{
"id": 1,
"title": "Aprender React Router",
"description": "Estudiar navegación en aplicaciones SPA",
"completed": false,
"priority": "high",
"createdAt": "2024-01-15T10:00:00Z"
}
🎨 Personalización
Prioridades
🔴 Alta - Tareas urgentes y importantes

🟡 Media - Tareas importantes pero no urgentes

🟢 Baja - Tareas normales y opcionales

Estados
✅ Completada - Tarea finalizada (texto tachado)

⏳ Pendiente - Tarea por hacer (estado normal)

📱 Responsive Design
La aplicación está optimizada para:

💻 Desktop - Experiencia completa con todas las funcionalidades

📱 Mobile - Navegación y formularios optimizados

🖥️ Tablet - Layout adaptativo

🚀 Scripts Disponibles
bash

# Desarrollo

npm run dev # Inicia servidor de desarrollo
npm run server # Inicia JSON Server (API)

# Producción

npm run build # Construye para producción
npm run preview # Vista previa de build

# Análisis

npm run lint # Análisis de código ESLint
🤝 Contribución
Fork el proyecto

Crea una rama para tu feature (git checkout -b feature/AmazingFeature)

Commit tus cambios (git commit -m 'Add some AmazingFeature')

Push a la rama (git push origin feature/AmazingFeature)

Abre un Pull Request

📄 Licencia
Este proyecto es con fines educativos como parte de la actividad GA1-220501096-03-AA1-EV10.

👨‍💻 Autor
Pablo - GitHub Profile

🙏 Agradecimientos
React - Biblioteca de JavaScript

React Router - Navegación declarativa

Vite - Herramientas de desarrollo rápido

JSON Server - API REST falsa
