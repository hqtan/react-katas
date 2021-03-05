import React, { useState } from 'react';
import './ticTacToe.css';

const Square = (coords) => {
  const [xo, setXo] = useState('');

  const handleClick = () => {
    console.log(`clicked square on row:${coords.row}, col:${coords.col}`);
    setXo('X');
  };

  const handleKeyDown = () => {
    console.log(`key pressed on row:${coords.row}, col:${coords.col}`);
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
      <Square row="0" col="0" />
      <Square row="0" col="1" />
      <Square row="0" col="2" />
    </div>
    {/* middle */}
    <div className="row">
      <Square row="1" col="0" />
      <Square row="1" col="1" />
      <Square row="1" col="2" />
    </div>
    {/* bottom */}
    <div className="row">
      <Square row="2" col="0" />
      <Square row="2" col="1" />
      <Square row="2" col="2" />
    </div>
  </>
);

export default Board;
