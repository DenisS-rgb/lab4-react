import React from 'react';
import { useContext, useState } from 'react';
import { QuizContext } from '../context/QuizContext';
import questionsData from '../assets/questions.json';

const StartPage = () => {
  const { setUsername, setQuestions, setOptions, setQuizStarted, setQuizFinished } = useContext(QuizContext);
  const [name, setName] = useState('');
  const [shuffle, setShuffle] = useState(false);
  const [timer, setTimer] = useState(0);

  const handleStart = () => {
    if (!name.trim()) {
      alert('Introdu un nume!');
      return;
    }
    setUsername(name);
    setOptions({ shuffle, timer });
    const loadedQuestions = shuffle ? [...questionsData].sort(() => Math.random() - 0.5) : questionsData;
    setQuestions(loadedQuestions);
    setQuizStarted(true);
    setQuizFinished(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-center">Începe Quiz-ul</h1>
        <input
          type="text"
          className="w-full p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Numele tău"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={shuffle}
            onChange={() => setShuffle(!shuffle)}
            className="w-5 h-5"
          />
          <label className="text-gray-700">Ordine aleatorie</label>
        </div>
        <input
          type="number"
          className="w-full p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Timp pe întrebare (secunde)"
          value={timer}
          onChange={(e) => setTimer(Number(e.target.value))}
        />
        <button
          onClick={handleStart}
          className="w-full p-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition"
        >
          Începe Quiz
        </button>
      </div>
    </div>
  );
};

export default StartPage;
