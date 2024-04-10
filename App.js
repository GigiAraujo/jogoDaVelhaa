import React, { useState, useEffect } from 'react';

function App() {
  const initialSquares = Array(9).fill(null);
  const [squares, setSquares] = useState(initialSquares);
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const isBoardFull = () => {
    return squares.every((square) => square !== null);
  };

  const makeComputerMove = () => {
    const emptySquares = squares.map((square, index) => {
      return square === null ? index : null;
    }).filter((index) => index !== null);
    const randomIndex = Math.floor(Math.random() * emptySquares.length);
    const randomSquare = emptySquares[randomIndex];
    const newSquares = squares.slice();
    newSquares[randomSquare] = 'O';
    setSquares(newSquares);
    setXIsNext(true);
  };

  const handleClick = (i) => {
    if (winner || squares[i]) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(false);
  };

  const handleRestart = () => {
    setSquares(initialSquares);
    setWinner(null);
    setXIsNext(true);
  };

  useEffect(() => {
    const winner = calculateWinner(squares);
    if (winner) {
      setWinner(winner);
    } else if (isBoardFull()) {
      setWinner('Empate!');
    } else {
      setWinner(null);
      if (!xIsNext) {
        const timer = setTimeout(() => {
          makeComputerMove();
        }, 500); // Delay para simular a jogada do computador
        return () => clearTimeout(timer);
      }
    }
  }, [squares, xIsNext]);

  let status;
  if (winner) {
    status = winner === 'Empate!' ? 'Empate!' : `Você ${winner === 'X' ? 'venceu' : 'perdeu'}`;
  } else {
    status = `Próximo jogador: ${xIsNext ? 'X' : 'O'}`;
  }

  const renderCell = (i) => {
    return (
      <button
        key={i}
        style={{
          width: '100px',
          height: '100px',
          fontSize: '2.5em',
          fontWeight: 'bold',
          backgroundColor: '#fff',
          borderRight: '2px solid #333',
          borderBottom: '2px solid #333',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: squares[i] === 'X' ? 'red' : squares[i] === 'O' ? 'blue' : 'black',
        }}
        onClick={() => handleClick(i)}
      >
        {squares[i]}
      </button>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div style={{ marginTop: '20px', border: '2px solid #333', borderRadius: '5px' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', borderBottom: '2px solid #333' }}>
            {[0, 1, 2].map((i) => renderCell(i))}
          </div>
          <div style={{ display: 'flex', borderBottom: '2px solid #333' }}>
            {[3, 4, 5].map((i) => renderCell(i))}
          </div>
          <div style={{ display: 'flex' }}>
            {[6, 7, 8].map((i) => renderCell(i))}
          </div>
        </div>
      </div>
      <div style={{ marginTop: '20px', fontSize: '1.5em' }}>{status}</div>
      {winner && <button onClick={handleRestart}>Reiniciar Jogo</button>}
    </div>
  );
}

export default App;
