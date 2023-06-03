import React, { useState, useEffect, useCallback } from 'react';

const getRandomArbitrary = (min, max) => {
  const radius = Math.random() * (max - min) + min;
  const angle = Math.random() * 2 * Math.PI;

  return {
    top: `${50 + radius * Math.cos(angle)}%`,
    left: `${50 + radius * Math.sin(angle)}%`,
  };
};

const Spaceship = ({ onClick, level }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: '50%', left: '50%' });

  const moveSpaceship = useCallback(() => {
    const newPosition = getRandomArbitrary(3, 12);
    setPosition({ top: newPosition.top, left: newPosition.left });
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const spaceshipMoveInterval = setInterval(moveSpaceship, level === 1 ? 1000 : 800);

    return () => {
      clearInterval(spaceshipMoveInterval);
    };
  }, [moveSpaceship, level]);

  const handleClick = () => {
    if (onClick) {
      onClick();
      setIsVisible(false);
    }
  };

  const spaceshipColor = level === 2 ? 'red' : 'lightgreen';
  const spaceshipSize = level === 2 ? '20px' : '17px';

  return isVisible ? (
    <div
      onClick={handleClick}
      className="spaceship"
      style={{
        ...position,
        backgroundColor: spaceshipColor,
        width: spaceshipSize,
        height: spaceshipSize,
        borderRadius: level === 2 ? '50%' : '50%',
      }}
    />
  ) : null;
};


export default Spaceship;
