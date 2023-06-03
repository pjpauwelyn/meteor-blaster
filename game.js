import React, { useState, useEffect } from 'react';

const Game = () => {
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(10);
  const [showSpaceship, setShowSpaceship] = useState(false);

  useEffect(() => {
    if (time > 0) {
      const timer = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [time]);

  const handleClick = () => {
    if (showSpaceship) {
      setScore(score + 1);
      setShowSpaceship(false);
    }
  };

  const startGame = () => {
    setScore(0);
    setTime(10);
    setShowSpaceship(true);
  };

  return (
    <div className="game">
      {showSpaceship && <div className="spaceship" onClick={handleClick} />}
      {time > 0 && (
        <div className="time">
          Time: {time}s
        </div>
      )}
      {time === 0 && (
        <div className="game-over">
          Game Over! Your score is {score}.
        </div>
      )}
      <button className="start-button" onClick={startGame}>
        Start Game
      </button>
    </div>
  );
};

export default Game;
