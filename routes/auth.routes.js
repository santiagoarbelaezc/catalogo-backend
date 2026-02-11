// routes/auth.routes.js

// ✅ Importación de dependencias
const express = require('express');
const router = express.Router();

// ✅ Importación del controlador que gestiona la lógica de autenticación
const { login, register, logout, refreshToken, verifyToken } = require('../controllers/auth.controller');

// ======================
// 🔐 Rutas de Autenticación
// ======================

// 🟢 Login de usuario (inicio de sesión)
router.post('/login', login);

// 🟢 Registro de nuevo usuario
router.post('/register', register);

// 🔴 Logout del usuario (opcional, si manejas tokens en frontend)
router.post('/logout', logout);

// 🔁 Refrescar token (si implementas refresh tokens)
router.post('/refresh-token', refreshToken);

// 👤 Obtener perfil del usuario autenticado
router.get('/profile', verifyToken, (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      user: req.user
    }
  });
});

// ✅ Exportación del router para usar con nombre descriptivo
module.exports = router;