// Contexto e información de Brunette - Mostrador de Antojos

export const BRUNETTE_CONTEXT = `
Eres el asistente virtual de "Brunette - Mostrador de Antojos", una encantadora pastelería artesanal.

INFORMACIÓN DEL NEGOCIO:
- Nombre: Brunette - Mostrador de Antojos
- Instagram: @brunette.mostradordeantojos
- Especialidad: Repostería artesanal y productos dulces de alta calidad

TU ROL:
- Eres amable, cálido y profesional
- Brindas información sobre productos, precios y horarios
- Ayudas a los clientes a elegir productos
- Puedes mostrar imágenes de productos cuando te las pidan
- Respondes SOLO sobre temas relacionados con la pastelería
- Si te preguntan algo no relacionado, educadamente redirige la conversación a los productos
- Siempre que el cliente tiene dudas relacionado a los productos sugieres visitar el Instagram para ver fotos de los productos
- Siempre mantienes un tono amigable y profesional
- Eres proactivo en ayudar a los clientes a encontrar lo que buscan


PRODUCTOS DISPONIBLES:
1. TORTAS Y TARTAS
   - Torta de Chocolate (chica $8000, mediana $12000, grande $18000)
   - Torta Red Velvet (chica $9000, mediana $13000, grande $19000)
   - Cheesecake de Frutos Rojos (porción $3500, entera $15000)
   - Lemon Pie ($12000)
   - Brownie individual ($2500)

2. PASTELERÍA FINA
   - Macarons (6 unidades $5000, 12 unidades $9000)
   - Cookies de Chocolate Chips ($1500 c/u)
   - Alfajores de Maicena ($1800 c/u)
   - Chocotorta individual ($3000)

3. PRODUCTOS SALADOS
   - Scones de queso ($2000 c/u)
   - Mini sandwiches ($4500 la docena)

4. BEBIDAS
   - Café expreso ($1500)
   - Café con leche ($2000)
   - Té ($1800)
   - Chocolate caliente ($2500)

HORARIOS:
- Lunes a Viernes: 9:00 AM - 8:00 PM
- Sábados: 10:00 AM - 9:00 PM
- Domingos: 10:00 AM - 6:00 PM

PEDIDOS:
- Aceptamos pedidos por Instagram (@brunette.mostradordeantojos)
- Pedidos con 48hs de anticipación para tortas grandes
- Delivery disponible (consultar zona)
- Retiro en local

INSTRUCCIONES IMPORTANTES:
- Cuando un cliente pregunte "qué tienen", "qué productos", "quiero ver productos" o similar, DEBES mencionar que puedes mostrarle imágenes
- Si preguntan específicamente por un producto (ej: "tortas", "macarons", "cookies"), sugiere mostrar las fotos
- Para mostrar imágenes, usa el formato: [IMAGEN:categoria] donde categoria puede ser:
  * [IMAGEN:tortas] - muestra tortas y tartas
  * [IMAGEN:pasteleria] - muestra macarons, cookies, alfajores
  * [IMAGEN:brownies] - muestra brownies y chocotorta
  * [IMAGEN:salados] - muestra scones y sandwiches
  * [IMAGEN:todo] - muestra una selección variada
- Siempre sé entusiasta al describir los productos
- Precios pueden variar, siempre sugiere confirmar por Instagram para pedidos específicos
`;

export interface Product {
	id: string;
	name: string;
	category: "tortas" | "pasteleria" | "brownies" | "salados";
	description: string;
	price: string;
	image: string;
}

// Base de datos de productos con imágenes de ejemplo
// IMPORTANTE: Reemplaza estas URLs con las imágenes reales de tus productos
export const PRODUCTS: Product[] = [
	// TORTAS
	{
		id: "torta-chocolate",
		name: "Torta de Chocolate",
		category: "tortas",
		description:
			"Deliciosa torta de chocolate húmeda con cobertura de ganache",
		price: "Desde $8000",
		image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=500&fit=crop",
	},
	{
		id: "red-velvet",
		name: "Torta Red Velvet",
		category: "tortas",
		description: "Suave torta red velvet con frosting de queso crema",
		price: "Desde $9000",
		image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=500&h=500&fit=crop",
	},
	{
		id: "cheesecake",
		name: "Cheesecake de Frutos Rojos",
		category: "tortas",
		description: "Cremoso cheesecake con salsa de frutos rojos",
		price: "Porción $3500 / Entera $15000",
		image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=500&h=500&fit=crop",
	},
	{
		id: "lemon-pie",
		name: "Lemon Pie",
		category: "tortas",
		description: "Tarta de limón con merengue italiano",
		price: "$12000",
		image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&h=500&fit=crop",
	},

	// PASTELERÍA FINA
	{
		id: "macarons",
		name: "Macarons Variados",
		category: "pasteleria",
		description: "Macarons franceses en diferentes sabores",
		price: "6 un. $5000 / 12 un. $9000",
		image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=500&h=500&fit=crop",
	},
	{
		id: "cookies",
		name: "Cookies de Chocolate Chips",
		category: "pasteleria",
		description: "Cookies caseras con chips de chocolate",
		price: "$1500 c/u",
		image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&h=500&fit=crop",
	},
	{
		id: "alfajores",
		name: "Alfajores de Maicena",
		category: "pasteleria",
		description: "Alfajores tradicionales de maicena con dulce de leche",
		price: "$1800 c/u",
		image: "https://images.unsplash.com/photo-1626094309830-abbb0c99da4a?w=500&h=500&fit=crop",
	},

	// BROWNIES
	{
		id: "brownie",
		name: "Brownie Individual",
		category: "brownies",
		description: "Brownie de chocolate intenso, húmedo y con nueces",
		price: "$2500",
		image: "https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=500&h=500&fit=crop",
	},
	{
		id: "chocotorta",
		name: "Chocotorta Individual",
		category: "brownies",
		description: "Clásica chocotorta argentina",
		price: "$3000",
		image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=500&h=500&fit=crop",
	},

	// SALADOS
	{
		id: "scones",
		name: "Scones de Queso",
		category: "salados",
		description: "Scones recién horneados de queso",
		price: "$2000 c/u",
		image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=500&h=500&fit=crop",
	},
	{
		id: "sandwiches",
		name: "Mini Sandwiches",
		category: "salados",
		description: "Surtido de mini sandwiches variados",
		price: "$4500 la docena",
		image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=500&h=500&fit=crop",
	},
];

// Función para obtener productos por categoría
export function getProductsByCategory(category: string): Product[] {
	if (category === "todo") {
		return PRODUCTS;
	}
	return PRODUCTS.filter((p) => p.category === category);
}
