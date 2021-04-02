import React, { useState } from 'react';
import './ticTacToe.css';
import Player from './player';
import GameOperations from './gameOperations';

const Square = (ps) => {
  const [xo, setXo] = useState({ mark: '', filled: false });

  const handleEvent = () => {
    console.log(`clicked square on row:${ps.row}, col:${ps.col}, 
      previous state of square: mark: ${xo.mark}, filled:${xo.filled}`);

    const nextPlayer = (p) => ps.gameOps.getNextGamer(p);
    const hasGameEnd = ps.gameOps.hasGameEnd(ps.players);
    const { turn } = ps.gameOps;
    const updateMsg = ps.gameOps.updateGameMsg;

    console.log(`has game ended: ${hasGameEnd}`);

    if (hasGameEnd) {
      setXo({ mark: xo.mark, filled: xo.filled });
    } else if (xo.filled === false) {
      const player = nextPlayer(ps.players);
      player.addSquare(ps.row, ps.col);
      setXo({ mark: player.mark, filled: true });
      if (player.hasWon()) updateMsg(`Player ${player.mark} Wins`);

      console.log(`Turn ${turn}; is a Draw: ${(turn >= 8) && !player.hasWon()}`);
      if ((turn >= 8) && !player.hasWon()) updateMsg('It\'s a Draw');
    }
  };

  const handleClick = () => handleEvent();
  const handleKeyDown = () => handleEvent();

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

  const GameOps = new GameOperations(turnNum, setTurnNum, setGameMsg);

  return (
    <>
      {/* top */}
      <div className="row">
        <Square row="0" col="0" players={gamers} gameOps={GameOps} />
        <Square row="0" col="1" players={gamers} gameOps={GameOps} />
        <Square row="0" col="2" players={gamers} gameOps={GameOps} />
      </div>
      {/* middle */}
      <div className="row">
        <Square row="1" col="0" players={gamers} gameOps={GameOps} />
        <Square row="1" col="1" players={gamers} gameOps={GameOps} />
        <Square row="1" col="2" players={gamers} gameOps={GameOps} />
      </div>
      {/* bottom */}
      <div className="row">
        <Square row="2" col="0" players={gamers} gameOps={GameOps} />
        <Square row="2" col="1" players={gamers} gameOps={GameOps} />
        <Square row="2" col="2" players={gamers} gameOps={GameOps} />
      </div>
      <div className="row">
        <GameStateMessage msg={gameMsg} />
      </div>
    </>
  );
};

export default TicTacToe;
