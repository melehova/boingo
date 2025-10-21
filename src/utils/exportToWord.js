import html2canvas from 'html2canvas';
import { Document, Packer, Paragraph, ImageRun } from 'docx';
import { saveAs } from 'file-saver';

export const exportCardsToWord = async () => {
  const cardsContainer = document.getElementById('bingo-cards-container');
  
  if (!cardsContainer) {
    alert('No cards to export. Please generate cards first.');
    return;
  }

  const cards = cardsContainer.querySelectorAll('.bingo-card');
  
  if (cards.length === 0) {
    alert('No cards to export. Please generate cards first.');
    return;
  }

  try {
    const imageRuns = [];

    // Convert each card to an image
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      
      // Capture the card as an image
      const canvas = await html2canvas(card, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false
      });

      // Convert canvas to blob
      const blob = await new Promise((resolve) => {
        canvas.toBlob(resolve, 'image/png');
      });

      // Convert blob to array buffer
      const arrayBuffer = await blob.arrayBuffer();

      // Add image to document
      imageRuns.push(
        new Paragraph({
          children: [
            new ImageRun({
              data: arrayBuffer,
              transformation: {
                width: 500,
                height: 500,
              },
            }),
          ],
          spacing: {
            after: 200,
          },
        })
      );

      // Add page break after each card except the last one
      if (i < cards.length - 1) {
        imageRuns.push(
          new Paragraph({
            pageBreakBefore: true,
          })
        );
      }
    }

    // Create the document
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: imageRuns,
        },
      ],
    });

    // Generate and save the document
    const blob = await Packer.toBlob(doc);
    saveAs(blob, `bingo-cards-${Date.now()}.docx`);
    
    alert('Bingo cards exported successfully!');
  } catch (error) {
    console.error('Error exporting cards:', error);
    alert('Error exporting cards. Please try again.');
  }
};
