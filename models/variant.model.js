// models/variant.model.js
/**
 * ProductVariant Model
 * Representa una variante de producto (tamaño, espesor, color, etc)
 */

const variantSchema = {
  id: 'INT PRIMARY KEY AUTO_INCREMENT',
  product_id: 'INT NOT NULL',
  name: 'VARCHAR(255) NOT NULL',           // Nombre de la variante (ej: "1mm", "2mm")
  available: 'BOOLEAN DEFAULT true',       // Si está disponible
  price: 'DECIMAL(10, 2)',                 // Precio de la variante
  created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
  updated_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
};

const ProductVariant = {
  id: null,
  product_id: null,
  name: '',
  available: true,
  price: null
};

module.exports = {
  variantSchema,
  ProductVariant
};
