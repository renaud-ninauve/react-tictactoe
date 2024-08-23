import { useState } from 'react';

export function GameInfo({moves, currentMove, jumpTo}) {
    const [newestLast, setNewestLast] = useState('newestLast');

    const infosNewestLast = moves.map((moveSquares, moveNumber) => {   
        if (moveNumber === currentMove) {
            return (<li key={moveNumber}>You are at move {moveNumber}</li>);
        }     
        const description = moveNumber === 0 ? 'Go to game start':`move ${moveNumber}`;
        return (<li key={moveNumber}><button onClick={() => jumpTo(moveNumber)}>{description}</button></li>);
    });

    const infos = newestLast ? infosNewestLast : infosNewestLast.toReversed();
    return (
        <>
            <button className='sort' onClick={handleSortClick}>{newestLast ? 'sort newest -> oldest' : ' sort oldest -> newest'}</button> 
            <ol>{infos}</ol>
        </>
    );

    function handleSortClick() {
        setNewestLast(!newestLast);
    }
}