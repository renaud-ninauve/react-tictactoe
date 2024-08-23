export function GameInfo({moves, currentMove, jumpTo}) {
    const infos = moves.map((moveSquares, moveNumber) => {   
        if (moveNumber === currentMove) {
            return (<li key={moveNumber}>You are at move {moveNumber}</li>);
        }     
        const description = moveNumber === 0 ? 'Go to game start':`move ${moveNumber}`;
        return (<li key={moveNumber}><button onClick={() => jumpTo(moveNumber)}>{description}</button></li>);
    });

    return (<ol>{infos}</ol>);
}