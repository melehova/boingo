import React from 'react';
import '../styles/BingoCard.css';

const BingoCard = ({ words, cardNumber, className = '' }) => {
  // Create a 5x5 grid with center as FREE space
  const gridSize = 5;
  const totalCells = gridSize * gridSize;
  const freeCellIndex = Math.floor(totalCells / 2);

  // Shuffle words for this card
  const shuffledWords = [...words].sort(() => Math.random() - 0.5);
  
  // Calculate font size based on word length
  const calculateFontSize = (word) => {
    if (!word) return 14;
    const length = word.length;
    
    // Base font size calculation: shorter words get bigger fonts
    // Adjust these values to fine-tune the sizing
    if (length <= 3) return 22;
    if (length <= 5) return 20;
    if (length <= 7) return 18;
    if (length <= 9) return 16;
    if (length <= 11) return 14;
    if (length <= 14) return 12;
    if (length <= 18) return 10;
    return 9;
  };
  
  const cells = [];
  let wordIndex = 0;

  for (let i = 0; i < totalCells; i++) {
    if (i === freeCellIndex) {
      cells.push(<div key={i} className="bingo-cell free-cell">FREE</div>);
    } else {
      const word = shuffledWords[wordIndex] || '';
      const fontSize = calculateFontSize(word);
      cells.push(
        <div 
          key={i} 
          className="bingo-cell"
          style={{ fontSize: `${fontSize}px` }}
        >
          {word}
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
