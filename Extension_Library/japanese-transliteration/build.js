/**
 * Build script for Japanese Transliteration Library
 * Creates production-ready bundles for different use cases
 */

import fs from 'fs/promises';
import path from 'path';

class BuildManager {
  constructor() {
    this.distDir = 'dist';
    this.srcDir = 'src';
    this.dataDir = 'data';
  }
  
  async build() {
    console.log('🏗️  Starting build process...');
    
    try {
      // Create dist directory
      await this.createDistDirectory();
      
      // Build library bundles
      await this.buildLibraryBundle();
      await this.buildMinifiedBundle();
      await this.buildChromeExtensionBundle();
      
      // Copy data files
      await this.copyDataFiles();
      
      // Generate documentation
      await this.generateDocumentation();
      
      console.log('✅ Build completed successfully!');
      
    } catch (error) {
      console.error('❌ Build failed:', error);
      process.exit(1);
    }
  }
  
  async createDistDirectory() {
    console.log('📁 Creating distribution directory...');
    
    try {
      await fs.rm(this.distDir, { recursive: true, force: true });
    } catch (error) {
      // Directory might not exist
    }
    
    await fs.mkdir(this.distDir, { recursive: true });
    await fs.mkdir(path.join(this.distDir, 'data'), { recursive: true });
    await fs.mkdir(path.join(this.distDir, 'chrome-extension'), { recursive: true });
  }
  
  async buildLibraryBundle() {
    console.log('📦 Building main library bundle...');
    
    // Read all source files
    const indexContent = await fs.readFile(path.join(this.srcDir, 'index.js'), 'utf-8');
    const transliteratorContent = await fs.readFile(path.join(this.srcDir, 'transliterator.js'), 'utf-8');
    const utilsContent = await fs.readFile(path.join(this.srcDir, 'utils.js'), 'utf-8');
    
    // Read data files
    const hiraganaContent = await fs.readFile(path.join(this.dataDir, 'hiragana.js'), 'utf-8');
    const katakanaContent = await fs.readFile(path.join(this.dataDir, 'katakana.js'), 'utf-8');
    const kanjiContent = await fs.readFile(path.join(this.dataDir, 'kanji.js'), 'utf-8');
    
    // Create a bundled version with all dependencies inline
    const bundledContent = this.createBundle([
      hiraganaContent,
      katakanaContent, 
      kanjiContent,
      utilsContent,
      transliteratorContent,
      indexContent
    ]);
    
    await fs.writeFile(path.join(this.distDir, 'japanese-transliteration.js'), bundledContent);
  }
  
  async buildMinifiedBundle() {
    console.log('🗜️  Building minified bundle...');
    
    // For a real implementation, you would use a proper minifier like Terser
    // For now, we'll create a simplified version
    const fullBundle = await fs.readFile(path.join(this.distDir, 'japanese-transliteration.js'), 'utf-8');
    
    const minified = fullBundle
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
      .replace(/\/\/.*$/gm, '') // Remove single-line comments
      .replace(/^\s*$\n/gm, '') // Remove empty lines
      .replace(/\s+/g, ' ') // Compress whitespace
      .trim();
    
    await fs.writeFile(path.join(this.distDir, 'japanese-transliteration.min.js'), minified);
  }
  
  async buildChromeExtensionBundle() {
    console.log('🌐 Building Chrome extension bundle...');
    
    const chromeExtDir = path.join(this.distDir, 'chrome-extension');
    
    // Copy extension files
    const extensionFiles = [
      'manifest.json',
      'popup.html',
      'popup.js', 
      'popup.css',
      'background.js',
      'content.css'
    ];
    
    for (const file of extensionFiles) {
      const content = await fs.readFile(path.join('chrome-extension', file), 'utf-8');
      await fs.writeFile(path.join(chromeExtDir, file), content);
    }
    
    // Copy main library to extension directory
    const libraryContent = await fs.readFile(path.join(this.distDir, 'japanese-transliteration.js'), 'utf-8');
    await fs.writeFile(path.join(chromeExtDir, 'transliterator.js'), libraryContent);
    
    // Create content script
    const contentScript = this.createContentScript();
    await fs.writeFile(path.join(chromeExtDir, 'content.js'), contentScript);
    
    // Create options page
    const optionsPage = this.createOptionsPage();
    await fs.writeFile(path.join(chromeExtDir, 'options.html'), optionsPage);
    
    // Create icons directory (placeholder)
    await fs.mkdir(path.join(chromeExtDir, 'icons'), { recursive: true });
    await this.createPlaceholderIcons(path.join(chromeExtDir, 'icons'));
  }
  
  async copyDataFiles() {
    console.log('📊 Copying data files...');
    
    const dataFiles = ['hiragana.js', 'katakana.js', 'kanji.js'];
    
    for (const file of dataFiles) {
      const content = await fs.readFile(path.join(this.dataDir, file), 'utf-8');
      await fs.writeFile(path.join(this.distDir, 'data', file), content);
    }
  }
  
  async generateDocumentation() {
    console.log('📚 Generating documentation...');
    
    const docs = `# Japanese Transliteration Library - API Documentation

## Quick Start

\`\`\`javascript
import { transliterate } from './japanese-transliteration.js';

const result = transliterate('こんにちは');
console.log(result); // "konnichiwa"
\`\`\`

## Main Functions

### \`transliterate(text, options?)\`
Transliterate Japanese text to romaji.

**Parameters:**
- \`text\` (string): Japanese text to transliterate
- \`options\` (object, optional): Configuration options

**Returns:** string - Romanized text

### \`analyze(text, options?)\`
Analyze Japanese text and return detailed information.

**Returns:** object - Analysis results with transliteration and script information

### \`JapaneseTransliterator\`
Main transliterator class for advanced usage.

**Constructor options:**
- \`kanjiReadingMode\`: 'first' | 'all' | 'context'
- \`handleSpecialCombinations\`: boolean
- \`preserveSpacing\`: boolean

## Chrome Extension API

### \`ChromeExtension.processPage(options)\`
Process entire web page for transliteration.

### \`ChromeExtension.processSelection()\`
Process selected text on page.

## Utility Functions

### Script Detection
- \`hasJapaneseCharacters(text)\`
- \`detectCharacterScript(char)\`
- \`detectTextScript(text)\`
- \`isHiragana(char)\`
- \`isKatakana(char)\`
- \`isKanji(char)\`

## Examples

\`\`\`javascript
// Basic usage
transliterate('こんにちは'); // "konnichiwa"
transliterate('アニメ'); // "anime"
transliterate('日本'); // "nihon"

// Advanced usage
const transliterator = new JapaneseTransliterator({
  kanjiReadingMode: 'all'
});
transliterator.transliterate('日本'); // Shows all readings

// Analysis
const analysis = analyze('こんにちは世界');
console.log(analysis.predominantScript); // "mixed"
\`\`\`

For more examples, see the examples/ directory.
`;
    
    await fs.writeFile(path.join(this.distDir, 'API.md'), docs);
  }
  
  createBundle(contents) {
    const header = `/**
 * Japanese Transliteration Library v1.0.0
 * A comprehensive library for transliterating Japanese text to English pronunciation
 * 
 * @author Japanese Transliteration Library Team
 * @license MIT
 * @build ${new Date().toISOString()}
 */

(function(global) {
  'use strict';
  
`;
    
    const footer = `
  
  // Export for different module systems
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = JapaneseTransliterationLibrary;
  } else if (typeof define === 'function' && define.amd) {
    define(function() { return JapaneseTransliterationLibrary; });
  } else {
    global.JapaneseTransliterationLibrary = JapaneseTransliterationLibrary;
  }
  
})(typeof globalThis !== 'undefined' ? globalThis : 
   typeof window !== 'undefined' ? window : 
   typeof global !== 'undefined' ? global : this);`;
    
    // Remove import/export statements and combine
    const processedContents = contents.map(content => {
      return content
        .replace(/^import.*$/gm, '') // Remove imports
        .replace(/^export.*$/gm, '') // Remove exports
        .trim();
    });
    
    return header + processedContents.join('\n\n') + footer;
  }
  
  createContentScript() {
    return `/**
 * Chrome Extension Content Script
 * Handles page-level transliteration functionality
 */

// Import the main library
// (In a real implementation, this would be properly bundled)

console.log('Japanese Transliterator content script loaded');

// Listen for messages from popup/background
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.action) {
    case 'process-page':
      processPageContent(request.options);
      sendResponse({ success: true });
      break;
    case 'process-selection':
      const result = processSelection(request.options);
      sendResponse({ success: result });
      break;
    default:
      sendResponse({ error: 'Unknown action' });
  }
});

function processPageContent(options) {
  // Implementation would use the full library here
  console.log('Processing page with options:', options);
  
  // Add processed indicator
  document.body.classList.add('jp-page-processed');
}

function processSelection(options) {
  const selection = window.getSelection();
  const selectedText = selection.toString();
  
  if (!selectedText) return false;
  
  // Simple check for Japanese characters
  const japaneseRegex = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/;
  if (!japaneseRegex.test(selectedText)) return false;
  
  // In real implementation, use full transliteration library
  const transliterated = selectedText
    .replace(/こんにちは/g, 'konnichiwa')
    .replace(/ありがとう/g, 'arigatou');
  
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(document.createTextNode(transliterated));
  }
  
  return true;
}`;
  }
  
  createOptionsPage() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Japanese Transliterator - Settings</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 40px; }
    .container { max-width: 600px; margin: 0 auto; }
    h1 { color: #2c3e50; }
    .option-group { margin: 20px 0; padding: 15px; border: 1px solid #ecf0f1; border-radius: 5px; }
    label { display: block; margin: 10px 0; }
    select, input { margin-left: 10px; }
    .save-btn { background: #3498db; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; }
  </style>
</head>
<body>
  <div class="container">
    <h1>🇯🇵 Japanese Transliterator Settings</h1>
    
    <div class="option-group">
      <h3>Kanji Handling</h3>
      <label>
        Reading Mode:
        <select id="kanjiMode">
          <option value="first">First Reading Only</option>
          <option value="all">Show All Readings</option>
          <option value="context">Context-based</option>
        </select>
      </label>
    </div>
    
    <div class="option-group">
      <h3>Display Options</h3>
      <label>
        <input type="checkbox" id="addTooltips"> Add hover tooltips with original text
      </label>
      <label>
        <input type="checkbox" id="preserveSpacing"> Preserve text spacing
      </label>
      <label>
        <input type="checkbox" id="handleSpecialCombinations"> Handle special combinations
      </label>
    </div>
    
    <div class="option-group">
      <h3>Keyboard Shortcuts</h3>
      <p><strong>Ctrl+Shift+J:</strong> Transliterate selected text</p>
      <p><strong>Ctrl+Shift+T:</strong> Toggle page transliteration</p>
    </div>
    
    <button class="save-btn" id="saveBtn">Save Settings</button>
    <div id="status" style="margin-top: 10px; color: green;"></div>
  </div>
  
  <script>
    // Options page logic would go here
    document.getElementById('saveBtn').addEventListener('click', () => {
      document.getElementById('status').textContent = 'Settings saved!';
    });
  </script>
</body>
</html>`;
  }
  
  async createPlaceholderIcons(iconDir) {
    // Create simple SVG icons for different sizes
    const createIcon = (size) => `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <circle cx="${size/2}" cy="${size/2}" r="${size/2-2}" fill="#3498db"/>
  <text x="${size/2}" y="${size/2+4}" text-anchor="middle" fill="white" font-size="${size/3}" font-family="Arial">日</text>
</svg>`;
    
    const sizes = [16, 32, 48, 128];
    for (const size of sizes) {
      await fs.writeFile(path.join(iconDir, `icon${size}.png`), `<!-- SVG placeholder for ${size}x${size} icon -->\n${createIcon(size)}`);
    }
  }
}

// Run the build
const buildManager = new BuildManager();
buildManager.build().catch(console.error);