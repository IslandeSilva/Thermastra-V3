import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserMenu = () => {
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
          <button className="dropdown-item">
            <i className='bi bi-gear' style={{ marginRight: "10px" }}></i>
            Configurações</button>
        </li>
        <li>
          <button className="dropdown-item">
            <i className='bi bi-exclamation-square' style={{ marginRight: "10px" }}></i>
            Meus Tickets</button>
        </li>
        <li>
          <button className="dropdown-item">
            <i className='bi bi-box-arrow-left' style={{ marginRight: "10px" }}></i>
            Sair</button>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
