const fs = require('fs').promises;
const resizeImage = require('../src/resizer');

// Helper function to check if file exists and is not empty
async function fileExists(filePath) {
  try {
    const stats = await fs.stat(filePath);
    return stats.size > 0;
  } catch (error) {
    return false;
  }
}

describe('Image Resizing and Editing', () => {
  
  // Resizing
  it('should resize an image correctly', async () => {
    const outputPath = 'test/output/resized.jpg';
    await resizeImage('test/images/sample.jpg', outputPath, { width: 100, height: 100 });
    expect(await fileExists(outputPath)).toBeTruthy();
    // Additional dimension checks can be implemented
  });

  // Grayscale Conversion
  it('should convert an image to grayscale', async () => {
    const outputPath = 'test/output/grayscale.jpg';
    await resizeImage('test/images/sample.jpg', outputPath, { grayscale: true });
    expect(await fileExists(outputPath)).toBeTruthy();
    // Additional checks for color change can be implemented
  });

  // Format Conversion
  it.each([
    ['jpg', 'png'],
    ['png', 'jpg'],
    ['jpg', 'webp']
  ])('should convert a %s image to %s format', async (inputFormat, outputFormat) => {
    const inputPath = `test/images/sample.${inputFormat}`;
    const outputPath = `test/output/output.${outputFormat}`;
    await resizeImage(inputPath, outputPath, { format: outputFormat });
    expect(await fileExists(outputPath)).toBeTruthy();
  });

  // Flip
  it('should flip an image vertically', async () => {
    const outputPath = 'test/output/flipped.jpg';
    await resizeImage('test/images/sample.jpg', outputPath, { flip: true });
    expect(await fileExists(outputPath)).toBeTruthy();
    // Additional checks for flip can be implemented
  });

  // Flop
  it('should flop an image horizontally', async () => {
    const outputPath = 'test/output/flopped.jpg';
    await resizeImage('test/images/sample.jpg', outputPath, { flop: true });
    expect(await fileExists(outputPath)).toBeTruthy();
    // Additional checks for flop can be implemented
  });

  // Blur
  it('should apply blur to an image', async () => {
    const outputPath = 'test/output/blurred.jpg';
    await resizeImage('test/images/sample.jpg', outputPath, { blur: 5 });
    expect(await fileExists(outputPath)).toBeTruthy();
    // Additional checks for blur effect can be implemented
  });

  // Error Handling
  it('should handle non-existent input file', async () => {
    const outputPath = 'test/output/nonexistent.jpg';
    await expect(resizeImage('test/images/nonexistent.jpg', outputPath, { width: 100, height: 100 })).rejects.toThrow();
  });

  // Add more tests for other functionalities and edge cases as needed

});

