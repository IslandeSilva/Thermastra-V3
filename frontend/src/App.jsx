import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { CollapseProvider } from './components/Aside/CollapseContext';  // Importe o CollapseProvider

// Import Estilos
import './global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Components
import Header from './components/Header/Header';
import Aside from './components/Aside/Aside';

// Pages
import Dashboard from './pages/Dashboard/Dashboard';
import Documentos from './pages/Documentos/Documentos';
import Tickets from './pages/Tickets/Tickets';
import Configuracoes from './pages/Configuracoes/Configuracoes';
import Login from './pages/Login/Login';

// Layout comum para páginas com Header e Aside
const MainLayout = ({ children }) => (
  <>
    <Header />
    <Aside />
    <main>{children}</main>
  </>
);

function App() {
  // Verificar o token de autenticação
  const token = localStorage.getItem('authToken');

  return (
    <div className="App">
      <CollapseProvider>
        <Router>
          <Routes>
            {/* Página de Login - não inclui Header e Aside */}
            <Route path="/" element={<Login />} />
            <Route path="/Login" element={<Login />} />

            {/* Páginas protegidas - só acessíveis com autenticação */}
            
            <Route
              path="/Dashboard"
              element={token ? <MainLayout><Dashboard /></MainLayout> : <Navigate to="/login" replace />}
            />
            <Route
              path="/Documentos"
              element={token ? <MainLayout><Documentos /></MainLayout> : <Navigate to="/login" replace />}
            />
            <Route
              path="/Tickets"
              element={token ? <MainLayout><Tickets /></MainLayout> : <Navigate to="/login" replace />}
            />
            <Route
              path="/Configuracoes"
              element={token ? <MainLayout><Configuracoes /></MainLayout> : <Navigate to="/login" replace />}
            />
          </Routes>
        </Router>
      </CollapseProvider>
    </div>
  );
}

export default App;
