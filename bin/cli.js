#!/usr/bin/env node

const yargs = require("yargs");
const { resizeImage } = require("../src");

const options = yargs
  .usage("Usage: -i <input> -o <output> -w <width> -h <height>")
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

resizeImage(options.input, options.output, options.width, options.height);
