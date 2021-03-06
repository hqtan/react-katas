import React, { useState } from 'react';
import './ticTacToe.css';

function updatePlayerState(row, col, pState, setPState) {
  const plyrState = {
    ownedRows: pState.ownedRows,
    ownedCols: pState.ownedCols,
  };
  plyrState.ownedRows[row] = true;
  plyrState.ownedCols[col] = true;
  console.log(`player state:
    ownedRows: ${plyrState.ownedRows}, ownedCols: ${plyrState.ownedCols}`);
  setPState(plyrState);
}

const Square = (coords) => {
  const [xo, setXo] = useState({ mark: '', filled: false });

  const handleClick = () => {
    console.log(`clicked square on row:${coords.row}, col:${coords.col}, 
      previous state: mark: ${xo.mark}, filled:${xo.filled}`);
    updatePlayerState(coords.row, coords.col, coords.plyrState, coords.updatePlyr);
    setXo({ mark: 'X', filled: true });
  };

  const handleKeyDown = () => {
    console.log(`key pressed on row:${coords.row}, col:${coords.col}, 
      previous state: mark: ${xo.mark}, filled:${xo.filled}`);
    updatePlayerState(coords.row, coords.col, coords.plyrState, coords.updatePlyr);
    setXo({ mark: 'X', filled: true });
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

const TicTacToe = () => {
  const [plyr, setPlyr] = useState({
    ownedRows: Array(3).fill(false),
    ownedCols: Array(3).fill(false),
  });

  return (
    <>
      {/* top */}
      <div className="row">
        <Square row="0" col="0" updatePlyr={setPlyr} plyrState={plyr} />
        <Square row="0" col="1" updatePlyr={setPlyr} plyrState={plyr} />
        <Square row="0" col="2" updatePlyr={setPlyr} plyrState={plyr} />
      </div>
      {/* middle */}
      <div className="row">
        <Square row="1" col="0" updatePlyr={setPlyr} plyrState={plyr} />
        <Square row="1" col="1" updatePlyr={setPlyr} plyrState={plyr} />
        <Square row="1" col="2" updatePlyr={setPlyr} plyrState={plyr} />
      </div>
      {/* bottom */}
      <div className="row">
        <Square row="2" col="0" updatePlyr={setPlyr} plyrState={plyr} />
        <Square row="2" col="1" updatePlyr={setPlyr} plyrState={plyr} />
        <Square row="2" col="2" updatePlyr={setPlyr} plyrState={plyr} />
      </div>
    </>
  );
};

// export default Board;
export default TicTacToe;
