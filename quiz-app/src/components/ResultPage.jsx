import React from 'react';
import { useContext, useEffect } from 'react';
import { QuizContext } from '../context/QuizContext';

const ResultPage = () => {
  const { username, score, questions, history, setHistory, setCurrentQuestion, setScore, setQuizStarted, setQuizFinished } = useContext(QuizContext);

  useEffect(() => {
    const existingUser = history.find(h => h.username === username);
    if (!existingUser || score > existingUser.score) {
      const updated = [...history.filter(h => h.username !== username), { username, score }];
      setHistory(updated);
    }
  }, [score, username]);

  const handleReset = () => {
    setCurrentQuestion(0);
    setScore(0);
    setQuizStarted(false);
    setQuizFinished(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl flex flex-col gap-6 text-center">
        <h1 className="text-3xl font-bold">Rezultatul tău</h1>
        <p className="text-xl">Ai răspuns corect la {score}/{questions.length} întrebări</p>
        <h2 className="text-2xl font-semibold mt-6">Clasament</h2>
        <table className="w-full text-center border-collapse mt-4">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="p-3 border">User</th>
              <th className="p-3 border">Scor Maxim</th>
            </tr>
          </thead>
          <tbody>
            {history.map(h => (
              <tr key={h.username} className="border hover:bg-gray-100">
                <td className="p-3">{h.username}</td>
                <td className="p-3">{h.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={handleReset}
          className="w-full p-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition"
        >
          Resetare Quiz
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
