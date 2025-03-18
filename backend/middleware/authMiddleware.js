// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const secretKey = 'sua-chave-secreta'; // Chave secreta

// Middleware para verificar o token JWT
function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token não fornecido' });
  }

  const tokenWithoutBearer = token.split(' ')[1]; // Remover "Bearer" do token

  jwt.verify(tokenWithoutBearer, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }

    // Armazena as informações do usuário no objeto da requisição
    req.user = decoded;
    next();
  });
}

module.exports = {
  verifyToken,
};
