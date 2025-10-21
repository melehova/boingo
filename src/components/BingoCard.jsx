import React from 'react';
import '../styles/BingoCard.css';

const BingoCard = ({ words, cardNumber, className = '' }) => {
  // Create a 5x5 grid with center as FREE space
  const gridSize = 5;
  const totalCells = gridSize * gridSize;
  const freeCellIndex = Math.floor(totalCells / 2);

  // Shuffle words for this card
  const shuffledWords = [...words].sort(() => Math.random() - 0.5);
  
  const cells = [];
  let wordIndex = 0;

  for (let i = 0; i < totalCells; i++) {
    if (i === freeCellIndex) {
      cells.push(<div key={i} className="bingo-cell free-cell">FREE</div>);
    } else {
      cells.push(
        <div key={i} className="bingo-cell">
          {shuffledWords[wordIndex] || ''}
        </div>
      );
      wordIndex++;
    }
  }

  return (
    <div className={`bingo-card ${className}`}>
      <div className="card-header">BINGO</div>
      <div className="card-number">Card #{cardNumber}</div>
      <div className="bingo-grid">{cells}</div>
    </div>
  );
};

export default BingoCard;
