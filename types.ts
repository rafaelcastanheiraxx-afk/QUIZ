
export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface QuizSession {
  topic: string;
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  answers: number[];
}

export type AppState = 'START' | 'LOADING' | 'QUIZ' | 'RESULTS' | 'ERROR';
