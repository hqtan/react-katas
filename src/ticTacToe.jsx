import React, { useState } from 'react';
import './ticTacToe.css';

const Square = (ps) => {
  const [xo, setXo] = useState({ mark: '', filled: false });

  const handleClick = () => {
    console.log(`clicked square on row:${ps.row}, col:${ps.col}, 
      previous state of square: mark: ${xo.mark}, filled:${xo.filled}`);

    const hasGameEnd = (gamers) => gamers.some((gamer) => gamer.hasWon());

    console.log(`has game ended: ${hasGameEnd(ps.players)}`);

    if (hasGameEnd(ps.players)) {
      setXo({ mark: xo.mark, filled: xo.filled });
    } else if (xo.filled === false) {
      const player = ps.nextPlayer(ps.players);
      player.addSquare(ps.row, ps.col);
      setXo({ mark: player.mark, filled: true });
      if (player.hasWon()) ps.updateMsg(`Player ${player.mark} Wins`);
    }
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
    console.log(`initialised state for player ${this.mark} : ${this.showPlayerState()}`);
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

  hasWon() {
    const result = this.has3SquaresInAColumn()
      || this.has3SquaresInARow()
      || this.has3SquaresInADiagonal();
    console.log(`player ${this.mark} has won: ${result}`);
    return result;
  }

  has3SquaresInARow() {
    const rows = [0, 1, 2];
    // console.log(`number of squares player has marked: ${this.state.length}`);
    const hasThreeSquaresInRow = (row) => {
      const result = (this.state.filter((sqr) => sqr[0] === row).length) === 3;
      // console.log(`row ${row} has 3 squares: ${result}`);
      return result;
    };
    const results = rows.map(hasThreeSquaresInRow);
    return results.some((bool) => bool === true);
  }

  has3SquaresInAColumn() {
    const cols = [0, 1, 2];
    // console.log(`number of squares player has marked: ${this.state.length}`);
    const hasThreeSquaresInColumn = (col) => {
      const result = (this.state.filter((sqr) => sqr[1] === col).length) === 3;
      // console.log(`column ${col} has 3 squares: ${result}`);
      return result;
    };
    const results = cols.map(hasThreeSquaresInColumn);
    return results.some((bool) => bool === true);
  }

  has3SquaresInADiagonal() {
    const leftDiagonalSquares = [[0, 0], [1, 1], [2, 2]];
    const rightDiagonalSquares = [[0, 2], [1, 1], [2, 0]];
    // returns true if Player's state has square given by `squareToCheck`
    const hasSquare = (squareToCheck) => this.state.some(
      (sqr) => (sqr[0] === squareToCheck[0]) && (sqr[1] === squareToCheck[1]),
    );
    const leftResult = leftDiagonalSquares.every(hasSquare);
    // console.log(`left diagonal has 3 squares: ${leftResult}`);

    const rightResult = rightDiagonalSquares.every(hasSquare);
    // console.log(`right diagonal has 3 squares: ${rightResult}`);

    return leftResult || rightResult;
  }
}

const GameStateMessage = (ps) => (<>{ ps.msg }</>);

const TicTacToe = () => {
  const [plyr1, setPlyr1] = useState([]);
  const [plyr2, setPlyr2] = useState([]);
  const [turnNum, setTurnNum] = useState(Number(0));

  const p1 = new Player('X', plyr1, setPlyr1);
  const p2 = new Player('O', plyr2, setPlyr2);

  const gamers = [p1, p2];
  const [gameMsg, setGameMsg] = useState(`Player ${gamers[(turnNum % gamers.length)].mark}'s turn`);

  // console.log('I am still alive.');

  const nextGamer = (plyrs) => {
    const numPlayers = plyrs.length;
    const currentPlayer = turnNum % numPlayers;
    const nextTurnNum = turnNum + 1;
    const nxPlayer = nextTurnNum % numPlayers;
    setTurnNum(nextTurnNum);
    console.log(`current player: ${plyrs[currentPlayer].mark}, next player: ${plyrs[nxPlayer].mark}`);
    setGameMsg(`Player ${plyrs[nxPlayer].mark}'s turn`);

    return plyrs[currentPlayer];
  };

  return (
    <>
      {/* top */}
      <div className="row">
        <Square row="0" col="0" players={gamers} updateMsg={setGameMsg} nextPlayer={nextGamer} />
        <Square row="0" col="1" players={gamers} updateMsg={setGameMsg} nextPlayer={nextGamer} />
        <Square row="0" col="2" players={gamers} updateMsg={setGameMsg} nextPlayer={nextGamer} />
      </div>
      {/* middle */}
      <div className="row">
        <Square row="1" col="0" players={gamers} updateMsg={setGameMsg} nextPlayer={nextGamer} />
        <Square row="1" col="1" players={gamers} updateMsg={setGameMsg} nextPlayer={nextGamer} />
        <Square row="1" col="2" players={gamers} updateMsg={setGameMsg} nextPlayer={nextGamer} />
      </div>
      {/* bottom */}
      <div className="row">
        <Square row="2" col="0" players={gamers} updateMsg={setGameMsg} nextPlayer={nextGamer} />
        <Square row="2" col="1" players={gamers} updateMsg={setGameMsg} nextPlayer={nextGamer} />
        <Square row="2" col="2" players={gamers} updateMsg={setGameMsg} nextPlayer={nextGamer} />
      </div>
      <div className="row">
        <GameStateMessage msg={gameMsg} />
      </div>
    </>
  );
};

export default TicTacToe;
