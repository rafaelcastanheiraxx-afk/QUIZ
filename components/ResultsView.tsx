
import React from 'react';
import { QuizSession } from '../types';

interface ResultsViewProps {
  session: QuizSession;
  onRestart: () => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({ session, onRestart }) => {
  const percentage = (session.score / session.questions.length) * 100;
  
  let grade = "Novato";
  let gradeColor = "text-zinc-400";
  let gradeIcon = "🚀";

  if (percentage === 100) {
    grade = "Mestre Absoluto";
    gradeColor = "text-blue-500";
    gradeIcon = "👑";
  } else if (percentage >= 80) {
    grade = "Especialista";
    gradeColor = "text-green-500";
    gradeIcon = "🔥";
  } else if (percentage >= 60) {
    grade = "Adepto";
    gradeColor = "text-yellow-500";
    gradeIcon = "⭐";
  }

  return (
    <div className="animate-in zoom-in-95 fade-in duration-500">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 shadow-2xl text-center relative overflow-hidden">
        {/* Diagonal background ribbons */}
        <div className="absolute -top-10 -right-10 w-40 h-10 bg-red-600 rotate-45 opacity-20"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-10 bg-blue-600 rotate-45 opacity-20"></div>

        <div className="mb-6">
          <span className="text-6xl">{gradeIcon}</span>
        </div>

        <h2 className="text-5xl font-black mb-2 uppercase tracking-tighter">
          Pontuação Final
        </h2>
        
        <div className="relative inline-block my-10">
          <svg className="w-48 h-48 transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="80"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              className="text-zinc-800"
            />
            <circle
              cx="96"
              cy="96"
              r="80"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 80}
              strokeDashoffset={2 * Math.PI * 80 * (1 - percentage / 100)}
              className={`${percentage > 50 ? 'text-blue-600' : 'text-red-600'} transition-all duration-1000 ease-out`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
             <span className="text-5xl font-black">{session.score}</span>
             <span className="text-zinc-500 font-bold uppercase text-xs tracking-widest">de {session.questions.length}</span>
          </div>
        </div>

        <div className="mb-10">
          <p className="text-zinc-400 font-medium mb-1 uppercase tracking-widest text-sm">Classificação</p>
          <p className={`text-4xl font-black italic uppercase ${gradeColor}`}>{grade}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="bg-black/40 p-6 rounded-2xl border border-white/5 text-left">
            <p className="text-zinc-500 text-xs font-bold uppercase mb-1">Tema</p>
            <p className="text-white font-bold truncate">{session.topic}</p>
          </div>
          <div className="bg-black/40 p-6 rounded-2xl border border-white/5 text-left">
            <p className="text-zinc-500 text-xs font-bold uppercase mb-1">Precisão</p>
            <p className="text-white font-bold">{Math.round(percentage)}%</p>
          </div>
        </div>

        <button 
          onClick={onRestart}
          className="w-full py-5 bg-gradient-to-r from-red-600 to-blue-600 text-white font-black text-xl rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-tighter"
        >
          Tentar Outro Tema
        </button>
      </div>

      <p className="text-center mt-8 text-zinc-500 text-sm">
        Gerado dinamicamente via <span className="text-white font-bold">Gemini 3 Flash</span>
      </p>
    </div>
  );
};

export default ResultsView;
