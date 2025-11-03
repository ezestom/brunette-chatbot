// Web Speech API types

interface SpeechRecognitionResultEvent extends Event {
	results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
	length: number;
	item(index: number): SpeechRecognitionResult;
	[index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
	isFinal: boolean;
	length: number;
	item(index: number): SpeechRecognitionAlternative;
	[index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
	transcript: string;
	confidence: number;
}

export type SpeechRecognitionEvent = SpeechRecognitionResultEvent;

interface SpeechRecognition extends EventTarget {
	start(): void;
	stop(): void;
	abort(): void;
	onstart?: () => void;
	onresult?: (event: SpeechRecognitionEvent) => void;
	onerror?: (event: { error: string }) => void;
	onend?: () => void;
	continuous: boolean;
	interimResults: boolean;
	lang: string;
	maxAlternatives: number;
}

declare global {
	interface Window {
		SpeechRecognition?: new () => SpeechRecognition;
		webkitSpeechRecognition?: new () => SpeechRecognition;
	}
}
