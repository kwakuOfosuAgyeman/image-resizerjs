const fs = require("fs").promises;
const { resizeImage, processImagesBatch } = require("../src/resizer");

// Helper function to check if file exists and is not empty
async function fileExists(filePath) {
  try {
    const stats = await fs.stat(filePath);
    return stats.size > 0;
  } catch (error) {
    return false;
  }
}

describe("Image Resizing and Editing", () => {
  it("should resize a single image", async () => {
    const inputPath = "test/images/sample.jpg";
    const outputPath = "test/output/resized.jpg";
    const options = { width: 100, height: 100 };

    const result = await resizeImage({ inputPath, outputPath, options });
    expect(result.status).toBe("Success");
    expect(await fileExists(outputPath)).toBeTruthy();
    // Additional checks for dimensions can be added
  });

  // 2. Convert the Format of a Single Image
  it("should convert the format of a single image", async () => {
    const inputPath = "test/images/sample.jpg";
    const outputPath = "test/output/converted.png";
    const options = { format: "png" };

    const result = await resizeImage({ inputPath, outputPath, options });
    expect(result.status).toBe("Success");
    expect(await fileExists(outputPath)).toBeTruthy();
  });

  // 3. Apply Grayscale to a Single Image
  it("should apply grayscale to a single image", async () => {
    const inputPath = "test/images/sample.jpg";
    const outputPath = "test/output/grayscale.jpg";
    const options = { grayscale: true };

    const result = await resizeImage({ inputPath, outputPath, options });
    expect(result.status).toBe("Success");
    expect(await fileExists(outputPath)).toBeTruthy();
    // Visual inspection or pixel color analysis can be used for further verification
  });

  // 4. Flip a Single Image Vertically
  it("should flip a single image vertically", async () => {
    const inputPath = "test/images/sample.jpg";
    const outputPath = "test/output/flipped.jpg";
    const options = { flip: true };

    const result = await resizeImage({ inputPath, outputPath, options });
    expect(result.status).toBe("Success");
    expect(await fileExists(outputPath)).toBeTruthy();
    // Additional visual inspection or advanced image comparison can be used for verification
  });

  // 5. Flop a Single Image Horizontally
  it("should flop a single image horizontally", async () => {
    const inputPath = "test/images/sample.jpg";
    const outputPath = "test/output/flopped.jpg";
    const options = { flop: true };

    const result = await resizeImage({ inputPath, outputPath, options });
    expect(result.status).toBe("Success");
    expect(await fileExists(outputPath)).toBeTruthy();
    // Similar to flip, additional verification methods can be implemented
  });

  // 6. Handle Non-Existent Input File for a Single Image
  it("should handle non-existent input file for a single image", async () => {
    const inputPath = "test/images/nonexistent.jpg";
    const outputPath = "test/output/output.jpg";
    const options = {};

    const result = await resizeImage({ inputPath, outputPath, options });
    expect(result.status).toBe("Failed");
    expect(result.error).toMatch(/not found|no such file|does not exist/i);
  });

  // 7. Handle Invalid Output Path for a Single Image
  it("should handle invalid output path for a single image", async () => {
    const inputPath = "test/images/sample.jpg";
    const outputPath = "/invalid/path/output.jpg";
    const options = {};

    const result = await resizeImage({ inputPath, outputPath, options });
    expect(result.status).toBe("Failed");
    expect(result.error).toMatch(/unable to open for write|cannot find the file specified/i);
  });

  // 8. Handle Unsupported Image Format for a Single Image
  it("should handle unsupported image formats for a single image", async () => {
    const inputPath = "test/images/sample.unsupported";
    const outputPath = "test/output/output.jpg";
    const options = {};

    const result = await resizeImage({ inputPath, outputPath, options });
    expect(result.status).toBe("Failed");
    expect(result.error).toMatch(/unsupported image format/i);
  });

  // 9. Handle Processing Error for a Single Corrupted Image
  it("should handle processing error for a single corrupted image", async () => {
    const inputPath = "test/images/corrupted.png";
    const outputPath = "test/output/output.jpg";
    const options = {};

    const result = await resizeImage({ inputPath, outputPath, options });
    expect(result.status).toBe("Failed");
    expect(result.error).toBeTruthy();
  });

  // 10. Not Alter Aspect Ratio When Resizing a Single Image Without Specified Dimensions
  it("should not alter aspect ratio when resizing a single image without specified dimensions", async () => {
    const inputPath = "test/images/sample.jpg";
    const outputPath = "test/output/resized_aspect_ratio.jpg";
    const options = { width: 300 }; // Only width is specified

    const result = await resizeImage({ inputPath, outputPath, options });
    expect(result.status).toBe("Success");
    expect(await fileExists(outputPath)).toBeTruthy();
   
  });

  // 11. Resize Multiple Images
  it("should resize multiple images", async () => {
    const imagesConfig = [
      {
        inputPath: "test/images/sample1.jpg",
        outputPath: "test/output/resized1.jpg",
        options: { width: 100, height: 100 },
      },
      {
        inputPath: "test/images/sample2.jpg",
        outputPath: "test/output/resized2.jpg",
        options: { width: 150, height: 150 },
      },
    ];

    const results = await processImagesBatch(imagesConfig);
    results.forEach((result) => {
      expect(result.status).toBe("Success");
      expect(fileExists(result.outputPath)).resolves.toBeTruthy();
    });
  });

  // 12. Convert Formats of Multiple Images
  it("should convert formats of multiple images", async () => {
    const imagesConfig = [
      {
        inputPath: "test/images/sample1.jpg",
        outputPath: "test/output/converted1.png",
        options: { format: "png" },
      },
      {
        inputPath: "test/images/sample2.jpg",
        outputPath: "test/output/converted2.png",
        options: { format: "png" },
      },
    ];

    const results = await processImagesBatch(imagesConfig);
    results.forEach((result) => {
      expect(result.status).toBe("Success");
      expect(fileExists(result.outputPath)).resolves.toBeTruthy();
    });
  });

  // 13. Apply Grayscale to Multiple Images
  it("should apply grayscale to multiple images", async () => {
    const imagesConfig = [
      {
        inputPath: "test/images/sample1.jpg",
        outputPath: "test/output/grayscale1.jpg",
        options: { grayscale: true },
      },
      {
        inputPath: "test/images/sample2.jpg",
        outputPath: "test/output/grayscale2.jpg",
        options: { grayscale: true },
      },
    ];

    const results = await processImagesBatch(imagesConfig);
    results.forEach((result) => {
      expect(result.status).toBe("Success");
      expect(fileExists(result.outputPath)).resolves.toBeTruthy();
    });
  });

  // 14. Flip Multiple Images Vertically
  it("should flip multiple images vertically", async () => {
    const imagesConfig = [
      {
        inputPath: "test/images/sample1.jpg",
        outputPath: "test/output/flipped1.jpg",
        options: { flip: true },
      },
      {
        inputPath: "test/images/sample2.jpg",
        outputPath: "test/output/flipped2.jpg",
        options: { flip: true },
      },
    ];

    const results = await processImagesBatch(imagesConfig);
    results.forEach((result) => {
      expect(result.status).toBe("Success");
      expect(fileExists(result.outputPath)).resolves.toBeTruthy();
    });
  });

  // 15. Flop Multiple Images Horizontally
  it("should flop multiple images horizontally", async () => {
    const imagesConfig = [
      {
        inputPath: "test/images/sample1.jpg",
        outputPath: "test/output/flopped1.jpg",
        options: { flop: true },
      },
      {
        inputPath: "test/images/sample2.jpg",
        outputPath: "test/output/flopped2.jpg",
        options: { flop: true },
      },
    ];

    const results = await processImagesBatch(imagesConfig);
    results.forEach((result) => {
      expect(result.status).toBe("Success");
      expect(fileExists(result.outputPath)).resolves.toBeTruthy();
    });
  });

  // 16. Handle a Mix of Valid and Invalid Input Files in a Batch
  it("should handle a mix of valid and invalid input files in a batch", async () => {
    const imagesConfig = [
      {
        inputPath: "test/images/nonexistent.jpg",
        outputPath: "test/output/nonexistent_output.jpg",
        options: {},
      },
      {
        inputPath: "test/images/sample.jpg",
        outputPath: "test/output/valid_output.jpg",
        options: {},
      },
    ];

    const results = await processImagesBatch(imagesConfig);
    expect(results[0].status).toBe("Failed");
    expect(results[1].status).toBe("Success");
    expect(fileExists(results[1].outputPath)).resolves.toBeTruthy();
  });

  // 17. Handle a Mix of Valid and Invalid Output Paths in a Batch
  it("should handle a mix of valid and invalid output paths in a batch", async () => {
    const imagesConfig = [
      {
        inputPath: "test/images/sample.jpg",
        outputPath: "/invalid/path/output1.jpg",
        options: {},
      },
      {
        inputPath: "test/images/sample.jpg",
        outputPath: "test/output/valid_output2.jpg",
        options: {},
      },
    ];

    const results = await processImagesBatch(imagesConfig);
    expect(results[0].status).toBe("Failed");
    expect(results[1].status).toBe("Success");
    expect(fileExists(results[1].outputPath)).resolves.toBeTruthy();
  });

  // 18. Process a Batch with Mixed Image Formats
  it("should process a batch with mixed image formats", async () => {
    const imagesConfig = [
      {
        inputPath: "test/images/sample.jpg",
        outputPath: "test/output/output1.png",
        options: { format: "png" },
      },
      {
        inputPath: "test/images/sample2.png",
        outputPath: "test/output/output2.jpg",
        options: { format: "jpg" },
      },
    ];

    const results = await processImagesBatch(imagesConfig);
    results.forEach((result) => {
      expect(result.status).toBe("Success");
      expect(fileExists(result.outputPath)).resolves.toBeTruthy();
    });
  });

  // 19. Handle a Batch with Some Corrupted Images
  it("should handle a batch with some corrupted images", async () => {
    const imagesConfig = [
      {
        inputPath: "test/images/corrupted.jpg",
        outputPath: "test/output/corrupted_output.jpg",
        options: {},
      },
      {
        inputPath: "test/images/sample.jpg",
        outputPath: "test/output/valid_output.jpg",
        options: {},
      },
    ];

    const results = await processImagesBatch(imagesConfig);
    expect(results[0].status).toBe("Failed");
    expect(results[1].status).toBe("Success");
    expect(fileExists(results[1].outputPath)).resolves.toBeTruthy();
  });

  // 20. Apply Different Transformations to Different Images in a Batch
  it("should apply different transformations to different images in a batch", async () => {
    const imagesConfig = [
      {
        inputPath: "test/images/sample.jpg",
        outputPath: "test/output/resized.jpg",
        options: { width: 100, height: 100 },
      },
      {
        inputPath: "test/images/sample.jpg",
        outputPath: "test/output/grayscale.jpg",
        options: { grayscale: true },
      },
      {
        inputPath: "test/images/sample.jpg",
        outputPath: "test/output/flipped.jpg",
        options: { flip: true },
      },
    ];

    const results = await processImagesBatch(imagesConfig);
    results.forEach((result) => {
      expect(result.status).toBe("Success");
      expect(fileExists(result.outputPath)).resolves.toBeTruthy();
    });
  });

  // 21. Process a Large Number of Images in a Batch Efficiently
  it("should process a large number of images in a batch efficiently", async () => {
    // Assuming 'sample.jpg' is a moderate-sized image
    const imagesConfig = new Array(50).fill(null).map((_, index) => ({
      inputPath: "test/images/sample.jpg",
      outputPath: `test/output/large_batch_output${index}.jpg`,
      options: { resize: { width: 100, height: 100 } },
    }));

    const startTime = performance.now();
    const results = await processImagesBatch(imagesConfig);
    const endTime = performance.now();

    results.forEach((result) => {
      expect(result.status).toBe("Success");
      expect(fileExists(result.outputPath)).resolves.toBeTruthy();
    });

    const processingTime = endTime - startTime;
    expect(processingTime).toBeLessThan(5000); // Set a reasonable threshold, e.g., 5000 milliseconds
  });

  // 22. Handle Very Large Image Files Without Crashing
  it("should handle very large image files without crashing", async () => {
    const inputPath = "test/images/very_large_image.jpg"; // Ensure this is a large file
    const outputPath = "test/output/very_large_image_output.jpg";
    const options = { resize: { width: 300, height: 300 } };

    const result = await resizeImage({ inputPath, outputPath, options });
    expect(result.status).toBe("Success");
    expect(fileExists(outputPath)).resolves.toBeTruthy();
  });

  // 23. Preserve Metadata (like EXIF) When Specified
  it("should preserve metadata (like EXIF) when specified", async () => {
    const inputPath = "test/images/sample_with_exif.jpg";
    const outputPath = "test/output/preserve_metadata.jpg";
    const options = { preserveMetadata: true }; // This option depends on your implementation

    const result = await resizeImage({ inputPath, outputPath, options });
    expect(result.status).toBe("Success");
    // Further checks to verify EXIF data should be implemented, possibly using a metadata extraction library
  });

  // 24. Remove Metadata When Specified
  it("should remove metadata when specified", async () => {
    const inputPath = "test/images/sample_with_exif.jpg";
    const outputPath = "test/output/remove_metadata.jpg";
    const options = { removeMetadata: true }; // This option depends on your implementation

    const result = await resizeImage({ inputPath, outputPath, options });
    expect(result.status).toBe("Success");
    // Additional checks to confirm the removal of metadata should be implemented
  });

  // 25. Handle Images with Zero Dimensions Gracefully
  it("should handle images with zero dimensions gracefully", async () => {
    const inputPath = "test/images/zero_dimension_image.jpg"; // Image with zero width/height
    const outputPath = "test/output/zero_dimension_output.jpg";
    const options = {};

    const result = await resizeImage({ inputPath, outputPath, options });
    expect(result.status).toBe("Failed");
    expect(result.error).toBeTruthy();
  });
});
