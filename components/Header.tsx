
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex items-center space-x-2 py-6">
      <div className="flex space-x-1">
        <div className="w-4 h-8 bg-red-600 rounded-sm skew-x-[-12deg]"></div>
        <div className="w-4 h-8 bg-blue-600 rounded-sm skew-x-[-12deg]"></div>
      </div>
      <h1 className="text-3xl font-black tracking-tighter uppercase italic">
        <span className="text-red-600">Quiz</span>
        <span className="text-blue-600">Dinâmico</span>
      </h1>
    </header>
  );
};

export default Header;
