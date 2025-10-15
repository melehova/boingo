# Boingo - Bingo Card Generator

A feature-rich web-based bingo card generator built with JavaScript. Create custom bingo cards for events, classrooms, parties, or any occasion where you need randomized bingo games.

## Features

### 🎯 Card Generation
- Generate multiple unique bingo cards (1-50 cards per batch)
- 5x5 grid with automatic "FREE" space in the center
- Accepts custom word lists (minimum 24 words required)
- Each card is randomly shuffled for uniqueness

### 📢 Call List with Randomizer
- Automatically generates a call list from your words
- Shuffle button to randomize the calling order
- "Next Call" feature to step through calls one at a time
- Visual tracking of called items with counter
- Reset button to start over

### 🎭 Custom Call List (Association Feature)
- Optional: Provide a separate list for calling
- Perfect for association games (e.g., call descriptions while cards show items)
- Example: Cards show fruit names, but you call out "Red fruit" for "Apple"
- Must match the number of words in the main list

### 📄 Export to Word Document
- Export all generated cards as a Word document
- Each card appears on its own page
- Preserves styling and layout
- Ready to print for physical games

### 🎨 Professional Interface
- Beautiful gradient design
- Responsive layout for all devices
- Easy-to-use controls
- Visual feedback for all actions

## Usage

1. Open `index.html` in a web browser
2. Enter your words (one per line) - at least 24 words required
3. (Optional) Enter custom call list for association games
4. Set the number of cards you want to generate
5. Click "Generate Cards"
6. Use the call list features to run your game
7. Export to Word when ready to print

## Technical Details

- Pure JavaScript (no frameworks required)
- HTML5 and CSS3
- No server-side components needed
- Works offline once loaded

## Example Use Cases

- **Classroom**: Educational bingo with vocabulary words
- **Events**: Ice breaker games with fun facts
- **Parties**: Themed bingo (movies, songs, etc.)
- **Training**: Professional development or team building
- **Association Games**: Call descriptions while players match to items

## Getting Started

Simply open `index.html` in any modern web browser. No installation or setup required!

## Browser Support

Works in all modern browsers that support:
- ES6 JavaScript
- CSS Grid
- Blob API
