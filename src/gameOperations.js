class GameOperations {
  constructor(turn, incrementTurnFn, updateGameMsg) {
    this.turn = turn;
    this.incrementTurnFn = incrementTurnFn;
    this.updateGameMsg = updateGameMsg;
    this.isaDraw = this.turn >= 9;
  }

  getNextGamer(players) {
    const numPlayers = players.length;
    const currentPlayer = this.turn % numPlayers;
    const nextTurn = this.turn + 1;
    const nxPlayer = nextTurn % numPlayers;
    this.incrementTurnFn(nextTurn);
    console.log(`current player: ${players[currentPlayer].mark}, next player: ${players[nxPlayer].mark}`);
    this.updateGameMsg(`Turn ${nextTurn}. Player ${players[nxPlayer].mark}'s turn`);

    return players[currentPlayer];
  }

  static aPlayerHasWon(players) {
    return players.some((gamer) => gamer.hasWon());
  }

  hasGameEnd(players) {
    return this.isaDraw || GameOperations.aPlayerHasWon(players);
  }
}

export default GameOperations;
