import React from 'react';
import World from './World';

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#111' }}>
      <World />
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        color: 'white',
        fontFamily: 'sans-serif',
        pointerEvents: 'none'
      }}>
        <h1>Roblox-Like Playground</h1>
        <p>Use W, A, S, D to move. Mouse to look around.</p>
      </div>
    </div>
  );
}