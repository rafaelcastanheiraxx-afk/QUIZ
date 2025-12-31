
import { GoogleGenAI, Type } from "@google/genai";
import { Question } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateQuiz = async (topic: string): Promise<Question[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Gere um quiz de 5 perguntas de múltipla escolha sobre "${topic}". As perguntas devem variar em dificuldade. Todo o conteúdo (perguntas, opções e explicações) deve estar em Português do Brasil.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              text: {
                type: Type.STRING,
                description: 'O texto da pergunta do quiz.',
              },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Quatro opções de múltipla escolha.',
              },
              correctAnswerIndex: {
                type: Type.INTEGER,
                description: 'O índice (base 0) da opção correta.',
              },
              explanation: {
                type: Type.STRING,
                description: 'Uma breve explicação do porquê a resposta está correta.',
              },
            },
            required: ["text", "options", "correctAnswerIndex", "explanation"],
          },
        },
      },
    });

    const quizData = JSON.parse(response.text || '[]');
    return quizData.map((q: any, index: number) => ({
      ...q,
      id: `q-${index}`
    }));
  } catch (error) {
    console.error("Erro ao gerar quiz:", error);
    throw error;
  }
};
