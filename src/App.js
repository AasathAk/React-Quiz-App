import './App.css';
import { useEffect, useReducer } from "react";
import Header from './components/Header';
import Loading from './components/Loading';
import Error from './components/Error';
import QuizMain from './components/QuizMain';
import EndQuiz from './components/EndQuiz';
import Question from './components/Question';
import NextButton from './components/NextButton';

const initialState = {
  quizQuestion: [],
  status: 'loading',
  error: null,
  index: 0, // track the current question
  selectedAnswer: null,
  points: 0,
  showNext: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'fetch_success':
      return {
        ...state,
        quizQuestion: action.payload,
        status: 'ready',
      };
    case 'fetch_error':
      return {
        ...state,
        status: 'error',
        error: action.payload,
      };
    case 'start_quiz':
      return {
        ...state,
        status: 'active',
      };
    case 'next_question':
      return {
        ...state,
        index: state.index + 1,
        selectedAnswer: null,
        showNext: false,
      };
    case 'select_answer':
      const isCorrect = action.payload === state.quizQuestion[state.index].correctAnswer;
      return {
        ...state,
        selectedAnswer: action.payload,
        points: isCorrect ? state.points + state.quizQuestion[state.index].points : state.points,
        showNext: true,
      };
    case 'finish_quiz':
      return {
        ...state,
        status: 'finished',
      };
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { quizQuestion, status, index, selectedAnswer, points, showNext } = state;

  const totalQuestions = quizQuestion.length;

  useEffect(() => {
    fetch('http://localhost:8000/quizQuestion')
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: 'fetch_success', payload: data });
      })
      .catch((err) => {
        dispatch({ type: 'fetch_error', payload: err.message });
      });
  }, []);

  const handleStartQuiz = () => {
    dispatch({ type: 'start_quiz' });
  };

  const handleNextQuestion = () => {
    if (index < totalQuestions - 1) {
      dispatch({ type: 'next_question' });
    } else {
      dispatch({ type: 'finish_quiz' });
    }
  };

  // Handle what happens when the time runs out
  const handleTimeUp = () => {
    if (index < totalQuestions - 1) {
      dispatch({ type: 'next_question' });
    } else {
      dispatch({ type: 'finish_quiz' });
    }
  };

  const handleAnswerSelect = (selectedIndex) => {
    dispatch({ type: 'select_answer', payload: selectedIndex });
  };

  const handleRestart = () => {
    window.location.reload(); // Reloads the entire page to restart the quiz
  };

  return (
    <>
      {status === 'loading' && <Loading />}
      {status === 'error' && <Error message={state.error} />}
      {status === 'ready' && <Header totalQuestions={totalQuestions} onStartQuiz={handleStartQuiz} />}
      {status === 'active' && (
        <>
          <QuizMain quizQuestion={quizQuestion} index={index} points={points} onTimeUp={handleTimeUp} />
          <Question
            question={quizQuestion[index]}
            selectedAnswer={selectedAnswer}
            onAnswerSelect={handleAnswerSelect}
          />
          {showNext && <NextButton onNext={handleNextQuestion} />}
        </>
      )}
      {status === 'finished' && <EndQuiz points={points} totalQuestions={totalQuestions} onRestart={handleRestart} />}
    </>
  );
}
