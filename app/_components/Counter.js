'use client';

import { useState } from 'react';

export default function Counter({ users }) {
  const [count, setCount] = useState(0);

  function handleCount() {
    setCount((prevCount) => prevCount + 1);
  }

  return (
    <div>
      <p>There are {users.length} users</p>
      <span style={{ marginRight: '10px' }}>Count: {count}</span>
      <button onClick={handleCount}>Count</button>
    </div>
  );
}
