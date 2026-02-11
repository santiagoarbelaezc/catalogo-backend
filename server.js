// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importar configuraciones
const { testCloudinaryConnection, testCloudinaryConfig } = require('./config/cloudinary');
const { testDatabase } = require('./config/db');

// Importar rutas
const productoRoutes = require('./routes/producto.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==========================================
// 🛣️ RUTAS DE LA APLICACIÓN
// ==========================================

// Rutas de Autenticación
app.use('/api/auth', authRoutes);

// Rutas de Productos
app.use('/api/productos', productoRoutes);

// Variables globales para estado del servidor
const serverStatus = {
  cloudinary: false,
  database: false,
  timestamp: null
};

// ==========================================
// 🧪 ROUTES PARA TESTING Y DIAGNOSTICO
// ==========================================

// 1️⃣ Health Check General
app.get('/health', (req, res) => {
  res.status(200).json({
    message: '✅ Servidor activo',
    timestamp: new Date().toISOString(),
    status: serverStatus
  });
});

// 2️⃣ Test de Cloudinary
app.get('/api/test/cloudinary', async (req, res) => {
  try {
    console.log('\n📡 Testing Cloudinary desde ruta...');
    
    const configOk = await testCloudinaryConfig();
    const connectionOk = await testCloudinaryConnection();
    
    const result = {
      config: configOk,
      connection: connectionOk,
      status: configOk && connectionOk ? '✅ Cloudinary OK' : '❌ Cloudinary con errores'
    };
    
    serverStatus.cloudinary = configOk && connectionOk;
    
    res.status(configOk && connectionOk ? 200 : 500).json({
      cloudinary: result,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error en test/cloudinary:', error);
    serverStatus.cloudinary = false;
    res.status(500).json({
      error: '❌ Error testing Cloudinary',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// 3️⃣ Test de Base de Datos
app.get('/api/test/database', async (req, res) => {
  try {
    console.log('\n📡 Testing Base de Datos desde ruta...');
    
    const dbOk = await testDatabase();
    
    const result = {
      connection: dbOk,
      status: dbOk ? '✅ Base de Datos OK' : '❌ Base de Datos con errores'
    };
    
    serverStatus.database = dbOk;
    
    res.status(dbOk ? 200 : 500).json({
      database: result,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error en test/database:', error);
    serverStatus.database = false;
    res.status(500).json({
      error: '❌ Error testing Base de Datos',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// 4️⃣ Test completo (ambos servicios)
app.get('/api/test/all', async (req, res) => {
  try {
    console.log('\n🚀 TEST COMPLETO: Probando todos los servicios...\n');
    
    const configOk = await testCloudinaryConfig();
    const cloudinaryOk = await testCloudinaryConnection();
    const databaseOk = await testDatabase();
    
    serverStatus.cloudinary = configOk && cloudinaryOk;
    serverStatus.database = databaseOk;
    serverStatus.timestamp = new Date().toISOString();
    
    const allOk = serverStatus.cloudinary && serverStatus.database;
    
    console.log('\n' + '='.repeat(50));
    console.log('📊 RESUMEN DE PRUEBAS');
    console.log('='.repeat(50));
    console.log(`☁️  Cloudinary: ${serverStatus.cloudinary ? '✅ OK' : '❌ ERROR'}`);
    console.log(`🗄️  Base de Datos: ${serverStatus.database ? '✅ OK' : '❌ ERROR'}`);
    console.log('='.repeat(50));
    
    res.status(allOk ? 200 : 500).json({
      success: allOk,
      services: {
        cloudinary: serverStatus.cloudinary,
        database: serverStatus.database
      },
      timestamp: new Date().toISOString(),
      message: allOk 
        ? '✅ Todos los servicios están operativos'
        : '⚠️  Algunos servicios tienen problemas'
    });
    
  } catch (error) {
    console.error('Error en test/all:', error);
    res.status(500).json({
      error: '❌ Error en pruebas completas',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// ==========================================
// 🚀 INICIAR SERVIDOR Y PRUEBAS
// ==========================================

const PORT = process.env.PORT || 5000;

// Función para iniciar servidor
async function initializeServer() {
  try {
    console.log('\n🔧 Inicializando servidor...\n');
    
    // Iniciar servidor HTTP
    const server = app.listen(PORT, () => {
      console.log(`✅ Servidor ejecutándose en: http://localhost:${PORT}`);
      console.log('\n📌 RUTAS DISPONIBLES:');
      console.log(`   GET http://localhost:${PORT}/health - Health check`);
      console.log(`   POST http://localhost:${PORT}/api/auth/login - Login de usuario`);
      console.log(`   POST http://localhost:${PORT}/api/auth/register - Registro de usuario`);
      console.log(`   POST http://localhost:${PORT}/api/auth/logout - Logout de usuario`);
      console.log(`   GET http://localhost:${PORT}/api/auth/profile - Perfil de usuario (requiere auth)`);
      console.log(`   GET http://localhost:${PORT}/api/productos - Obtener todos los productos`);
      console.log(`   GET http://localhost:${PORT}/api/productos/:id - Obtener producto por ID`);
      console.log(`   GET http://localhost:${PORT}/api/productos/categoria/:category - Productos por categoría\n`);
    });
    
    return server;
    
  } catch (error) {
    console.error('❌ Error inicializando servidor:', error.message);
    process.exit(1);
  }
}

// Iniciar el servidor
initializeServer().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

// Manejo de errores no capturados
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});

module.exports = app;
