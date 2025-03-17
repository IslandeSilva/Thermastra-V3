import React, { useState } from 'react';
import './Configuracoes.css';
import { useCollapse } from '../../components/Aside/CollapseContext'; 

//Components
import Docs from '../../components/Documentos/Docs'

function Configuracoes() {
  // Controle de estado para colapsar ou expandir a sidebar
  const { isCollapsed } = useCollapse();  // Obtendo o estado e a função para alternar o estado

  return (
    <div>
   
      {/* Main content */}
      <main className={`main ${isCollapsed ? 'collapsed' : 'expanded'}`}>
        <div className="main-content">
          <h3>Configurações</h3>
          <p>Ajuste seus dados!</p>
          {/* Outros dados ou componentes da sua dashboard */}
          Fazer aqui o componente de Configurações da Conta
        </div>
      </main>

    </div>
  );
}

export default Configuracoes;
