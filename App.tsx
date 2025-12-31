
import React, { useState, useCallback } from 'react';
import { AppState, QuizSession, Question } from './types';
import { generateQuiz } from './geminiService';
import Header from './components/Header';
import StartScreen from './components/StartScreen';
import LoadingScreen from './components/LoadingScreen';
import QuizView from './components/QuizView';
import ResultsView from './components/ResultsView';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>('START');
  const [session, setSession] = useState<QuizSession | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleStartQuiz = async (topic: string) => {
    setState('LOADING');
    try {
      const questions = await generateQuiz(topic);
      setSession({
        topic,
        questions,
        currentQuestionIndex: 0,
        score: 0,
        answers: [],
      });
      setState('QUIZ');
    } catch (error) {
      setErrorMessage("Falha ao gerar o quiz. Por favor, verifique sua conexão com a internet e tente novamente.");
      setState('ERROR');
    }
  };

  const handleAnswerSelection = (answerIndex: number) => {
    if (!session) return;

    const isCorrect = answerIndex === session.questions[session.currentQuestionIndex].correctAnswerIndex;
    
    const updatedSession = {
      ...session,
      score: isCorrect ? session.score + 1 : session.score,
      answers: [...session.answers, answerIndex],
    };

    if (session.currentQuestionIndex < session.questions.length - 1) {
      setSession({
        ...updatedSession,
        currentQuestionIndex: session.currentQuestionIndex + 1,
      });
    } else {
      setSession(updatedSession);
      setState('RESULTS');
    }
  };

  const handleRestart = () => {
    setSession(null);
    setState('START');
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center p-4">
      <Header />
      <main className="w-full max-w-2xl mt-8">
        {state === 'START' && <StartScreen onStart={handleStartQuiz} />}
        {state === 'LOADING' && <LoadingScreen />}
        {state === 'QUIZ' && session && (
          <QuizView 
            question={session.questions[session.currentQuestionIndex]}
            currentIndex={session.currentQuestionIndex}
            totalQuestions={session.questions.length}
            onAnswer={handleAnswerSelection}
          />
        )}
        {state === 'RESULTS' && session && (
          <ResultsView session={session} onRestart={handleRestart} />
        )}
        {state === 'ERROR' && (
          <div className="bg-red-900/20 border border-red-500 p-8 rounded-2xl text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Erro</h2>
            <p className="text-gray-300 mb-6">{errorMessage}</p>
            <button 
              onClick={handleRestart}
              className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition-all"
            >
              Voltar ao Início
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
