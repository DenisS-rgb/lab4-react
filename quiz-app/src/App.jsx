import React from 'react';
import { useContext } from 'react';
import { QuizContext } from './context/QuizContext.jsx';
import StartPage from './components/StartPage.jsx';
import QuizPage from './components/QuizPage.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';


function App() {
  const { quizStarted, theme, quizFinished } = useContext(QuizContext);

  return (
    <div className={`${theme === 'dark' ? 'dark' : ''}`}>
      <ThemeToggle />
      {!quizStarted ? (
        <StartPage />
      ) : (
        <QuizPage />
      )}
    </div>
  );
}

export default App;
