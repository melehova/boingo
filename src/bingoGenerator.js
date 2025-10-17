/**
 * Shuffles an array using Fisher-Yates algorithm
 */
export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Generates a single bingo card (5x5 grid with FREE in center)
 * @param {string[]} words - Array of words to use
 * @returns {string[]} - Array of 25 words (including FREE)
 */
export function generateSingleCard(words) {
  const shuffled = shuffleArray(words);
  const card = shuffled.slice(0, 24);
  
  // Insert FREE space in the middle (index 12)
  card.splice(12, 0, 'FREE');
  
  return card;
}

/**
 * Generates multiple unique bingo cards
 * @param {string[]} words - Array of words to use
 * @param {number} count - Number of cards to generate
 * @returns {string[][]} - Array of cards
 */
export function generateBingoCards(words, count) {
  const cards = [];
  
  for (let i = 0; i < count; i++) {
    cards.push(generateSingleCard(words));
  }
  
  return cards;
}
