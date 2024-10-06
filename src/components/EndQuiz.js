export default function EndQuiz({ points, totalQuestions, highScore, onRestart }) {
    // Calculate percentage score
    const percentage = (points / (totalQuestions * 5)) * 100; // assuming each question is worth 5 points
  
    // Set emoji based on percentage score
    let emoji = '👍'; // Default emoji
    if (percentage > 80) {
      emoji = '🎉'; // Excellent score
    } else if (percentage > 50) {
      emoji = '😊'; // Good score
    } else if (percentage > 30) {
      emoji = '🙂'; // Average score
    } else {
      emoji = '😕'; // Low score
    }
  
    return (
      <section className="completion">
        <h2>Thank you for completing the Quiz!</h2>
        <span className="emoji">{emoji} - You did well</span>
        <p className="result">
          You scored <strong>{points}</strong> out of {totalQuestions * 5}, and your percentage is <strong>{percentage.toFixed(2)}%</strong>
        </p>
        <p className="highscore">(HighScore: {highScore} points)</p>
        <button className="restart" onClick={onRestart}>Restart quiz</button>
      </section>
    );
  }
  