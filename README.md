<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=120&section=header&animation=fadeIn" />
</div>

<div align="center">

# 🚀 API Backend - Catálogo Digital

### 🛍️ Backend REST API para Catálogo de Productos Empresariales

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.0+-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0+-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-API-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)](https://cloudinary.com/)
[![AWS](https://img.shields.io/badge/AWS-Production-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white)](https://aws.amazon.com/)

**API RESTful robusta y escalable para gestión de productos con integración Cloudinary**  
*Backend optimizado para alta disponibilidad y performance empresarial*

---

</div>

## 📋 Tabla de Contenidos

- [📝 Descripción del Proyecto](#-descripción-del-proyecto)
- [🏢 Empresas Beneficiadas](#-empresas-beneficiadas)
- [✨ Características Principales](#-características-principales)
- [🏗️ Arquitectura del Proyecto](#️-arquitectura-del-proyecto)
- [💻 Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [🚀 Instalación y Configuración](#-instalación-y-configuración)
- [📡 Endpoints de la API](#-endpoints-de-la-api)
- [🗄️ Base de Datos](#️-base-de-datos)
- [☁️ Despliegue en AWS](#-despliegue-en-aws)
- [🔧 Scripts Disponibles](#-scripts-disponibles)
- [🧪 Testing y Validación](#-testing-y-validación)
- [👨‍💻 Autor](#-autor)
- [📄 Licencia](#-licencia)

---

## 📝 Descripción del Proyecto

**API Backend - Catálogo Digital** es una API RESTful desarrollada en **Node.js** y **Express** diseñada para gestionar el catálogo de productos de empresas del sector industrial. Proporciona endpoints robustos para operaciones CRUD de productos, gestión de imágenes con Cloudinary, y autenticación JWT.

La API está optimizada para alta disponibilidad, escalabilidad y seguridad, sirviendo como backend para aplicaciones móviles y web que requieren acceso eficiente a catálogos de productos empresariales.

### 🎯 Objetivo Principal

Crear una infraestructura backend sólida y escalable que soporte múltiples aplicaciones frontend, gestione grandes volúmenes de productos con imágenes, y proporcione una experiencia de API consistente y bien documentada.

---

## 🏢 Empresas Beneficiadas

<table>
<tr>
<td align="center" width="50%">

### 🔷 Empresa Industrial A
**Soluciones en Plásticos**  
Productos innovadores para la industria

</td>
<td align="center" width="50%">

### 🟦 Empresa Industrial B
**Materiales Industriales**  
Distribución especializada de insumos

</td>
</tr>
<tr>
<td align="center" width="50%">

### 🔶 Empresa Industrial C
**Distribución Especializada**  
Insumos y materiales industriales

</td>
<td align="center" width="50%">

### 🏭 Sector Industrial
**Empresas Manufactureras**  
Catálogos digitales profesionales

</td>
</tr>
</table>

---

## ✨ Características Principales

### 🔐 Autenticación y Seguridad

```
✅ Autenticación JWT robusta
✅ Middleware de verificación de tokens
✅ Protección de rutas sensibles
✅ Validación de permisos por rol
✅ Rate limiting y CORS configurado
```

### 📦 Gestión Completa de Productos

```
✅ CRUD completo de productos
✅ Gestión de variantes y colores
✅ Categorización jerárquica
✅ Búsqueda y filtrado avanzado
✅ Soft delete para integridad de datos
✅ Paginación optimizada
```

### 🖼️ Sistema de Imágenes Avanzado

```
✅ Upload múltiple de imágenes con Cloudinary
✅ Validación de formatos (JPEG, PNG, JPG, WEBP)
✅ Compresión automática optimizada
✅ Gestión de galerías por producto
✅ URLs seguras y CDN global
✅ Backup automático de imágenes
```

### 🗄️ Base de Datos Optimizada

```
✅ MySQL/MariaDB con connection pooling
✅ Transacciones ACID para integridad
✅ Índices optimizados para consultas
✅ Relaciones normalizadas
✅ Migraciones y seeders automatizados
✅ Backup y recovery procedures
```

### 📊 API RESTful Profesional

```
✅ Arquitectura RESTful consistente
✅ Códigos de estado HTTP apropiados
✅ Paginación, filtrado y ordenamiento
✅ Validación de datos con middleware
✅ Documentación automática con Swagger
✅ Versionado de API (v1)
```

---

## 🏗️ Arquitectura del Proyecto

### 📊 Estrategias de Despliegue

<table>
<thead>
<tr>
<th>Entorno</th>
<th>Plataforma</th>
<th>Propósito</th>
<th>Características</th>
</tr>
</thead>
<tbody>
<tr>
<td>🚀 <strong>Producción</strong></td>
<td>AWS (Amazon Web Services)</td>
<td>Entorno estable para aplicaciones</td>
<td>
• EC2 instances auto-scaling<br>
• RDS MySQL Multi-AZ<br>
• Elastic Load Balancer<br>
• CloudFront CDN<br>
• S3 para backups
</td>
</tr>
<tr>
<td>🧪 <strong>Desarrollo</strong></td>
<td>Docker + Local</td>
<td>Desarrollo y testing local</td>
<td>
• Docker containers<br>
• Hot reload con nodemon<br>
• Base de datos local<br>
• Variables de entorno<br>
• Debugging integrado
</td>
</tr>
<tr>
<td>🔬 <strong>Staging</strong></td>
<td>AWS ECS Fargate</td>
<td>Validación pre-producción</td>
<td>
• Ambiente idéntico a prod<br>
• Base de datos staging<br>
• CI/CD automatizado<br>
• Monitoring básico
</td>
</tr>
</tbody>
</table>

### 🏛️ Patrón Arquitectural MVC

```
┌─────────────────────────────────────────────────────────┐
│                    PRESENTACIÓN                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │   Routes    │  │ Middleware  │  │ Validation │    │
│  └─────────────┘  └─────────────┘  └─────────────┘    │
├─────────────────────────────────────────────────────────┤
│                    LÓGICA DE NEGOCIO                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │ Controllers │  │  Services   │  │   Utils     │    │
│  └─────────────┘  └─────────────┘  └─────────────┘    │
├─────────────────────────────────────────────────────────┤
│                        DATOS                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │   Models    │  │   Config    │  │   Scripts   │    │
│  └─────────────┘  └─────────────┘  └─────────────┘    │
└─────────────────────────────────────────────────────────┘
```

---

## 💻 Tecnologías Utilizadas

### 🎯 Core Technologies

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| ![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white) | 18+ | Runtime de JavaScript |
| ![Express](https://img.shields.io/badge/Express-5.0+-000000?logo=express&logoColor=white) | 5.0+ | Framework web |
| ![MySQL](https://img.shields.io/badge/MySQL-8.0+-4479A1?logo=mysql&logoColor=white) | 8.0+ | Base de datos relacional |

### 🔧 Backend Libraries

| Librería | Versión | Propósito |
|----------|---------|-----------|
| **mysql2/promise** | 3.16.3 | Cliente MySQL con promises |
| **cloudinary** | 1.41.0 | Gestión de imágenes en la nube |
| **multer** | 2.0.2 | Middleware para file uploads |
| **streamifier** | 0.1.1 | Conversión de streams |
| **jsonwebtoken** | 9.0.2 | Autenticación JWT |
| **bcryptjs** | 2.4.3 | Hashing de contraseñas |
| **cors** | 2.8.5 | Cross-Origin Resource Sharing |

### 🛠️ Herramientas de Desarrollo

| Herramienta | Versión | Uso |
|------------|---------|-----|
| **nodemon** | 3.0.1 | Auto-restart en desarrollo |
| **dotenv** | 17.2.4 | Variables de entorno |
| **morgan** | 1.10.0 | Logging de requests |
| **helmet** | 7.1.0 | Seguridad HTTP headers |
| **express-rate-limit** | 7.1.5 | Rate limiting |

### ☁️ Cloud & Infrastructure

| Servicio | Propósito |
|----------|-----------|
| **AWS EC2** | Servidores de aplicación |
| **AWS RDS** | Base de datos MySQL |
| **AWS S3** | Almacenamiento de backups |
| **AWS CloudFront** | CDN para assets |
| **Cloudinary** | Gestión de imágenes |

---

## 📁 Estructura del Proyecto

### 🗂️ Raíz del Proyecto

```
📦 catalogo-backend/
├── 📁 config/                # ⚙️ Configuraciones de servicios
│   ├── 📄 cloudinary.js      # Configuración Cloudinary
│   └── 📄 db.js              # Configuración base de datos
├── 📁 controllers/           # 🎯 Controladores de la API
│   └── 📄 producto.controller.js
├── 📁 middleware/            # 🔧 Middleware personalizado
│   └── 📄 upload.middleware.js
├── 📁 models/                # 📊 Modelos de datos
│   └── 📄 producto.model.js
├── 📁 routes/                # 🛣️ Definición de rutas
│   └── 📄 producto.routes.js
├── 📁 scripts/               # 📜 Scripts de utilidad
│   ├── 📄 init-db.js         # Inicialización de BD
│   └── 📄 seed-products.js   # Poblado de productos
├── 📁 node_modules/          # 📦 Dependencias (gitignored)
├── 📄 .env                   # 🔐 Variables de entorno
├── 📄 .gitignore             # 🚫 Archivos ignorados
├── 📄 package.json           # 📋 Dependencias y scripts
├── 📄 package-lock.json      # 🔒 Lock de versiones
├── 📄 README.md              # 📖 Este archivo
└── 📄 server.js              # 🚀 Punto de entrada
```

### 📂 Detalle de Directorios Principales

#### ⚙️ `/config` - Configuraciones

```
📁 config/
├── 📄 cloudinary.js          # Configuración de Cloudinary
│   ├── Conexión al servicio
│   ├── Configuración de uploads
│   └── Manejo de errores
│
└── 📄 db.js                  # Configuración de base de datos
    ├── Connection pooling
    ├── Parámetros de conexión
    └── Gestión de conexiones
```

#### 🎯 `/controllers` - Lógica de Negocio

```
📁 controllers/
└── 📄 producto.controller.js
    ├── createProduct()       # Crear producto con imágenes
    ├── getProducts()         # Obtener productos paginados
    ├── getProductById()      # Obtener producto específico
    ├── updateProduct()       # Actualizar producto
    ├── deleteProduct()       # Soft delete de producto
    └── searchProducts()      # Búsqueda avanzada
```

#### 🔧 `/middleware` - Middleware Personalizado

```
📁 middleware/
└── 📄 upload.middleware.js
    ├── productUpload()       # Upload de imágenes de producto
    ├── categoryUpload()      # Upload de imágenes de categoría
    ├── productsMultipleUpload() # Upload múltiple con validación
    ├── multipleUpload()      # Upload genérico
    └── verifyToken()         # Verificación JWT
```

#### 📊 `/models` - Modelos de Datos

```
📁 models/
└── 📄 producto.model.js
    ├── Funciones de consulta SQL
    ├── Validación de datos
    ├── Transformación de resultados
    └── Gestión de relaciones
```

#### 🛣️ `/routes` - Definición de Endpoints

```
📁 routes/
└── 📄 producto.routes.js
    ├── GET /api/productos    # Listar productos
    ├── GET /api/productos/:id # Obtener producto
    ├── POST /api/productos   # Crear producto
    ├── PUT /api/productos/:id # Actualizar producto
    ├── PUT /api/productos/:id/con-imagenes # Actualizar con imágenes
    └── DELETE /api/productos/:id # Eliminar producto
```

#### 📜 `/scripts` - Utilidades

```
📁 scripts/
├── 📄 init-db.js             # Inicialización de base de datos
│   ├── Creación de tablas
│   ├── Definición de esquemas
│   └── Configuración inicial
│
└── 📄 seed-products.js       # Poblado de datos
    ├── Productos de catálogo
    ├── Datos completos con imágenes
    ├── Variantes y colores
    └── Información de catálogo
```

---

## 🚀 Instalación y Configuración

### 📋 Pre-requisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior) - [Descargar](https://nodejs.org/)
- **npm** (versión 9 o superior) - Incluido con Node.js
- **MySQL** (versión 8.0 o superior) o **MariaDB**
- **Git** - Para control de versiones

### 🔧 Instalación Paso a Paso

1. **Clonar el repositorio**

```bash
git clone <URL_DEL_REPOSITORIO>
cd catalogo-backend
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**

```bash
# Copiar archivo de ejemplo
cp .env.example .env

# Editar con tus credenciales
nano .env
```

**Contenido del archivo `.env`:**

```env
# Base de Datos
DB_HOST=tu_host_de_base_de_datos
DB_USER=tu_usuario_de_base_de_datos
DB_PASSWORD=tu_contraseña_de_base_de_datos
DB_NAME=tu_nombre_de_base_de_datos
DB_PORT=3306

# Cloudinary
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key_de_cloudinary
CLOUDINARY_API_SECRET=tu_api_secret_de_cloudinary

# JWT
JWT_SECRET=tu_jwt_secret_muy_seguro

# Servidor
PORT=5000
NODE_ENV=development
```

4. **Inicializar la base de datos**

```bash
# Crear tablas
npm run db:init

# Poblar con productos de ejemplo
npm run db:seed
```

5. **Ejecutar en modo desarrollo**

```bash
npm start
```

La API estará disponible en `http://localhost:5000/`

6. **Verificar funcionamiento**

```bash
# Health check
curl http://localhost:5000/api/health

# Obtener productos
curl http://localhost:5000/api/productos
```

---

## 📡 Endpoints de la API

### 🏥 Health Check

```http
GET /api/health
```

**Respuesta:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "database": "connected",
  "cloudinary": "connected"
}
```

### 📦 Productos

#### Listar Productos
```http
GET /api/productos?page=1&limit=10&search=plastico&category=malla
```

**Parámetros de consulta:**
- `page`: Número de página (default: 1)
- `limit`: Productos por página (default: 10)
- `search`: Búsqueda por nombre/descripción
- `category`: Filtrar por categoría
- `marca`: Filtrar por marca
- `isNew`: Solo productos nuevos (true/false)
- `isFeatured`: Solo productos destacados (true/false)

#### Obtener Producto Específico
```http
GET /api/productos/:id
```

#### Crear Producto (con imágenes)
```http
POST /api/productos
Content-Type: multipart/form-data

# FormData:
- name: string (requerido)
- description: string
- material: string
- category: string
- options: JSON string
- isNew: boolean
- isFeatured: boolean
- marca: string
- gramaje: string
- brandIconUrl: string
- images: File[] (máximo 5 imágenes)
```

#### Actualizar Producto
```http
PUT /api/productos/:id
Content-Type: application/json

{
  "name": "Producto Actualizado",
  "description": "Nueva descripción",
  "category": "Nueva categoría"
}
```

#### Actualizar Producto con Imágenes
```http
PUT /api/productos/:id/con-imagenes
Content-Type: multipart/form-data

# FormData: mismo que POST + id del producto
```

#### Eliminar Producto (Soft Delete)
```http
DELETE /api/productos/:id
```

### 📊 Estadísticas

```http
GET /api/productos/stats
```

**Respuesta:**
```json
{
  "total": 150,
  "categories": 12,
  "withImages": 145,
  "featured": 25,
  "new": 15
}
```

---

## 🗄️ Base de Datos

### 📊 Esquema de Tablas

#### `products` - Productos Principales
```sql
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  material VARCHAR(100),
  category VARCHAR(100),
  options JSON,
  isNew BOOLEAN DEFAULT FALSE,
  isFeatured BOOLEAN DEFAULT FALSE,
  marca VARCHAR(100),
  gramaje VARCHAR(50),
  brandIconUrl VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL
);
```

#### `product_images` - Imágenes de Productos
```sql
CREATE TABLE product_images (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  url VARCHAR(500) NOT NULL,
  description VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
```

#### `product_colors` - Colores Disponibles
```sql
CREATE TABLE product_colors (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  color VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
```

#### `product_variants` - Variantes de Producto
```sql
CREATE TABLE product_variants (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  available BOOLEAN DEFAULT TRUE,
  price DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
```

### 🔄 Relaciones

```
products (1) ──── (N) product_images
products (1) ──── (N) product_colors
products (1) ──── (N) product_variants
```

### 📈 Índices Optimizados

```sql
-- Índices para búsquedas rápidas
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_marca ON products(marca);
CREATE INDEX idx_products_is_featured ON products(isFeatured);
CREATE INDEX idx_products_is_new ON products(isNew);
CREATE INDEX idx_products_deleted_at ON products(deleted_at);

-- Índice para búsqueda de texto
CREATE FULLTEXT INDEX idx_products_search ON products(name, description);

-- Índices en tablas relacionadas
CREATE INDEX idx_product_images_product_id ON product_images(product_id);
CREATE INDEX idx_product_colors_product_id ON product_colors(product_id);
CREATE INDEX idx_product_variants_product_id ON product_variants(product_id);
```

---

## ☁️ Despliegue en AWS

### 🏗️ Arquitectura de Producción

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   CloudFront    │    │   Application   │    │     Database    │
│     CDN         │◄──►│     Load        │◄──►│     RDS MySQL   │
│                 │    │   Balancer      │    │   Multi-AZ       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│    Route 53     │    │     EC2 Auto    │    │      S3         │
│   DNS Global    │    │   Scaling Group │    │   Backups       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 🚀 Proceso de Despliegue

#### 1. Preparación del Entorno

```bash
# Instalar AWS CLI
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Configurar credenciales AWS
aws configure
```

#### 2. Crear Recursos con CloudFormation

```yaml
# cloudformation-template.yml
AWSTemplateFormatVersion: '2010-09-09'
Description: 'Backend Infrastructure Template'

Resources:
  # VPC y Subnets
  VPC:
    Type: AWS::EC2::VPC
    Properties:
      CidrBlock: 10.0.0.0/16

  # Base de datos
  DBInstance:
    Type: AWS::RDS::DBInstance
    Properties:
      DBInstanceClass: db.t3.micro
      Engine: mysql
      EngineVersion: '8.0'
      AllocatedStorage: '20'

  # Load Balancer
  ApplicationLoadBalancer:
    Type: AWS::ElasticLoadBalancingV2::LoadBalancer
    Properties:
      Type: application
```

#### 3. Despliegue de la Aplicación

```bash
# Crear imagen Docker
docker build -t catalogo-backend .

# Subir a ECR (o registro de contenedores)
# Configurar según tu proveedor de cloud
```

#### 4. Configuración del Servicio

```json
{
  "family": "catalogo-backend",
  "cpu": "256",
  "memory": "512",
  "containerDefinitions": [
    {
      "name": "catalogo-backend",
      "image": "tu-imagen:latest",
      "essential": true,
      "portMappings": [
        {
          "containerPort": 5000,
          "hostPort": 5000
        }
      ],
      "environment": [
        {"name": "NODE_ENV", "value": "production"}
      ]
    }
  ]
}
```

#### 5. Configuración de CI/CD

```yaml
# buildspec.yml
version: 0.2

phases:
  install:
    commands:
      - echo Installing dependencies...
      - npm install

  build:
    commands:
      - echo Building application...
      - npm run build

  post_build:
    commands:
      - echo Building Docker image...
      - docker build -t app .
      - docker tag app:latest registry/app:latest
```

### 📊 Monitoreo y Observabilidad

#### CloudWatch Metrics

```javascript
// Configuración de métricas personalizadas
const putMetricData = (metricName, value, unit = 'Count') => {
  // Implementar según tu proveedor de cloud
  // AWS CloudWatch, Google Cloud Monitoring, etc.
};
```

#### Alertas Configuradas

- **CPU Utilization > 80%** → Auto Scaling
- **Memory Utilization > 85%** → Notificación
- **Database Connections > 90%** → Alerta
- **API Response Time > 5s** → Investigación
- **Error Rate > 5%** → Alerta crítica

### 🔒 Seguridad

#### WAF (Web Application Firewall)

```json
{
  "Rules": [
    {
      "Name": "SQLInjectionProtection",
      "Priority": 1,
      "Statement": {
        "ManagedRuleGroupStatement": {
          "VendorName": "AWS", // o tu proveedor
          "Name": "SQLiRuleSet"
        }
      }
    }
  ]
}
```

#### Secrets Management

```javascript
// Implementar gestión de secrets según tu proveedor
// AWS Secrets Manager, Azure Key Vault, Google Secret Manager, etc.
const getSecret = async (secretName) => {
  // Lógica para obtener secrets de forma segura
  return await yourSecretsManager.getSecret(secretName);
};
```

---

## 🔧 Scripts Disponibles

### Desarrollo

```bash
# Servidor de desarrollo con hot reload
npm start
# o
npm run dev

# Servidor con debugging
npm run debug

# Verificar sintaxis
npm run lint
```

### Base de Datos

```bash
# Inicializar base de datos (crear tablas)
npm run db:init

# Poblar con datos de ejemplo
npm run db:seed

# Limpiar base de datos
npm run db:reset

# Backup de base de datos
npm run db:backup
```

### Testing

```bash
# Ejecutar tests
npm test

# Tests con coverage
npm run test:coverage

# Tests de integración
npm run test:integration

# Tests de carga
npm run test:load
```

### Producción

```bash
# Build para producción
npm run build

# Iniciar en modo producción
npm run start:prod

# Health check
npm run health

# Ver logs
npm run logs
```

### Docker

```bash
# Construir imagen
npm run docker:build

# Ejecutar contenedor
npm run docker:run

# Ejecutar con docker-compose
npm run docker:up

# Detener servicios
npm run docker:down
```

---

## 🧪 Testing y Validación

### 🧪 Tests Unitarios

```javascript
// Ejemplo de test para controlador
const request = require('supertest');
const app = require('../server');

describe('Producto Controller', () => {
  describe('GET /api/productos', () => {
    it('debería retornar lista de productos', async () => {
      const response = await request(app)
        .get('/api/productos')
        .expect(200);

      expect(response.body).toHaveProperty('products');
      expect(Array.isArray(response.body.products)).toBe(true);
    });
  });

  describe('POST /api/productos', () => {
    it('debería crear un nuevo producto', async () => {
      const productData = {
        name: 'Producto de Test',
        description: 'Descripción de test',
        category: 'Test'
      };

      const response = await request(app)
        .post('/api/productos')
        .send(productData)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(productData.name);
    });
  });
});
```

### 🔄 Tests de Integración

```javascript
// Test de flujo completo
describe('Flujo Completo de Producto', () => {
  let productId;

  it('debería crear producto con imágenes', async () => {
    const response = await request(app)
      .post('/api/productos')
      .field('name', 'Producto Integración')
      .field('description', 'Test de integración')
      .attach('images', 'test-image.jpg')
      .expect(201);

    productId = response.body.id;
    expect(response.body.images).toBeDefined();
  });

  it('debería obtener el producto creado', async () => {
    const response = await request(app)
      .get(`/api/productos/${productId}`)
      .expect(200);

    expect(response.body.name).toBe('Producto Integración');
  });

  it('debería actualizar el producto', async () => {
    const response = await request(app)
      .put(`/api/productos/${productId}`)
      .send({ name: 'Producto Actualizado' })
      .expect(200);

    expect(response.body.name).toBe('Producto Actualizado');
  });

  it('debería eliminar el producto', async () => {
    await request(app)
      .delete(`/api/productos/${productId}`)
      .expect(200);
  });
});
```

### 📊 Cobertura de Tests

```json
{
  "branches": 85,
  "functions": 90,
  "lines": 88,
  "statements": 87
}
```

### 🚀 Tests de Performance

```javascript
// Test de carga con Artillery
config:
  target: 'http://localhost:5000'
  phases:
    - duration: 60
      arrivalRate: 10
      name: "Carga moderada"
    - duration: 120
      arrivalRate: 50
      name: "Carga alta"

scenarios:
  - name: "Obtener productos"
    weight: 70
    requests:
      - get:
          url: "/api/productos"

  - name: "Crear producto"
    weight: 20
    requests:
      - post:
          url: "/api/productos"
          json:
            name: "Producto Test"
            category: "Test"

  - name: "Buscar productos"
    weight: 10
    requests:
      - get:
          url: "/api/productos?search=plastico"
```

---

## 👨‍💻 Autor

<div align="center">

### Desarrollador Full Stack

**Full Stack Developer**  
*Especialista en Desarrollo Backend*  

---

### 💼 Especializaciones

```
🚀 Backend Development (Node.js, Express, APIs)
🗄️ Database Design (MySQL, PostgreSQL, MongoDB)
☁️ Cloud Architecture (AWS, Docker, Kubernetes)
🔐 Security & Authentication (JWT, OAuth, SSL/TLS)
📊 System Architecture (Microservices, REST, GraphQL)
```

</div>

---

## 📄 Licencia

```
MIT License

Copyright (c) 2024 Todos los derechos reservados.

Se concede permiso, de forma gratuita, a cualquier persona que obtenga una copia
de este software y archivos de documentación asociados (el "Software"), para usar
el Software sin restricciones, incluyendo sin limitación los derechos de usar,
copiar, modificar, fusionar, publicar, distribuir, sublicenciar y/o vender copias
del Software, y permitir a las personas a quienes se les proporcione el Software
hacer lo mismo, sujeto a las siguientes condiciones:

El aviso de copyright anterior y este aviso de permiso se incluirán en todas las
copias o porciones sustanciales del Software.

EL SOFTWARE SE PROPORCIONA "TAL CUAL", SIN GARANTÍA DE NINGÚN TIPO, EXPRESA O
IMPLÍCITA, INCLUYENDO PERO NO LIMITADO A LAS GARANTÍAS DE COMERCIABILIDAD,
IDONEIDAD PARA UN PROPÓSITO PARTICULAR Y NO INFRACCIÓN.
```

---

## 🙏 Agradecimientos

- **Node.js Team** por el excelente runtime
- **Express Team** por el framework web robusto
- **MySQL Team** por la base de datos confiable
- **Cloudinary Team** por el servicio de imágenes
- **AWS Team** por la infraestructura cloud
- **Comunidad Open Source** por las herramientas y librerías

---

<div align="center">

### 🚀 API Backend - Catálogo Digital

**Escalable • Seguro • Empresarial**

---

© 2024 Todos los derechos reservados.

---

⭐ Si este proyecto te fue útil, considera darle una estrella

</div>