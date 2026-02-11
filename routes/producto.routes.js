// routes/producto.routes.js
const express = require('express');
const router = express.Router();

const {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
  permanentlyDeleteProduct
} = require('../controllers/producto.controller');

const {
  productUpload,
  productsMultipleUpload,
  verifyToken
} = require('../middleware/upload.middleware');

// ==========================================
// 📖 GET ROUTES
// ==========================================

/**
 * GET /api/productos
 * Obtener todos los productos
 */
router.get('/', getAllProducts);

/**
 * GET /api/productos/categoria/:category
 * Obtener productos por categoría
 */
router.get('/categoria/:category', getProductsByCategory);

/**
 * GET /api/productos/:id
 * Obtener un producto por ID
 */
router.get('/:id', getProductById);

// ==========================================
// ✏️ POST ROUTES
// ==========================================

/**
 * POST /api/productos
 * Crear un nuevo producto con imágenes
 * 
 * Body:
 * {
 *   name: string (requerido),
 *   description: string (requerido),
 *   material: string (requerido),
 *   category?: string,
 *   options?: string,
 *   isNew?: boolean,
 *   isFeatured?: boolean,
 *   marca?: string,
 *   gramaje?: string,
 *   brandIconUrl?: string,
 *   colors?: Array<string>,
 *   variants?: Array<{name: string, available?: boolean, price?: number}>
 * }
 * 
 * Files:
 *   imagenes: Array<File> (máximo 5 imágenes)
 *   Tipos permitidos: JPEG, PNG, JPG, WEBP
 *   Tamaño máximo: 5MB por archivo
 */
router.post('/', verifyToken, productsMultipleUpload, createProduct);

// ==========================================
// 🔄 PUT ROUTES
// ==========================================

/**
 * PUT /api/productos/:id
 * Actualizar un producto (sin imágenes)
 */
router.put('/:id', verifyToken, updateProduct);

/**
 * PUT /api/productos/:id/con-imagenes
 * Actualizar un producto con imágenes
 */
router.put('/:id/con-imagenes', verifyToken, productsMultipleUpload, updateProduct);

// ==========================================
// 🗑️ DELETE ROUTES
// ==========================================

/**
 * DELETE /api/productos/:id
 * Eliminar un producto (soft delete)
 */
router.delete('/:id', verifyToken, deleteProduct);

/**
 * DELETE /api/productos/:id/permanent
 * Eliminar permanentemente un producto
 */
router.delete('/:id/permanent', verifyToken, permanentlyDeleteProduct);

module.exports = router;
