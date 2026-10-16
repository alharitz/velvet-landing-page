#!/usr/bin/env node
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicImagesDir = path.join(process.cwd(), 'public', 'images');
// List of files to compress (non-product assets over 400KB)
const filesToCompress = [
  'hero.jpg',
  'story-main.jpg',
  'story-detail.jpg',
  'lookbook-01.jpg',
  '8624035.png',
  '8624040.jpg'
];

// Ensure the directory exists
if (!fs.existsSync(publicImagesDir)) {
  console.error(`Directory not found: ${publicImagesDir}`);
  process.exit(1);
}

let totalBefore = 0;
let totalAfter = 0;

for (const fileName of filesToCompress) {
  const filePath = path.join(publicImagesDir, fileName);
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    continue;
  }

  const stats = fs.statSync(filePath);
  const beforeSize = stats.size;
  totalBefore += beforeSize;

  // Determine output format based on file extension
  const ext = path.extname(fileName).toLowerCase();
  let format = ext === '.jpg' || ext === '.jpeg' ? 'jpeg' : 
               ext === '.png' ? 'png' : null;
  if (!format) {
    console.warn(`Unsupported format for ${fileName}, skipping`);
    continue;
  }

  try {
    // Read the image metadata to get dimensions
    const metadata = await sharp(filePath).metadata();
    const { width, height } = metadata;
    const longEdge = Math.max(width, height);
    let newWidth = width;
    let newHeight = height;

    // If long edge > 1920, scale down proportionally
    if (longEdge > 1920) {
      const scale = 1920 / longEdge;
      newWidth = Math.round(width * scale);
      newHeight = Math.round(height * scale);
    }

    // Compress with quality 80 for JPEG, PNG compression level 9
    let sharpInstance = sharp(filePath)
      .resize(newWidth, newHeight, {
        fit: 'inside',
        withoutEnlargement: true
      });

    if (format === 'jpeg') {
      sharpInstance = sharpInstance.jpeg({ quality: 80 });
    } else if (format === 'png') {
      sharpInstance = sharpInstance.png({ compressionLevel: 9 });
    }

    // Overwrite the file (we'll write to a temporary file then replace to avoid corruption)
    const tempPath = filePath + '.tmp';
    await sharpInstance.toFile(tempPath);

    // Get the size after compression
    const afterStats = fs.statSync(tempPath);
    const afterSize = afterStats.size;
    totalAfter += afterSize;

    // Replace the original file
    fs.renameSync(tempPath, filePath);

    console.log(`Processed ${fileName}:`);
    console.log(`  Before: ${beforeSize} bytes, ${width}x${height}`);
    console.log(`  After:  ${afterSize} bytes, ${newWidth}x${newHeight}`);
    console.log(`  Ratio:  ${(afterSize / beforeSize * 100).toFixed(2)}%`);
  } catch (err) {
    console.error(`Error processing ${fileName}:`, err);
  }
}

console.log(`\nTotal before: ${totalBefore} bytes`);
console.log(`Total after:  ${totalAfter} bytes`);
console.log(`Total reduction: ${((totalBefore - totalAfter) / totalBefore * 100).toFixed(2)}%`);
