import React, { createContext, useState, useEffect } from 'react';

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState([]);
  const [theme, setTheme] = useState('light');
  const [options, setOptions] = useState({
    shuffle: false,
    timer: 0
  });
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('quizHistory')) || [];
    setHistory(storedHistory);
  }, []);

  useEffect(() => {
    localStorage.setItem('quizHistory', JSON.stringify(history));
  }, [history]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <QuizContext.Provider value={{
      username, setUsername,
      questions, setQuestions,
      currentQuestion, setCurrentQuestion,
      score, setScore,
      history, setHistory,
      theme, toggleTheme,
      options, setOptions,
      quizStarted, setQuizStarted,
      quizFinished, setQuizFinished
    }}>
      {children}
    </QuizContext.Provider>
  );
};
