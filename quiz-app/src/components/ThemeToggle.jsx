import React from 'react';
import { useContext } from 'react';
import { QuizContext } from '../context/QuizContext.jsx';


const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(QuizContext);

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-3 bg-gray-300 dark:bg-gray-700 rounded-full shadow-md"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
};

export default ThemeToggle;
