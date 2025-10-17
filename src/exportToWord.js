import { Document, Packer, Paragraph, Table, TableCell, TableRow, WidthType, AlignmentType, HeadingLevel, BorderStyle } from 'docx';
import { saveAs } from 'file-saver';

/**
 * Exports bingo cards to a Word document
 * @param {string[][]} cards - Array of bingo cards
 */
export async function exportToWord(cards) {
  const children = [];
  
  // Title
  children.push(
    new Paragraph({
      text: 'Bingo Cards',
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: {
        after: 400,
      },
    })
  );
  
  // Generate each card
  cards.forEach((card, index) => {
    // Card title
    children.push(
      new Paragraph({
        text: `Card ${index + 1}`,
        heading: HeadingLevel.HEADING_2,
        alignment: AlignmentType.CENTER,
        spacing: {
          before: 200,
          after: 200,
        },
      })
    );
    
    // Create 5x5 table for the card
    const rows = [];
    for (let i = 0; i < 5; i++) {
      const cells = [];
      for (let j = 0; j < 5; j++) {
        const wordIndex = i * 5 + j;
        const word = card[wordIndex];
        
        cells.push(
          new TableCell({
            children: [
              new Paragraph({
                text: word,
                alignment: AlignmentType.CENTER,
              })
            ],
            width: {
              size: 20,
              type: WidthType.PERCENTAGE,
            },
            shading: word === 'FREE' ? {
              fill: '646cff',
              color: 'FFFFFF',
            } : undefined,
          })
        );
      }
      rows.push(new TableRow({ children: cells }));
    }
    
    const table = new Table({
      rows: rows,
      width: {
        size: 100,
        type: WidthType.PERCENTAGE,
      },
      borders: {
        top: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
        bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
        left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
        right: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
        insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
        insideVertical: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
      },
    });
    
    children.push(table);
    
    // Add page break after each card except the last
    if (index < cards.length - 1) {
      children.push(
        new Paragraph({
          text: '',
          pageBreakBefore: true,
        })
      );
    }
  });
  
  // Create document
  const doc = new Document({
    sections: [{
      properties: {},
      children: children,
    }],
  });
  
  // Generate and save
  const blob = await Packer.toBlob(doc);
  saveAs(blob, `bingo-cards-${Date.now()}.docx`);
}
