# 🧁 Widget de Chatbot para Integración en Sitio Web

## 📱 Características del Widget

-   ✅ **Botón flotante** con emoji de cupcake 🧁
-   ✅ **Animaciones suaves** al abrir/cerrar
-   ✅ **Tamaño optimizado**: 450x700px
-   ✅ **Posición fija**: Esquina inferior derecha
-   ✅ **Cerrado por defecto**: No molesta al usuario
-   ✅ **Totalmente funcional**: Voz, imágenes, chat en tiempo real

## 🎨 Cómo funciona

1. El usuario ve un **botón flotante** con el emoji 🧁 en la esquina inferior derecha
2. Al hacer clic, se **abre el chat** con una animación suave
3. Puede chatear, usar voz y ver productos
4. Hace clic en la **X** para cerrar el widget

## 🚀 Despliegue en Producción

### Paso 1: Preparar el proyecto

```bash
# Asegúrate de que todo funciona localmente
npm run dev
```

### Paso 2: Subir a GitHub

```bash
git add .
git commit -m "Widget de chatbot listo para producción"
git push origin main
```

### Paso 3: Desplegar en Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Inicia sesión con GitHub
3. Haz clic en "Add New Project"
4. Importa tu repositorio `brunette-chatbot`
5. En "Environment Variables" agrega:
    - **Key**: `GEMINI_API_KEY`
    - **Value**: Tu API key de Gemini
6. Haz clic en "Deploy"
7. Espera 1-2 minutos
8. ¡Listo! Copia tu URL (ejemplo: `https://brunette-chatbot.vercel.app`)

## 🌐 Integración en tu Sitio Web

### Método 1: Iframe Simple (Recomendado)

Pega este código **antes del `</body>`** de tu sitio web:

```html
<!-- Chatbot Brunette -->
<iframe
	src="https://TU-URL-DE-VERCEL.vercel.app"
	style="position: fixed; bottom: 0; right: 0; width: 100%; height: 100%; border: none; pointer-events: none; z-index: 9999;"
	allow="microphone"></iframe>

<style>
	/* Permitir interacción solo con el widget */
	iframe {
		pointer-events: none;
	}
	iframe * {
		pointer-events: auto;
	}
</style>
```

**Reemplaza** `TU-URL-DE-VERCEL.vercel.app` con tu URL real.

### Método 2: Script JavaScript

```html
<script>
	(function () {
		const chatbotIframe = document.createElement("iframe");
		chatbotIframe.src = "https://TU-URL-DE-VERCEL.vercel.app";
		chatbotIframe.style.cssText = `
        position: fixed;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
        border: none;
        pointer-events: none;
        z-index: 9999;
    `;
		chatbotIframe.allow = "microphone";

		// Agregar al cargar la página
		if (document.readyState === "loading") {
			document.addEventListener("DOMContentLoaded", () => {
				document.body.appendChild(chatbotIframe);
			});
		} else {
			document.body.appendChild(chatbotIframe);
		}
	})();
</script>
```

## 🧪 Probar Localmente

Abre el archivo `ejemplo-integracion.html` en tu navegador para ver cómo se ve el widget integrado en una página web.

```bash
# En tu navegador, abre:
file:///ruta/a/brunette-chatbot/ejemplo-integracion.html
```

## 🎯 Personalización Adicional

### Cambiar posición del widget

Modifica estas propiedades en `src/app/page.tsx`:

```tsx
// Cambiar a esquina inferior izquierda
bottom: 6, left: 6  // en lugar de right: 6

// Cambiar a esquina superior derecha
top: 6, right: 6    // en lugar de bottom: 6
```

### Cambiar tamaño del widget

En el mismo archivo, busca:

```tsx
width: '450px',
height: '700px',
```

Y modifica según prefieras.

### Cambiar el ícono del botón

Busca el emoji 🧁 y reemplázalo:

```tsx
<span className="text-3xl">💬</span>  // Ícono de chat
<span className="text-3xl">🍰</span>  // Pastel
<span className="text-3xl">☕</span>  // Café
```

### Cambiar colores

En el gradiente del botón y header:

```tsx
background: "linear-gradient(135deg, #8e24aa 0%, #d81b60 100%)";
```

Reemplaza `#8e24aa` y `#d81b60` con tus colores de marca.

## 📱 Compatibilidad

-   ✅ Chrome/Edge (completo con voz)
-   ✅ Firefox (sin reconocimiento de voz)
-   ✅ Safari (sin reconocimiento de voz)
-   ✅ Móviles (táctil optimizado)

## 🔒 Seguridad

-   El iframe **no puede** acceder al contenido de tu página
-   Tu página **no puede** acceder al contenido del iframe
-   La API key está en el servidor, no expuesta al cliente
-   CORS configurado automáticamente por Next.js

## 💡 Consejos

1. **Prueba primero localmente** con `ejemplo-integracion.html`
2. **Despliega en Vercel** (gratis y rápido)
3. **Agrega la URL** a tu sitio web
4. **Prueba en diferentes navegadores** y dispositivos
5. **Monitorea** el uso en la consola de Vercel

## 🐛 Solución de Problemas

### El widget no aparece

-   Verifica que la URL del iframe sea correcta
-   Abre la consola del navegador (F12) y busca errores
-   Asegúrate de que el servidor esté corriendo

### El micrófono no funciona

-   El sitio debe estar en HTTPS (o localhost)
-   El usuario debe dar permisos al micrófono
-   Solo funciona en Chrome/Edge

### El widget se ve cortado en móvil

-   El widget es responsivo automáticamente
-   En pantallas pequeñas ocupa más espacio
-   Se puede ajustar el tamaño en el código

## 📞 Soporte

Si tienes problemas, verifica:

1. Los logs en la consola de Vercel
2. Los errores en la consola del navegador
3. Que la API key esté configurada correctamente

## 🎉 ¡Listo!

Ahora tu chatbot está listo para recibir clientes en tu sitio web. Los usuarios pueden:

-   💬 Chatear sobre productos
-   🎤 Usar voz para preguntar
-   🖼️ Ver imágenes de productos
-   📱 Cerrar y abrir cuando quieran

¡Disfruta de tu nuevo asistente virtual! 🧁
