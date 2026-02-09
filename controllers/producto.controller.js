// controllers/producto.controller.js
const { query, getConnection } = require('../config/db');

// ==========================================
// 📖 GET - OBTENER PRODUCTOS
// ==========================================

/**
 * Obtener todos los productos
 */
const getAllProducts = async (req, res) => {
  try {
    console.log('📖 GET: Obteniendo todos los productos...');
    
    const products = await query('SELECT * FROM products WHERE deleted_at IS NULL ORDER BY id DESC');
    
    // Enriquecer cada producto con sus imágenes y colores
    const enrichedProducts = await Promise.all(products.map(async (product) => {
      const images = await query('SELECT url, description FROM product_images WHERE product_id = ?', [product.id]);
      const colors = await query('SELECT color FROM product_colors WHERE product_id = ?', [product.id]);
      const variants = await query('SELECT * FROM product_variants WHERE product_id = ?', [product.id]);
      
      return {
        ...product,
        images: images.map(img => ({ url: img.url, description: img.description })),
        colors: colors.map(c => c.color),
        variants: variants
      };
    }));
    
    console.log(`✅ ${enrichedProducts.length} productos encontrados`);
    res.status(200).json({
      success: true,
      count: enrichedProducts.length,
      data: enrichedProducts
    });
    
  } catch (error) {
    console.error('❌ Error obteniendo productos:', error.message);
    res.status(500).json({
      success: false,
      error: 'Error obteniendo productos',
      message: error.message
    });
  }
};

/**
 * Obtener un producto por ID
 */
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`📖 GET: Obteniendo producto con ID: ${id}`);
    
    const products = await query('SELECT * FROM products WHERE id = ? AND deleted_at IS NULL', [id]);
    
    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Producto no encontrado'
      });
    }
    
    const product = products[0];
    const images = await query('SELECT url, description FROM product_images WHERE product_id = ?', [id]);
    const colors = await query('SELECT color FROM product_colors WHERE product_id = ?', [id]);
    const variants = await query('SELECT * FROM product_variants WHERE product_id = ?', [id]);
    
    const enrichedProduct = {
      ...product,
      images: images.map(img => ({ url: img.url, description: img.description })),
      colors: colors.map(c => c.color),
      variants: variants
    };
    
    console.log(`✅ Producto encontrado: ${product.name}`);
    res.status(200).json({
      success: true,
      data: enrichedProduct
    });
    
  } catch (error) {
    console.error('❌ Error obteniendo producto:', error.message);
    res.status(500).json({
      success: false,
      error: 'Error obteniendo producto',
      message: error.message
    });
  }
};

/**
 * Obtener productos por categoría
 */
const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    console.log(`📖 GET: Obteniendo productos de categoría: ${category}`);
    
    const products = await query('SELECT * FROM products WHERE category = ? AND deleted_at IS NULL', [category]);
    
    const enrichedProducts = await Promise.all(products.map(async (product) => {
      const images = await query('SELECT url, description FROM product_images WHERE product_id = ?', [product.id]);
      const colors = await query('SELECT color FROM product_colors WHERE product_id = ?', [product.id]);
      const variants = await query('SELECT * FROM product_variants WHERE product_id = ?', [product.id]);
      
      return {
        ...product,
        images: images.map(img => ({ url: img.url, description: img.description })),
        colors: colors.map(c => c.color),
        variants: variants
      };
    }));
    
    console.log(`✅ ${enrichedProducts.length} productos encontrados en categoría: ${category}`);
    res.status(200).json({
      success: true,
      count: enrichedProducts.length,
      data: enrichedProducts
    });
    
  } catch (error) {
    console.error('❌ Error obteniendo productos:', error.message);
    res.status(500).json({
      success: false,
      error: 'Error obteniendo productos',
      message: error.message
    });
  }
};

// ==========================================
// ✏️ POST - CREAR PRODUCTO
// ==========================================

const createProduct = async (req, res) => {
  const connection = await getConnection();
  
  try {
    const {
      name,
      description,
      material,
      category = 'Plaxtilineas',
      options,
      isNew = true,
      isFeatured = false,
      marca,
      gramaje,
      brandIconUrl,
      colors = [],
      variants = []
    } = req.body;
    
    console.log(`✏️  POST: Creando nuevo producto: ${name}`);
    
    // Validar campos requeridos
    if (!name || !description || !material) {
      return res.status(400).json({
        success: false,
        error: 'Campos requeridos: name, description, material'
      });
    }
    
    await connection.beginTransaction();
    
    // Insertar producto
    const [productResult] = await connection.query(
      `INSERT INTO products (name, description, material, category, options, isNew, isFeatured, marca, gramaje, brandIconUrl)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, description, material, category, options, isNew, isFeatured, marca, gramaje, brandIconUrl]
    );
    
    const productId = productResult.insertId;
    console.log(`   📌 Producto creado con ID: ${productId}`);
    
    // Insertar imágenes desde el middleware de upload
    if (req.imagesInfo && req.imagesInfo.length > 0) {
      for (const image of req.imagesInfo) {
        await connection.query(
          'INSERT INTO product_images (product_id, url, description) VALUES (?, ?, ?)',
          [productId, image.url, image.originalName]
        );
      }
      console.log(`   📸 ${req.imagesInfo.length} imágenes insertadas desde Cloudinary`);
    }
    
    // Insertar colores
    if (colors && colors.length > 0) {
      const colorArray = typeof colors === 'string' ? colors.split(',').map(c => c.trim()) : colors;
      for (const color of colorArray) {
        await connection.query(
          'INSERT INTO product_colors (product_id, color) VALUES (?, ?)',
          [productId, color]
        );
      }
      console.log(`   🎨 ${colorArray.length} colores insertados`);
    }
    
    // Insertar variantes
    if (variants && variants.length > 0) {
      const variantsArray = typeof variants === 'string' ? JSON.parse(variants) : variants;
      for (const variant of variantsArray) {
        await connection.query(
          'INSERT INTO product_variants (product_id, name, available, price) VALUES (?, ?, ?, ?)',
          [productId, variant.name, variant.available ?? true, variant.price]
        );
      }
      console.log(`   📦 ${variantsArray.length} variantes insertadas`);
    }
    
    await connection.commit();
    connection.release();
    
    console.log(`✅ Producto creado exitosamente: ${name}`);
    res.status(201).json({
      success: true,
      message: 'Producto creado exitosamente',
      data: { 
        id: productId, 
        name,
        imagesUploadedCount: (req.imagesInfo?.length || 0)
      }
    });
    
  } catch (error) {
    await connection.rollback();
    connection.release();
    console.error('❌ Error creando producto:', error.message);
    res.status(500).json({
      success: false,
      error: 'Error creando producto',
      message: error.message
    });
  }
};

// ==========================================
// 🔄 PUT - ACTUALIZAR PRODUCTO
// ==========================================

const updateProduct = async (req, res) => {
  const connection = await getConnection();
  
  try {
    const { id } = req.params;
    const {
      name,
      description,
      material,
      category,
      options,
      isNew,
      isFeatured,
      marca,
      gramaje,
      brandIconUrl,
      colors = [],
      variants = []
    } = req.body;
    
    console.log(`🔄 PUT: Actualizando producto ID: ${id}`);
    
    // Verificar que el producto existe
    const [existingProduct] = await connection.query('SELECT * FROM products WHERE id = ?', [id]);
    
    if (existingProduct.length === 0) {
      connection.release();
      return res.status(404).json({
        success: false,
        error: 'Producto no encontrado'
      });
    }
    
    await connection.beginTransaction();
    
    // Actualizar datos del producto
    const updateFields = [];
    const updateValues = [];
    
    if (name !== undefined) { updateFields.push('name = ?'); updateValues.push(name); }
    if (description !== undefined) { updateFields.push('description = ?'); updateValues.push(description); }
    if (material !== undefined) { updateFields.push('material = ?'); updateValues.push(material); }
    if (category !== undefined) { updateFields.push('category = ?'); updateValues.push(category); }
    if (options !== undefined) { updateFields.push('options = ?'); updateValues.push(options); }
    if (isNew !== undefined) { updateFields.push('isNew = ?'); updateValues.push(isNew); }
    if (isFeatured !== undefined) { updateFields.push('isFeatured = ?'); updateValues.push(isFeatured); }
    if (marca !== undefined) { updateFields.push('marca = ?'); updateValues.push(marca); }
    if (gramaje !== undefined) { updateFields.push('gramaje = ?'); updateValues.push(gramaje); }
    if (brandIconUrl !== undefined) { updateFields.push('brandIconUrl = ?'); updateValues.push(brandIconUrl); }
    
    if (updateFields.length > 0) {
      updateValues.push(id);
      await connection.query(
        `UPDATE products SET ${updateFields.join(', ')} WHERE id = ?`,
        updateValues
      );
      console.log(`   ✏️  Producto actualizado`);
    }
    
    // Actualizar imágenes desde el middleware (si existen)
    if (req.imagesInfo && req.imagesInfo.length > 0) {
      await connection.query('DELETE FROM product_images WHERE product_id = ?', [id]);
      for (const image of req.imagesInfo) {
        await connection.query(
          'INSERT INTO product_images (product_id, url, description) VALUES (?, ?, ?)',
          [id, image.url, image.originalName]
        );
      }
      console.log(`   📸 ${req.imagesInfo.length} imágenes actualizadas desde Cloudinary`);
    }
    
    // Actualizar colores
    if (colors && colors.length > 0) {
      const colorArray = typeof colors === 'string' ? colors.split(',').map(c => c.trim()) : colors;
      await connection.query('DELETE FROM product_colors WHERE product_id = ?', [id]);
      for (const color of colorArray) {
        await connection.query(
          'INSERT INTO product_colors (product_id, color) VALUES (?, ?)',
          [id, color]
        );
      }
      console.log(`   🎨 ${colorArray.length} colores actualizados`);
    }
    
    // Actualizar variantes
    if (variants && variants.length > 0) {
      const variantsArray = typeof variants === 'string' ? JSON.parse(variants) : variants;
      await connection.query('DELETE FROM product_variants WHERE product_id = ?', [id]);
      for (const variant of variantsArray) {
        await connection.query(
          'INSERT INTO product_variants (product_id, name, available, price) VALUES (?, ?, ?, ?)',
          [id, variant.name, variant.available ?? true, variant.price]
        );
      }
      console.log(`   📦 ${variantsArray.length} variantes actualizadas`);
    }
    
    await connection.commit();
    connection.release();
    
    console.log(`✅ Producto actualizado exitosamente`);
    res.status(200).json({
      success: true,
      message: 'Producto actualizado exitosamente',
      data: { 
        id,
        imagesUpdatedCount: (req.imagesInfo?.length || 0)
      }
    });
    
  } catch (error) {
    await connection.rollback();
    connection.release();
    console.error('❌ Error actualizando producto:', error.message);
    res.status(500).json({
      success: false,
      error: 'Error actualizando producto',
      message: error.message
    });
  }
};

// ==========================================
// 🗑️ DELETE - ELIMINAR PRODUCTO
// ==========================================

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`🗑️  DELETE: Eliminando producto ID: ${id}`);
    
    // Soft delete - marcar como eliminado
    await query(
      'UPDATE products SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?',
      [id]
    );
    
    console.log(`✅ Producto eliminado (soft delete)`);
    res.status(200).json({
      success: true,
      message: 'Producto eliminado exitosamente'
    });
    
  } catch (error) {
    console.error('❌ Error eliminando producto:', error.message);
    res.status(500).json({
      success: false,
      error: 'Error eliminando producto',
      message: error.message
    });
  }
};

/**
 * Eliminar permanentemente un producto
 */
const permanentlyDeleteProduct = async (req, res) => {
  const connection = await getConnection();
  
  try {
    const { id } = req.params;
    console.log(`🗑️🗑️ DELETE PERMANENTE: Eliminando producto ID: ${id}`);
    
    await connection.beginTransaction();
    
    // Eliminar relaciones
    await connection.query('DELETE FROM product_images WHERE product_id = ?', [id]);
    await connection.query('DELETE FROM product_colors WHERE product_id = ?', [id]);
    await connection.query('DELETE FROM product_variants WHERE product_id = ?', [id]);
    
    // Eliminar producto
    await connection.query('DELETE FROM products WHERE id = ?', [id]);
    
    await connection.commit();
    connection.release();
    
    console.log(`✅ Producto eliminado permanentemente`);
    res.status(200).json({
      success: true,
      message: 'Producto eliminado permanentemente'
    });
    
  } catch (error) {
    await connection.rollback();
    connection.release();
    console.error('❌ Error eliminando producto:', error.message);
    res.status(500).json({
      success: false,
      error: 'Error eliminando producto',
      message: error.message
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
  permanentlyDeleteProduct
};
