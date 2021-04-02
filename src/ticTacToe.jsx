import React, { useState } from 'react';
import './ticTacToe.css';
import Player from './player';

const Square = (ps) => {
  const [xo, setXo] = useState({ mark: '', filled: false });

  const handleClick = () => {
    console.log(`clicked square on row:${ps.row}, col:${ps.col}, 
      previous state of square: mark: ${xo.mark}, filled:${xo.filled}`);

    const aPlayerHasWon = ps.players.some((gamer) => gamer.hasWon());
    const isaDraw = ps.turn >= 9;
    const hasGameEnd = isaDraw || aPlayerHasWon;

    console.log(`has game ended: ${hasGameEnd}`);

    if (hasGameEnd) {
      setXo({ mark: xo.mark, filled: xo.filled });
    } else if (xo.filled === false) {
      const player = ps.nextPlayer(ps.players);
      player.addSquare(ps.row, ps.col);
      setXo({ mark: player.mark, filled: true });
      if (player.hasWon()) ps.updateMsg(`Player ${player.mark} Wins`);

      console.log(`Turn ${ps.turn}; is a Draw: ${(ps.turn >= 8) && !player.hasWon()}`);
      if ((ps.turn >= 8) && !player.hasWon()) ps.updateMsg('It\'s a Draw');
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

const GameStateMessage = (ps) => (<>{ ps.msg }</>);

const TicTacToe = () => {
  const [plyr1, setPlyr1] = useState([]);
  const [plyr2, setPlyr2] = useState([]);
  const [turnNum, setTurnNum] = useState(Number(0));

  const p1 = new Player('X', plyr1, setPlyr1);
  const p2 = new Player('O', plyr2, setPlyr2);

  const gamers = [p1, p2];
  const [gameMsg, setGameMsg] = useState(`Turn ${turnNum}. Player ${gamers[(turnNum % gamers.length)].mark}'s turn`);

  // console.log('I am still alive.');

  const nextGamer = (plyrs) => {
    const numPlayers = plyrs.length;
    const currentPlayer = turnNum % numPlayers;
    const nextTurnNum = turnNum + 1;
    const nxPlayer = nextTurnNum % numPlayers;
    setTurnNum(nextTurnNum);
    console.log(`current player: ${plyrs[currentPlayer].mark}, next player: ${plyrs[nxPlayer].mark}`);
    setGameMsg(`Turn ${nextTurnNum}. Player ${plyrs[nxPlayer].mark}'s turn`);

    return plyrs[currentPlayer];
  };

  return (
    <>
      {/* top */}
      <div className="row">
        <Square row="0" col="0" players={gamers} updateMsg={setGameMsg} nextPlayer={nextGamer} turn={turnNum} />
        <Square row="0" col="1" players={gamers} updateMsg={setGameMsg} nextPlayer={nextGamer} turn={turnNum} />
        <Square row="0" col="2" players={gamers} updateMsg={setGameMsg} nextPlayer={nextGamer} turn={turnNum} />
      </div>
      {/* middle */}
      <div className="row">
        <Square row="1" col="0" players={gamers} updateMsg={setGameMsg} nextPlayer={nextGamer} turn={turnNum} />
        <Square row="1" col="1" players={gamers} updateMsg={setGameMsg} nextPlayer={nextGamer} turn={turnNum} />
        <Square row="1" col="2" players={gamers} updateMsg={setGameMsg} nextPlayer={nextGamer} turn={turnNum} />
      </div>
      {/* bottom */}
      <div className="row">
        <Square row="2" col="0" players={gamers} updateMsg={setGameMsg} nextPlayer={nextGamer} turn={turnNum} />
        <Square row="2" col="1" players={gamers} updateMsg={setGameMsg} nextPlayer={nextGamer} turn={turnNum} />
        <Square row="2" col="2" players={gamers} updateMsg={setGameMsg} nextPlayer={nextGamer} turn={turnNum} />
      </div>
      <div className="row">
        <GameStateMessage msg={gameMsg} />
      </div>
    </>
  );
};

export default TicTacToe;
