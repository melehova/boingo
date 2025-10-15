// State management
let generatedCards = [];
let callList = [];
let customCallList = [];
let shuffledCallList = [];
let currentCallIndex = 0;

// DOM Elements
const wordsInput = document.getElementById('words-input');
const callListInput = document.getElementById('call-list-input');
const cardCountInput = document.getElementById('card-count');
const generateBtn = document.getElementById('generate-btn');
const cardsSection = document.getElementById('cards-section');
const cardsContainer = document.getElementById('cards-container');
const callListSection = document.getElementById('call-list-section');
const callListDisplay = document.getElementById('call-list-display');
const currentCallDisplay = document.getElementById('call-display');
const callCounterDisplay = document.getElementById('call-counter');
const shuffleBtn = document.getElementById('shuffle-btn');
const nextCallBtn = document.getElementById('next-call-btn');
const resetCallsBtn = document.getElementById('reset-calls-btn');
const exportBtn = document.getElementById('export-btn');

// Utility Functions
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function generateBingoCard(words, cardNumber) {
    const cardSize = 5;
    const totalCells = cardSize * cardSize;
    const freeSpaceIndex = Math.floor(totalCells / 2); // Center cell
    
    // Ensure we have enough unique words
    if (words.length < totalCells - 1) {
        throw new Error(`Not enough words! Need at least ${totalCells - 1} words, got ${words.length}`);
    }
    
    // Shuffle and select words for this card
    const shuffled = shuffleArray(words);
    const selectedWords = shuffled.slice(0, totalCells - 1);
    
    // Insert free space in the middle
    selectedWords.splice(freeSpaceIndex, 0, 'FREE');
    
    return {
        number: cardNumber,
        words: selectedWords
    };
}

function renderBingoCard(card) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'bingo-card';
    cardDiv.id = `card-${card.number}`;
    
    const title = document.createElement('div');
    title.className = 'card-title';
    title.textContent = 'BINGO';
    
    const grid = document.createElement('div');
    grid.className = 'bingo-grid';
    
    card.words.forEach((word, index) => {
        const cell = document.createElement('div');
        cell.className = 'bingo-cell';
        if (word === 'FREE') {
            cell.classList.add('free');
        }
        cell.textContent = word;
        grid.appendChild(cell);
    });
    
    cardDiv.appendChild(title);
    cardDiv.appendChild(grid);
    
    return cardDiv;
}

function displayCallList() {
    callListDisplay.innerHTML = '';
    
    shuffledCallList.forEach((item, index) => {
        const callItem = document.createElement('div');
        callItem.className = 'call-item';
        if (index < currentCallIndex) {
            callItem.classList.add('called');
        }
        
        const badge = document.createElement('span');
        badge.className = 'call-number-badge';
        badge.textContent = index + 1;
        
        const text = document.createElement('span');
        text.className = 'call-text';
        text.textContent = item.display;
        
        callItem.appendChild(badge);
        callItem.appendChild(text);
        callListDisplay.appendChild(callItem);
    });
}

// Event Handlers
generateBtn.addEventListener('click', () => {
    // Get and validate words
    const wordsText = wordsInput.value.trim();
    if (!wordsText) {
        alert('Please enter at least 24 words (one per line)');
        return;
    }
    
    const words = wordsText.split('\n')
        .map(w => w.trim())
        .filter(w => w.length > 0);
    
    if (words.length < 24) {
        alert(`Please enter at least 24 words. You have ${words.length} words.`);
        return;
    }
    
    // Get custom call list if provided
    const customCallText = callListInput.value.trim();
    if (customCallText) {
        customCallList = customCallText.split('\n')
            .map(w => w.trim())
            .filter(w => w.length > 0);
        
        if (customCallList.length !== words.length) {
            alert(`Custom call list must have the same number of items as the words list (${words.length})`);
            return;
        }
    } else {
        customCallList = [];
    }
    
    // Get number of cards
    const cardCount = parseInt(cardCountInput.value);
    if (cardCount < 1 || cardCount > 50) {
        alert('Number of cards must be between 1 and 50');
        return;
    }
    
    try {
        // Generate cards
        generatedCards = [];
        cardsContainer.innerHTML = '';
        
        for (let i = 1; i <= cardCount; i++) {
            const card = generateBingoCard(words, i);
            generatedCards.push(card);
            const cardElement = renderBingoCard(card);
            cardsContainer.appendChild(cardElement);
        }
        
        // Setup call list
        callList = words.map((word, index) => ({
            word: word,
            display: customCallList.length > 0 ? customCallList[index] : word
        }));
        
        shuffledCallList = shuffleArray(callList);
        currentCallIndex = 0;
        
        // Display sections
        cardsSection.style.display = 'block';
        callListSection.style.display = 'block';
        
        // Reset call display
        currentCallDisplay.textContent = 'Click "Next Call" to start';
        callCounterDisplay.textContent = '0';
        
        displayCallList();
        
        // Scroll to cards
        cardsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
    } catch (error) {
        alert(error.message);
    }
});

shuffleBtn.addEventListener('click', () => {
    if (callList.length === 0) {
        alert('Please generate cards first');
        return;
    }
    
    // Reshuffle the call list
    shuffledCallList = shuffleArray(callList);
    currentCallIndex = 0;
    currentCallDisplay.textContent = 'Click "Next Call" to start';
    callCounterDisplay.textContent = '0';
    displayCallList();
});

nextCallBtn.addEventListener('click', () => {
    if (shuffledCallList.length === 0) {
        alert('Please generate cards first');
        return;
    }
    
    if (currentCallIndex >= shuffledCallList.length) {
        alert('All items have been called!');
        return;
    }
    
    const currentCall = shuffledCallList[currentCallIndex];
    currentCallDisplay.textContent = currentCall.display;
    currentCallIndex++;
    callCounterDisplay.textContent = currentCallIndex;
    
    displayCallList();
});

resetCallsBtn.addEventListener('click', () => {
    if (shuffledCallList.length === 0) {
        alert('Please generate cards first');
        return;
    }
    
    currentCallIndex = 0;
    currentCallDisplay.textContent = 'Click "Next Call" to start';
    callCounterDisplay.textContent = '0';
    displayCallList();
});

exportBtn.addEventListener('click', async () => {
    if (generatedCards.length === 0) {
        alert('Please generate cards first');
        return;
    }
    
    try {
        exportBtn.disabled = true;
        exportBtn.textContent = 'Exporting...';
        
        // Create HTML content for Word document
        let htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { 
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        .bingo-card {
            page-break-after: always;
            margin: 40px auto;
            width: 600px;
        }
        .card-title {
            text-align: center;
            font-size: 48px;
            font-weight: bold;
            color: #667eea;
            margin-bottom: 20px;
            letter-spacing: 0.5em;
        }
        .bingo-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 2px;
            background: #667eea;
            border: 3px solid #667eea;
        }
        .bingo-cell {
            background: white;
            aspect-ratio: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 10px;
            font-size: 16px;
            font-weight: 500;
            text-align: center;
            min-height: 100px;
        }
        .bingo-cell.free {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            font-weight: bold;
            font-size: 24px;
        }
    </style>
</head>
<body>
`;
        
        // Add each card
        generatedCards.forEach(card => {
            htmlContent += `
    <div class="bingo-card">
        <div class="card-title">BINGO</div>
        <div class="bingo-grid">
`;
            card.words.forEach(word => {
                const freeClass = word === 'FREE' ? ' free' : '';
                htmlContent += `            <div class="bingo-cell${freeClass}">${word}</div>\n`;
            });
            
            htmlContent += `        </div>
    </div>
`;
        });
        
        htmlContent += `
</body>
</html>
`;
        
        // Create blob and download
        const blob = new Blob([htmlContent], { type: 'application/vnd.ms-word' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'bingo-cards.doc';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        exportBtn.disabled = false;
        exportBtn.textContent = 'Export to Word';
        
    } catch (error) {
        console.error('Export error:', error);
        alert('Error exporting to Word: ' + error.message);
        exportBtn.disabled = false;
        exportBtn.textContent = 'Export to Word';
    }
});

// Initialize with example data
window.addEventListener('DOMContentLoaded', () => {
    const exampleWords = [
        'Apple', 'Banana', 'Cherry', 'Date', 'Elderberry',
        'Fig', 'Grape', 'Honeydew', 'Kiwi', 'Lemon',
        'Mango', 'Nectarine', 'Orange', 'Papaya', 'Quince',
        'Raspberry', 'Strawberry', 'Tangerine', 'Ugli', 'Vanilla',
        'Watermelon', 'Xigua', 'Yuzu', 'Zucchini', 'Apricot'
    ];
    
    wordsInput.value = exampleWords.join('\n');
});
