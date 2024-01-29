const fs = require('fs').promises;
const {resizeImage, processImagesBatch} = require('../src/resizer');

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
    const outputPath = 'test/output/resized.png';
    await resizeImage('test/images/sample.png', outputPath, { width: 100, height: 100 });
    expect(await fileExists(outputPath)).toBeTruthy();
    // Additional dimension checks can be implemented
  });

  // Grayscale Conversion
  it('should convert an image to grayscale', async () => {
    const outputPath = 'test/output/grayscale.png';
    await resizeImage('test/images/sample.png', outputPath, { grayscale: true });
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
    await resizeImage('test/images/sample.png', outputPath, { flip: true });
    expect(await fileExists(outputPath)).toBeTruthy();
    // Additional checks for flip can be implemented
  });

  // Flop
  it('should flop an image horizontally', async () => {
    const outputPath = 'test/output/flopped.png';
    await resizeImage('test/images/sample.png', outputPath, { flop: true });
    expect(await fileExists(outputPath)).toBeTruthy();
    // Additional checks for flop can be implemented
  });

  // Blur
  it('should apply blur to an image', async () => {
    const outputPath = 'test/output/blurred.png';
    await resizeImage('test/images/sample.png', outputPath, { blur: 5 });
    expect(await fileExists(outputPath)).toBeTruthy();
    // Additional checks for blur effect can be implemented
  });

  // Error Handling
  it('should handle non-existent input file', async () => {
    const result = await resizeImage('path/to/nonexistent.jpg', 'path/to/output.jpg', {});
    expect(result.status).toBe('Failed');
    expect(result.error).toMatch(/(not found|no such file|does not exist)/i);
  });

  it('should handle invalid output path', async () => {
    const result = await processImage('test/input/sample.jpg', '/invalid/path/output.jpg', {});
    expect(result.status).toBe('Failed');
    expect(result.error).toMatch(/(invalid path|permission denied|unwritable)/i);
  });

  it('should handle unsupported image formats', async () => {
    const result = await processImage('path/to/unsupported.bmp', 'path/to/output.jpg', {});
    expect(result.status).toBe('Failed');
    expect(result.error).toMatch(/unsupported format/i);
  });

  it('should handle processing errors', async () => {
    const result = await processImage('test/images/corrupted.jpg', 'path/to/output.jpg', {});
    expect(result.status).toBe('Failed');
    expect(result.error).toBeTruthy();
  });
  
  
  

  // Add more tests for other functionalities and edge cases as needed

});

describe('Batch Image Conversion', () => {
  it('should convert multiple images to a different format', async () => {
    const images = [
      { inputPath: 'test/images/sample1.jpg', outputPath: 'test/output/sample1.png' },
      { inputPath: 'test/images/sample2.png', outputPath: 'test/output/sample2.jpg' }
      // Add more images as needed
    ];

    const options = { format: 'desired_format' }; // Replace 'desired_format' with actual format
    const results = await processImagesBatch(images, options);

    for (const result of results) {
      expect(result.status).toBe('Success');
      expect(await fileExists(result.outputPath)).toBeTruthy();
      // Additional check: Confirm the output file is in the correct format
    }
  });

  // More tests for error cases or specific format scenarios
});

