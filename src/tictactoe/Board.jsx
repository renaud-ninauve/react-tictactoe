import Square from './Square'
import Status from './Status';

export default function Board({squares, xIsNext, onPlay}) {
    
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