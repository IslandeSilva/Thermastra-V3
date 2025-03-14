const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
const port = 3000;

// Habilita o CORS para todas as origens
app.use(cors());

// Middleware
app.use(bodyParser.json());

// Rota para registrar um usuário
app.post('/register', (req, res) => {
  const { name, email, birthdate, password } = req.body;

  const updatedAt = new Date().toISOString();

  const query = `INSERT INTO users (name, email, birthdate, password, updatedAt)
                 VALUES (?, ?, ?, ?, ?)`;
  
  db.run(query, [name, email, birthdate, password, updatedAt], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, name, email, birthdate, updatedAt });
  });
});

// Rota para criar uma notícia
app.post('/news', (req, res) => {
  const { type, title, message } = req.body;

  const postedAt = new Date().toISOString();
  const updatedAt = postedAt;

  const query = `INSERT INTO news (type, title, message, postedAt, updatedAt)
                 VALUES (?, ?, ?, ?, ?)`;
  
  db.run(query, [type, title, message, postedAt, updatedAt], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({
      id: this.lastID,
      type,
      title,
      message,
      postedAt,
      updatedAt
    });
  });
});

// Rota para listar todas as notícias
app.get('/news', (req, res) => {
  const query = 'SELECT * FROM news ORDER BY postedAt DESC';

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
