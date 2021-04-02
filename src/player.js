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

export default Player;
