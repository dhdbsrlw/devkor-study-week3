import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { useState } from 'react';
let resetButton;

const Square = ({value, onClick}) =>{
  return (
    <button className="square" onClick = {onClick}>
      {value}
     </button>
  );
}

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(''))
  const [next, setNext] = useState('X');
  
  const hasWinner = () => {
    const lines = [
        [0, 1, 2], // row
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6], // column
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8], // diagonal
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; ++i){
        const [f, s, t] = lines[i];
        if (squares[f] != '' && squares[f] == squares[s] && squares[f] == squares[t])
        return squares[f] 
    }

    for (let i = 0; i < 9; ++i){ // 과제 - 무승부 체크
        if (i === 8) return 'No Winner (TIE)'

        if (squares[i] != '') continue
        else break
    }

    return false;
  }

  const handleClick = (i) => {
    if (hasWinner() || squares[i] != '') return;

    const sq = squares.slice()
    sq[i] = next;
    if (next === 'X') setNext('O')
    else setNext('X')
    setSquares(sq)
  }

  const renderSquare = (i) => {
    return <Square value = {squares[i]} onClick = {() => {handleClick(i)}}/>;
  }

  let status = 'Next player: ' + next;
  if (hasWinner()) {
    status = 'Winner: ' + hasWinner();
    setGameOver(); // 과제 - 게임 종료 시 재시작 버튼 생성
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

const setGameOver = () => { // 재시작 버튼 생성
    resetButton = document.createElement('button');
    resetButton.textContent = 'Start new game';
    document.body.appendChild(resetButton);
    resetButton.addEventListener('click', resetGame);
}

const resetGame = () => { // 재시작 버튼 클릭시 동작 (미완)
    <Board /> 
}

const Game = () =>  {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/*todo*/}</ol>
      </div>
    </div>
  );
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);