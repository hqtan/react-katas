import React, { useState } from 'react';
import './ticTacToe.css';

const Square = () => {
  const [xo, setXo] = useState('');

  const handleClick = () => {
    console.log('clicked square');
    setXo('X');
  };

  const handleKeyDown = () => {
    console.log('key pressed');
    setXo('X');
  };

  return (
    <div
      className="square"
      onClick={() => handleClick()}
      onKeyDown={() => handleKeyDown()}
      role="button"
      tabIndex="0"
    >
      { xo }
    </div>
  );
};

export default Square;
