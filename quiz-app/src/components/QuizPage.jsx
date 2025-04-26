import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { QuizContext } from '../context/QuizContext';
import ResultPage from './ResultPage';

const QuizPage = () => {
  const { questions, currentQuestion, setCurrentQuestion, score, setScore, options, setQuizFinished, quizFinished } = useContext(QuizContext);
  const [selected, setSelected] = useState('');
  const [timeLeft, setTimeLeft] = useState(options.timer);

  useEffect(() => {
    if (options.timer > 0) {
      if (timeLeft === 0) handleNext();
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, options.timer]);

  const handleAnswer = (answer) => {
    setSelected(answer);
    if (answer === questions[currentQuestion].corect) {
      setScore(prev => prev + 1);
    }
    setTimeout(handleNext, 500);
  };

  const handleNext = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(prev => prev + 1);
      setSelected('');
      setTimeLeft(options.timer);
    } else {
      setQuizFinished(true);
    }
  };

  if (quizFinished) {
    return <ResultPage />;
  }

  const question = questions[currentQuestion];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl flex flex-col gap-6 text-center">
        <h2 className="text-2xl font-bold">{question.intrebare}</h2>
        <p className="text-sm text-gray-600">
          Categorie: {question.categorie} | Dificultate: {question.dificultate}
        </p>
        {options.timer > 0 && (
          <p className="text-red-500 font-semibold">Timp rămas: {timeLeft}s</p>
        )}
        <div className="flex flex-col gap-3 mt-4">
          {question.optiuni.map(opt => (
            <button
              key={opt}
              onClick={() => handleAnswer(opt)}
              className={`w-full p-3 border-2 rounded-lg transition ${
                selected === opt ? 'bg-green-400 border-green-500' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
