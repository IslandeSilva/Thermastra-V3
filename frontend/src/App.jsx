import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { CollapseProvider } from './components/Aside/CollapseContext';  // Importe o CollapseProvider

//Import Estilos
import './global.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

//Components
import Header from './components/Header/Header'
import Aside from './components/Aside/Aside'

//Pages
import Dashboard from './pages/Dashboard/Dashboard'
import Documentos from './pages/Documentos/Documentos'
import Tickets from './pages/Tickets/Tickets'
import Configuracoes from './pages/Configuracoes/Configuracoes'


function App() {

  return (

    <div className='App'>
      <CollapseProvider>
        <Header />
        <Aside />
        
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Documentos" element={<Documentos />} />
            <Route path="/Tickets" element={<Tickets />} />
            <Route path="/Configuracoes" element={<Configuracoes />} />
          </Routes>
        </Router>

     
      </CollapseProvider>
    </div>


  )
}

export default App
