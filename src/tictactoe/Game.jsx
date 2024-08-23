import { useState } from 'react';
import Board from './Board';
import { GameInfo } from './GameInfo';

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove%2 === 0;
    const squares = history[currentMove];

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={squares} xIsNext={xIsNext} onPlay={handlePlay}/>
        </div>
        <div className="game-info">
            <GameInfo moves={history} currentMove={currentMove} jumpTo={jumpTo}/>
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