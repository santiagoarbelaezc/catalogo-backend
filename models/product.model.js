// models/product.model.js
/**
 * CatalogProduct Model
 * Representa un producto del catálogo de Plaxtilineas
 */

const productSchema = {
  id: 'INT PRIMARY KEY AUTO_INCREMENT',
  name: 'VARCHAR(255) NOT NULL',
  description: 'LONGTEXT',
  material: 'VARCHAR(255)',
  category: 'VARCHAR(100) DEFAULT "Plaxtilineas"',
  
  // Opciones de texto
  options: 'LONGTEXT',                    // Colores en texto
  
  // Información adicional
  isNew: 'BOOLEAN DEFAULT true',
  isFeatured: 'BOOLEAN DEFAULT false',
  marca: 'VARCHAR(255)',
  gramaje: 'VARCHAR(100)',
  brandIconUrl: 'LONGTEXT',
  
  // Metadata
  created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
  updated_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
  deleted_at: 'TIMESTAMP NULL'
};

const productImageSchema = {
  id: 'INT PRIMARY KEY AUTO_INCREMENT',
  product_id: 'INT NOT NULL',
  url: 'LONGTEXT NOT NULL',
  description: 'TEXT',
  created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
  FOREIGN_KEY: 'FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE'
};

const productColorSchema = {
  id: 'INT PRIMARY KEY AUTO_INCREMENT',
  product_id: 'INT NOT NULL',
  color: 'VARCHAR(100) NOT NULL',
  created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
  FOREIGN_KEY: 'FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE'
};

const CatalogProduct = {
  id: null,
  name: '',
  description: '',
  material: '',
  category: 'Plaxtilineas',
  options: '',
  isNew: true,
  isFeatured: false,
  marca: null,
  gramaje: null,
  brandIconUrl: null,
  images: [],
  colors: [],
  references: [],
  variants: []
};

module.exports = {
  productSchema,
  productImageSchema,
  productColorSchema,
  CatalogProduct
};
