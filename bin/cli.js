#!/usr/bin/env node

const yargs = require("yargs");
const { processImage, processImagesBatch } = require("../src/resizer");
const fs = require("fs").promises;

const argv = yargs
  .option("i", {
    alias: "input",
    describe: "Input image path",
    type: "string",
    demandOption: true,
  })
  .option("o", {
    alias: "output",
    describe: "Output image path",
    type: "string",
    demandOption: true,
  })
  .option("w", {
    alias: "width",
    describe: "Width of the image",
    type: "number",
    demandOption: true,
  })
  .option("h", {
    alias: "height",
    describe: "Height of the image",
    type: "number",
    demandOption: true,
  })
  .option("grayscale", {
    describe: "Convert image to grayscale",
    type: "boolean",
  })
  .option("flip", { describe: "Flip the image vertically", type: "boolean" })
  .option("flop", { describe: "Flop the image horizontally", type: "boolean" })
  .option("blur", {
    describe: "Apply blur filter, specify amount",
    type: "number",
  })
  .option("format", {
    describe: "Convert image to specified format (jpeg, png, webp)",
    type: "string",
  })
  .option("quality", {
    describe: "Quality for image format conversion",
    type: "number",
  }).argv;

async function readBatchFile(filePath) {
  const content = await fs.readFile(filePath, "utf8");
  return JSON.parse(content);
}

async function main() {
  try {
    const options = {
      /* extract options from argv */
    };

    if (argv.batch) {
      const batch = await readBatchFile(argv.batch);
      const results = await processImagesBatch(batch, options);
      results.forEach((result) => {
        if (result.status === "Success") {
          console.log(`Processed: ${result.inputPath} to ${result.outputPath}`);
        } else {
          console.error(`Failed: ${result.inputPath}, Error: ${result.error}`);
        }
      });
    } else if (argv.input && argv.output) {
      const result = await processImage(argv.input, argv.output, options);
      if (result.status === "Success") {
        console.log(`Processed: ${result.inputPath} to ${result.outputPath}`);
      } else {
        console.error(`Failed: ${result.inputPath}, Error: ${result.error}`);
      }
    } else {
      console.error(
        "Error: Please provide valid input and output paths, or a batch file."
      );
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main();
