import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Todos from './pages/Todos';
import AddTodo from './pages/AddTodo';
import EditTodo from './pages/EditTodo';
import NotFound from './pages/NotFound';
import './styles/globals.css';
import './styles/components.css';
import './styles/utils.css';

function App() {
  return (
    <div className="App">
      {/* Header fijo en todas las páginas */}
      <Header />
      
      {/* Contenido principal - cambia según la ruta */}
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todos" element={<Todos />} />
          <Route path="/add" element={<AddTodo />} />
          <Route path="/edit/:id" element={<EditTodo />} />
          {/* Ruta comodín para páginas no encontradas */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
