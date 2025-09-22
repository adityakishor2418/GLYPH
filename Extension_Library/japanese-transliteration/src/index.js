/**
 * Japanese Transliteration Library
 * Main entry point and API interface
 * 
 * @version 1.0.0
 * @author Japanese Transliteration Library Team
 * @license MIT
 */

import { JapaneseTransliterator } from './transliterator.js';
import { 
  detectCharacterScript, 
  detectTextScript, 
  ScriptType, 
  hasJapaneseCharacters, 
  segmentTextByScript,
  normalizeJapaneseText,
  isHiragana,
  isKatakana,
  isKanji,
  isRomaji
} from './utils.js';

/**
 * Default transliterator instance for quick access
 */
const defaultTransliterator = new JapaneseTransliterator();

/**
 * Quick transliterate function - most common use case
 * @param {string} text - Japanese text to transliterate
 * @param {Object} options - Optional configuration
 * @returns {string} Romanized text
 */
export function transliterate(text, options = {}) {
  if (options && Object.keys(options).length > 0) {
    const customTransliterator = new JapaneseTransliterator(options);
    return customTransliterator.transliterate(text);
  }
  return defaultTransliterator.transliterate(text);
}

/**
 * Analyze text and return detailed information
 * @param {string} text - Text to analyze
 * @param {Object} options - Optional configuration
 * @returns {Object} Analysis results
 */
export function analyze(text, options = {}) {
  if (options && Object.keys(options).length > 0) {
    const customTransliterator = new JapaneseTransliterator(options);
    return customTransliterator.analyze(text);
  }
  return defaultTransliterator.analyze(text);
}

/**
 * Batch transliterate multiple texts
 * @param {string[]} texts - Array of texts to transliterate
 * @param {Object} options - Optional configuration
 * @returns {string[]} Array of romanized texts
 */
export function transliterateBatch(texts, options = {}) {
  if (!Array.isArray(texts)) {
    throw new Error('Input must be an array of strings');
  }
  
  const transliterator = new JapaneseTransliterator(options);
  return texts.map(text => transliterator.transliterate(text));
}

/**
 * DOM-based transliteration for web pages
 * Finds and transliterates Japanese text in DOM elements
 * @param {Element|string} target - DOM element or selector
 * @param {Object} options - Transliteration and DOM options
 */
export function transliterateDOMElement(target, options = {}) {
  const element = typeof target === 'string' ? document.querySelector(target) : target;
  
  if (!element) {
    throw new Error('Target element not found');
  }
  
  const transliteratorOptions = {
    kanjiReadingMode: options.kanjiReadingMode || 'first',
    handleSpecialCombinations: options.handleSpecialCombinations !== false,
    preserveSpacing: options.preserveSpacing !== false
  };
  
  const transliterator = new JapaneseTransliterator(transliteratorOptions);
  
  // Options for DOM processing
  const domOptions = {
    preserveHTML: options.preserveHTML !== false,
    addTooltips: options.addTooltips || false,
    skipElements: options.skipElements || ['script', 'style', 'noscript'],
    classPrefix: options.classPrefix || 'jp-transliterated'
  };
  
  processElementRecursively(element, transliterator, domOptions);
}

/**
 * Recursively process DOM elements for transliteration
 * @private
 */
function processElementRecursively(element, transliterator, options) {
  // Skip certain elements
  if (options.skipElements.includes(element.tagName.toLowerCase())) {
    return;
  }
  
  // Process text nodes
  for (let i = 0; i < element.childNodes.length; i++) {
    const node = element.childNodes[i];
    
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      
      if (hasJapaneseCharacters(text)) {
        const transliterated = transliterator.transliterate(text);
        
        if (options.addTooltips) {
          // Create span with tooltip
          const span = document.createElement('span');
          span.className = `${options.classPrefix}-text`;
          span.title = text; // Original Japanese as tooltip
          span.textContent = transliterated;
          element.replaceChild(span, node);
        } else {
          // Simple text replacement
          node.textContent = transliterated;
        }
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // Recursively process child elements
      processElementRecursively(node, transliterator, options);
    }
  }
}

/**
 * Utility functions - re-exported for convenience
 */
export {
  // Core transliterator class
  JapaneseTransliterator,
  
  // Script detection functions
  detectCharacterScript,
  detectTextScript,
  hasJapaneseCharacters,
  segmentTextByScript,
  
  // Character type checking
  isHiragana,
  isKatakana, 
  isKanji,
  isRomaji,
  
  // Text processing
  normalizeJapaneseText,
  
  // Constants
  ScriptType
};

/**
 * Library information
 */
export const LibraryInfo = {
  name: 'Japanese Transliteration Library',
  version: '1.0.0',
  author: 'Japanese Transliteration Library Team',
  license: 'MIT',
  repository: 'https://github.com/your-username/japanese-transliteration',
  description: 'A comprehensive JavaScript library for transliterating Japanese text to English pronunciation',
  features: [
    'Complete Hiragana to romaji conversion',
    'Complete Katakana to romaji conversion', 
    'Essential Kanji to romaji conversion',
    'Automatic script detection',
    'DOM manipulation support',
    'Batch processing',
    'Customizable options'
  ]
};

// Default export for ES6 imports
export default {
  transliterate,
  analyze,
  transliterateBatch,
  transliterateDOMElement,
  JapaneseTransliterator,
  LibraryInfo,
  // Utility functions
  detectCharacterScript,
  detectTextScript,
  hasJapaneseCharacters,
  segmentTextByScript,
  isHiragana,
  isKatakana,
  isKanji,
  isRomaji,
  normalizeJapaneseText,
  ScriptType
};