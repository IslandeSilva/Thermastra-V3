import React from 'react';
import { Route, Navigate } from 'react-router-dom'; // Use Navigate ao invés de Redirect

// Componente para proteger as rotas
const PrivateRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem('authToken'); // Verifica o token no localStorage

  return (
    <Route
      {...rest}
      element={token ? element : <Navigate to="/Login" replace />} // Usando Navigate ao invés de Redirect
    />
  );
};

export default PrivateRoute;
