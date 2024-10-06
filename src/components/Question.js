import Options from "./Options";

export default function Question({ question, selectedAnswer, onAnswerSelect }) {
  return (
    <div className="question-container">
      <h2 className="question">{question.question}</h2>
      <Options
        options={question.options}
        correctAnswer={question.correctAnswer}
        selectedAnswer={selectedAnswer}
        onAnswerSelect={onAnswerSelect}
      />
    </div>
  );
}
