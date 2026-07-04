const fs = require('fs');
const path = require('path');

// Simple CSS minifier
function minifyCSS(css) {
  return css
    // Remove comments
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Remove whitespace
    .replace(/\s+/g, ' ')
    // Remove spaces around operators
    .replace(/\s*([{}:;,>+~])\s*/g, '$1')
    // Remove trailing semicolons
    .replace(/;}/g, '}')
    .trim();
}

function minifyCSSFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const originalSize = Buffer.byteLength(content, 'utf8');
    const minified = minifyCSS(content);
    const newSize = Buffer.byteLength(minified, 'utf8');

    fs.writeFileSync(filePath, minified, 'utf8');

    const saved = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    console.log(`✓ ${path.basename(filePath)}: ${(originalSize/1024).toFixed(1)}KB → ${(newSize/1024).toFixed(1)}KB (${saved}% saved)`);
  } catch (error) {
    console.error(`✗ Error minifying ${path.basename(filePath)}:`, error.message);
  }
}

function findCSSFiles(dir, cssFiles = []) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      findCSSFiles(filePath, cssFiles);
    } else if (file.endsWith('.css')) {
      cssFiles.push(filePath);
    }
  }

  return cssFiles;
}

console.log('📝 Minifying CSS files...\n');
const cssFiles = findCSSFiles('/workspace/app');

if (cssFiles.length === 0) {
  console.log('No CSS files found in /workspace/app');
} else {
  cssFiles.forEach(minifyCSSFile);
  console.log('\n✅ CSS minification complete!');
}
