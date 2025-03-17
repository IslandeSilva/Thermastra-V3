import React, { useState } from 'react';
import './Documentos.css';
import { useCollapse } from '../../components/Aside/CollapseContext'; 

//Components
import Docs from '../../components/Documentos/Docs'

function Documentos() {
  // Controle de estado para colapsar ou expandir a sidebar
  const { isCollapsed } = useCollapse();  // Obtendo o estado e a função para alternar o estado

  return (
    <div>
   
      {/* Main content */}
      <main className={`main ${isCollapsed ? 'collapsed' : 'expanded'}`}>
        <div className="main-content">
          <h3>Documentos</h3>
          <p>Listagem de documentos</p>
          {/* Outros dados ou componentes da sua dashboard */}
          <Docs />
        </div>
      </main>

    </div>
  );
}

export default Documentos;
