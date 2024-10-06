import { useState, useEffect } from 'react';
import Timer from './Timer';

export default function QuizMain({ quizQuestion, index, points, onTimeUp }) {
  const totalQuestions = quizQuestion.length;
  const [timer, setTimer] = useState(10); // 10 seconds for each question

  useEffect(() => {
    // Start the timer countdown
    const countdown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    // Clear the interval when the question changes or time runs out
    if (timer === 0) {
      clearInterval(countdown);
      onTimeUp(); // Trigger time-up event
    }

    // Cleanup the interval when the component unmounts or when the question changes
    return () => clearInterval(countdown);
  }, [timer, onTimeUp]);

  useEffect(() => {
    // Reset the timer when the question changes
    setTimer(60);
  }, [index]);

  return (
    <section className="quiz">
      <div className="progress-container">
        <progress value={index + 1} max={totalQuestions}></progress>
      </div>
      <div className="progress-info">
        <span>Ques: {index + 1}/{totalQuestions}</span>
        <p>Points: <span>{points}</span></p>
      </div>
      {/* Pass the timer value as a prop to Timer */}
      <Timer timer={timer} />
    </section>
  );
}
