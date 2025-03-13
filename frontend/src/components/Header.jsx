import React, { useEffect } from 'react';
import Logo from '../assets/LogoThermastra.png';
import './Header.css';
import { useCollapse } from '../components/CollapseContext';

function Header() {

  const { toggleCollapse } = useCollapse();  // Função para alternar o estado de colapso

  // Lógica de alternância da sidebar
  const handleToggleSidebar = () => {
    toggleCollapse();  // Isso alterna a classe no contexto para o colapso
  };
  return (
    <header className='bg-light text-dark d-flex align-items-center py-3 px-3 position-fixed top-0 left-0 w-100' style={{ borderBottom: "1px solid #DEE2E6", zIndex: "999" }}>

      <div className='d-flex gap-2 align-items-center'>
        {/* Logo: só visível no desktop */}
        <div className='d-none d-md-block'>
          <img
            src={Logo}
            alt="Logo Thermastra Aquecimento"
            className="Logo"
            style={{ width: "150px", marginRight: "30px" }}
          />
        </div>

        {/* Botão de alternância para sidebar: sempre visível */}
        <div className='d-flex align-items-center'>
          <button
            className='btn'
            onClick={handleToggleSidebar}
            style={{ fontSize: "15px", border: "1px solid #DEE2E6" }}
            aria-label="Alternar menu"
          >
            <i className='bi bi-list'></i> {/* Ícone de lista para abrir/fechar a sidebar */}
          </button>
        </div>
      </div>

      <div className='d-flex w-100' style={{ marginLeft: "50px" }}>
        <form className="search-form" action="#" method="get">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Pesquisar..."
              aria-label="Pesquisar"
              name="search"
            />
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
          </div>
        </form>
      </div>

      <div className='d-flex gap-2'>
        <div>
          <button
            className='btn'
            style={{ fontSize: "15px", border: "1px solid #DEE2E6" }}
            aria-label="Notificações"
          >
            <i className='bi bi-bell'></i>
          </button>
        </div>
        <div>
          <button
            className='btn'
            style={{ fontSize: "15px", border: "1px solid #DEE2E6" }}
            aria-label="Perfil"
          >
            <i className='bi bi-person-circle'></i>
          </button>
        </div>
      </div>

    </header>
  );
}

export default Header;
