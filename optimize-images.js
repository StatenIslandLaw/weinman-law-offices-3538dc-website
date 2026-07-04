const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const fileName = path.basename(filePath);

  try {
    const stats = fs.statSync(filePath);
    const originalSize = stats.size;

    if (ext === '.png') {
      await sharp(filePath)
        .png({ quality: 80, compressionLevel: 9, palette: true })
        .toFile(filePath + '.tmp');
    } else if (ext === '.jpg' || ext === '.jpeg') {
      await sharp(filePath)
        .jpeg({ quality: 85, progressive: true, mozjpeg: true })
        .toFile(filePath + '.tmp');
    } else if (ext === '.webp') {
      await sharp(filePath)
        .webp({ quality: 85 })
        .toFile(filePath + '.tmp');
    } else {
      console.log(`Skipping ${fileName} (unsupported format)`);
      return;
    }

    const newStats = fs.statSync(filePath + '.tmp');
    const newSize = newStats.size;

    // Only replace if smaller
    if (newSize < originalSize) {
      fs.renameSync(filePath + '.tmp', filePath);
      const saved = ((originalSize - newSize) / originalSize * 100).toFixed(1);
      console.log(`✓ ${fileName}: ${(originalSize/1024).toFixed(1)}KB → ${(newSize/1024).toFixed(1)}KB (${saved}% saved)`);
    } else {
      fs.unlinkSync(filePath + '.tmp');
      console.log(`○ ${fileName}: Already optimized`);
    }
  } catch (error) {
    console.error(`✗ Error optimizing ${fileName}:`, error.message);
    if (fs.existsSync(filePath + '.tmp')) {
      fs.unlinkSync(filePath + '.tmp');
    }
  }
}

async function optimizeDirectory(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      continue; // Skip directories
    }

    const ext = path.extname(file).toLowerCase();
    if (['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) {
      await optimizeImage(filePath);
    }
  }
}

console.log('🖼️  Optimizing images in /workspace/public...\n');
optimizeDirectory('/workspace/public').then(() => {
  console.log('\n✅ Image optimization complete!');
}).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
