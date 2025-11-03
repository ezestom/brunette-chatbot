# Chatbot Brunette 🤖

Chatbot con IA potenciado por **Gemini 2.5 Flash** de Google, con interfaz inspirada en Google Gemini y reconocimiento de voz.

## 🚀 Características

- ✅ Conversaciones con Gemini 2.5 Flash
- 🎨 Interfaz idéntica a Google Gemini
- 🎤 **Entrada por voz** (Web Speech API)
- 🌓 Soporte para modo claro/oscuro
- ⚡ Next.js 15 + React 19 + TypeScript

## 🎤 Uso del Reconocimiento de Voz

### Requisitos:
1. **Navegador compatible**: Chrome o Edge (navegadores basados en Chromium)
2. **Conexión a internet**: La Web Speech API de Google requiere internet
3. **Permisos de micrófono**: Debes permitir el acceso al micrófono cuando el navegador lo solicite

### Cómo usar:
1. Haz clic en el ícono del **micrófono** 🎤 (junto al botón de enviar)
2. El botón se pondrá **rojo** cuando esté grabando
3. **Habla claramente** tu mensaje
4. La transcripción aparecerá automáticamente en el campo de texto
5. Puedes editar el texto antes de enviarlo
6. Presiona Enter o haz clic en el botón de enviar

### Solución de problemas:

**Error "network":**
- Verifica tu conexión a internet
- El servicio de Google puede estar temporalmente no disponible
- Intenta recargar la página

**No detecta voz:**
- Habla más cerca del micrófono
- Verifica que tu micrófono esté conectado y funcionando
- Comprueba que hayas dado permisos al navegador

**No funciona el botón:**
- Usa Chrome o Edge (Firefox y Safari no soportan bien esta API)
- Verifica que estés usando HTTPS o localhost (la API no funciona en HTTP)

## 📦 Instalación

## 📋 Requisitos Previos

-   Node.js 18+ instalado
-   Una API key de Google Gemini
-   npm o yarn

## 🔧 Configuración

### 1. Clonar e instalar dependencias

```bash
npm install
```

### 2. Configurar la API key de Gemini

1. Ve a [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Crea una nueva API key
3. Copia el archivo `.env.example` a `.env.local`:
    ```bash
    cp .env.example .env.local
    ```
4. Abre `.env.local` y reemplaza `tu-api-key-aqui` con tu API key real:
    ```env
    GEMINI_API_KEY=tu-api-key-real-aqui
    GEMINI_MODEL=gemini-pro
    ```

### 3. Ejecutar el proyecto

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🏗️ Estructura del Proyecto

```
chatbot-brunette/
├── src/
│   └── app/
│       ├── api/
│       │   └── chat/
│       │       └── route.ts      # API endpoint para Gemini
│       ├── page.tsx               # Componente principal del chat
│       ├── layout.tsx             # Layout de la app
│       └── globals.css            # Estilos globales
├── .env.local                     # Variables de entorno (no committed)
├── .env.example                   # Ejemplo de variables de entorno
└── package.json                   # Dependencias del proyecto
```

## 🛠️ Tecnologías Utilizadas

-   **Next.js 15** - Framework de React
-   **TypeScript** - Tipado estático
-   **Tailwind CSS** - Estilos
-   **Google Generative AI** - SDK de Gemini
-   **React 19** - Biblioteca UI

## 📝 Uso

1. Escribe tu mensaje en el campo de texto
2. Presiona Enter o haz clic en el botón de enviar
3. Espera la respuesta del asistente
4. ¡Continúa la conversación!

## ⚠️ Solución de Problemas

### Error: "GEMINI_API_KEY no está configurada"

-   Verifica que el archivo `.env.local` existe
-   Asegúrate de que la API key esté correctamente copiada
-   Reinicia el servidor de desarrollo después de cambiar el `.env.local`

### El chat no responde

-   Verifica tu conexión a internet
-   Comprueba que la API key sea válida
-   Revisa la consola del navegador para errores

## 🚀 Deploy en Vercel

1. Sube tu código a GitHub
2. Importa el proyecto en [Vercel](https://vercel.com)
3. Agrega la variable de entorno `GEMINI_API_KEY` en la configuración del proyecto
4. ¡Despliega!

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request para sugerencias.

---

**ID del Proyecto Google Cloud:** gen-lang-client-0664075822
# brunette-chatbot
