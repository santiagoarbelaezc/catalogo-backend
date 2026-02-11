// scripts/create-user.js
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
require('dotenv').config();

// Configuración de la base de datos
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306
};

// Credenciales del usuario a crear (desde variables de entorno)
const userCredentials = {
  username: process.env.ADMIN_USERNAME,
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
  role: process.env.ADMIN_ROLE || 'admin'
};

// Función para crear la tabla de usuarios si no existe
async function createUsersTable(connection) {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT PRIMARY KEY AUTO_INCREMENT,
      username VARCHAR(50) UNIQUE NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role ENUM('admin', 'user') DEFAULT 'user',
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `;

  await connection.execute(createTableQuery);
  console.log('✅ Tabla users verificada/creada');
}

// Función para verificar si el usuario ya existe
async function userExists(connection, username, email) {
  const [rows] = await connection.execute(
    'SELECT id FROM users WHERE username = ? OR email = ?',
    [username, email]
  );
  return rows.length > 0;
}

// Función para crear el usuario
async function createUser(connection) {
  try {
    // Verificar si el usuario ya existe
    const exists = await userExists(connection, userCredentials.username, userCredentials.email);
    if (exists) {
      console.log('⚠️  El usuario ya existe en la base de datos');
      return;
    }

    // Generar hash de la contraseña
    console.log('🔐 Generando hash de contraseña...');
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userCredentials.password, saltRounds);

    // Insertar usuario en la base de datos
    const insertQuery = `
      INSERT INTO users (username, email, password, role)
      VALUES (?, ?, ?, ?)
    `;

    const [result] = await connection.execute(insertQuery, [
      userCredentials.username,
      userCredentials.email,
      hashedPassword,
      userCredentials.role
    ]);

    console.log('✅ Usuario creado exitosamente!');
    console.log(`   ID: ${result.insertId}`);
    console.log(`   Username: ${userCredentials.username}`);
    console.log(`   Email: ${userCredentials.email}`);
    console.log(`   Role: ${userCredentials.role}`);

    // Mostrar credenciales para uso
    console.log('\n🔑 Credenciales del usuario:');
    console.log(`   Usuario: ${userCredentials.username}`);
    console.log(`   Contraseña: ${userCredentials.password}`);
    console.log(`   Email: ${userCredentials.email}`);

  } catch (error) {
    console.error('❌ Error creando usuario:', error.message);
    throw error;
  }
}

// Función principal
async function main() {
  let connection;

  try {
    console.log('🚀 Iniciando creación de usuario...\n');

    // Verificar variables de entorno
    if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
      throw new Error('Variables de entorno de base de datos no configuradas. Verifica tu archivo .env');
    }

    // Verificar variables de usuario administrador
    if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
      throw new Error('Variables de entorno del usuario administrador no configuradas. Verifica tu archivo .env');
    }

    // Conectar a la base de datos
    console.log('🔌 Conectando a la base de datos...');
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Conexión exitosa a la base de datos');

    // Crear tabla si no existe
    await createUsersTable(connection);

    // Crear usuario
    await createUser(connection);

    console.log('\n🎉 Proceso completado exitosamente!');

  } catch (error) {
    console.error('\n❌ Error en el proceso:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Conexión cerrada');
    }
  }
}

// Ejecutar el script
if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { main, userCredentials };