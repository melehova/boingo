# Boingo - Bingo Card Generator

A modern web-based bingo card generator built with JavaScript and Vite.

## Features

- 📝 **Custom Word Lists**: Enter your own words or phrases (one per line)
- 🎴 **Multiple Cards**: Generate any number of 5x5 bingo cards with FREE space in center
- 🎲 **Random Call List**: Shuffled randomizer for calling items during the game
- 🎯 **Call Tracking**: Visual tracking of which items have been called
- 🔄 **Custom Call Lists**: Optional feature to use associations/descriptions instead of actual words
- 📄 **Word Export**: Export all generated cards to a Word document (.docx)
- 🎨 **Responsive Design**: Works on desktop and mobile devices

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

1. **Enter Words**: Type your words or phrases in the "Word List" textarea (one per line). You need at least 24 words for standard 5x5 bingo cards.

2. **Set Card Count**: Choose how many bingo cards you want to generate (default is 4).

3. **Optional - Custom Call List**: 
   - Check the "Use custom call list" checkbox if you want to call descriptions instead of the actual words
   - Enter the same number of custom descriptions (e.g., "A red fruit" instead of "Apple")

4. **Generate**: Click "Generate Cards" to create your bingo cards.

5. **Play the Game**:
   - Use the "Next Call" button to randomly call items
   - Called items are highlighted in the list
   - The current call is displayed prominently
   - Use "Shuffle List" to randomize the order
   - Use "Reset" to start over

6. **Export**: Click "Export to Word Document" to download all cards as a .docx file.

## Security

All user input is properly sanitized to prevent XSS (Cross-Site Scripting) attacks.

## License

MIT
