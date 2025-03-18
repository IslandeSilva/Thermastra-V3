const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes'); // Importa as rotas

const app = express();
const port = 4000;

// Habilita o CORS para todas as origens
app.use(cors());

// Middleware
app.use(bodyParser.json());

// Adiciona o prefixo '/api' a todas as rotas do arquivo 'routes.js'
app.use('/api', routes);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
