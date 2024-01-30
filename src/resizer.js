const sharp = require("sharp");
const fs = require("fs");

function validateOptions(options) {
    const validFormats = ['jpeg', 'png', 'webp', 'jpg']; // List of supported formats
    const errors = [];
  
    if (options.width && (typeof options.width !== 'number' || options.width <= 0)) {
      errors.push('Width must be a positive number.');
    }
  
    if (options.height && (typeof options.height !== 'number' || options.height <= 0)) {
      errors.push('Height must be a positive number.');
    }
  
    if (options.format && !validFormats.includes(options.format)) {
      errors.push(`Format must be one of the following: ${validFormats.join(', ')}.`);
    }
  
    // ...additional checks for other options...
  
    return errors;
  }
  

async function resizeImage(imageConfig) {
  let inputPath = imageConfig.inputPath;
  let outputPath = imageConfig.outputPath;
  let options = imageConfig.options
  const validationErrors = validateOptions(options);
  if (validationErrors.length > 0) {
    throw new Error(`Invalid options: ${validationErrors.join(' ')}`);
  }
  try {
    if (!fs.existsSync(imageConfig.inputPath)) {
      throw new Error(`Input file does not exist: ${imageConfig.inputPath}`);
    }
    let image = sharp(inputPath);

    if (options.width || options.height) {
      image = image.resize(
        options.width,
        options.height
      );
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
  } catch (error) {
    return { inputPath, outputPath, status: "Failed", error: error.message };
  }
}

// Function to process a batch of images
async function processImagesBatch(imagesConfig) {
  const results = await Promise.all(
    imagesConfig.map((imageConfig) => resizeImage(imageConfig))
  );
  return results;
}

module.exports = { resizeImage, processImagesBatch };
