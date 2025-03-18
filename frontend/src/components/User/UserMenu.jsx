import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useNavigate } from 'react-router-dom';

const UserMenu = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove o token
    navigate('/Login'); // Redireciona para a página de login
  };



  return (
    <div
      className="dropdown position-absolute"
      style={{
        top: '60px',
        right: '20px',  // Adicionando um espaçamento de 20px à direita
        zIndex: '1050'
      }}
    >

      <ul className="dropdown-menu card shadow-lg p-3" aria-labelledby="userMenuButton">
        <li>
        <a href='/Configuracoes' style={{ textDecoration: "none"}}>
          <button className="dropdown-item" >
            <i className='bi bi-gear' style={{ marginRight: "10px" }}></i>
            Configurações</button></a>
        </li>
        <li>
          <a href='/Tickets' style={{ textDecoration: "none"}}>
          <button className="dropdown-item">
            <i className='bi bi-exclamation-square' style={{ marginRight: "10px" }}></i>
            Meus Tickets</button></a>
        </li>
        <li>
        
          <button className="dropdown-item" onClick={handleLogout}>
            <i className='bi bi-box-arrow-left' style={{ marginRight: "10px" }}></i>
            Sair</button>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
