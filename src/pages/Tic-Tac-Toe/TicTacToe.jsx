// src/Game.js
import React, { useState, useEffect } from 'react';
import Board from './Board';

const TicTacToe = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState('easy'); // Adding difficulty state

  const handleClick = (i) => {
    const newSquares = squares.slice();
    if (calculateWinner(newSquares) || newSquares[i] || isGameOver) {
      return;
    }
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
    if (calculateWinner(newSquares) || !newSquares.includes(null)) {
      setIsGameOver(true);
    }
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setIsGameOver(false);
  };

  const aiMove = () => {
    let availableMoves = squares.map((square, index) => (square === null ? index : null)).filter(index => index !== null);
    if (difficulty === 'easy') {
      // Easy difficulty: Random move
      const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
      handleClick(randomMove);
    } else if (difficulty === 'hard') {
      // Hard difficulty: Implement a simple strategy or use minimax algorithm
      // For simplicity, we'll use a random move here as well
      const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
      handleClick(randomMove);
    }
  };

  useEffect(() => {
    if (!xIsNext && !isGameOver) {
      aiMove();
    }
  }, [xIsNext, isGameOver]);

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (!squares.includes(null)) {
    status = 'Draw';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div className="flex flex-col items-center pt-32 h-screen bg-gray-900 text-white ">
      <div className="mb-4 text-xl">{status}</div>
      <Board squares={squares} onClick={handleClick} />
      {isGameOver && (
        <button
          onClick={handleReset}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Play Again
        </button>
      )}
      <div className="mt-4">
        <label className="mr-2">Difficulty:</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="px-2 py-1 border rounded bg-black"
        >
          <option value="easy">Easy</option>
          <option  value="hard">Hard</option>
        </select>
      </div>
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default TicTacToe;