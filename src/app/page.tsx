"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';


interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  image: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  images?: Product[];
}
type SpeechRecognitionType = {
  start: () => void;
  stop: () => void;
  onstart?: () => void;
  onresult?: (event: SpeechRecognitionType) => void;
  onerror?: (event: { error: string }) => void;
  onend?: () => void;
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
};


export default function Home() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognitionType | null>(null);
  const [voiceError, setVoiceError] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false); // Estado del widget (abierto/cerrado)
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Inicializar reconocimiento de voz
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const windowWithSpeech = window as Window & typeof globalThis & {
        SpeechRecognition?: new () => SpeechRecognitionType;
        webkitSpeechRecognition?: new () => SpeechRecognitionType;
      };

      const SpeechRecognition = windowWithSpeech.SpeechRecognition || windowWithSpeech.webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = false;
        recognitionInstance.interimResults = false;
        recognitionInstance.lang = 'es-ES';
        recognitionInstance.maxAlternatives = 1;

        recognitionInstance.onstart = () => {
          console.log('Reconocimiento de voz iniciado');
        };

        recognitionInstance.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setMessage(transcript);
          setVoiceError('');
        };

        recognitionInstance.onerror = (event: { error: string }) => {
          console.error('Error de reconocimiento:', event.error);
          setIsRecording(false);

          // Mostrar mensaje de error más específico
          if (event.error === 'network') {
            setVoiceError('Error de conexión. Verifica tu internet e intenta de nuevo.');
            // No mostrar alert, solo log
            console.warn('⚠️ Error de red al conectar con el servicio de reconocimiento de voz de Google.');
            console.warn('💡 Asegúrate de tener conexión a internet estable.');
          } else if (event.error === 'no-speech') {
            setVoiceError('No se detectó voz. Intenta de nuevo hablando más cerca del micrófono.');
          } else if (event.error === 'not-allowed') {
            setVoiceError('Debes permitir el acceso al micrófono.');
            alert('Por favor, permite el acceso al micrófono en tu navegador para usar esta función.');
          } else if (event.error === 'aborted') {
            setVoiceError('');
          } else {
            setVoiceError(`Error: ${event.error}`);
          }
        };

        recognitionInstance.onend = () => {
          console.log('Reconocimiento de voz finalizado');
          setIsRecording(false);
        };

        // setRecognition(recognitionInstance);
        
      }
    }
  }, []);

  // Cerrar el chatbot con la tecla ESC
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscKey);

    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Iniciar/detener grabación de audio
  const toggleRecording = () => {
    if (!recognition) {
      alert('Tu navegador no soporta reconocimiento de voz. Prueba con Chrome o Edge.');
      return;
    }

    if (isRecording) {
      try {
        recognition.stop();
      } catch (error) {
        console.error('Error al detener grabación:', error);
      }
      setIsRecording(false);
    } else {
      try {
        recognition.start();
        setIsRecording(true);
      } catch (error) {
        console.error('Error al iniciar grabación:', error);
        setIsRecording(false);
        alert('No se pudo iniciar el reconocimiento de voz. Asegúrate de que tu micrófono esté conectado y permitido.');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: message.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Error');

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message,
        images: data.images || undefined
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Error al procesar tu mensaje.' }]);
    } finally {
      setIsLoading(false);
      // Mantener el foco en el input después de enviar
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const GeminiIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4285f4" />
          <stop offset="50%" stopColor="#9b72cb" />
          <stop offset="100%" stopColor="#d96570" />
        </linearGradient>
      </defs>
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="url(#g)" />
    </svg>
  );

  return (
    <>
      {/* Botón flotante para abrir/cerrar el chat */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 z-50 hover:cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, #8e24aa 0%, #d81b60 100%)',
          transform: isOpen ? 'scale(0)' : 'scale(1)',
          opacity: isOpen ? 0 : 1,
          pointerEvents: isOpen ? 'none' : 'auto',
        }}
        title="Chat con Brunette"
      >
        <span className="text-2xl sm:text-3xl">🧁</span>
      </button>

      {/* Widget del chat con animación - Responsivo */}
      <div
        className="fixed transition-all duration-300 ease-out z-50 chatbot-widget"
        style={{
          transform: isOpen ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(20px)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
      >
        <div className="flex flex-col h-full overflow-hidden chatbot-container" style={{ background: 'var(--gemini-bg)' }}>
          <header
            className="border-b flex items-center justify-between px-4 py-3 sm:py-3"
            style={{
              background: 'linear-gradient(135deg, #8e24aa 0%, #d81b60 100%)',
              borderColor: 'transparent',
              minHeight: '56px'
            }}
          >
            <div className="flex items-center gap-1">
              <span className="text-xl">🧁</span>
              <h1 className="text-base sm:text-lg font-medium text-white">Brunette</h1>
              <p className="text-[10px] text-white opacity-85 text-nowrap">Powered by Google </p>
              <GeminiIcon />
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full hover:bg-white/25 hover:bg-opacity-20 flex items-center justify-center transition-colors flex-shrink-0"
              title="Cerrar chat"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </header>
          <main className="flex-1 overflow-y-auto">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full px-4">
                <div className="mb-3 sm:mb-4 text-5xl sm:text-6xl">🧁</div>
                <h2 className="text-xl sm:text-2xl font-normal mb-2 text-center" style={{ color: 'var(--gemini-text)' }}>¿En qué puedo ayudarte?</h2>
                <p className="text-sm text-center" style={{ color: 'var(--gemini-text-secondary)' }}>Te puedo ayudar a encontrar los mejores productos para ti.</p>
              </div>
            ) : (
              <div className="px-3 sm:px-4 py-4 sm:py-6">
                {messages.map((msg, index) => (
                  <div key={index} className="mb-5 sm:mb-6 flex gap-2 sm:gap-3">
                    <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center" style={{ background: msg.role === 'user' ? 'var(--gemini-user-bg)' : 'transparent' }}>
                      {msg.role === 'user' ? <span className="text-xs font-medium" style={{ color: 'var(--gemini-user-text)' }}>U</span> : <span className="text-base sm:text-lg">🧁</span>}
                    </div>
                    <div className="flex-1 pt-0.5 sm:pt-1 min-w-0">
                      <div className="text-xs font-medium mb-1" style={{ color: 'var(--gemini-text-secondary)' }}>{msg.role === 'user' ? 'Tú' : 'Brunette'}</div>
                      <p className="whitespace-pre-wrap leading-relaxed text-sm break-words" style={{ color: 'var(--gemini-text)' }}>{msg.content}</p>

                      {/* Mostrar galería de productos si existen */}
                      {msg.images && msg.images.length > 0 && (
                        <div className="mt-2 sm:mt-3 grid grid-cols-1 gap-2 sm:gap-3">
                          {msg.images.map((product) => (
                            <div
                              key={product.id}
                              className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                              style={{ borderColor: 'var(--gemini-border)', background: 'var(--gemini-surface)' }}
                            >
                              <div className="relative w-full h-28 sm:h-32">
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 640px) 100vw, 400px"
                                />
                              </div>
                              <div className="p-2.5 sm:p-3">
                                <h3 className="font-semibold text-sm mb-0.5 sm:mb-1" style={{ color: 'var(--gemini-text)' }}>
                                  {product.name}
                                </h3>
                                <p className="text-xs mb-1 line-clamp-2" style={{ color: 'var(--gemini-text-secondary)' }}>
                                  {product.description}
                                </p>
                                <p className="font-bold text-sm" style={{ color: '#8e24aa' }}>
                                  {product.price}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="mb-5 sm:mb-6 flex gap-2 sm:gap-3">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center"><span className="text-base sm:text-lg">🧁</span></div>
                    <div className="flex-1 pt-0.5 sm:pt-1">
                      <div className="text-xs font-medium mb-1" style={{ color: 'var(--gemini-text-secondary)' }}>Brunette</div>
                      <div className="flex gap-1">
                        {[0, 0.2, 0.4].map((delay, i) => (<div key={i} className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: `${delay}s` }}></div>))}
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </main>
          <footer className="border-t safe-area-bottom" style={{ background: 'var(--gemini-surface)', borderColor: 'var(--gemini-border)' }}>
            <div className="px-3 sm:px-4 py-2.5 sm:py-3">
              {/* Mostrar error de voz si existe */}
              {voiceError && (
                <div className="mb-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs" style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca' }}>
                  ⚠️ {voiceError}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="flex items-end gap-1.5 sm:gap-2 rounded-full sm:rounded-3xl border" style={{ borderColor: 'var(--gemini-border)', background: 'var(--gemini-bg)' }}>
                  <input
                    ref={inputRef}
                    type="text"
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      setVoiceError(''); // Limpiar error al escribir
                    }}
                    placeholder={isRecording ? 'Escuchando...' : 'Escribe tu mensaje...'}
                    disabled={isLoading || isRecording}
                    className="flex-1 bg-transparent outline-none px-3 sm:px-4 py-2 sm:py-2.5 text-sm min-w-0"
                    style={{ color: 'var(--gemini-text)' }}
                  />

                  {/* Botón de micrófono */}
                  {/* <button
                    type="button"
                    onClick={toggleRecording}
                    disabled={isLoading}
                    className="p-1.5 sm:p-2 rounded-full transition-all disabled:opacity-50 hover:bg-opacity-10 hover:bg-gray-500 flex-shrink-0"
                    style={{
                      background: isRecording ? '#ea4335' : 'transparent',
                    }}
                    title={isRecording ? 'Detener grabación' : 'Grabar audio'}
                  >
                    {isRecording ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="white" className="sm:w-5 sm:h-5">
                        <rect x="6" y="6" width="12" height="12" rx="2" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="sm:w-5 sm:h-5">
                        <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" fill="var(--gemini-text-secondary)" />
                        <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" fill="var(--gemini-text-secondary)" />
                      </svg>
                    )}
                  </button> */}

                  <button
                    type="submit"
                    disabled={isLoading || !message.trim()}
                    className="mr-1.5 sm:mr-2 p-1.5 sm:p-2 rounded-full transition-colors disabled:opacity-50 flex-shrink-0"
                    style={{ background: message.trim() && !isLoading ? '#8e24aa' : 'transparent' }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" className="sm:w-5 sm:h-5"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill={message.trim() && !isLoading ? '#fff' : 'var(--gemini-text-secondary)'} /></svg>
                  </button>
                </div>
              </form>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
