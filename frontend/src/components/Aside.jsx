import React from 'react';
import './Aside.css';
import { useCollapse } from '../components/CollapseContext';  // Usando o contexto

function Aside() {
  const { isCollapsed } = useCollapse();  // Obtendo o estado de colapso

  return (
    <aside className='Aside'>
      <div className={`AsideContainer ${isCollapsed ? 'collapsed' : ''}`}>
        <div className='Menu'>
          <span>Painel</span>
          <ul>
            <li>
              <a href=''>
                <i className='aside bi bi-person-circle'></i>
                Dashboard
              </a>
            </li>
            <li>
              <a href=''>
                <i className='aside bi bi-person-circle'></i>
                Documentos
              </a>
            </li>
            <li>
              <a href=''>
                <i className='aside bi bi-person-circle'></i>
                Tickets
              </a>
            </li>
            <li>
              <a href=''>
                <i className='aside bi bi-person-circle'></i>
                Configurações
              </a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}

export default Aside;
