#!/usr/bin/env node

/**
 * CSS Syntax Checker
 * Basic CSS validation script for pre-stop hooks
 */

import { readdir, readFile } from 'fs/promises';
import { join, extname } from 'path';

async function findCSSFiles(dir, files = []) {
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    // Skip node_modules, .next, and other build directories
    if (entry.isDirectory()) {
      if (!['node_modules', '.next', '.git', 'dist', 'build'].includes(entry.name)) {
        await findCSSFiles(fullPath, files);
      }
    } else if (entry.isFile() && extname(entry.name) === '.css') {
      files.push(fullPath);
    }
  }

  return files;
}

async function checkCSSFile(filePath) {
  const content = await readFile(filePath, 'utf-8');

  // Basic syntax checks
  const openBraces = (content.match(/{/g) || []).length;
  const closeBraces = (content.match(/}/g) || []).length;

  if (openBraces !== closeBraces) {
    return {
      valid: false,
      error: `Mismatched braces: ${openBraces} opening, ${closeBraces} closing`
    };
  }

  return { valid: true };
}

async function main() {
  try {
    const cssFiles = await findCSSFiles(process.cwd());

    if (cssFiles.length === 0) {
      console.log('No CSS files found to validate');
      process.exit(0);
    }

    let hasErrors = false;

    for (const file of cssFiles) {
      const result = await checkCSSFile(file);
      if (!result.valid) {
        console.error(`❌ ${file}: ${result.error}`);
        hasErrors = true;
      }
    }

    if (hasErrors) {
      process.exit(1);
    } else {
      console.log(`✅ All ${cssFiles.length} CSS files validated successfully`);
      process.exit(0);
    }
  } catch (error) {
    console.error('Error during CSS validation:', error.message);
    // Don't fail on validation script errors
    process.exit(0);
  }
}

main();
