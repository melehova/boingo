import React, { useState, useEffect } from 'react';
import '../styles/CallList.css';

const CallList = ({ items, title = 'Call List' }) => {
  const [shuffledItems, setShuffledItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isShuffling, setIsShuffling] = useState(false);

  useEffect(() => {
    setShuffledItems([...items]);
    setCurrentIndex(-1);
  }, [items]);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleShuffle = () => {
    setIsShuffling(true);
    const shuffled = shuffleArray(items);
    setShuffledItems(shuffled);
    setCurrentIndex(-1);
    setTimeout(() => setIsShuffling(false), 300);
  };

  const handleNext = () => {
    if (currentIndex < shuffledItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleReset = () => {
    setCurrentIndex(-1);
  };

  return (
    <div className="call-list">
      <h2>{title}</h2>
      
      <div className="call-list-controls">
        <button 
          className="control-button shuffle-button" 
          onClick={handleShuffle}
          disabled={isShuffling}
        >
          {isShuffling ? 'Shuffling...' : 'Shuffle'}
        </button>
        <button 
          className="control-button next-button" 
          onClick={handleNext}
          disabled={currentIndex >= shuffledItems.length - 1}
        >
          Next Call
        </button>
        <button 
          className="control-button reset-button" 
          onClick={handleReset}
        >
          Reset
        </button>
      </div>

      {currentIndex >= 0 && (
        <div className="current-call">
          <div className="current-call-label">Current Call:</div>
          <div className="current-call-item">{shuffledItems[currentIndex]}</div>
          <div className="call-counter">
            {currentIndex + 1} of {shuffledItems.length}
          </div>
        </div>
      )}

      <div className="call-list-items">
        <h3>All Items ({shuffledItems.length})</h3>
        <div className="items-grid">
          {shuffledItems.map((item, index) => (
            <div 
              key={index} 
              className={`call-item ${index <= currentIndex ? 'called' : ''} ${index === currentIndex ? 'current' : ''}`}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CallList;
