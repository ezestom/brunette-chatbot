# 🎨 Guía de Personalización - Chatbot Brunette

## 📝 Cómo personalizar el contenido del chatbot

### 1. Editar información del negocio

Abre el archivo `src/data/brunette-context.ts` y modifica:

#### Información básica:
```typescript
- Nombre: Brunette - Mostrador de Antojos
- Instagram: @brunette.mostradordeantojos
- Especialidad: Pastelería artesanal y productos dulces y salados
- Ubicación: Ciudad Autónoma de Buenos Aires, Argentina
```

#### Horarios:
```typescript
HORARIOS:
- Lunes a Viernes: 9:00 AM - 8:00 PM
- Sábados: 10:00 AM - 9:00 PM
- Domingos: 10:00 AM - 6:00 PM
```

### 2. Agregar o modificar productos

En el mismo archivo `src/data/brunette-context.ts`:

#### Actualizar precios y productos en el contexto:
```typescript
PRODUCTOS DISPONIBLES:
1. TORTAS Y TARTAS
   - Torta de Chocolate (chica $8000, mediana $12000, grande $18000)
   // Agrega o modifica aquí
```

#### Agregar productos con imágenes:
```typescript
export const PRODUCTS: Product[] = [
  {
    id: 'mi-nuevo-producto',           // ID único
    name: 'Nombre del Producto',       // Nombre que se mostrará
    category: 'tortas',                 // 'tortas' | 'pasteleria' | 'brownies' | 'salados'
    description: 'Descripción breve',   // Descripción del producto
    price: '$12000',                    // Precio
    image: 'https://...'                // URL de la imagen
  },
  // ... más productos
];
```

### 3. Reemplazar imágenes de ejemplo

Las imágenes actuales son de **Unsplash** (solo para demo). Para usar tus propias imágenes:

#### Opción 1: Subir a Instagram y extraer URLs
1. Sube las fotos de tus productos a Instagram
2. Abre la foto en el navegador
3. Click derecho > "Inspeccionar elemento"
4. Busca la etiqueta `<img>` y copia la URL del atributo `src`
5. Pégala en el campo `image` del producto

#### Opción 2: Usar un servicio de hosting de imágenes
- **Cloudinary** (gratis hasta cierto límite)
- **ImgBB** (gratis)
- **Imgur** (gratis)

Sube tus imágenes y copia las URLs.

#### Opción 3: Carpeta pública de Next.js
1. Crea la carpeta `public/productos/` si no existe
2. Coloca tus imágenes ahí (ej: `public/productos/torta-chocolate.jpg`)
3. Usa la ruta: `image: '/productos/torta-chocolate.jpg'`

**IMPORTANTE:** Si usas dominios externos diferentes a Unsplash, agrega el dominio en `next.config.ts`:

```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'images.unsplash.com', // Ya existe
    },
    {
      protocol: 'https',
      hostname: 'tu-dominio.com', // Agrega aquí
    },
  ],
},
```

### 4. Categorías de imágenes

El chatbot puede mostrar productos por categoría cuando el cliente pregunta. Las categorías son:

- `tortas` - Muestra tortas y tartas
- `pasteleria` - Muestra macarons, cookies, alfajores
- `brownies` - Muestra brownies y chocotorta
- `salados` - Muestra scones y sandwiches
- `todo` - Muestra todos los productos

El IA automáticamente entiende cuándo mostrar cada categoría según la pregunta del usuario.

### 5. Personalizar el tono del asistente

En `src/data/brunette-context.ts`, modifica la sección `TU ROL`:

```typescript
TU ROL:
- Eres amable, cálido y profesional
- Brindas información sobre productos, precios y horarios
// Agrega más instrucciones aquí según tu preferencia
```

## 🖼️ Ejemplo de cómo agregar un nuevo producto

```typescript
{
  id: 'tiramisu',
  name: 'Tiramisú Casero',
  category: 'tortas',
  description: 'Auténtico tiramisú italiano con café y mascarpone',
  price: '$14000',
  image: '/productos/tiramisu.jpg'  // o URL externa
}
```

## 🎨 Cambiar colores y estilos

Los colores del tema están en `src/app/globals.css`. Busca las variables CSS y modifícalas:

```css
:root {
  --gemini-primary: #8e24aa; /* Color principal (morado de Brunette) */
  --gemini-bg: #f8f9fa;      /* Fondo claro */
  /* etc... */
}
```

## 🚀 Probar los cambios

1. Guarda todos los archivos
2. El servidor de desarrollo se recargará automáticamente
3. Prueba preguntando: "¿Qué productos tienen?" o "Muéstrame las tortas"

## 📸 Consejos para las fotos de productos

- Usa buena iluminación
- Fondo limpio y simple
- Resolución mínima: 800x800px
- Formato: JPG o PNG
- Peso: Menos de 500KB por imagen (optimiza si es necesario)

## ❓ Preguntas frecuentes

**P: ¿Puedo agregar videos en lugar de imágenes?**
R: Actualmente solo soporta imágenes, pero puedes modificar el código para agregar videos.

**P: ¿Cómo hago para que el chatbot no responda preguntas no relacionadas?**
R: Ya está configurado en el contexto. El asistente solo responde sobre la pastelería.

**P: ¿Puedo cambiar el límite de productos mostrados?**
R: Sí, puedes modificar el código en `src/app/page.tsx` en la sección de la galería.

## 🎯 Próximos pasos sugeridos

1. Reemplaza las imágenes de ejemplo con fotos reales de tus productos
2. Actualiza los precios reales
3. Agrega más productos según tu catálogo
4. Prueba diferentes preguntas para asegurarte que el chatbot responde correctamente
5. Comparte el link de Instagram real para que los clientes puedan hacer pedidos

¡Listo! Tu chatbot está personalizado y listo para ayudar a tus clientes. 🎉
