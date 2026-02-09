// middleware/upload.middleware.js
const { createUploader, uploadToCloudinary } = require('../config/cloudinary');
const multer = require('multer');

// ==========================================
// 📸 MIDDLEWARE PARA UPLOAD DE PRODUCTOS
// ==========================================

/**
 * Middleware para upload de una sola imagen de producto
 * Campo esperado: 'imagen'
 */
const productUpload = (req, res, next) => {
  const uploadMiddleware = createUploader('espumas_plasticos_productos', 'imagen');
  
  uploadMiddleware(req, res, async (err) => {
    if (err) {
      console.error('❌ Error en productUpload:', err.message);
      return res.status(400).json({
        success: false,
        message: 'Error en upload de imagen del producto',
        error: err.message
      });
    }
    
    if (req.file) {
      try {
        console.log('📸 Subiendo archivo a Cloudinary...');
        const result = await uploadToCloudinary(req.file.buffer, 'espumas_plasticos_productos');
        
        req.imageInfo = {
          url: result.secure_url,
          publicId: result.public_id,
          originalName: req.file.originalname,
          size: req.file.size,
          uploadedAt: new Date().toISOString()
        };
        
        console.log(`✅ Imagen uploadada: ${result.secure_url}`);
      } catch (cloudinaryError) {
        console.error('❌ Error subiendo a Cloudinary:', cloudinaryError.message);
        return res.status(500).json({
          success: false,
          message: 'Error subiendo imagen a Cloudinary',
          error: cloudinaryError.message
        });
      }
    }
    
    next();
  });
};

// ==========================================
// 📸 MIDDLEWARE PARA UPLOAD DE CATEGORÍAS
// ==========================================

/**
 * Middleware para upload de icono de categoría
 * Campo esperado: 'icono'
 */
const categoryUpload = (req, res, next) => {
  const uploadMiddleware = createUploader('espumas_plasticos_categorias', 'icono');
  
  uploadMiddleware(req, res, async (err) => {
    if (err) {
      console.error('❌ Error en categoryUpload:', err.message);
      return res.status(400).json({
        success: false,
        message: 'Error en upload de icono de categoría',
        error: err.message
      });
    }
    
    if (req.file) {
      try {
        console.log('📸 Subiendo icono a Cloudinary...');
        const result = await uploadToCloudinary(req.file.buffer, 'espumas_plasticos_categorias');
        
        req.imageInfo = {
          url: result.secure_url,
          publicId: result.public_id,
          originalName: req.file.originalname,
          size: req.file.size,
          uploadedAt: new Date().toISOString()
        };
        
        console.log(`✅ Icono uploadado: ${result.secure_url}`);
      } catch (cloudinaryError) {
        console.error('❌ Error subiendo a Cloudinary:', cloudinaryError.message);
        return res.status(500).json({
          success: false,
          message: 'Error subiendo icono a Cloudinary',
          error: cloudinaryError.message
        });
      }
    }
    
    next();
  });
};

// ==========================================
// 📷 MIDDLEWARE PARA UPLOAD MÚLTIPLE
// ==========================================

/**
 * Middleware para upload de múltiples imágenes de productos
 * Campo esperado: 'imagenes' (máximo 5 archivos)
 * Tipos permitidos: JPEG, PNG, JPG, WEBP
 * Tamaño máximo: 5MB por archivo
 */
const productsMultipleUpload = (req, res, next) => {
  const multerMiddleware = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
      
      if (validTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        console.warn(`⚠️  Formato no permitido: ${file.mimetype}`);
        cb(new Error('Formato no permitido. Use: JPEG, PNG, JPG, WEBP'), false);
      }
    },
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB
  }).array('imagenes', 5);
  
  multerMiddleware(req, res, async (err) => {
    if (err) {
      console.error('❌ Error en productsMultipleUpload:', err.message);
      return res.status(400).json({
        success: false,
        message: 'Error en upload de múltiples imágenes',
        error: err.message
      });
    }
    
    if (req.files && req.files.length > 0) {
      try {
        console.log(`📷 Subiendo ${req.files.length} imágenes a Cloudinary...`);
        
        const uploadPromises = req.files.map(file =>
          uploadToCloudinary(file.buffer, 'espumas_plasticos_productos')
        );
        
        const results = await Promise.all(uploadPromises);
        
        req.imagesInfo = results.map((result, index) => ({
          url: result.secure_url,
          publicId: result.public_id,
          originalName: req.files[index].originalname,
          size: req.files[index].size,
          uploadedAt: new Date().toISOString()
        }));
        
        console.log(`✅ ${req.imagesInfo.length} imágenes uploadadas correctamente`);
      } catch (cloudinaryError) {
        console.error('❌ Error subiendo a Cloudinary:', cloudinaryError.message);
        return res.status(500).json({
          success: false,
          message: 'Error subiendo imágenes a Cloudinary',
          error: cloudinaryError.message
        });
      }
    }
    
    next();
  });
};

// ==========================================
// 📷 MIDDLEWARE PARA UPLOAD MÚLTIPLE GENÉRICO
// ==========================================

/**
 * Middleware genérico para upload de múltiples imágenes
 * Campo esperado: 'imagenes' (máximo 5 archivos)
 * Carpeta destino en Cloudinary: 'espumas_plasticos_general'
 */
const multipleUpload = (req, res, next) => {
  const multerMiddleware = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
      
      if (validTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        console.warn(`⚠️  Formato no permitido: ${file.mimetype}`);
        cb(new Error('Formato no permitido. Use: JPEG, PNG, JPG, WEBP'), false);
      }
    },
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB
  }).array('imagenes', 5);
  
  multerMiddleware(req, res, async (err) => {
    if (err) {
      console.error('❌ Error en multipleUpload:', err.message);
      return res.status(400).json({
        success: false,
        message: 'Error en upload de múltiples imágenes',
        error: err.message
      });
    }
    
    if (req.files && req.files.length > 0) {
      try {
        console.log(`📷 Subiendo ${req.files.length} imágenes generales a Cloudinary...`);
        
        const uploadPromises = req.files.map(file =>
          uploadToCloudinary(file.buffer, 'espumas_plasticos_general')
        );
        
        const results = await Promise.all(uploadPromises);
        
        req.imagesInfo = results.map((result, index) => ({
          url: result.secure_url,
          publicId: result.public_id,
          originalName: req.files[index].originalname,
          size: req.files[index].size,
          uploadedAt: new Date().toISOString()
        }));
        
        console.log(`✅ ${req.imagesInfo.length} imágenes uploadadas correctamente`);
      } catch (cloudinaryError) {
        console.error('❌ Error subiendo a Cloudinary:', cloudinaryError.message);
        return res.status(500).json({
          success: false,
          message: 'Error subiendo imágenes a Cloudinary',
          error: cloudinaryError.message
        });
      }
    }
    
    next();
  });
};

// ==========================================
// 🔐 MIDDLEWARE PARA VERIFICAR JWT
// ==========================================

/**
 * Middleware para verificar JWT en rutas protegidas
 * Espera: Authorization: "Bearer <token>"
 */
const verifyToken = (req, res, next) => {
  const jwt = require('jsonwebtoken');
  
  // Obtenemos la cabecera Authorization: "Bearer <token>"
  const authHeader = req.headers['authorization'];

  // Si no se envía el header Authorization
  if (!authHeader) {
    console.warn('⚠️  Token no proporcionado');
    return res.status(401).json({ 
      success: false,
      error: 'Token no proporcionado' 
    });
  }

  // Extraemos el token (eliminamos el prefijo "Bearer")
  const tokenParts = authHeader.split(' ');

  // Validamos el formato "Bearer <token>"
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    console.warn('⚠️  Formato de token inválido');
    return res.status(400).json({ 
      success: false,
      error: 'Formato de token inválido. Use: Bearer <token>' 
    });
  }

  const token = tokenParts[1];

  // Verificamos y decodificamos el token
  jwt.verify(token, process.env.JWT_SECRET || 'tu_clave_secreta', (err, decoded) => {
    if (err) {
      console.warn('⚠️  Token inválido o expirado');
      return res.status(403).json({ 
        success: false,
        error: 'Token inválido o expirado' 
      });
    }

    // Token válido → Guardamos los datos del usuario en req
    req.user = decoded;
    console.log(`✅ Usuario autenticado: ${decoded.id}`);

    // Continuamos con la siguiente función del middleware
    next();
  });
};

// ==========================================
// 📤 EXPORTAR MIDDLEWARES
// ==========================================

module.exports = {
  productUpload,
  categoryUpload,
  multipleUpload,
  productsMultipleUpload,
  verifyToken
};
