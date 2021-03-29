import React, { useState } from 'react';
import './ticTacToe.css';

const Square = (ps) => {
  const [xo, setXo] = useState({ mark: '', filled: false });

  const handleClick = () => {
    console.log(`clicked square on row:${ps.row}, col:${ps.col}, 
      previous state of square: mark: ${xo.mark}, filled:${xo.filled}`);
    if (xo.filled === false) {
      ps.player.addSquare(ps.row, ps.col);
    }
    ps.player.has3SquaresInARow();
    ps.player.has3SquaresInAColumn();
    setXo({ mark: ps.player.mark, filled: true });
  };

  const handleKeyDown = () => {
    console.log(`key pressed on row:${ps.row}, col:${ps.col}, 
      previous state: mark: ${xo.mark}, filled:${xo.filled}`);
    ps.player.addSquare(ps.row, ps.col);
    setXo({ mark: ps.player.mark, filled: true });
  };

  return (
    <div
      className="square"
      onClick={() => handleClick()}
      onKeyDown={() => handleKeyDown()}
      role="button"
      tabIndex="0"
    >
      { xo.mark }
    </div>
  );
};

class Player {
  constructor(mark, state, useStateFn) {
    this.mark = mark;
    this.state = state;
    this.useStateFn = useStateFn;
    console.log(`initialised player state : ${this.showPlayerState()}`);
  }

  showPlayerState() {
    let str = '[';
    this.state.forEach((element) => {
      str = `${str} ${element}`;
    });
    return str.concat(' ]');
  }

  addSquare(row, col) {
    this.state.push([Number(row), Number(col)]);
    console.log(`player state after addSquare: ${this.showPlayerState()}`);
    this.useStateFn(this.state);
  }

  has3SquaresInARow() {
    const rows = [0, 1, 2];
    console.log(`number of squares player has marked: ${this.state.length}`);
    const hasThreeSquaresInRow = (row) => {
      const result = (this.state.filter((sqr) => sqr[0] === row).length) === 3;
      console.log(`row ${row} has 3 squares: ${result}`);
      return result;
    };
    const results = rows.map(hasThreeSquaresInRow);
    results.some((bool) => bool === true);
  }

  has3SquaresInAColumn() {
    const cols = [0, 1, 2];
    console.log(`number of squares player has marked: ${this.state.length}`);
    const hasThreeSquaresInColumn = (col) => {
      const result = (this.state.filter((sqr) => sqr[1] === col).length) === 3;
      console.log(`column ${col} has 3 squares: ${result}`);
      return result;
    };
    const results = cols.map(hasThreeSquaresInColumn);
    results.some((bool) => bool === true);
  }
}

const TicTacToe = () => {
  const [plyr, setPlyr] = useState([]);

  const p1 = new Player('X', plyr, setPlyr);

  return (
    <>
      {/* top */}
      <div className="row">
        <Square row="0" col="0" player={p1} />
        <Square row="0" col="1" player={p1} />
        <Square row="0" col="2" player={p1} />
      </div>
      {/* middle */}
      <div className="row">
        <Square row="1" col="0" player={p1} />
        <Square row="1" col="1" player={p1} />
        <Square row="1" col="2" player={p1} />
      </div>
      {/* bottom */}
      <div className="row">
        <Square row="2" col="0" player={p1} />
        <Square row="2" col="1" player={p1} />
        <Square row="2" col="2" player={p1} />
      </div>
    </>
  );
};

// export default Board;
export default TicTacToe;
