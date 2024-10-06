export default function NextButton({ onNext }) {
    return (
      <div className="navigation-buttons">
        <button className="next" onClick={onNext}>
          Next
        </button>
      </div>
    );
  }
  