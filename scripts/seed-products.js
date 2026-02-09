// scripts/seed-products.js
/**
 * Script para insertar los datos iniciales de productos en la Base de Datos
 * Ejecutar con: node scripts/seed-products.js
 */

const { getConnection } = require('../config/db');
require('dotenv').config();

// Datos de productos
const PLAXTILINEAS_PRODUCTS = [
  {
    id: 1,
    name: 'Malla Plástica',
    description: 'Malla plástica versátil para múltiples aplicaciones en construcción, jardinería y agricultura.',
    material: 'Plástico resistente',
    references: [
      { name: '16x16x1m alto (Rollo x 30 metros lineales)', available: true },
      { name: '7x7x1m alto (Rollo x 30 metros lineales)', available: true },
      { name: '4x4x1m alto (Rollo x 30 metros lineales)', available: true },
      { name: '16x16x1.50m alto (Rollo x 30 mtr li..)', available: true },
      { name: 'Pollito 25x25x2m alto (Rollo x 30 metros lineales)', available: true },
      { name: 'Anti Mosquito 1.20m alto (Rollo x 30 mtr li..)', available: true },
      { name: 'Anti Mosquito 1.00m alto (Rollo x 30 mtr li..)', available: true },
      { name: 'Gallinero 1.80m alto (Rollo x 50 mtr li..) - Negra', available: true },
      { name: 'Gallinero 1.80m alto (Rollo x 50 metros lineales) - Transparente', available: true },
      { name: 'Construcción 1.00m alto (Rollo x 50 metros lineales)', available: true }
    ],
    options: 'Negro, Blanco, Gris, Rojo, Verde, Azul, Metalizado, Transparente, Naranja',
    colors: ['Negro', 'Blanco', 'Gris', 'Rojo', 'Verde', 'Azul', 'Metalizado', 'Transparente', 'Naranja'],
    images: [
      { url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770424242/ChatGPT_Image_Feb_6_2026_03_45_57_PM_asd3zx.png', description: 'Vista general de la malla plástica mostrando su versatilidad' },
      { url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770424242/ChatGPT_Image_Feb_6_2026_03_41_15_PM_nzlvv3.png', description: 'Detalle de la estructura y resistencia de la malla' },
      { url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770424275/card3_oalsyb.jpg', description: 'Aplicación práctica en diferentes usos' }
    ],
    category: 'Plaxtilineas',
    isNew: true,
    isFeatured: true
  },
  {
    id: 2,
    name: 'Malla Cafetera',
    description: 'Malla especializada para cultivos de café y protección agrícola.',
    material: 'Plástico agrícola resistente',
    references: [
      { name: '4x4x1m alto (Rollo x 30 metros lineales)', available: true },
      { name: '4x4x1.5m alto (Rollo x 30 metros lineales)', available: true },
      { name: '4x4x2.00m alto (Rollo x 30 metros lineales)', available: true }
    ],
    options: 'Negra',
    colors: ['Negra'],
    images: [
      { url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770424651/ChatGPT_Image_Feb_6_2026_07_34_54_PM_pl4jeg.png', description: 'Vista general de la malla cafetera mostrando su diseño especializado' },
      { url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770424242/ChatGPT_Image_6_feb_2026_15_20_07_kualvz.png', description: 'Detalle de la trama y resistencia para cultivos' },
      { url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770425533/ChatGPT_Image_Feb_6_2026_07_37_17_PM_cmrdqi.png', description: 'Aplicación en cultivos de café' }
    ],
    category: 'Plaxtilineas',
    isNew: true,
    isFeatured: true
  },
  {
    id: 3,
    name: 'Tela Laminada Plastificada',
    description: 'Tela laminada plastificada resistente para diversas aplicaciones.',
    material: 'Tela laminada plastificada',
    references: [
      { name: '2.10 m alto (Rollo x 250 metros lineales) - Azul', price: 8900, available: true },
      { name: '2.10 m alto (Rollo x 250 metros lineales) - Blanca', price: 8900, available: true },
      { name: '2.10 m alto (Rollo x 250 metros lineales) - Amarillo', price: 8900, available: true }
    ],
    options: 'Azul, Blanca, Amarillo',
    colors: ['Azul', 'Blanca', 'Amarillo'],
    images: [
      { url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770426603/WhatsApp_Image_2026-01-08_at_10.12.23_PM_tbvqrb.jpg', description: 'Imagen principal de la tela laminada plastificada' },
      { url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770426557/relieve_e2dxty.jpg', description: 'Imagen secundaria 1' },
      { url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770426603/WhatsApp_Image_2026-01-08_at_10.12.23_PM_tbvqrb.jpg', description: 'Imagen secundaria 2' }
    ],
    category: 'Plaxtilineas',
    isNew: true,
    isFeatured: true,
    marca: 'Tesicol',
    gramaje: '130 gr',
    brandIconUrl: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770426676/Testicol_do2hm1_tye31s.png'
  },
  {
    id: 4,
    name: 'Tela de Cerramiento',
    description: 'Tela resistente ideal para cerramientos y delimitación de espacios.',
    material: 'Tela sintética',
    references: [
      { name: '2.00 m alto (Rollo x 100 metros lineales) - Verde', price: 2500, available: true },
      { name: '2.00 m alto (Rollo x 100 metros lineales) - Blanco', price: 2800, available: true },
      { name: '2.00 m alto (Rollo x 100 metros lineales) - Negro', price: 3000, available: true }
    ],
    options: 'Verde, Blanco, Negro',
    colors: ['Verde', 'Blanco', 'Negro'],
    images: [
      { url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770426116/ChatGPT_Image_Feb_6_2026_08_01_31_PM_vkgbfm.png', description: 'Vista general de la tela de cerramiento mostrando su resistencia' },
      { url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770426141/card4_iws8ng.jpg', description: 'Detalle de la estructura y calidad de la tela' },
      { url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770426168/banner3-project_qsy4ls.png', description: 'Aplicación práctica en cerramientos' }
    ],
    category: 'Plaxtilineas',
    isNew: true,
    isFeatured: true
  },
  {
    id: 5,
    name: 'Plástico de Polietileno Negro',
    description: 'Plástico de polietileno negro resistente',
    material: 'Polietileno negro',
    references: [
      { name: 'Calibre 2 x 2 m ancho (Rollo x 200 metros lineales)', price: 2500, available: true },
      { name: 'Calibre 4 x 2 m ancho (Rollo x 200 metros lineales)', price: 3000, available: true },
      { name: 'Calibre 3 x 3 m ancho (Rollo x 100 metros lin..)', price: 4000, available: true },
      { name: 'Calibre 4 x 3 m ancho (Rollo x 100 metros lin..)', price: 4500, available: true },
      { name: 'Calibre 4 x 4 m ancho (Rollo x 100 metros lin..)', price: 5500, available: true },
      { name: 'Calibre 6 x 4 m ancho (Rollo x 70 metros lineales)', price: 7500, available: true },
      { name: 'Calibre 6 x 6 m ancho (Rollo x 50 metros lin..)', price: 10500, available: true }
    ],
    options: 'Negro',
    colors: ['Negro'],
    images: [
      { url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770433314/plastico_negro_2_tsrjzi.jpg', description: 'Vista general del plástico de polietileno negro' },
      { url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770433313/Plastico_Negro_hsjrbz.jpg', description: 'Detalle de la calidad y resistencia del plástico' },
      { url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770433314/plastico_negro_2_tsrjzi.jpg', description: 'Aplicación práctica del plástico de polietileno' }
    ],
    category: 'Plaxtilineas',
    isNew: true,
    isFeatured: true
  },
  {
    id: 6,
    name: 'Plástico Transparente',
    description: 'Plástico transparente resistente para diversas aplicaciones industriales y de embalaje.',
    material: 'Plástico transparente',
    references: [
      { name: 'Calibre 2 x 2 m ancho', price: 2800, available: true },
      { name: 'Calibre 2 x 3 m ancho', price: 3800, available: true },
      { name: 'Calibre 4 x 2 m ancho (Rollo x 200 metros lineales)', price: 4500, available: true },
      { name: 'Calibre 4 x 3 m ancho (Rollo x 150 metros li..)', price: 6000, available: true },
      { name: 'Calibre 4 x 4 m ancho (Rollo x 100 metros lineales)', price: 7000, available: true },
      { name: 'Calibre 6 x 6 m ancho (Rollo x 50 metros li..)', price: 15500, available: true }
    ],
    options: 'Transparente',
    colors: ['Transparente'],
    images: [
      { url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770434516/ChatGPT_Image_Feb_6_2026_10_17_54_PM_ajlo9s.jpg', description: 'Vista general del plástico transparente' },
      { url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770434516/ChatGPT_Image_Feb_6_2026_10_19_30_PM_rmymjc.jpg', description: 'Detalle de la calidad y transparencia del plástico' },
      { url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770434516/ChatGPT_Image_Feb_6_2026_10_17_54_PM_ajlo9s.jpg', description: 'Aplicación práctica del plástico transparente' }
    ],
    category: 'Plaxtilineas',
    isNew: true,
    isFeatured: true
  },
  {
    id: 7,
    name: 'Plástico Invernadero Original',
    description: 'Plástico para invernadero original, ideal para cultivos protegidos con protección UV.',
    material: 'Plástico para invernadero',
    references: [
      { name: 'Calibre 4 x 4 m ancho (Rollo x 100 metros lineales)', price: 17500, available: true },
      { name: 'Calibre 6 x 6 m ancho (Rollo x 50 metros lineales)', price: 21500, available: true },
      { name: 'Calibre 7 x 6 m ancho (Rollo x 50 metros lineales)', price: 24500, available: true },
      { name: 'Calibre 6 x 8 m ancho (Rollo x 50 metros li..)', price: 28000, available: true },
      { name: 'Calibre 7 x 8 m ancho (Rollo x 50 metros li..)', price: 32500, available: true }
    ],
    options: 'Verde',
    colors: ['Verde'],
    images: [
      { url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770434865/ChatGPT_Image_Feb_6_2026_07_29_34_PM_igeto3.jpg', description: 'Vista general del plástico para invernadero' },
      { url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770434865/ChatGPT_Image_Feb_6_2026_07_29_41_PM_uinosy.jpg', description: 'Detalle de la calidad y resistencia UV' },
      { url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770434865/ChatGPT_Image_6_feb_2026_15_31_25_shfeq3.jpg', description: 'Aplicación en invernaderos' }
    ],
    category: 'Plaxtilineas',
    isNew: true,
    isFeatured: true,
    marca: 'PQA',
    brandIconUrl: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770434981/images_ng4m1m.png'
  },
  {
    id: 8,
    name: 'Plástico Burbuja',
    description: 'Protege tus objetos frágiles con nuestro plástico burbuja de alta calidad! Envoltura resistente y duradera con burbujas de aire para garantizar una protección óptima durante el transporte. Ideal para mudanzas, envíos y almacenamiento seguro.',
    material: 'Plástico burbuja',
    references: [
      { name: '1.50 m ancho (Rollo x 50 metros lineales)', price: 3000, available: true },
      { name: '1.50 m ancho (Rollo x 25 metros lineales)', price: 5000, available: true }
    ],
    colors: ['Transparente'],
    images: [
      { url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770074277/rollo-plastico-burbuja-grande-empaque-envio-mudanza-5-mts-D_NQ_NP_790295-MLM25736474796_072017-F_sthsm4.jpg', description: 'Vista general del plástico burbuja mostrando su resistencia y protección' },
      { url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770074212/ChatGPT_Image_2_feb_2026_06_15_53_p.m._ittqwh.png', description: 'Detalle de las burbujas de aire y su efectividad en protección' },
      { url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770074263/OIP_jl0gts.webp', description: 'Aplicación en envíos y mudanzas mostrando versatilidad' }
    ],
    category: 'Plaxtilineas',
    isNew: true,
    isFeatured: false
  },
  {
    id: 9,
    name: 'Polisombras',
    description: 'Tela de polisombra para protección solar en cultivos e invernaderos.',
    material: 'Polipropileno',
    references: [
      { name: '50% - 2.30 m alto (Rollo x 100 metros lineales)', price: 4500, available: true },
      { name: '50% - 3.00 m alto (Rollo x 100 metros lineales)', price: 5500, available: true },
      { name: '75% - 2.30 m alto (Rollo x 100 metros lineales)', price: 6000, available: true },
      { name: '75% - 3.00 m alto (Rollo x 100 metros lineales)', price: 7000, available: true }
    ],
    options: 'Negro, Verde',
    colors: ['Negro', 'Verde'],
    images: [
      { url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770074277/polisombra_example.jpg', description: 'Vista general de polisombras' },
      { url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770074277/polisombra_detail.jpg', description: 'Detalle de la trama' }
    ],
    category: 'Plaxtilineas',
    isNew: false,
    isFeatured: false
  },
  {
    id: 10,
    name: 'Tela Sombrio Privacidad',
    description: 'Tela de sombrio con función de privacidad para delimitación de espacios.',
    material: 'Polipropileno tejido',
    references: [
      { name: '1.50 m alto (Rollo x 50 metros lineales)', price: 3500, available: true },
      { name: '2.00 m alto (Rollo x 50 metros lineales)', price: 4500, available: true },
      { name: '3.00 m alto (Rollo x 50 metros lineales)', price: 6500, available: true }
    ],
    options: 'Negro, Verde, Marrón',
    colors: ['Negro', 'Verde', 'Marrón'],
    images: [
      { url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770074277/sombrio_example.jpg', description: 'Tela sombrio de privacidad' }
    ],
    category: 'Plaxtilineas',
    isNew: false,
    isFeatured: false
  },
  {
    id: 11,
    name: 'Thermolon',
    description: 'Tela térmica Thermolon para retención de calor en cultivos e invernaderos.',
    material: 'Polietileno térmico',
    references: [
      { name: '2.10 m alto (Rollo x 100 metros lineales)', price: 12000, available: true },
      { name: '2.80 m alto (Rollo x 100 metros lineales)', price: 15000, available: true },
      { name: '3.00 m alto (Rollo x 100 metros lineales)', price: 16000, available: true }
    ],
    options: 'Transparente',
    colors: ['Transparente'],
    images: [
      { url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770074277/thermolon_example.jpg', description: 'Thermolon' }
    ],
    category: 'Plaxtilineas',
    isNew: false,
    isFeatured: false
  },
  {
    id: 12,
    name: 'Yumbolon',
    description: 'Tela térmica Yumbolon para retención de calor con mayor durabilidad.',
    material: 'Polietileno térmico reforzado',
    references: [
      { name: '2.10 m alto (Rollo x 100 metros lineales)', price: 14000, available: true },
      { name: '3.00 m alto (Rollo x 100 metros lineales)', price: 18000, available: true }
    ],
    options: 'Transparente',
    colors: ['Transparente'],
    images: [
      { url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770074277/yumbolon_example.jpg', description: 'Yumbolon' }
    ],
    category: 'Plaxtilineas',
    isNew: false,
    isFeatured: false
  },
  {
    id: 13,
    name: 'Strech Film',
    description: 'Film estirable para embalaje y protección de productos.',
    material: 'Polietileno estirable',
    references: [
      { name: '50 cm x 300 metros', price: 8000, available: true },
      { name: '100 cm x 300 metros', price: 12000, available: true },
      { name: '150 cm x 300 metros', price: 16000, available: true }
    ],
    options: 'Transparente',
    colors: ['Transparente'],
    images: [
      { url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770074277/strech_film_example.jpg', description: 'Strech Film' }
    ],
    category: 'Plaxtilineas',
    isNew: false,
    isFeatured: false
  },
  {
    id: 14,
    name: 'Placus',
    description: 'Placas rígidas de plástico para diversas aplicaciones.',
    material: 'Polipropileno rígido',
    references: [
      { name: 'Transparente 1.22 x 2.44 m', price: 25000, available: true },
      { name: 'Blanco 1.22 x 2.44 m', price: 23000, available: true },
      { name: 'Acrílico 1.22 x 2.44 m', price: 35000, available: true }
    ],
    options: 'Transparente, Blanco, Acrílico',
    colors: ['Transparente', 'Blanco', 'Acrílico'],
    images: [
      { url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770074277/placus_example.jpg', description: 'Placus' }
    ],
    category: 'Plaxtilineas',
    isNew: false,
    isFeatured: false
  },
  {
    id: 15,
    name: 'POLIFLEX 2.0',
    description: 'Plástico flexible de nueva generación con mayor resistencia.',
    material: 'Polietileno flexible reforzado',
    references: [
      { name: 'Calibre 2 x 3 m ancho (Rollo x 100 metros lineales)', price: 5500, available: true },
      { name: 'Calibre 4 x 4 m ancho (Rollo x 100 metros lineales)', price: 8500, available: true },
      { name: 'Calibre 6 x 6 m ancho (Rollo x 50 metros lineales)', price: 12000, available: true }
    ],
    options: 'Negro, Transparente',
    colors: ['Negro', 'Transparente'],
    images: [
      { url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770074277/poliflex_example.jpg', description: 'POLIFLEX 2.0' }
    ],
    category: 'Plaxtilineas',
    isNew: true,
    isFeatured: false
  },
  {
    id: 16,
    name: 'Césped Artificial',
    description: 'Césped artificial de excelente calidad para jardines y decoración.',
    material: 'Polietileno y polipropileno',
    references: [
      { name: '10 mm - Rollo x 2 metros ancho x 25 metros lineales', price: 8000, available: true },
      { name: '15 mm - Rollo x 2 metros ancho x 25 metros lineales', price: 11000, available: true },
      { name: '20 mm - Rollo x 2 metros ancho x 25 metros lineales', price: 14000, available: true }
    ],
    options: 'Verde',
    colors: ['Verde'],
    images: [
      { url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770074277/cesped_artificial_example.jpg', description: 'Césped Artificial' }
    ],
    category: 'Plaxtilineas',
    isNew: false,
    isFeatured: false
  },
  {
    id: 17,
    name: 'Sogas',
    description: 'Sogas resistentes para amarre y sujeción de múltiples usos.',
    material: 'Polipropileno textil',
    references: [
      { name: 'Soga 6mm (Rollo x 100 metros)', price: 2500, available: true },
      { name: 'Soga 8mm (Rollo x 100 metros)', price: 3500, available: true },
      { name: 'Soga 10mm (Rollo x 100 metros)', price: 4500, available: true }
    ],
    options: 'Blanca, Naranja, Verde',
    colors: ['Blanca', 'Naranja', 'Verde'],
    images: [
      { url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770074277/sogas_example.jpg', description: 'Sogas' }
    ],
    category: 'Plaxtilineas',
    isNew: false,
    isFeatured: false
  },
  {
    id: 18,
    name: 'Pisos Vinílicos',
    description: 'Pisos de vinilo de alta calidad para uso residencial e industrial.',
    material: 'Cloruro de polivinilo',
    references: [
      { name: '2mm - Rollo x 2 metros ancho x 30 metros lineales', price: 12000, available: true },
      { name: '3mm - Rollo x 2 metros ancho x 30 metros lineales', price: 15000, available: true },
      { name: '5mm - Rollo x 2 metros ancho x 30 metros lineales', price: 20000, available: true }
    ],
    options: 'Madera, Cemento, Azulejo',
    colors: ['Madera', 'Cemento', 'Azulejo'],
    images: [
      { url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770074277/pisos_vinilicos_example.jpg', description: 'Pisos Vinílicos' }
    ],
    category: 'Plaxtilineas',
    isNew: false,
    isFeatured: false
  },
  {
    id: 19,
    name: 'Mantel Plástico',
    description: 'Manteles de plástico resistente para mesas y eventos.',
    material: 'Polietileno flexible',
    references: [
      { name: '1.40 m x 1.40 m', price: 2500, available: true },
      { name: '1.80 m x 1.80 m', price: 3500, available: true },
      { name: '2.00 m x 2.00 m', price: 4500, available: true }
    ],
    options: 'Blanco, Negro, Rojo, Azul, Verde, Amarillo',
    colors: ['Blanco', 'Negro', 'Rojo', 'Azul', 'Verde', 'Amarillo'],
    images: [
      { url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770074277/mantel_example.jpg', description: 'Mantel Plástico' }
    ],
    category: 'Plaxtilineas',
    isNew: false,
    isFeatured: false
  },
  {
    id: 20,
    name: 'Papel Decorativo',
    description: 'Papel decorativo de alta calidad con diversos diseños.',
    material: 'Papel plastificado',
    references: [
      { name: 'Rollo x 10 metros', price: 1500, available: true },
      { name: 'Rollo x 20 metros', price: 2500, available: true }
    ],
    options: 'Flores, Geométrico, Liso, Textura',
    colors: ['Multicolor'],
    images: [
      { url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770074277/papel_decorativo_example.jpg', description: 'Papel Decorativo' }
    ],
    category: 'Plaxtilineas',
    isNew: false,
    isFeatured: false
  },
  {
    id: 21,
    name: 'Espumas',
    description: 'Espumas de diferentes densidades para protección, amortiguación y aislamiento.',
    material: 'Polietileno y poliuretano',
    references: [
      { name: 'Espuma 2.5cm - Rollo x 1 metro ancho x 20 metros', price: 5000, available: true },
      { name: 'Espuma 5cm - Rollo x 1 metro ancho x 20 metros', price: 8000, available: true },
      { name: 'Espuma 10cm - Rollo x 1 metro ancho x 20 metros', price: 12000, available: true }
    ],
    options: '2.5cm, 5cm, 10cm',
    colors: ['Negro'],
    images: [
      { url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770074277/espumas_example.jpg', description: 'Espumas' }
    ],
    category: 'Plaxtilineas',
    isNew: false,
    isFeatured: false
  },
  {
    id: 22,
    name: 'Pegantes',
    description: 'Pegantes y adhesivos de alta calidad para múltiples materiales.',
    material: 'Polímero sintético',
    references: [
      { name: 'Frasco x 200ml', price: 3000, available: true },
      { name: 'Frasco x 500ml', price: 6000, available: true },
      { name: 'Galón x 1 litro', price: 10000, available: true }
    ],
    options: 'Universal, Plástico, Madera',
    colors: ['Transparente'],
    images: [
      { url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770074277/pegantes_example.jpg', description: 'Pegantes' }
    ],
    category: 'Plaxtilineas',
    isNew: false,
    isFeatured: false
  },
  {
    id: 23,
    name: 'Espuma Polietileno Celda Cerrada',
    description: 'Espuma de polietileno con celdas cerradas ideal para aislamiento.',
    material: 'Polietileno celda cerrada',
    references: [
      { name: '10mm - Rollo x 1 metro ancho x 100 metros', price: 8000, available: true },
      { name: '15mm - Rollo x 1 metro ancho x 100 metros', price: 12000, available: true },
      { name: '20mm - Rollo x 1 metro ancho x 100 metros', price: 16000, available: true }
    ],
    options: '10mm, 15mm, 20mm',
    colors: ['Blanco'],
    images: [
      { url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770074277/espuma_celda_cerrada_example.jpg', description: 'Espuma Polietileno' }
    ],
    category: 'Plaxtilineas',
    isNew: false,
    isFeatured: false
  },
  {
    id: 24,
    name: 'Clavos Acero',
    description: 'Clavos de acero de diferentes tamaños resistentes a la corrosión.',
    material: 'Acero galvanizado',
    references: [
      { name: '2 pulgadas - Caja x 100', price: 4000, available: true },
      { name: '3 pulgadas - Caja x 100', price: 5000, available: true },
      { name: '4 pulgadas - Caja x 100', price: 6000, available: true }
    ],
    options: '2\", 3\", 4\"',
    colors: ['Plateado'],
    images: [
      { url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770074277/clavos_acero_example.jpg', description: 'Clavos Acero' }
    ],
    category: 'Plaxtilineas',
    isNew: false,
    isFeatured: false
  },
  {
    id: 25,
    name: 'Cartón Corrugado',
    description: 'Cartón corrugado para embalaje y protección de productos.',
    material: 'Papel corrugado',
    references: [
      { name: 'Caja 40x30x30cm', price: 2000, available: true },
      { name: 'Caja 50x40x40cm', price: 3500, available: true },
      { name: 'Rollo x 1 metro ancho x 100 metros', price: 8000, available: true }
    ],
    options: 'Calibre 3, Calibre 5',
    colors: ['Marrón'],
    images: [
      { url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770074277/carton_corrugado_example.jpg', description: 'Cartón Corrugado' }
    ],
    category: 'Plaxtilineas',
    isNew: false,
    isFeatured: false
  },
  {
    id: 26,
    name: 'Malla Multiusos',
    description: 'Malla versátil para múltiples aplicaciones en construcción y jardinería.',
    material: 'Polipropileno tejido',
    references: [
      { name: '1m x 1m - Paquete x 10', price: 3500, available: true },
      { name: '2m x 2m - Paquete x 10', price: 7000, available: true },
      { name: 'Rollo x 1 metro ancho x 50 metros', price: 9000, available: true }
    ],
    options: 'Negro, Blanco, Verde',
    colors: ['Negro', 'Blanco', 'Verde'],
    images: [
      { url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770074277/malla_multiusos_example.jpg', description: 'Malla Multiusos' }
    ],
    category: 'Plaxtilineas',
    isNew: false,
    isFeatured: false
  },
  {
    id: 27,
    name: 'Piso Plástico',
    description: 'Piso de plástico modular ideal para espacios comerciales e industriales.',
    material: 'Polipropileno rígido',
    references: [
      { name: 'Módulo 30x30cm', price: 8000, available: true },
      { name: 'Módulo 50x50cm', price: 12000, available: true },
      { name: 'Rollo x 2 metros ancho x 50 metros', price: 18000, available: true }
    ],
    options: 'Negro, Gris, Azul',
    colors: ['Negro', 'Gris', 'Azul'],
    images: [
      { url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770074277/piso_plastico_example.jpg', description: 'Piso Plástico' }
    ],
    category: 'Plaxtilineas',
    isNew: false,
    isFeatured: false
  },
  {
    id: 28,
    name: 'Cinta Color en Carrete',
    description: 'Cinta adhesiva de colores variados para embalaje y señalización.',
    material: 'Polipropileno adhesivo',
    references: [
      { name: '48mm x 50 metros', price: 2000, available: true },
      { name: '50mm x 50 metros', price: 2500, available: true }
    ],
    options: 'Rojo, Verde, Azul, Amarillo, Naranja, Rosa, Marrón, Blanco, Negro',
    colors: ['Rojo', 'Verde', 'Azul', 'Amarillo', 'Naranja', 'Rosa', 'Marrón', 'Blanco', 'Negro'],
    images: [
      { url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770074277/cinta_color_example.jpg', description: 'Cinta Color en Carrete' }
    ],
    category: 'Plaxtilineas',
    isNew: false,
    isFeatured: false
  },
  {
    id: 29,
    name: 'Empaques Personalizados',
    description: 'Empaques personalizados con logo e imagen de marca.',
    material: 'Polietileno y cartón',
    references: [
      { name: 'Cantidad mínima: 1000 unidades', price: 5000, available: true },
      { name: 'Cantidad mínima: 5000 unidades', price: 3500, available: true }
    ],
    options: 'Diseño personalizado',
    colors: ['Multicolor'],
    images: [
      { url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770074277/empaques_personalizados_example.jpg', description: 'Empaques Personalizados' }
    ],
    category: 'Plaxtilineas',
    isNew: true,
    isFeatured: false
  }
];

const seedProducts = async () => {
  const connection = await getConnection();
  
  try {
    console.log('\n🌱 Iniciando inserción de datos...\n');
    
    let insertedCount = 0;
    
    for (const product of PLAXTILINEAS_PRODUCTS) {
      console.log(`➕ Insertando: ${product.name}`);
      
      await connection.beginTransaction();
      
      // Insertar producto
      const [productResult] = await connection.query(
        `INSERT INTO products (name, description, material, category, options, isNew, isFeatured, marca, gramaje, brandIconUrl)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [product.name, product.description, product.material, product.category, product.options, product.isNew, product.isFeatured, product.marca, product.gramaje, product.brandIconUrl]
      );
      
      const productId = productResult.insertId;
      
      // Insertar imágenes
      if (product.images && product.images.length > 0) {
        for (const image of product.images) {
          await connection.query(
            'INSERT INTO product_images (product_id, url, description) VALUES (?, ?, ?)',
            [productId, image.url, image.description]
          );
        }
      }
      
      // Insertar colores
      if (product.colors && product.colors.length > 0) {
        for (const color of product.colors) {
          await connection.query(
            'INSERT INTO product_colors (product_id, color) VALUES (?, ?)',
            [productId, color]
          );
        }
      }
      
      // Insertar variantes/referencias
      if (product.references && product.references.length > 0) {
        for (const variant of product.references) {
          await connection.query(
            'INSERT INTO product_variants (product_id, name, available, price) VALUES (?, ?, ?, ?)',
            [productId, variant.name, variant.available ?? true, variant.price || null]
          );
        }
      }
      
      await connection.commit();
      insertedCount++;
      console.log(`   ✅ ${product.name} insertado correctamente\n`);
    }
    
    connection.release();
    
    console.log('=' * 60);
    console.log(`✅ INSERCIÓN COMPLETADA: ${insertedCount} productos insertados`);
    console.log('=' * 60 + '\n');
    
    process.exit(0);
    
  } catch (error) {
    await connection.rollback();
    connection.release();
    
    console.error('❌ Error inserting products:', error.message);
    console.error('\n💡 Solución:', error.code === 'ER_NO_REFERENCED_TABLE' 
      ? 'Las tablas no existen. Ejecuta primero: node scripts/create-tables.js'
      : 'Revisa la conexión a la BD o los datos');
    
    process.exit(1);
  }
};

seedProducts();
