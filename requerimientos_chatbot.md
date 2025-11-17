Feature: Chatbot de Consultas para Pastelería
Como dueño de la pastelería, quiero que un chatbot atienda las consultas recurrentes para reducir la carga operativa manual y capturar leads de forma eficiente.

Scenario: 1. El cliente solicita información sobre un evento

Criterio para validar la funcionalidad principal: filtrar y guiar consultas de eventos.

Dado que un cliente potencial está en la página web y abre la ventana del chatbot. Cuando escribe una pregunta relacionada con eventos, como: "¿Hacen catering para cumpleaños?". Entonces el chatbot debe responder afirmativamente con la información general de "Mesas Dulces" o "Boxes para Eventos". Y debe preguntar datos clave para continuar la conversación, como "¿Para cuántas personas sería?".

Scenario: 2. El cliente pregunta por información básica del local

Criterio para validar la automatización de preguntas frecuentes (FAQ).

Dado que un usuario ha abierto el chatbot. Cuando escribe una pregunta sobre el horario, como: "¿Están abiertos hoy?". Entonces el chatbot debe responder con el horario de atención del día actual. Y debe mostrar la dirección física del local.

Scenario: 3. El cliente consulta por un producto con restricción alimentaria

Criterio para validar la capacidad de responder a preguntas específicas sobre el producto.

Dado que un cliente está interactuando con el chatbot. Cuando pregunta por productos específicos, como: "¿Tienen opciones sin TACC?". Entonces el chatbot debe responder con el listado de productos aptos para celíacos disponibles o, en su defecto, informar que no cuentan con esa opción.

Scenario: 4. El chatbot no reconoce una pregunta y debe escalar a un humano

Criterio para validar el "camino de escape" y asegurar que no se pierdan ventas complejas.

Dado que un cliente está conversando con el chatbot. Cuando realiza una pregunta muy específica o ambigua que el chatbot no puede interpretar, como: "¿Me pueden hacer una torta con una foto de mi perro?". Entonces el chatbot debe responder con un mensaje como: "No estoy seguro de cómo responder a eso". Y debe ofrecer al cliente una vía de contacto directa con una persona (ej: "Puedes hablar con nuestro equipo por WhatsApp aquí [link] o dejarnos tu contacto").