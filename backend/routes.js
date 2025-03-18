// routes.js
const express = require('express');
const db = require('./db');
const bcrypt = require('bcrypt'); // Importando o bcrypt
const { generateToken } = require('./auth'); // Função para gerar o token
const { verifyToken } = require('./middleware/authMiddleware'); // Middleware de verificação de token

const router = express.Router();


// Rota para registrar um usuário (agora com bcrypt na senha e role sempre como 'user')
router.post('/register', async (req, res) => {
    const { name, email, birthdate, password } = req.body;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
  
    // Definindo 'role' como 'user' por padrão
    const role = 'user';
  
    // Verificar se a senha foi fornecida
    if (!password) {
      return res.status(400).json({ message: 'Senha é obrigatória' });
    }
  
    try {
      // Gerando o hash da senha usando bcrypt
      const hashedPassword = await bcrypt.hash(password, 10); // O '10' é o número de saltos para gerar o hash
  
      const query = `INSERT INTO users (name, email, birthdate, password, role, createdAt, updatedAt)
                     VALUES (?, ?, ?, ?, ?, ?, ?)`;
  
      // Inserindo o usuário no banco com a senha criptografada e com o role 'user'
      db.run(query, [name, email, birthdate, hashedPassword, role, createdAt, updatedAt], function (err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, name, email, birthdate, role, createdAt, updatedAt });
      });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao criptografar a senha' });
    }
  });
  

// Rota para login do usuário e geração do token
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  db.get(query, [email], async (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!row) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Verificando se a senha fornecida corresponde à senha criptografada no banco
    const isPasswordValid = await bcrypt.compare(password, row.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const user = { id: row.id, role: row.role };
    const token = generateToken(user);
    res.json({ token });
  });
});





// Rota para criar uma notícia (protegida por token)
router.post('/news', verifyToken, (req, res) => {
  const { type, title, message } = req.body;

  const postedAt = new Date().toISOString();
  const updatedAt = postedAt;

  const query = `INSERT INTO news (type, title, message, createdAt, updatedAt)
                 VALUES (?, ?, ?, ?, ?)`;

  db.run(query, [type, title, message, postedAt, updatedAt], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({
      id: this.lastID,
      type,
      title,
      message,
      postedAt,
      updatedAt,
    });
  });
});

// Rota para listar todos os usuários (protegida por token)
router.get('/users', verifyToken, (req, res) => {
  const query = 'SELECT * FROM users';
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Rota para listar todas as notícias (protegida por token)
router.get('/news', verifyToken, (req, res) => {
  const query = 'SELECT * FROM news ORDER BY createdAt DESC';
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Rota para listar todos os Tickets (protegida por token)
router.get('/alltickets', verifyToken, (req, res) => {
  const query = `
    SELECT Tickets.*, Users.name AS user_nome
    FROM Tickets
    JOIN Users ON Tickets.user_id = Users.id
    ORDER BY Tickets.createdAt DESC
  `;
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Rota para listar todos os Tickets de um usuário específico (protegida por token)
router.get('/tickets/:user_id', verifyToken, (req, res) => {
  const { user_id } = req.params;
  const query = `SELECT t.id, t.user_id, t.type, t.status, t.title, t.message, 
                        t.createdAt, t.updatedAt, u.name AS user_nome
                 FROM Tickets t
                 JOIN Users u ON t.user_id = u.id
                 WHERE t.user_id = ? 
                 ORDER BY t.createdAt DESC`;

  db.all(query, [user_id], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Nenhum ticket encontrado para esse usuário' });
    }

    res.json(rows);
  });
});

// Rota para criar um Ticket (protegida por token)
router.post('/tickets', verifyToken, (req, res) => {
  const { user_id, type, status, title, message } = req.body;

  const createdAt = Math.floor(Date.now() / 1000);
  const updatedAt = createdAt;

  const query = `INSERT INTO Tickets (user_id, type, status, title, message, createdAt, updatedAt) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.run(query, [user_id, type, status, title, message, createdAt, updatedAt], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const newTicket = {
      id: this.lastID,
      user_id,
      type,
      status,
      title,
      message,
      createdAt,
      updatedAt,
      user_nome: 'Nome do Usuário' // Substitua pelo nome real do usuário, se necessário
    };

    res.status(201).json(newTicket);
  });
});

// Rota para editar um Ticket (protegida por token)
router.put('/tickets/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  const { type, status, title, message } = req.body;
  const updatedAt = Math.floor(Date.now() / 1000); // Atualiza o timestamp

  const query = `UPDATE Tickets 
                 SET type = ?, status = ?, title = ?, message = ?, updatedAt = ? 
                 WHERE id = ?`;

  db.run(query, [type, status, title, message, updatedAt, id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: 'Ticket não encontrado' });
    }

    res.json({ message: 'Ticket atualizado com sucesso' });
  });
});

// Rota para deletar um Ticket (protegida por token)
router.delete('/tickets/:id', verifyToken, (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM Tickets WHERE id = ?`;

  db.run(query, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: 'Ticket não encontrado' });
    }

    res.json({ message: 'Ticket deletado com sucesso' });
  });
});

module.exports = router;
