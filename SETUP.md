# Catálogo Backend - Plaxtilineas 🔥

Backend para gestión de catálogo de productos de Plaxtilineas con Node.js, Express y MySQL.

## 🚀 Setup Inicial

### 1. Variables de entorno (.env)

Ya están configuradas en el archivo `.env`:
- Cloudinary (para subida de imágenes)
- Base de datos MySQL (Hostinger)

### 2. Instalar dependencias

```bash
npm install
```

### 3. Crear tablas en la BD

```bash
npm run db:create
```

O usa el script de inicialización completa:

```bash
npm run db:init
```

Este comando ejecuta:
1. Crea todas las tablas necesarias
2. Inserta 2 productos de ejemplo

### 4. Insertar datos iniciales (opcional)

Si ejecutaste solo `db:create`, puedes insertar datos después:

```bash
npm run db:seed
```

### 5. Iniciar servidor

```bash
npm run dev
```

El servidor estará disponible en: **http://localhost:5000**

---

## 📡 Endpoints Disponibles

### Health Check
```
GET /health
```

### Testing de conexiones
```
GET /api/test/cloudinary      # Test de Cloudinary
GET /api/test/database         # Test de Base de Datos
GET /api/test/all              # Test completo
```

---

## 🛣️ API de Productos (REST)

### Obtener todos los productos
```
GET /api/productos
```

**Respuesta:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "name": "Malla Plástica",
      "description": "...",
      "material": "Plástico resistente",
      "images": [...],
      "colors": [...],
      "variants": [...]
    }
  ]
}
```

### Obtener producto por ID
```
GET /api/productos/:id
```

Ejemplo:
```
GET /api/productos/1
```

### Obtener productos por categoría
```
GET /api/productos/categoria/:category
```

Ejemplo:
```
GET /api/productos/categoria/Plaxtilineas
```

### Crear nuevo producto
```
POST /api/productos
```

**Body:**
```json
{
  "name": "Nombre del Producto",
  "description": "Descripción completa",
  "material": "Material del producto",
  "category": "Plaxtilineas",
  "options": "Color1, Color2, Color3",
  "isNew": true,
  "isFeatured": false,
  "marca": "Marca opcional",
  "gramaje": "100gr",
  "brandIconUrl": "https://...",
  "images": [
    {
      "url": "https://...",
      "description": "Descripción de imagen"
    }
  ],
  "colors": ["Rojo", "Azul"],
  "variants": [
    {
      "name": "Variante 1",
      "available": true,
      "price": 100.00
    }
  ]
}
```

### Actualizar producto
```
PUT /api/productos/:id
```

**Body:** (mismo formato que CREATE, pero solo los campos a actualizar)

### Eliminar producto (Soft Delete)
```
DELETE /api/productos/:id
```

Marca el producto como eliminado pero no lo borra de la BD.

### Eliminar permanentemente
```
DELETE /api/productos/:id/permanent
```

Elimina completamente el producto y sus relaciones.

---

## 📊 Estructura de Base de Datos

### Tabla: products
```
id (INT, PK, AUTO_INCREMENT)
name (VARCHAR 255)
description (LONGTEXT)
material (VARCHAR 255)
category (VARCHAR 100)
options (LONGTEXT)
isNew (BOOLEAN)
isFeatured (BOOLEAN)
marca (VARCHAR 255)
gramaje (VARCHAR 100)
brandIconUrl (LONGTEXT)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
deleted_at (TIMESTAMP, nullable) - para soft delete
```

### Tabla: product_images
```
id (INT, PK, AUTO_INCREMENT)
product_id (INT, FK)
url (LONGTEXT)
description (TEXT)
created_at (TIMESTAMP)
```

### Tabla: product_colors
```
id (INT, PK, AUTO_INCREMENT)
product_id (INT, FK)
color (VARCHAR 100)
created_at (TIMESTAMP)
```

### Tabla: product_variants
```
id (INT, PK, AUTO_INCREMENT)
product_id (INT, FK)
name (VARCHAR 255)
available (BOOLEAN)
price (DECIMAL 10,2)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

---

## 🔍 Ejemplo de uso desde cliente

### JavaScript/Fetch

```javascript
// Obtener todos los productos
const getProducts = async () => {
  const response = await fetch('http://localhost:5000/api/productos');
  const data = await response.json();
  console.log(data);
};

// Crear producto
const createProduct = async () => {
  const response = await fetch('http://localhost:5000/api/productos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Mi Producto',
      description: 'Descripción',
      material: 'Plástico',
      images: [{ url: 'https://...', description: 'Imagen' }],
      colors: ['Rojo'],
      variants: [{ name: '5mm', available: true, price: 100 }]
    })
  });
  return response.json();
};

// Actualizar producto
const updateProduct = async (id) => {
  const response = await fetch(`http://localhost:5000/api/productos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      isFeatured: true,
      isNew: false
    })
  });
  return response.json();
};

// Eliminar producto
const deleteProduct = async (id) => {
  const response = await fetch(`http://localhost:5000/api/productos/${id}`, {
    method: 'DELETE'
  });
  return response.json();
};
```

---

## 🛠️ Scripts disponibles

```bash
npm start              # Inicia el servidor en producción
npm run dev            # Inicia con nodemon (desarrollo)
npm run db:create      # Crea las tablas
npm run db:seed        # Inserta datos iniciales
npm run db:init        # Crea tablas + inserta datos
```

---

## 📁 Estructura del Proyecto

```
catalogo-backend/
├── config/
│   ├── cloudinary.js      # Configuración de Cloudinary
│   └── db.js              # Configuración de MySQL
├── controllers/
│   └── producto.controller.js
├── models/
│   ├── product.model.js
│   └── variant.model.js
├── routes/
│   └── producto.routes.js
├── scripts/
│   ├── create-tables.js   # Script para crear tablas
│   ├── seed-products.js   # Script para insertar datos
│   └── init-db.js         # Script de inicialización total
├── .env                   # Variables de entorno
├── server.js              # Archivo principal
└── package.json
```

---

## 🔗 Base de Datos Hostinger

- **Host:** auth-db1076.hstgr.io
- **Usuario:** u977254048_MateoPlaxti
- **Base de Datos:** u977254048_catalogodata
- **Panel:** https://auth-db1076.hstgr.io/index.php?db=u977254048_catalogodata

---

## ☁️ Cloudinary

- **Cloud Name:** dsv1gdgya
- Las credenciales están en el archivo `.env`

---

## 🐛 Troubleshooting

### Error: "Conexión a Base de Datos rechazada"
1. Verifica que tus credenciales en `.env` son correctas
2. Asegúrate de que el host sea accesible desde tu IP
3. Revisa que tienes los puertos abiertos

### Error: "Tabla no existe"
- Ejecuta: `npm run db:create`
- O ejecuta: `npm run db:init` para crear tablas e insertar datos

### Error: "CORS y AJAX"
- El servidor ya tiene CORS habilitado globalmente
- Puedes hacer peticiones desde cualquier origen

---

## 📝 Notas

- Los soft deletes (deleted_at) permiten recuperar productos
- Los índices mejoran las búsquedas por categoría y fecha
- Las transacciones garantizan consistencia de datos
- Pool de conexiones optimiza el rendimiento

---

## 👨‍💻 Autor

Santiago - Catálogo Backend Plaxtilineas

---

¡Éxito con tu backend! 🚀
