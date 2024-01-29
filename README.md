# ResizerJs

Resizerjs is a powerful Node.js module for resizing, converting, and applying basic edits to images. Designed for simplicity and performance, it's ideal for a wide range of applications, from web development to batch processing for digital media.

## Features

- **Image Resizing**: Change the dimensions of images with options to maintain aspect ratio.
- **Format Conversion**: Easily convert images between formats like JPEG, PNG, and WebP.
- **Basic Edits**: Apply grayscale, blur, flip, and flop transformations.
- **Batch Processing**: Efficiently process multiple images at once.
- **CLI Support**: Comes with a command-line interface for direct use in your terminal.
- **High Performance**: Optimized for fast processing and low memory usage.

## Installation

Install ResizerJs via npm:

```bash
npm install resizerjs
```

## Usage

### As a Node.js Module

Import and use the module in your JavaScript code:

```javascript
const resizer = require('resizerjs');

// Resize an image
resizer.resize('path/to/input.jpg', 'path/to/output.jpg', { width: 200, height: 200 });

// Convert and resize
resizer.convert('path/to/input.png', 'path/to/output.jpg', { format: 'jpeg', width: 300 });

// Apply grayscale effect
resizer.edit('path/to/input.jpg', 'path/to/output.jpg', { grayscale: true });

```

### Using the CLI

Resize an image using the command-line interface:

```bash
resizer -i path/to/input.jpg -o path/to/output.jpg -w 300 -h 200
```

Convert an image to another format:
```bash
resizer -i path/to/input.png -o path/to/output.jpg -f jpeg
```

## API Reference
- **resize(inputPath, outputPath, options)**: Resize an image. Options include width, height.
- **convert(inputPath, outputPath, options)**: Convert image format. Options include format, width, height.
- **edit(inputPath, outputPath, options)**: Apply basic edits. Options include grayscale, flip, flop, blur

## Examples
Here are some additional examples of how to use Resizerjs:

```javascript
// Resize without altering aspect ratio
resizer.resize('input.jpg', 'output.jpg', { width: 500 });

// Convert an image to PNG
resizer.convert('input.jpg', 'output.png', { format: 'png' });

// Apply a blur effect
resizer.edit('input.jpg', 'output.jpg', { blur: 5 });

```

## Contributing

Contributions are always welcome! Please read the [contribution guidelines](CONTRIBUTING.md) first.

## License

This project is licensed under the [MIT License](LICENSE).
