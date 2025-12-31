
import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-20 animate-pulse">
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 border-4 border-red-600/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">Gerando seu quiz...</h2>
      <p className="text-zinc-500 text-center">Consultando a IA para as melhores perguntas sobre o seu tema.</p>
    </div>
  );
};

export default LoadingScreen;
