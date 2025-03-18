const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.message);
  } else {
    console.log("Conectado ao banco de dados SQLite.");
  }
});


db.serialize(() => {

  // Criar tabela de usuários, caso não exista
  db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  birthdate TEXT NOT NULL,
  password TEXT NOT NULL,
  createdAt INTEGER NOT NULL DEFAULT (strftime('%s', 'now', 'localtime')),
  updatedAt INTEGER NOT NULL DEFAULT (strftime('%s', 'now', 'localtime'))
)`);

  // Criar tabela de notícias, caso não exista
  db.run(`CREATE TABLE IF NOT EXISTS news (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  createdAt INTEGER NOT NULL DEFAULT (strftime('%s', 'now', 'localtime')),
  updatedAt INTEGER NOT NULL DEFAULT (strftime('%s', 'now', 'localtime'))
)`);

  // Criar tabela de notícias, caso não exista
  db.run(`CREATE TABLE IF NOT EXISTS tickets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  type TEXT NOT NULL,
  status TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  createdAt INTEGER NOT NULL DEFAULT (strftime('%s', 'now', 'localtime')),
  updatedAt INTEGER NOT NULL DEFAULT (strftime('%s', 'now', 'localtime')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT
)`);


});



module.exports = db;
