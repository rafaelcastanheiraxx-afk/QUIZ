
import React, { useState, useEffect } from 'react';
import { Question } from '../types';

interface QuizViewProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  onAnswer: (index: number) => void;
}

const QuizView: React.FC<QuizViewProps> = ({ question, currentIndex, totalQuestions, onAnswer }) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [hasConfirmed, setHasConfirmed] = useState(false);

  // Reset local state when question changes
  useEffect(() => {
    setSelectedIdx(null);
    setHasConfirmed(false);
  }, [question]);

  const handleNext = () => {
    if (selectedIdx !== null) {
      onAnswer(selectedIdx);
    }
  };

  const progress = ((currentIndex) / totalQuestions) * 100;

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
           <span className="text-zinc-500 font-mono text-sm">PROGRESSO</span>
           <div className="w-48 h-2 bg-zinc-800 rounded-full overflow-hidden">
             <div 
               className="h-full bg-gradient-to-r from-red-600 to-blue-600 transition-all duration-500" 
               style={{ width: `${progress}%` }}
             ></div>
           </div>
        </div>
        <span className="text-white font-bold text-sm bg-zinc-800 px-3 py-1 rounded-lg">
          {currentIndex + 1} / {totalQuestions}
        </span>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 mb-6 shadow-2xl overflow-hidden relative">
        {/* Abstract Background Accents */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-600/10 blur-3xl -z-10"></div>

        <h3 className="text-2xl md:text-3xl font-bold mb-8 leading-tight">
          {question.text}
        </h3>

        <div className="space-y-3">
          {question.options.map((option, idx) => {
            let variantClass = "bg-zinc-800 border-zinc-700 text-zinc-300 hover:border-blue-500/50";
            
            if (selectedIdx === idx) {
               variantClass = "bg-blue-600/20 border-blue-500 text-blue-400";
            }

            if (hasConfirmed) {
              if (idx === question.correctAnswerIndex) {
                variantClass = "bg-green-600/20 border-green-500 text-green-400 ring-2 ring-green-500/50";
              } else if (selectedIdx === idx) {
                variantClass = "bg-red-600/20 border-red-500 text-red-400";
              } else {
                variantClass = "bg-zinc-900/50 border-zinc-800 text-zinc-600 opacity-50";
              }
            }

            return (
              <button
                key={idx}
                disabled={hasConfirmed}
                onClick={() => setSelectedIdx(idx)}
                className={`w-full text-left p-5 rounded-2xl border-2 font-medium transition-all transform active:scale-[0.98] ${variantClass}`}
              >
                <div className="flex items-center space-x-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-black/50 flex items-center justify-center font-bold text-sm border border-white/10 uppercase">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{option}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {hasConfirmed && (
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl mb-6 animate-in zoom-in-95 duration-200">
           <h4 className="font-bold text-sm text-zinc-500 mb-2 uppercase tracking-widest">Explicação</h4>
           <p className="text-zinc-300 italic">{question.explanation}</p>
        </div>
      )}

      <div className="flex justify-end">
        {!hasConfirmed ? (
          <button
            disabled={selectedIdx === null}
            onClick={() => setHasConfirmed(true)}
            className="px-10 py-4 bg-white text-black hover:bg-zinc-200 disabled:bg-zinc-800 disabled:text-zinc-600 font-black rounded-2xl transition-all uppercase tracking-tighter text-lg"
          >
            Confirmar Resposta
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-10 py-4 bg-blue-600 text-white hover:bg-blue-500 font-black rounded-2xl transition-all uppercase tracking-tighter text-lg flex items-center space-x-2"
          >
            <span>Próxima Pergunta</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizView;
