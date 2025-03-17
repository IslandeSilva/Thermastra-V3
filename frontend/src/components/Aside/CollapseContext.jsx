// src/context/CollapseContext.js
import React, { createContext, useState, useContext } from 'react';

// Criação do contexto
const CollapseContext = createContext();

// Hook para acessar o estado do CollapseContext
export const useCollapse = () => {
  return useContext(CollapseContext);
};

// Componente provedor para envolver seu App
export const CollapseProvider = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);  // Estado para controlar a visibilidade

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);  // Alterna entre aberto e fechado
  };

  return (
    <CollapseContext.Provider value={{ isCollapsed, toggleCollapse }}>
      {children}
    </CollapseContext.Provider>
  );
};
