
  export default function Options({ options, correctAnswer, selectedAnswer, onAnswerSelect }) {
    return (
      <div className="options">
        {options.map((option, index) => {
          let className = "option";
          if (selectedAnswer !== null) {
            if (index === correctAnswer) {
              className += " correct";
            } else if (index === selectedAnswer) {
              className += " wrong";
            }
          }
  
          return (
            <button
              key={index}
              className={className}
              disabled={selectedAnswer !== null}
              onClick={() => onAnswerSelect(index)}
            >
              {option}
            </button>
          );
        })}
      </div>
    );
  }
  