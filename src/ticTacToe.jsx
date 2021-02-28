import './ticTacToe.css';

const Square = () => (
  <div
    className="square"
    onClick={() => console.log('clicked square')}
    onKeyDown={() => console.log('key pressed')}
    role="button"
    tabIndex="0"
  >
    X
  </div>
);

export default Square;
