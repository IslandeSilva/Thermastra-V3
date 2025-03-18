// auth.js
const jwt = require('jsonwebtoken');

const secretKey = 'sua-chave-secreta'; // Chave secreta para assinar o token

// Função para gerar o token
function generateToken(user) {
  return jwt.sign(
    { userId: user.id, username: user.username }, // Payload
    secretKey, // Chave secreta
    { expiresIn: '1h' } // Expiração do token
  );
}

module.exports = {
  generateToken,
};
