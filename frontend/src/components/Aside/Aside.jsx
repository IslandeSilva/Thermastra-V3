import React from 'react';
import './Aside.css';
import { useCollapse } from '../../components/Aside/CollapseContext';  // Usando o contexto

function Aside() {
  const { isCollapsed } = useCollapse();  // Obtendo o estado de colapso

  return (
    <aside className='Aside'>
      <div className={`AsideContainer ${isCollapsed ? 'collapsed' : ''}`}>
        <div className='Menu'>
          <span>Painel</span>
          <ul>
            <li>
              <a href='/Dashboard'>
                <i className='aside bi bi-person-circle'></i>
                Dashboard
              </a>
            </li>
            <li>
              <a href='/Documentos'>
                <i className='aside bi bi-archive'></i>
                Documentos
              </a>
            </li>
            <li>
              <a href='/Tickets'>
                <i className='aside bi bi-exclamation-square'></i>
                Tickets
              </a>
            </li>
            <li>
              <a href='/Configuracoes'>
                <i className='aside bi bi-gear'></i>
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
