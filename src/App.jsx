import { useState } from 'react';
import BingoGenerator from './components/BingoGenerator';
import CallList from './components/CallList';
import { exportCardsToWord } from './utils/exportToWord';
import './App.css';

function App() {
  const [wordInput, setWordInput] = useState('');
  const [words, setWords] = useState([]);
  const [numCards, setNumCards] = useState(5);
  const [callListInput, setCallListInput] = useState('');
  const [callList, setCallList] = useState([]);
  const [useCustomCallList, setUseCustomCallList] = useState(false);
  const [cardsGenerated, setCardsGenerated] = useState(false);

  const handleWordsSubmit = (e) => {
    e.preventDefault();
    const wordArray = wordInput
      .split('\n')
      .map((w) => w.trim())
      .filter((w) => w.length > 0);
    
    if (wordArray.length < 24) {
      alert('Please enter at least 24 words (one per line) for a 5x5 bingo card.');
      return;
    }
    
    setWords(wordArray);
    if (!useCustomCallList) {
      setCallList(wordArray);
    }
  };

  const handleCallListSubmit = (e) => {
    e.preventDefault();
    const callArray = callListInput
      .split('\n')
      .map((w) => w.trim())
      .filter((w) => w.length > 0);
    
    setCallList(callArray);
  };

  const handleExport = async () => {
    if (!cardsGenerated) {
      alert('Please generate cards first before exporting.');
      return;
    }
    await exportCardsToWord();
  };

  const handleCardsGenerated = () => {
    setCardsGenerated(true);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎯 Bingo Card Generator</h1>
        <p>Create custom bingo cards and manage your call list</p>
      </header>

      <div className="app-container">
        <div className="input-section">
          <div className="input-card">
            <h2>1. Enter Words</h2>
            <form onSubmit={handleWordsSubmit}>
              <textarea
                className="word-input"
                value={wordInput}
                onChange={(e) => setWordInput(e.target.value)}
                placeholder="Enter words (one per line)&#10;Minimum 24 words for a 5x5 card&#10;Example:&#10;Apple&#10;Banana&#10;Cherry&#10;..."
                rows={10}
              />
              <div className="input-group">
                <label htmlFor="numCards">Number of Cards:</label>
                <input
                  id="numCards"
                  type="number"
                  min="1"
                  max="50"
                  value={numCards}
                  onChange={(e) => setNumCards(parseInt(e.target.value) || 1)}
                  className="number-input"
                />
              </div>
              <button type="submit" className="submit-button">
                Set Words
              </button>
            </form>
          </div>

          {words.length > 0 && (
            <div className="input-card">
              <h2>2. Configure Call List</h2>
              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={useCustomCallList}
                    onChange={(e) => setUseCustomCallList(e.target.checked)}
                  />
                  Use Custom Call List (different from card words)
                </label>
              </div>

              {useCustomCallList && (
                <form onSubmit={handleCallListSubmit}>
                  <textarea
                    className="word-input"
                    value={callListInput}
                    onChange={(e) => setCallListInput(e.target.value)}
                    placeholder="Enter call list items (one per line)&#10;These can be associations or hints&#10;Example:&#10;Red fruit&#10;Yellow fruit&#10;Red stone fruit&#10;..."
                    rows={8}
                  />
                  <button type="submit" className="submit-button">
                    Set Call List
                  </button>
                </form>
              )}

              <div className="words-preview">
                <h3>Words for Cards: {words.length}</h3>
                <div className="words-preview-list">
                  {words.slice(0, 10).join(', ')}
                  {words.length > 10 && '...'}
                </div>
              </div>
            </div>
          )}
        </div>

        {words.length > 0 && (
          <>
            <div className="generator-section">
              <h2>3. Generate Cards</h2>
              <BingoGenerator
                words={words}
                numCards={numCards}
                onCardsGenerated={handleCardsGenerated}
              />
              {cardsGenerated && (
                <button className="export-button" onClick={handleExport}>
                  📥 Export to Word Document
                </button>
              )}
            </div>

            {callList.length > 0 && (
              <div className="call-list-section">
                <CallList
                  items={callList}
                  title={useCustomCallList ? 'Custom Call List' : 'Call List (from card words)'}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
