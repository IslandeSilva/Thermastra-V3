const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.message);
  } else {
    console.log("Conectado ao banco de dados SQLite.");
  }
});

// Criar tabela de usuários, caso não exista
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  birthdate TEXT NOT NULL,
  password TEXT NOT NULL,
  updatedAt TEXT NOT NULL
)`);

// Criar tabela de notícias, caso não exista
db.run(`CREATE TABLE IF NOT EXISTS news (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  postedAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
)`);

// Criar tabela de notícias, caso não exista
db.run(`CREATE TABLE IF NOT EXISTS Tickets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  postedAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
)`);

module.exports = db;
