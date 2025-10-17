import './style.css'
import { generateBingoCards, shuffleArray } from './bingoGenerator.js'
import { exportToWord } from './exportToWord.js'

let currentWords = [];
let currentCallList = [];
let generatedCards = [];
let callListState = {
  words: [],
  currentIndex: -1,
  calledIndices: []
};

// Helper function to escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function initApp() {
  const app = document.querySelector('#app');
  
  app.innerHTML = `
    <h1>🎯 Boingo - Bingo Card Generator</h1>
    
    <div class="container">
      <!-- Input Section -->
      <div class="section">
        <h2>Setup</h2>
        
        <div class="form-group">
          <label for="wordList">
            Word List (one word/phrase per line)
          </label>
          <textarea id="wordList" placeholder="Enter your words or phrases here...
Example:
Apple
Banana
Cherry
..."></textarea>
          <div class="helper-text">Enter at least 24 words to generate standard 5x5 bingo cards</div>
        </div>
        
        <div class="form-group">
          <label for="cardCount">
            Number of Cards to Generate
          </label>
          <input type="number" id="cardCount" value="4" min="1" max="100" />
        </div>
        
        <div class="form-group">
          <label>
            <input type="checkbox" id="useCustomCallList" />
            Use custom call list (optional)
          </label>
          <div class="helper-text">For games where you call associations instead of the actual words</div>
        </div>
        
        <div class="form-group" id="customCallListGroup" style="display: none;">
          <label for="callList">
            Custom Call List (one item per line, must match word list count)
          </label>
          <textarea id="callList" placeholder="Enter custom call items here...
Example:
A red fruit
A yellow fruit
A red fruit
..."></textarea>
        </div>
        
        <div class="button-group">
          <button id="generateBtn">Generate Cards</button>
        </div>
      </div>
      
      <!-- Generated Cards Section -->
      <div id="cardsSection" style="display: none;">
        <div class="section">
          <h2>Generated Bingo Cards</h2>
          <div class="button-group">
            <button id="exportBtn">Export to Word Document</button>
          </div>
          <div id="bingoCardsContainer" class="bingo-cards-container"></div>
        </div>
      </div>
      
      <!-- Call List Section -->
      <div id="callListSection" style="display: none;">
        <div class="section">
          <h2>Call List</h2>
          
          <div class="current-call">
            <div>Current Call:</div>
            <div class="current-call-word" id="currentCallWord">-</div>
            <div class="button-group" style="justify-content: center;">
              <button id="nextCallBtn">Next Call</button>
              <button id="shuffleCallListBtn">Shuffle List</button>
              <button id="resetCallListBtn">Reset</button>
            </div>
          </div>
          
          <div class="call-list-section">
            <h3>All Items:</h3>
            <div id="callListDisplay" class="call-list"></div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  setupEventListeners();
}

function setupEventListeners() {
  const useCustomCallListCheckbox = document.getElementById('useCustomCallList');
  const customCallListGroup = document.getElementById('customCallListGroup');
  const generateBtn = document.getElementById('generateBtn');
  
  useCustomCallListCheckbox.addEventListener('change', (e) => {
    customCallListGroup.style.display = e.target.checked ? 'block' : 'none';
  });
  
  generateBtn.addEventListener('click', handleGenerate);
}

function handleGenerate() {
  const wordListText = document.getElementById('wordList').value.trim();
  const cardCount = parseInt(document.getElementById('cardCount').value);
  const useCustomCallList = document.getElementById('useCustomCallList').checked;
  const callListText = document.getElementById('callList').value.trim();
  
  if (!wordListText) {
    alert('Please enter a word list!');
    return;
  }
  
  const words = wordListText.split('\n').map(w => w.trim()).filter(w => w);
  
  if (words.length < 24) {
    alert('Please enter at least 24 words to generate standard bingo cards!');
    return;
  }
  
  currentWords = words;
  
  // Handle custom call list
  if (useCustomCallList) {
    const callItems = callListText.split('\n').map(w => w.trim()).filter(w => w);
    if (callItems.length !== words.length) {
      alert(`Custom call list must have exactly ${words.length} items to match the word list!`);
      return;
    }
    currentCallList = callItems;
  } else {
    currentCallList = [...words];
  }
  
  // Generate cards
  generatedCards = generateBingoCards(words, cardCount);
  
  // Display cards
  displayCards(generatedCards);
  
  // Setup call list
  setupCallList(currentCallList);
  
  // Show sections
  document.getElementById('cardsSection').style.display = 'block';
  document.getElementById('callListSection').style.display = 'block';
  
  // Setup export button
  document.getElementById('exportBtn').addEventListener('click', handleExport);
}

function displayCards(cards) {
  const container = document.getElementById('bingoCardsContainer');
  
  container.innerHTML = cards.map((card, index) => `
    <div class="bingo-card" id="card-${index}">
      <h3>Card ${index + 1}</h3>
      <div class="bingo-grid">
        ${card.map(word => `
          <div class="bingo-cell ${word === 'FREE' ? 'free' : ''}">${escapeHtml(word)}</div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

function setupCallList(callList) {
  callListState = {
    words: shuffleArray([...callList]),
    currentIndex: -1,
    calledIndices: []
  };
  
  displayCallList();
  
  // Setup event listeners
  document.getElementById('nextCallBtn').addEventListener('click', nextCall);
  document.getElementById('shuffleCallListBtn').addEventListener('click', shuffleCallList);
  document.getElementById('resetCallListBtn').addEventListener('click', resetCallList);
}

function displayCallList() {
  const display = document.getElementById('callListDisplay');
  
  display.innerHTML = callListState.words.map((word, index) => {
    const isCalled = callListState.calledIndices.includes(index);
    return `<div class="call-item ${isCalled ? 'called' : ''}">${escapeHtml(word)}</div>`;
  }).join('');
}

function nextCall() {
  if (callListState.currentIndex >= callListState.words.length - 1) {
    alert('All items have been called!');
    return;
  }
  
  callListState.currentIndex++;
  callListState.calledIndices.push(callListState.currentIndex);
  
  const currentWord = callListState.words[callListState.currentIndex];
  document.getElementById('currentCallWord').textContent = currentWord;
  
  displayCallList();
}

function shuffleCallList() {
  if (callListState.calledIndices.length > 0) {
    if (!confirm('This will reset the call list. Continue?')) {
      return;
    }
  }
  
  callListState.words = shuffleArray([...currentCallList]);
  callListState.currentIndex = -1;
  callListState.calledIndices = [];
  document.getElementById('currentCallWord').textContent = '-';
  
  displayCallList();
}

function resetCallList() {
  callListState.currentIndex = -1;
  callListState.calledIndices = [];
  document.getElementById('currentCallWord').textContent = '-';
  
  displayCallList();
}

async function handleExport() {
  try {
    const exportBtn = document.getElementById('exportBtn');
    exportBtn.disabled = true;
    exportBtn.textContent = 'Exporting...';
    
    await exportToWord(generatedCards);
    
    exportBtn.disabled = false;
    exportBtn.textContent = 'Export to Word Document';
  } catch (error) {
    console.error('Export error:', error);
    alert('Failed to export: ' + error.message);
    
    const exportBtn = document.getElementById('exportBtn');
    exportBtn.disabled = false;
    exportBtn.textContent = 'Export to Word Document';
  }
}

// Initialize the app
initApp();
