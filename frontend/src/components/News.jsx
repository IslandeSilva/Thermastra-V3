import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Se você for usar o axios, ou apenas use fetch diretamente

function News() {
  const [newsData, setNewsData] = useState([]); // Estado para armazenar as notícias

  // Efeito para buscar as notícias do backend
  useEffect(() => {
    // Fazendo a requisição para o backend
    axios.get('http://localhost:3000/news')
      .then(response => {
        setNewsData(response.data); // Armazena os dados no estado
      })
      .catch(error => {
        console.error('Erro ao buscar notícias:', error);
      });
  }, []); // O array vazio [] garante que a requisição seja feita apenas uma vez após o componente ser montado

  return (
    <div className="news-container">
      {newsData.map((newsItem) => (
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
      ))}
    </div>
  );
}

export default News;
