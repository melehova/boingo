# 🎯 Boingo - Bingo Card Generator

A modern, feature-rich bingo card generator built with React and Vite. Create custom bingo cards, manage call lists, and export to Word documents.

## ✨ Features

- **Custom Word Lists** - Enter your own words for personalized bingo cards
- **Multiple Card Generation** - Generate 1-50 cards at once
- **Randomized Cards** - Each card has unique word placement with a FREE center space
- **Call List Manager** - Shuffle, call items sequentially, and track progress
- **Custom Call Lists** - Use different words for calling (e.g., "Red fruit" → "Apple")
- **Word Export** - Export all cards as images in a Word document (.docx)
- **Modern UI** - Beautiful, responsive design that works on all devices

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📖 How to Use

1. **Enter Words**
   - Add at least 24 words (one per line) in the text area
   - Set the number of bingo cards you want to generate (1-50)
   - Click "Set Words"

2. **Configure Call List** (Optional)
   - Check "Use Custom Call List" if you want different words for calling
   - Enter association words or hints (e.g., "Yellow fruit" instead of "Banana")
   - Click "Set Call List"

3. **Generate Cards**
   - Click "Generate X Bingo Cards" button
   - Cards will appear with randomized word placement
   - Each card has a FREE space in the center

4. **Manage Call List**
   - **Shuffle** - Randomize the call order
   - **Next Call** - Reveal the next item to call
   - **Reset** - Start over from the beginning
   - Called items are highlighted in green
   - Current item is highlighted in orange

5. **Export to Word**
   - Click "📥 Export to Word Document"
   - Cards are converted to images and saved as a .docx file
   - Each card appears on its own page

## 🛠️ Tech Stack

- **React 19** - UI library
- **Vite 7** - Build tool and dev server
- **docx** - Word document generation
- **html2canvas** - HTML to image conversion
- **file-saver** - File download utility

## 📁 Project Structure

```
src/
├── components/
│   ├── BingoCard.jsx       # Individual bingo card display
│   ├── BingoGenerator.jsx  # Card generation logic
│   └── CallList.jsx        # Call list with randomizer
├── styles/
│   ├── BingoCard.css       # Card styling
│   ├── BingoGenerator.css  # Generator styling
│   └── CallList.css        # Call list styling
├── utils/
│   └── exportToWord.js     # Word export functionality
├── App.jsx                 # Main application
├── App.css                 # Application styling
└── index.css               # Global styles
```

## 🎮 Example Use Cases

- **Educational Games** - Vocabulary practice, math problems, historical facts
- **Team Building** - Ice breaker activities, company trivia
- **Event Entertainment** - Party games, wedding activities
- **Training** - Product names, technical terms, company culture

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
