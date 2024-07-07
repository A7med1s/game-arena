import React, { useState, useEffect, useRef } from 'react';

const SnakeGame = () => {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem('highScore')) || 0
  );
  const [speed, setSpeed] = useState(200);
  const [isPlaying, setIsPlaying] = useState(false);
  const canvasRef = useRef(null);
  const [snake, setSnake] = useState([
    { x: 10, y: 10 },
    { x: 10, y: 11 },
  ]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState({ x: 0, y: -1 });
  const [gameOver, setGameOver] = useState(false);

  const gridSize = 20;

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowUp':
        setDirection({ x: 0, y: -1 });
        break;
      case 'ArrowDown':
        setDirection({ x: 0, y: 1 });
        break;
      case 'ArrowLeft':
        setDirection({ x: -1, y: 0 });
        break;
      case 'ArrowRight':
        setDirection({ x: 1, y: 0 });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (isPlaying) {
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isPlaying]);

  useEffect(() => {
    if (gameOver) {
      const handleRestart = () => {
        startGame(speed);
      };
      document.addEventListener('keydown', handleRestart);
      return () => {
        document.removeEventListener('keydown', handleRestart);
      };
    }
  }, [gameOver, speed]);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        if (gameOver) return;

        const newSnake = [...snake];
        const head = { ...newSnake[0] };
        head.x += direction.x;
        head.y += direction.y;

        if (
          head.x < 0 ||
          head.x >= gridSize ||
          head.y < 0 ||
          head.y >= gridSize ||
          newSnake.some(
            (segment) => segment.x === head.x && segment.y === head.y
          )
        ) {
          setGameOver(true);
          if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('highScore', score);
          }
          return;
        }

        newSnake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
          setScore(score + 1);
          setFood({
            x: Math.floor(Math.random() * gridSize),
            y: Math.floor(Math.random() * gridSize),
          });
        } else {
          newSnake.pop();
        }

        setSnake(newSnake);
      }, speed);

      return () => clearInterval(interval);
    }
  }, [snake, direction, food, gameOver, isPlaying, speed, score, highScore]);

  useEffect(() => {
    if (isPlaying) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      snake.forEach((segment) => {
        ctx.fillStyle = 'green';
        ctx.fillRect(segment.x * 20, segment.y * 20, 20, 20);
      });

      ctx.fillStyle = 'red';
      ctx.fillRect(food.x * 20, food.y * 20, 20, 20);
    }
  }, [snake, food, isPlaying]);

  const startGame = (speed) => {
    setSpeed(speed);
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setSnake([
      { x: 10, y: 10 },
      { x: 10, y: 11 },
    ]);
    setFood({ x: 15, y: 15 });
    setDirection({ x: 0, y: -1 });
  };
  function disableArrowScroll(event) {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault();
    }
}
window.addEventListener('keydown', disableArrowScroll);
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900">
      {!isPlaying ? (
        <div className="text-center">
          <h1 className="text-white text-4xl mb-4">Snake Game</h1>
          <button
            onClick={() => startGame(200)}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Start Easy
          </button>
          <button
            onClick={() => startGame(100)}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
          >
            Start Medium
          </button>
          <button
            onClick={() => startGame(50)}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
          >
            Start Hard
          </button>
          <p className="text-white mt-4">High Score: {highScore}</p>
        </div>
      ) : (
        <div className="text-center">
          {/* <h1 className="text-white text-4xl mb-4">Snake Game</h1> */}
          <p className="text-white">High Score: {highScore}</p>
          <p className="text-white">Score: {score}</p>
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            className="border border-gray-700"
          />
          {gameOver && (
            <div className="text-white mt-4">
              <h2 className="text-2xl">Game Over</h2>
              <p>Press any key to restart</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SnakeGame;