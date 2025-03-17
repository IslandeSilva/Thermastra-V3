import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Se você for usar o axios, ou apenas use fetch diretamente

function Docs() {
  const [newsData, setNewsData] = useState([]); // Estado para armazenar as notícias
  const [error, setError] = useState(null); // Estado para armazenar o erro

  // Efeito para buscar as notícias do backend
  useEffect(() => {
    // Fazendo a requisição para o backend
    axios.get('http://localhost:3000/news')
      .then(response => {
        setNewsData(response.data); // Armazena os dados no estado
        setError(null); // Limpa o erro em caso de sucesso
      })
      .catch(error => {
        console.error('Erro ao buscar notícias:', error);
        setError('Ocorreu um erro ao carregar seus documentos. Tente novamente mais tarde.'); // Define a mensagem de erro
      });
  }, []); // O array vazio [] garante que a requisição seja feita apenas uma vez após o componente ser montado

  return (
    <div className="news-container">
      {/* Exibir alerta em caso de erro */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Exibir notícias */}
      {newsData.length > 0 ? (
        newsData.map((newsItem) => (
          <div className="card mb-3" key={newsItem.id}>
            <div className="card-header">
              {newsItem.type} - {newsItem.postedAt}
            </div>
            <div className="card-body">
              <h5 className="card-title">{newsItem.title}</h5>
              <p className="card-text">{newsItem.message}</p>
              <a href="#" className="btn btn-primary">Ver Notícia</a>
            </div>
          </div>
        ))
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default Docs;
