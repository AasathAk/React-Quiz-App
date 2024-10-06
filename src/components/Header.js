export default function Header({ totalQuestions, onStartQuiz }) {
    return (
        <section className="welcome">
            <h1 className="quiz-title">Welcome to the Quiz</h1>
            <p className="quiz-questions">Total Questions: {totalQuestions}</p>
            <button className="start-btn" onClick={onStartQuiz}>Start Quiz</button>
        </section>
    );
}
