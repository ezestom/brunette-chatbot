import { NextResponse } from "next/server";

export async function GET() {
	try {
		console.log("=== TEST ENDPOINT - Listando modelos disponibles ===");
		console.log("API Key presente:", !!process.env.GEMINI_API_KEY);
		console.log(
			"API Key primeros 10 chars:",
			process.env.GEMINI_API_KEY?.substring(0, 10)
		);

		// Primero, intentar listar los modelos disponibles
		const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`;

		console.log("Listando modelos disponibles...");
		const listResponse = await fetch(listUrl);
		const listText = await listResponse.text();
		console.log("List response status:", listResponse.status);
		console.log("List response:", listText.substring(0, 1000));

		if (listResponse.ok) {
			const listData = JSON.parse(listText);
			const availableModels = listData.models?.map((m: any) => ({
				name: m.name,
				displayName: m.displayName,
				supportedMethods: m.supportedGenerationMethods,
			}));

			return NextResponse.json({
				success: true,
				availableModels,
				totalModels: availableModels?.length || 0,
			});
		}

		// Probar diferentes versiones de API y modelos
		const modelsToTry = [
			{ version: "v1beta", model: "gemini-pro" },
			{ version: "v1beta", model: "gemini-1.5-flash" },
			{ version: "v1beta", model: "gemini-1.5-pro" },
			{ version: "v1", model: "gemini-pro" },
			{ version: "v1", model: "gemini-1.5-flash" },
			{ version: "v1", model: "gemini-1.5-pro" },
		];

		const results = [];

		for (const { version, model } of modelsToTry) {
			try {
				const apiUrl = `https://generativelanguage.googleapis.com/${version}/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`;

				const response = await fetch(apiUrl, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						contents: [
							{
								role: "user",
								parts: [{ text: "Di solo 'OK'" }],
							},
						],
					}),
				});

				const text = await response.text();

				results.push({
					version,
					model,
					status: response.status,
					success: response.ok,
					response: response.ok
						? JSON.parse(text).candidates?.[0]?.content?.parts?.[0]
								?.text
						: text.substring(0, 200),
				});

				// Si encontramos uno que funciona, paramos
				if (response.ok) {
					console.log(`✅ ENCONTRADO: ${version}/${model} funciona!`);
					break;
				}
			} catch (error) {
				results.push({
					version,
					model,
					error:
						error instanceof Error
							? error.message
							: "Error desconocido",
				});
			}
		}

		return NextResponse.json({
			results,
			recommendation: results.find((r) => r.success) || null,
		});
	} catch (error) {
		console.error("Error en test:", error);
		return NextResponse.json({
			success: false,
			error: error instanceof Error ? error.message : "Error desconocido",
		});
	}
}
