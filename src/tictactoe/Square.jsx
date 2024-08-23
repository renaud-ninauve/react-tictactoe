export default function Square({value, win, onClick}) {
    return (<button className={win ? 'square win' : 'square'} onClick={onClick}>{value}</button>);
}