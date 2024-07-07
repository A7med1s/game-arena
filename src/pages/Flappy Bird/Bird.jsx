import React from 'react';
import imgOne from '../../assets/flappy-bird-bird-png-3938.png'
const Bird = ({ size, top }) => {
  return (
   <img className="bird absolute"
   style={{
     height: size,
     width: size,
     borderRadius: '50%',
     top: top,
     left: 50,
   }} src={imgOne} alt="" />
    
  );
};

export default Bird;