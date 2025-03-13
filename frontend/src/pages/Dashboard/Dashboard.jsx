import React, { useState } from 'react';
import './Dashboard.css';
import { useCollapse } from '../../components/CollapseContext'; 

function Dashboard() {
  // Controle de estado para colapsar ou expandir a sidebar
  const { isCollapsed } = useCollapse();  // Obtendo o estado e a função para alternar o estado

  return (
    <div>
   
      {/* Main content */}
      <main className={`main ${isCollapsed ? 'collapsed' : 'expanded'}`}>
        <div className="main-content">
          <h1>Dashboard</h1>
          <p>Bem-vindo ao seu painel de controle!</p>
          {/* Outros dados ou componentes da sua dashboard */}
        </div>
      </main>

    </div>
  );
}

export default Dashboard;
