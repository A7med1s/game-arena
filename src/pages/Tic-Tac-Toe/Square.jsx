// src/Square.js
import React from 'react';

const Square = ({ value, onClick }) => {
  return (
    <button
      className="w-20 h-20 border-2 border-gray-500 flex items-center justify-center text-2xl"
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Square;