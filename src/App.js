import { useState } from 'react';

export default function Board() {

    const [xIsNext, setXIsNext] = useState(true);
    const [squares, setSquares] = useState(Array(42).fill(null));

    const [lastPlaced, setLastPlaced] = useState(null);
    const winner = calculateWinner(squares);
    
    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else  {
        status = "Next player: " + (xIsNext ? "Red" : "Yellow");
    }

    function calculateWinner(squares) {

        //check down
        var count = 1;

        for (var i = 1; i < 4; i++) {
            if (squares[lastPlaced+i*7] === squares[lastPlaced]) {
                count++;
            } else break;
        }

        for (var i = 1; i < 4; i++) {
            if (squares[lastPlaced-i*7] === squares[lastPlaced]) {
                count++;
            } else break;
        }

        if(count >= 4) return squares[lastPlaced];
        
        //check sideways

        count = 1;

        for (var i = 1; i < 4; i++) {
            if((lastPlaced + i) % 7 === 0) {
                break;
            } else if (squares[lastPlaced+i] === squares[lastPlaced]) {
                count++;
            } else break;
        }

        for (var i = 1; i < 4; i++) {
            if((lastPlaced - i) % 7 === 0) {
                break;
            } else if (squares[lastPlaced-i] === squares[lastPlaced]) {
                count++;
            } else break;
        }

        if(count >= 4) return squares[lastPlaced];

        //check diagonal 1

        count = 1;

        for (var i = 1; i < 4; i++) {
            if((lastPlaced + i + i*7) % 7 === 0) {
                break;
            } else 
            if (squares[lastPlaced+i+i*7] === squares[lastPlaced]) {
                count++;
            } else break;
        }

        for (var i = 1; i < 4; i++) {
            if((lastPlaced - i - i*7) % 7 === 0) {
                break;
            } else 
            if (squares[lastPlaced-i-i*7] === squares[lastPlaced]) {
                count++;
            } else break;
        }

        //check diagonal 2

        for (var i = 1; i < 4; i++) {
            if((lastPlaced + i - i*7) % 7 === 0) {
                break;
            } else 
            if (squares[lastPlaced+i-i*7] === squares[lastPlaced]) {
                count++;
            } else break;
        }

        for (var i = 1; i < 4; i++) {
            if((lastPlaced - i + i*7) % 7 === 0) {
                break;
            } else 
            if (squares[lastPlaced-i+i*7] === squares[lastPlaced]) {
                count++;
            } else break;
        }

        if(count >= 4) return squares[lastPlaced];

        return null;
    }

    function handleClick(i) {
        if (squares[i] || calculateWinner(squares)) return;
        console.log("Button " + i + " Clicked");
        const nextSquares = squares.slice();

        //logic
        if(squares[i]) return;
        var a = anythingBelow(i);
        if(a > 41) return;

        setLastPlaced(a);
        nextSquares[a] = xIsNext ? "R" : "Y";
        setSquares(nextSquares);
        setXIsNext(!xIsNext);
    }

    function anythingBelow(i) {
        if(i > 41) return i  - 7;
        if (squares[i + 7]) return i;
        else return anythingBelow(i + 7);
    }

    const getButtonLine = (num, start) => {
        var array = [   { id: 0, k: (num * start + 0)}, 
                        { id: 1, k: (num * start + 1)}, 
                        { id: 2, k: (num * start + 2)},
                        { id: 3, k: (num * start + 3)},
                        { id: 4, k: (num * start + 4)},
                        { id: 5, k: (num * start + 5)},
                        { id: 6, k: (num * start + 6)},]

        return array.map((val) => {return <Circle key={val.id} value={squares[val.k]} onSquareClick={() => handleClick(val.k)} />})
    }

    return (
        <>
            <div className="status">{status}</div>
            <div className="board-row">
                {getButtonLine(7, 0)}
            </div>
            <div className="board-row">
                {getButtonLine(7, 1)}
            </div>
            <div className="board-row">
                {getButtonLine(7, 2)}
            </div>
            <div className="board-row">
                {getButtonLine(7, 3)}
            </div>
            <div className="board-row">
                {getButtonLine(7, 4)}
            </div>
            <div className="board-row">
                {getButtonLine(7, 5)}
            </div>
        </>
    );
}

function Circle({ value, onSquareClick }) {
    return !value ? <button className="square" onClick={onSquareClick}></button> : <button className="square" onClick={onSquareClick}><div className={value} /></button>
}
