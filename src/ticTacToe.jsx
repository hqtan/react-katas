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

const Board = () => (
  <>
    {/* top */}
    <div className="row">
      <Square />
      <Square />
      <Square />
    </div>
    {/* middle */}
    <div className="row">
      <Square />
      <Square />
      <Square />
    </div>
    {/* bottom */}
    <div className="row">
      <Square />
      <Square />
      <Square />
    </div>
  </>
);

export default Board;
