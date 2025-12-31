
import React, { useState } from 'react';

interface StartScreenProps {
  onStart: (topic: string) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [topic, setTopic] = useState('');

  const suggestions = [
    "Básico de JavaScript",
    "História do Brasil",
    "Cultura Pop dos Anos 80",
    "Exploração Espacial",
    "Culinária e Receitas"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onStart(topic.trim());
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl shadow-2xl">
        <h2 className="text-4xl font-extrabold text-white mb-2 leading-tight">
          Sobre o que você quer ser <span className="text-blue-500">testado</span>?
        </h2>
        <p className="text-zinc-400 mb-8">Digite qualquer assunto e nossa IA gerará um quiz personalizado para você instantaneamente.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="ex: Segunda Guerra Mundial, Arte Moderna, Python..."
              className="w-full bg-black border-2 border-zinc-700 focus:border-red-600 p-5 rounded-2xl text-xl outline-none transition-all placeholder:text-zinc-600"
              autoFocus
            />
            <div className="absolute right-3 top-3 bottom-3">
              <button 
                type="submit"
                disabled={!topic.trim()}
                className="h-full px-8 bg-red-600 hover:bg-red-500 disabled:bg-zinc-800 text-white font-bold rounded-xl transition-all uppercase tracking-widest disabled:cursor-not-allowed"
              >
                VAI!
              </button>
            </div>
          </div>
          
          <div className="space-y-3">
            <p className="text-xs uppercase font-bold text-zinc-500 tracking-widest">Ou tente uma sugestão:</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => onStart(s)}
                  className="px-4 py-2 bg-zinc-800 hover:bg-blue-600 text-zinc-300 hover:text-white rounded-lg transition-colors text-sm border border-zinc-700"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </form>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-4">
        <div className="bg-red-900/10 border border-red-500/20 p-4 rounded-xl">
            <h3 className="text-red-500 font-bold mb-1 uppercase text-xs tracking-tighter">IA Potencializada</h3>
            <p className="text-zinc-500 text-sm">Cada quiz é único e adaptado ao seu pedido.</p>
        </div>
        <div className="bg-blue-900/10 border border-blue-500/20 p-4 rounded-xl">
            <h3 className="text-blue-500 font-bold mb-1 uppercase text-xs tracking-tighter">Rápido e Dinâmico</h3>
            <p className="text-zinc-500 text-sm">Geração imediata de perguntas desafiadoras.</p>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
