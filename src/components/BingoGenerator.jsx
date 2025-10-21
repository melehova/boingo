import React, { useState } from 'react';
import BingoCard from './BingoCard';
import '../styles/BingoGenerator.css';

const BingoGenerator = ({ words, numCards, onCardsGenerated }) => {
  const [cards, setCards] = useState([]);

  const generateCards = () => {
    const newCards = [];
    for (let i = 0; i < numCards; i++) {
      newCards.push({
        id: i + 1,
        words: [...words]
      });
    }
    setCards(newCards);
    if (onCardsGenerated) {
      onCardsGenerated(newCards);
    }
  };

  return (
    <div className="bingo-generator">
      <button className="generate-button" onClick={generateCards}>
        Generate {numCards} Bingo Card{numCards !== 1 ? 's' : ''}
      </button>
      
      <div className="cards-container" id="bingo-cards-container">
        {cards.map((card) => (
          <BingoCard
            key={card.id}
            cardNumber={card.id}
            words={card.words}
            className="generated-card"
          />
        ))}
      </div>
    </div>
  );
};

export default BingoGenerator;
