import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
		
		// Test model availability
		const model = genAI.getGenerativeModel({ model: "gemini-pro" });
		
		return NextResponse.json({
			success: true,
			models: [{
				name: "gemini-pro",
				displayName: "Gemini Pro",
				supportedGenerationMethods: ["generateContent"]
			}]
		});
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : "Error desconocido";
		return NextResponse.json(
			{ 
				error: "Error al listar modelos",
				details: errorMessage 
			},
			{ status: 500 }
		);
	}
}
