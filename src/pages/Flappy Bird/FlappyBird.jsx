import React, { useState, useEffect, useRef } from 'react';
import Bird from './Bird';
import Pipe from './Pipe';

const FlappyBird = () => {
  const [birdPosition, setBirdPosition] = useState(250);
  const [pipeHeight, setPipeHeight] = useState(200);
  const [pipeLeft, setPipeLeft] = useState(500);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const gameHeight = 500;
  const gameWidth = 500;
  const birdSize = 30;
  const pipeWidth = 40;
  const pipeGap = 150;

  const gravity = 6;
  const jumpHeight = 100;
  const pipeSpeed = 5;

  useEffect(() => {
    let timeId;
    if (isGameStarted && !isGameOver) {
      timeId = setInterval(() => {
        setBirdPosition((birdPosition) => birdPosition + gravity);
      }, 24);
    }
    return () => clearInterval(timeId);
  }, [isGameStarted, isGameOver]);

  useEffect(() => {
    let pipeId;
    if (isGameStarted && !isGameOver) {
      pipeId = setInterval(() => {
        setPipeLeft((pipeLeft) => {
          if (pipeLeft >= -pipeWidth) {
            return pipeLeft - pipeSpeed;
          }
          setPipeHeight(Math.floor(Math.random() * (gameHeight - pipeGap)));
          setScore((score) => score + 1);
          return gameWidth;
        });
      }, 24);
    }
    return () => clearInterval(pipeId);
  }, [isGameStarted, isGameOver]);

  useEffect(() => {
    const hasCollidedWithTop = birdPosition < 0;
    const hasCollidedWithBottom = birdPosition + birdSize > gameHeight;
    const hasCollidedWithPipe =
      pipeLeft >= 0 &&
      pipeLeft <= pipeWidth &&
      (birdPosition < pipeHeight || birdPosition > pipeHeight + pipeGap);

    if (hasCollidedWithTop || hasCollidedWithBottom || hasCollidedWithPipe) {
      setIsGameOver(true);
      setIsGameStarted(false);
    }
  }, [birdPosition, pipeHeight, pipeLeft]);

  const handleClick = () => {
    if (!isGameStarted) {
      setIsGameStarted(true);
      setIsGameOver(false);
      setScore(0);
      setBirdPosition(250);
      setPipeLeft(500);
      setPipeHeight(200);
    } else {
      setBirdPosition((birdPosition) => birdPosition - jumpHeight);
    }
  };

  return (
  <div className=" bg-gray-900 h-screen flex justify-center items-center">
      <div
      className="relative bg-blue-300 overflow-hidden"
      style={{ height: gameHeight, width: gameWidth }}
      onClick={handleClick}
    >
      <Bird size={birdSize} top={birdPosition} />
      <Pipe left={pipeLeft} height={pipeHeight} width={pipeWidth} gap={pipeGap} />
      <div className="absolute top-0 left-0 p-4 text-white text-2xl">{score}</div>
      {isGameOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-2xl">
          Game Over
        </div>
      )}
    </div>
  </div>
  );
};

export default FlappyBird;