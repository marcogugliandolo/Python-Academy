import React, { useState, useEffect } from 'react';
import { Play, CheckCircle2, XCircle, Terminal as TerminalIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface CodeEditorProps {
  initialCode: string;
  onRun?: (code: string) => void;
  success?: boolean | null;
  feedbackMessage?: string;
  consoleOutput?: string;
  readOnly?: boolean;
  title?: string;
  lockedPrefix?: string;
}

export default function CodeEditor({ 
  initialCode, 
  onRun, 
  success, 
  feedbackMessage,
  consoleOutput,
  readOnly = false, 
  title = "main.py",
  lockedPrefix
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let newVal = e.target.value;
    if (lockedPrefix && !readOnly) {
      if (!newVal.startsWith(lockedPrefix)) {
        if (newVal.length < lockedPrefix.length) {
          newVal = lockedPrefix;
        } else {
          return;
        }
      }
    }
    setCode(newVal);
  };

  return (
    <div className={`flex flex-col bg-[#0d0d0d] rounded-2xl border border-white/10 overflow-hidden shadow-2xl ${readOnly ? 'h-auto' : 'h-full'}`}>
      {/* Header (Mac Style) */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/[0.02] border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
          <span className="ml-3 text-xs font-mono text-zinc-500">{title}</span>
        </div>
        {!readOnly && onRun && (
          <button
            onClick={() => onRun(code)}
            className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 rounded-lg font-bold text-sm transition-all active:scale-95"
          >
            <Play size={14} fill="currentColor" />
            <span>Ejecutar</span>
          </button>
        )}
      </div>

      {/* Editor Area */}
      <div className={`relative flex-1 ${readOnly ? '' : 'min-h-[150px]'}`}>
        {readOnly ? (
          <pre className="w-full p-4 lg:p-5 bg-transparent text-zinc-300 font-mono text-sm lg:text-base overflow-x-auto leading-relaxed opacity-80 m-0 whitespace-pre-wrap">
            <code>{code}</code>
          </pre>
        ) : (
          <textarea
            value={code}
            onChange={handleChange}
            className="w-full h-full p-4 lg:p-5 bg-transparent text-zinc-300 font-mono text-sm lg:text-base resize-none focus:outline-none leading-relaxed"
            spellCheck={false}
          />
        )}
      </div>

      {/* Console Output (if provided) */}
      {consoleOutput && (
        <div className="border-t border-white/5 bg-black/50 p-4">
          <div className="flex items-center gap-2 text-zinc-500 mb-2">
            <TerminalIcon size={14} />
            <span className="text-xs font-bold uppercase tracking-wider">Consola</span>
          </div>
          <pre className="font-mono text-sm text-zinc-300 whitespace-pre-wrap">{consoleOutput}</pre>
        </div>
      )}

      {/* Feedback Bar */}
      {success !== undefined && success !== null && !readOnly && (
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`px-4 py-3 flex items-start gap-3 border-t ${
            success 
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
              : 'bg-red-500/10 border-red-500/20 text-red-400'
          }`}
        >
          <div className="mt-0.5 shrink-0">
            {success ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
          </div>
          <span className="font-medium text-sm leading-relaxed">
            {feedbackMessage || (success ? '¡Código correcto! Excelente trabajo.' : 'Hay un error. Revisa tu código e intenta de nuevo.')}
          </span>
        </motion.div>
      )}
    </div>
  );
}
