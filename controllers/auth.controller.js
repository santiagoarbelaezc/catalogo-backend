// controllers/auth.controller.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');

// Configuración de la base de datos
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306
};

// Función para obtener conexión a la base de datos
async function getConnection() {
  return await mysql.createConnection(dbConfig);
}

// ======================
// 🔐 FUNCIONES DE AUTENTICACIÓN
// ======================

// 🟢 Login de usuario
const login = async (req, res) => {
  let connection;

  try {
    const { email, password } = req.body;

    // Validación básica
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email y contraseña son requeridos'
      });
    }

    // Conectar a la base de datos
    connection = await getConnection();

    // Buscar usuario por email
    const [rows] = await connection.execute(
      'SELECT id, username, email, password, role FROM users WHERE email = ? AND is_active = TRUE',
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    const user = rows[0];

    // Verificar contraseña
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    // Generar token JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '24h' // Token válido por 24 horas
      }
    );

    // Respuesta exitosa
    res.status(200).json({
      success: true,
      message: 'Login exitoso',
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        },
        token: token,
        expiresIn: '24h'
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  } finally {
    if (connection) await connection.end();
  }
};

// 🟢 Registro de nuevo usuario
const register = async (req, res) => {
  let connection;

  try {
    const { username, email, password, role = 'user' } = req.body;

    // Validación básica
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Nombre de usuario, email y contraseña son requeridos'
      });
    }

    // Conectar a la base de datos
    connection = await getConnection();

    // Verificar si el usuario ya existe
    const [existingRows] = await connection.execute(
      'SELECT id FROM users WHERE email = ? OR username = ?',
      [email, username]
    );

    if (existingRows.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'El usuario ya existe'
      });
    }

    // Hash de la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Crear nuevo usuario
    const insertQuery = `
      INSERT INTO users (username, email, password, role)
      VALUES (?, ?, ?, ?)
    `;

    const [result] = await connection.execute(insertQuery, [
      username,
      email,
      hashedPassword,
      role
    ]);

    // Obtener el usuario creado
    const [userRows] = await connection.execute(
      'SELECT id, username, email, role FROM users WHERE id = ?',
      [result.insertId]
    );

    const newUser = userRows[0];

    // Generar token para el nuevo usuario
    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        role: newUser.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '24h'
      }
    );

    // Respuesta exitosa (sin incluir la contraseña)
    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      data: {
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          role: newUser.role
        },
        token: token,
        expiresIn: '24h'
      }
    });

  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  } finally {
    if (connection) await connection.end();
  }
};

// 🔴 Logout del usuario
const logout = async (req, res) => {
  try {
    // En una implementación con JWT, el logout se maneja principalmente en el frontend
    // eliminando el token del localStorage/sessionStorage
    // Opcionalmente, se puede implementar una lista negra de tokens

    res.status(200).json({
      success: true,
      message: 'Logout exitoso. Token invalidado en el cliente.'
    });

  } catch (error) {
    console.error('Error en logout:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// 🔁 Refrescar token (opcional)
const refreshToken = async (req, res) => {
  let connection;

  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Token es requerido'
      });
    }

    // Verificar el token actual
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Conectar a la base de datos
    connection = await getConnection();

    // Verificar que el usuario aún existe y está activo
    const [rows] = await connection.execute(
      'SELECT id, username, email, role FROM users WHERE id = ? AND is_active = TRUE',
      [decoded.id]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no encontrado o inactivo'
      });
    }

    const user = rows[0];

    // Generar nuevo token con la misma información
    const newToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '24h'
      }
    );

    res.status(200).json({
      success: true,
      message: 'Token refrescado exitosamente',
      data: {
        token: newToken,
        expiresIn: '24h'
      }
    });

  } catch (error) {
    console.error('Error en refresh token:', error);
    res.status(401).json({
      success: false,
      message: 'Token inválido o expirado',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  } finally {
    if (connection) await connection.end();
  }
};

// ======================
// 📊 FUNCIONES AUXILIARES
// ======================

// Función para obtener usuario por ID (útil para middleware)
const getUserById = async (id) => {
  let connection;
  try {
    connection = await getConnection();
    const [rows] = await connection.execute(
      'SELECT id, username, email, role FROM users WHERE id = ? AND is_active = TRUE',
      [id]
    );
    return rows[0] || null;
  } catch (error) {
    console.error('Error obteniendo usuario por ID:', error);
    return null;
  } finally {
    if (connection) await connection.end();
  }
};

// Función para verificar si un usuario existe
const userExists = async (email, username) => {
  let connection;
  try {
    connection = await getConnection();
    const [rows] = await connection.execute(
      'SELECT id FROM users WHERE email = ? OR username = ?',
      [email, username]
    );
    return rows.length > 0;
  } catch (error) {
    console.error('Error verificando existencia de usuario:', error);
    return false;
  } finally {
    if (connection) await connection.end();
  }
};

// ======================
// 🔐 MIDDLEWARE PARA VERIFICAR JWT
// ======================

// Middleware para verificar JWT (duplicado del upload.middleware.js para consistencia)
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: 'Token no proporcionado'
    });
  }

  const tokenParts = authHeader.split(' ');

  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(400).json({
      success: false,
      message: 'Formato de token inválido. Use: Bearer <token>'
    });
  }

  const token = tokenParts[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: 'Token inválido o expirado'
      });
    }

    req.user = decoded;
    next();
  });
};

// ======================
// ✅ EXPORTACIÓN DE FUNCIONES
// ======================

module.exports = {
  login,
  register,
  logout,
  refreshToken,
  verifyToken,
  getUserById,
  userExists
};