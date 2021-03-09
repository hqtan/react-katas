import React, { useState } from 'react';
import './ticTacToe.css';

function updatePlayerState(row, col, player) {
  const plyrState = {
    ownedRows: player.state.ownedRows,
    ownedCols: player.state.ownedCols,
  };
  plyrState.ownedRows[row] = true;
  plyrState.ownedCols[col] = true;
  console.log(`player state:
    ownedRows: ${plyrState.ownedRows}, ownedCols: ${plyrState.ownedCols}`);
  player.useStateFn(plyrState);
}

const Square = (ps) => {
  const [xo, setXo] = useState({ mark: '', filled: false });

  const handleClick = () => {
    console.log(`clicked square on row:${ps.row}, col:${ps.col}, 
      previous state: mark: ${xo.mark}, filled:${xo.filled}`);
    updatePlayerState(ps.row, ps.col, ps.player);
    setXo({ mark: ps.player.mark, filled: true });
  };

  const handleKeyDown = () => {
    console.log(`key pressed on row:${ps.row}, col:${ps.col}, 
      previous state: mark: ${xo.mark}, filled:${xo.filled}`);
    updatePlayerState(ps.row, ps.col, ps.player);
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
  }
}

const TicTacToe = () => {
  const [plyr, setPlyr] = useState({
    ownedRows: Array(3).fill(false),
    ownedCols: Array(3).fill(false),
  });

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
