import React, { useState, useEffect } from 'react';
import './radar.css';
import Spaceship from './Spaceship';
import radarVideo from './radar-video.gif';

const Radar = () => {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [level, setLevel] = useState(1);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const desiredScore = level * 5;

  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [gameStarted, timeLeft]);

  const handle_evilSpaceshipClick = () => {
    if (gameStarted) {
      setScore((prevScore) => prevScore - 1);
    }
  };
  const handleSpaceshipClick = () => {
    if (gameStarted) {
      setScore((prevScore) => prevScore + 1);
    }
  };
  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
    setGameStarted(true);
  };

  const startNextLevel = () => {
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
    setGameStarted(true);
    setLevel((prevLevel) => prevLevel + 1);
  };

  const menu = () => {
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
    setGameStarted(true);
    setLevel(1);
  };

  useEffect(() => {
    if (score === 5) {
      setShowCongratulations(true);
      setGameStarted(false);
    }
  }, [score]);

  return (
    <div className="game-container">
      {gameStarted && !gameOver && (
        <>
            <img src={radarVideo} type="image/gif" alt = '' className='radar-video' />
            {level === 1 && <Spaceship onClick={handleSpaceshipClick} level={level} />}
          {level === 2 && (
            <>
              <Spaceship onClick={handleSpaceshipClick} className= 'spaceship' level={1} />
              <Spaceship onClick={handle_evilSpaceshipClick} className='spaceship_evil' level={2} color="red"/>
            </>
          )}
          <div className="game-info">
            <div className="game-score">Score: {score}</div>
            <div className="game-timer">Time Left: {timeLeft}</div>
          </div>
        </>
      )}
      {!gameStarted && !gameOver && !showCongratulations && (
        <button onClick={startGame} className="start-button">
          Start Game
        </button>
        )}
        {gameOver && (
            <div className="game-over">
                <h2>Game Over!</h2>
                <button className="restart-button" onClick={startGame}>
                  Restart
                </button>
              </div>
      )}
      {showCongratulations && !gameStarted && (
        <div className="congratulations">
          <h2>Congratulations, the meteor have been destroyed!</h2>
          <div className="button-container">
            <button className="menu-button"x  >
              Menu
            </button>
            <button className="next-level-button" onClick={startNextLevel}>
              Next Level
            </button>
          </div>
          <div className="game-timer">Time Left: {timeLeft}</div>
        </div>
      )}
    </div>
  );
};

export default Radar;
