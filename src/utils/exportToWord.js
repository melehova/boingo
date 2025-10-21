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
      
      // Capture the card as an image with improved settings
      const canvas = await html2canvas(card, {
        backgroundColor: '#ffffff',
        scale: 3, // Increased scale for better quality
        logging: false,
        useCORS: true,
        allowTaint: true,
        removeContainer: true,
        imageTimeout: 0,
        // Force high quality rendering
        letterRendering: true
      });

      // Convert canvas to blob with high quality
      const blob = await new Promise((resolve) => {
        canvas.toBlob(resolve, 'image/png', 1.0); // Max quality
      });

      // Convert blob to array buffer
      const arrayBuffer = await blob.arrayBuffer();

      // Calculate proper dimensions to maintain aspect ratio
      const aspectRatio = canvas.width / canvas.height;
      const imageWidth = 550; // Width in points (approx 7.6 inches)
      const imageHeight = imageWidth / aspectRatio;

      // Add image to document
      imageRuns.push(
        new Paragraph({
          children: [
            new ImageRun({
              data: arrayBuffer,
              transformation: {
                width: imageWidth,
                height: imageHeight,
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
