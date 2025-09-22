/**
 * Mandarin Chinese to Pinyin Transliteration Library
 * Main API interface for converting Simplified Chinese to Pinyin
 * 
 * @author AI Assistant
 * @version 1.0.0
 */

import { MandarinTransliterator } from './transliterator.js';
import utils from './utils.js';
import { 
  chineseCharacterMap, 
  chinesePhraseMap, 
  isChineseCharacter, 
  getCharacterPinyin 
} from '../data/chinese-characters.js';

// Create default transliterator instance
const defaultTransliterator = new MandarinTransliterator();

/**
 * Transliterate Chinese text to Pinyin with default settings
 * @param {string} text - Chinese text to transliterate
 * @param {Object} options - Transliteration options
 * @returns {string} Pinyin transliteration
 * 
 * @example
 * import { transliterate } from './mandarin-pinyin/src/index.js';
 * 
 * const result = transliterate('你好世界');
 * console.log(result); // 'nǐ hǎo shì jiè'
 */
export function transliterate(text, options = {}) {
  if (Object.keys(options).length > 0) {
    // Create temporary transliterator with custom options
    const customTransliterator = new MandarinTransliterator(options);
    return customTransliterator.transliterate(text);
  }
  
  return defaultTransliterator.transliterate(text);
}

/**
 * Analyze Chinese text and provide detailed information
 * @param {string} text - Chinese text to analyze
 * @param {Object} options - Analysis options
 * @returns {Object} Detailed analysis results
 * 
 * @example
 * const analysis = analyze('你好，世界！');
 * console.log(analysis.transliteration); // 'nǐ hǎo, shì jiè!'
 * console.log(analysis.chineseCharacters); // 4
 * console.log(analysis.coverage); // 1.0 (100% coverage)
 */
export function analyze(text, options = {}) {
  const transliterator = Object.keys(options).length > 0 
    ? new MandarinTransliterator(options)
    : defaultTransliterator;
    
  const analysis = transliterator.analyze(text);
  
  // Add additional text analysis
  const textAnalysis = utils.analyzeText(text);
  const difficulty = utils.calculateReadingDifficulty(text);
  
  return {
    ...analysis,
    textAnalysis,
    difficulty,
    isValidChinese: utils.isValidChineseText(text)
  };
}

/**
 * Batch transliterate multiple texts
 * @param {string[]} texts - Array of Chinese texts
 * @param {Object} options - Transliteration options
 * @returns {string[]} Array of pinyin transliterations
 * 
 * @example
 * const results = transliterateBatch(['你好', '世界', '中国']);
 * console.log(results); // ['nǐ hǎo', 'shì jiè', 'zhōng guó']
 */
export function transliterateBatch(texts, options = {}) {
  const transliterator = Object.keys(options).length > 0 
    ? new MandarinTransliterator(options)
    : defaultTransliterator;
    
  return transliterator.transliterateBatch(texts);
}

/**
 * Check if text contains Chinese characters
 * @param {string} text - Text to check
 * @returns {boolean} True if text contains Chinese characters
 * 
 * @example
 * console.log(hasChineseCharacters('Hello 你好')); // true
 * console.log(hasChineseCharacters('Hello World')); // false
 */
export function hasChineseCharacters(text) {
  return utils.hasChineseCharacters(text);
}

/**
 * Extract only Chinese characters from mixed text
 * @param {string} text - Mixed text
 * @returns {string[]} Array of Chinese characters
 * 
 * @example
 * const chars = extractChineseCharacters('Hello 你好 World 世界');
 * console.log(chars); // ['你', '好', '世', '界']
 */
export function extractChineseCharacters(text) {
  return utils.extractChineseCharacters(text);
}

/**
 * Create a custom transliterator with specific options
 * @param {Object} options - Transliterator configuration
 * @returns {MandarinTransliterator} Configured transliterator instance
 * 
 * @example
 * const customTransliterator = createTransliterator({
 *   numericalTones: true,
 *   addSpaces: false,
 *   lowercase: true
 * });
 * 
 * console.log(customTransliterator.transliterate('你好')); // 'ni3hao3'
 */
export function createTransliterator(options = {}) {
  return new MandarinTransliterator(options);
}

/**
 * Get transliterator statistics and information
 * @returns {Object} Statistics about character coverage and features
 */
export function getTransliteratorInfo() {
  const stats = defaultTransliterator.getStats();
  return {
    ...stats,
    utils: {
      availableFunctions: [
        'analyzeText',
        'hasChineseCharacters', 
        'extractChineseCharacters',
        'segmentText',
        'cleanChineseText',
        'countChineseCharacters',
        'splitPreservingChinese',
        'calculateReadingDifficulty',
        'findWordBoundaries',
        'normalizePunctuation',
        'isValidChineseText'
      ]
    }
  };
}

/**
 * Clean and normalize Chinese text
 * @param {string} text - Text to clean
 * @param {Object} options - Cleaning options
 * @returns {string} Cleaned text
 */
export function cleanText(text, options = {}) {
  return utils.cleanChineseText(text, options);
}

/**
 * Segment Chinese text into logical units
 * @param {string} text - Chinese text to segment
 * @returns {string[]} Array of text segments
 */
export function segmentText(text) {
  return utils.segmentText(text);
}

/**
 * Calculate reading difficulty of Chinese text
 * @param {string} text - Chinese text to analyze
 * @returns {Object} Difficulty analysis
 */
export function getReadingDifficulty(text) {
  return utils.calculateReadingDifficulty(text);
}

/**
 * Convert numerical tones to tone marks
 * @param {string} pinyin - Pinyin with numerical tones (e.g., "ni3 hao3")
 * @returns {string} Pinyin with tone marks (e.g., "nǐ hǎo")
 */
export function convertNumericalTones(pinyin) {
  const toneMap = {
    'a1': 'ā', 'a2': 'á', 'a3': 'ǎ', 'a4': 'à',
    'e1': 'ē', 'e2': 'é', 'e3': 'ě', 'e4': 'è',
    'i1': 'ī', 'i2': 'í', 'i3': 'ǐ', 'i4': 'ì',
    'o1': 'ō', 'o2': 'ó', 'o3': 'ǒ', 'o4': 'ò',
    'u1': 'ū', 'u2': 'ú', 'u3': 'ǔ', 'u4': 'ù',
    'v1': 'ǖ', 'v2': 'ǘ', 'v3': 'ǚ', 'v4': 'ǜ'
  };

  let result = pinyin;
  for (const [numbered, toned] of Object.entries(toneMap)) {
    result = result.replace(new RegExp(numbered, 'g'), toned);
  }
  
  return result;
}

/**
 * Convert tone marks to numerical tones
 * @param {string} pinyin - Pinyin with tone marks (e.g., "nǐ hǎo")
 * @returns {string} Pinyin with numerical tones (e.g., "ni3 hao3")
 */
export function convertToNumericalTones(pinyin) {
  const toneMap = {
    'ā': 'a1', 'á': 'a2', 'ǎ': 'a3', 'à': 'a4',
    'ē': 'e1', 'é': 'e2', 'ě': 'e3', 'è': 'e4',
    'ī': 'i1', 'í': 'i2', 'ǐ': 'i3', 'ì': 'i4',
    'ō': 'o1', 'ó': 'o2', 'ǒ': 'o3', 'ò': 'o4',
    'ū': 'u1', 'ú': 'u2', 'ǔ': 'u3', 'ù': 'u4',
    'ǖ': 'v1', 'ǘ': 'v2', 'ǚ': 'v3', 'ǜ': 'v4'
  };

  let result = pinyin;
  for (const [toned, numbered] of Object.entries(toneMap)) {
    result = result.replace(new RegExp(toned, 'g'), numbered);
  }
  
  return result;
}

// Export the transliterator class for advanced usage
export { MandarinTransliterator };

// Export utility functions
export { utils };

// Export data mappings for direct access
export { 
  chineseCharacterMap,
  chinesePhraseMap,
  isChineseCharacter,
  getCharacterPinyin
};

// Default export for convenience
export default {
  transliterate,
  analyze,
  transliterateBatch,
  hasChineseCharacters,
  extractChineseCharacters,
  createTransliterator,
  getTransliteratorInfo,
  cleanText,
  segmentText,
  getReadingDifficulty,
  convertNumericalTones,
  convertToNumericalTones,
  MandarinTransliterator,
  utils
};