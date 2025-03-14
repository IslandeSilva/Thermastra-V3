import React, { useState } from 'react';
import './Dashboard.css';
import { useCollapse } from '../../components/CollapseContext'; 

//Components
import News from '../../components/News'

function Dashboard() {
  // Controle de estado para colapsar ou expandir a sidebar
  const { isCollapsed } = useCollapse();  // Obtendo o estado e a função para alternar o estado

  return (
    <div>
   
      {/* Main content */}
      <main className={`main ${isCollapsed ? 'collapsed' : 'expanded'}`}>
        <div className="main-content">
          <h3>Dashboard</h3>
          <p>Últimas Notícias!</p>
          {/* Outros dados ou componentes da sua dashboard */}
          <News />
        </div>
      </main>

    </div>
  );
}

export default Dashboard;
