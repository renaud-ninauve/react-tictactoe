import { useState } from 'react';
import Board from './Board';

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