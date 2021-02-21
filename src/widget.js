import React, { useState } from 'react';

const Widget = () => {
  return (
    <div>
      <Counter />
    </div>
  );
};

const Counter = () => {
  const [count, inc] = useState(0);

  // const addOne = n => e => inc(count + n);
  function add(n) {
    inc(count + n);
  }
  const minusOne = () => inc(count - 1);

  return (
    <div>
      <button onClick = { () => add(2) }>Add</button>
      <button onClick = { minusOne }>Minus</button>
      <p>{ count }</p>
    </div>
  )
}

export default Widget;
