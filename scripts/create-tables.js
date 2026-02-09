// scripts/create-tables.js
/**
 * Script para crear las tablas necesarias en la Base de Datos
 * Ejecutar con: node scripts/create-tables.js
 */

const { getConnection } = require('../config/db');
require('dotenv').config();

const createTables = async () => {
  const connection = await getConnection();
  
  try {
    console.log('\n🔨 Creando tablas en la base de datos...\n');
    
    // Tabla de Productos
    console.log('📝 Creando tabla: products');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        description LONGTEXT,
        material VARCHAR(255),
        category VARCHAR(100) DEFAULT 'Plaxtilineas',
        options LONGTEXT,
        isNew BOOLEAN DEFAULT true,
        isFeatured BOOLEAN DEFAULT false,
        marca VARCHAR(255),
        gramaje VARCHAR(100),
        brandIconUrl LONGTEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL,
        INDEX idx_category (category),
        INDEX idx_created_at (created_at),
        INDEX idx_deleted_at (deleted_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('   ✅ Tabla products creada\n');
    
    // Tabla de Imágenes
    console.log('📝 Creando tabla: product_images');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS product_images (
        id INT PRIMARY KEY AUTO_INCREMENT,
        product_id INT NOT NULL,
        url LONGTEXT NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
        INDEX idx_product_id (product_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('   ✅ Tabla product_images creada\n');
    
    // Tabla de Colores
    console.log('📝 Creando tabla: product_colors');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS product_colors (
        id INT PRIMARY KEY AUTO_INCREMENT,
        product_id INT NOT NULL,
        color VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
        INDEX idx_product_id (product_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('   ✅ Tabla product_colors creada\n');
    
    // Tabla de Variantes
    console.log('📝 Creando tabla: product_variants');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS product_variants (
        id INT PRIMARY KEY AUTO_INCREMENT,
        product_id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        available BOOLEAN DEFAULT true,
        price DECIMAL(10, 2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
        INDEX idx_product_id (product_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('   ✅ Tabla product_variants creada\n');
    
    console.log('=' * 50);
    console.log('✅ TODAS LAS TABLAS CREADAS EXITOSAMENTE');
    console.log('=' * 50 + '\n');
    
    connection.release();
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error creando tablas:', error.message);
    console.error('\n💡 Si el error es sobre sintaxis SQL, intenta:');
    console.error('   - Verificar tu conexión a la BD');
    console.error('   - Revisar los permisos de usuario');
    connection.release();
    process.exit(1);
  }
};

createTables();
