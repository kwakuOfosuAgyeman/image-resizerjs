const sharp = require("sharp");
const fs = require("fs");

async function resizeImage(inputPath, outputPath, options) {
  try {
    if (!fs.existsSync(inputPath)) {
      throw new Error(`Input file does not exist: ${inputPath}`);
    }
    let image = sharp(inputPath);

    if (options.width || options.height) {
      image = image.resize(options.width, options.height);
    }

    // Basic image editing options
    if (options.grayscale) {
      image = image.grayscale();
    }

    if (options.flip) {
      image = image.flip();
    }

    if (options.flop) {
      image = image.flop();
    }

    if (options.blur && typeof options.blur === "number") {
      image = image.blur(options.blur);
    }

    // Format conversion
    if (options.format) {
      image = image.toFormat(options.format, {
        quality: options.quality || 80, // Default quality
      });
    }

    await image.toFile(outputPath);
    return { inputPath, outputPath, status: "Success" };
  } catch (err) {
    return { inputPath, outputPath, status: "Failed", error: error.message };
  }
}

// Function to process a batch of images
async function processImagesBatch(images, options) {
  const results = await Promise.all(
    images.map((image) =>
      processImage(image.inputPath, image.outputPath, options)
    )
  );
  return results;
}

module.exports = {resizeImage, processImagesBatch};
