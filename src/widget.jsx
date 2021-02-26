import React, { useState } from 'react';

const Widget = () => <Counter />;

const Counter = () => {
  const [count, setCount] = useState(0);

  // const addOne = n => e => inc(count + n);
  function add(n) {
    setCount(count + n);
  }

  return (
    <>
      <button type="button" onClick={() => add(1)}>Add</button>
      <button type="button" onClick={() => add(-1)}>Minus</button>
      <p>{ count }</p>
    </>
  );
};

export default Widget;
