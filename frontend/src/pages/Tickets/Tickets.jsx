import React, { useState } from 'react';
import './Tickets.css';
import { useCollapse } from '../../components/Aside/CollapseContext'; 

//Components
import TicketsList from '../../components/Tickets/Tickets'

function Tickets() {
  // Controle de estado para colapsar ou expandir a sidebar
  const { isCollapsed } = useCollapse();  // Obtendo o estado e a função para alternar o estado

  return (
    <div>
   
      {/* Main content */}
      <main className={`main ${isCollapsed ? 'collapsed' : 'expanded'}`}>
        <div className="main-content">
          <h3>Tickets</h3>
          <p>Lista de solicitações!</p>
          {/* Outros dados ou componentes da sua dashboard */}
          <TicketsList />
        </div>
      </main>

    </div>
  );
}

export default Tickets;
