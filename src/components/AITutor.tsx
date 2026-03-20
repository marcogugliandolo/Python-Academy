import { useState } from 'react';
import { Bot, Loader2, Sparkles } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { motion, AnimatePresence } from 'motion/react';

interface AITutorProps {
  code: string;
  instruction: string;
}

export default function AITutor({ code, instruction }: AITutorProps) {
  const [hint, setHint] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const askTutor = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const prompt = `
        Eres un tutor de Python muy amigable y motivador para principiantes.
        El estudiante está intentando resolver este nivel: "${instruction}"
        Su código actual es:
        \`\`\`python
        ${code}
        \`\`\`
        
        Dale una pista corta (máximo 2 oraciones) sobre qué está haciendo mal o qué le falta. 
        NO le des la respuesta exacta, guíalo. Usa un tono de videojuego o ciencia ficción si puedes.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: prompt,
      });

      setHint(response.text || "Sigue intentándolo, ¡tú puedes!");
    } catch (error) {
      console.error(error);
      setHint("Parece que mi conexión neuronal falló. Revisa tu código e intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-zinc-300 font-medium">
          <div className="p-1.5 bg-indigo-500/20 rounded-lg">
            <Bot size={18} className="text-indigo-400" />
          </div>
          <span className="text-sm">Tutor IA</span>
        </div>
        <button
          onClick={askTutor}
          disabled={loading}
          className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/5 text-zinc-300 rounded-lg text-xs font-medium transition-all disabled:opacity-50 active:scale-95"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} className="text-indigo-400" />}
          <span>Pedir Pista</span>
        </button>
      </div>

      <AnimatePresence>
        {hint && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="text-sm text-zinc-300 bg-black/20 rounded-xl border border-white/5 leading-relaxed overflow-hidden"
          >
            <div className="p-4">
              {hint}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
