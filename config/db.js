// config/db.js
const mysql = require('mysql2/promise');
require('dotenv').config();

// Crear pool de conexiones MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  timezone: '+00:00'
});

// 🔍 Función para probar la conexión a la Base de Datos
async function testDatabase() {
  try {
    console.log('\n🗄️  Probando conexión a Base de Datos...');

    // Verificar variables de entorno
    const requiredEnvVars = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

    if (missingVars.length > 0) {
      console.error('❌ Variables de entorno faltantes para BD:');
      missingVars.forEach(varName => console.error(`   📌 ${varName}`));
      return false;
    }

    console.log('   ✅ Variables de entorno configuradas');
    console.log(`   🌐 Host: ${process.env.DB_HOST}`);
    console.log(`   👤 Usuario: ${process.env.DB_USER}`);
    console.log(`   📊 Base de datos: ${process.env.DB_NAME}`);

    // Intentar obtener conexión del pool
    const connection = await pool.getConnection();
    console.log('✅ Conexión obtenida del pool correctamente');
    console.log('✅ Conexión a Base de Datos exitosa');

    // Realizar una consulta de prueba
    try {
      const [rows] = await connection.query('SELECT 1 AS test');
      console.log(`   ⚡ Query de prueba exitosa: ${JSON.stringify(rows[0])}`);
    } catch (queryError) {
      console.error('   ⚠️  Error en query de prueba:', queryError.message);
    }

    // Obtener información de la base de datos
    try {
      const [dbInfo] = await connection.query(
        'SELECT DATABASE() as `db_name`, CURRENT_USER() as `current_user`, VERSION() as `mysql_version`'
      );
      console.log(`   📌 Base de datos actual: ${dbInfo[0].db_name}`);
      console.log(`   📌 Usuario actual: ${dbInfo[0].current_user}`);
      console.log(`   📌 Versión MySQL: ${dbInfo[0].mysql_version}`);
    } catch (infoError) {
      console.error('   ⚠️  Error obteniendo info de BD:', infoError.message);
    }

    // Liberar la conexión
    connection.release();
    return true;

  } catch (error) {
    console.error('❌ Error conectando a Base de Datos:', error.message);
    console.error('   Details:', error.code);
    return false;
  }
}

// 🔍 Función auxiliar para ejecutar queries
async function query(sql, values = []) {
  try {
    const connection = await pool.getConnection();
    const [results] = await connection.query(sql, values);
    connection.release();
    return results;
  } catch (error) {
    console.error('Error en query:', error.message);
    throw error;
  }
}

// 🔍 Función para obtener una conexión del pool
async function getConnection() {
  return await pool.getConnection();
}

module.exports = {
  pool,
  testDatabase,
  query,
  getConnection
};
