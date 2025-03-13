import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { CollapseProvider } from './components/CollapseContext';  // Importe o CollapseProvider

//Import Estilos
import './global.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

//Components
import Header from './components/Header'
import Aside from './components/Aside'

//Pages
import Dashboard from './pages/Dashboard/Dashboard'


function App() {

  return (

    <div className='App'>
      <CollapseProvider>
        <Header />
        <Aside />
        
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />

          </Routes>
        </Router>

     
      </CollapseProvider>
    </div>


  )
}

export default App
