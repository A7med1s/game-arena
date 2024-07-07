import React from 'react';

const Pipe = ({ left, height, width, gap }) => {
  return (
    <>
      <div
        className="absolute bg-green-500"
        style={{
          height: height,
          width: width,
          top: 0,
          left: left,
        }}
      ></div>
      <div
        className="absolute bg-green-500"
        style={{
          height: `calc(100% - ${height + gap}px)`,
          width: width,
          top: height + gap,
          left: left,
        }}
      ></div>
    </>
  );
};

export default Pipe;