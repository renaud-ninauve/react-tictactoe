import { useState } from 'react';
import Square from './Square'
import Status from './Status';

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove%2 === 0;
    const squares = history[currentMove];
    const moves = history.map((moveSquares, moveNumber) => {
        if (moveNumber === currentMove) {
          return (<li key={moveNumber}>You are at move {moveNumber}</li>);
        }
        const description = moveNumber === 0 ? 'Go to game start':`move ${moveNumber}`;
        return (<li key={moveNumber}><button onClick={() => jumpTo(moveNumber)}>{description}</button></li>);
    });
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={squares} xIsNext={xIsNext} onPlay={handlePlay}/>
        </div>
        <div className="game-info">
            <ol>{moves}</ol>
        </div>
      </div>
    );

    function handlePlay(newSquares) {
        const slicedHistory = history.slice(0, currentMove+1);
        setHistory([...slicedHistory, newSquares]);
        setCurrentMove(currentMove+1);
    }

    function jumpTo(moveNumber) {
        setCurrentMove(moveNumber);
    }
  }

export function Board({squares, xIsNext, onPlay}) {
    
    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = `Winner: ${winner}`
    } else {
        status = xIsNext ? 'X' : 'O';
    }
    
    const rows = Array(3).fill(null).map((r, row) => {
      const cols = Array(3).fill(null).map((c, col) => (<Square key={row*3+col} value={squares[row*3+col]} onClick={() => onSquareClick(row*3+col)}/>));
      return (
        <div key={row} className="board-row">
          {cols}
        </div>);
    });

    return <>
        <Status value={status}/>
        {rows}
        </>;

    function onSquareClick(index) {
        if (squares[index] || calculateWinner(squares)) {
            return;
        }
        const newSquares = squares.slice();
        newSquares[index] = xIsNext ? 'X': 'O';
        onPlay(newSquares);
    }

    function calculateWinner(squares) {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
          }
        }
        return null;
      }
  }