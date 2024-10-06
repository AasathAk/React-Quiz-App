export default function Timer({ timer }) {
    return (
      <div className="timer-info">
        <p>Time left: <span className='timer'>{timer} seconds</span></p>
      </div>
    );
  }
  