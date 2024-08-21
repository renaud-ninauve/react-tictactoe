import { useState } from 'react';
import Square from './Square'
import Status from './Status';

export default function Game() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <ol>{/*TODO*/}</ol>
        </div>
      </div>
    );
  }

function Board() {
    const [isNext, setIsNext] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null));
    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = `Winner: ${winner}`
    } else {
        status = isNext ? 'X' : 'O';
    }
    return <>
        <Status value={status}/>
        <div className="board-row">
        <Square value={squares[0]} onClick={() => onSquareClick(0)}/>
        <Square value={squares[1]} onClick={() => onSquareClick(1)}/>
        <Square value={squares[2]} onClick={() => onSquareClick(2)}/>
        </div>
        <div className="board-row">
        <Square value={squares[3]} onClick={() => onSquareClick(3)}/>
        <Square value={squares[4]} onClick={() => onSquareClick(4)}/>
        <Square value={squares[5]} onClick={() => onSquareClick(5)}/>
        </div>
        <div className="board-row">
        <Square value={squares[6]} onClick={() => onSquareClick(6)}/>
        <Square value={squares[7]} onClick={() => onSquareClick(7)}/>
        <Square value={squares[8]} onClick={() => onSquareClick(8)}/>
        </div>
        </>;

    function onSquareClick(index) {
        if (squares[index] || calculateWinner(squares)) {
            return;
        }
        const newSquares = squares.slice();
        newSquares[index] = isNext ? 'X': 'O';
        setSquares(newSquares);
        setIsNext(!isNext);
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