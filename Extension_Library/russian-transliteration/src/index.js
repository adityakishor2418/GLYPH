/**
 * Russian Cyrillic to Latin Transliteration Library
 * Main API interface for converting Russian Cyrillic text to Latin script
 * 
 * @author AI Assistant
 * @version 1.0.0
 */

import { RussianTransliterator } from './transliterator.js';
import utils from './utils.js';
import { 
  russianAlphabetMap,
  russianWordsMap,
  alternativeRomanizations,
  isCyrillicCharacter,
  getRomanization,
  isRussianText
} from '../data/cyrillic-characters.js';

// Create default transliterator instance with GOST system
const defaultTransliterator = new RussianTransliterator();

/**
 * Transliterate Russian text with default GOST system
 * @param {string} text - Russian text to transliterate
 * @param {Object} options - Transliteration options
 * @returns {string} Latin transliteration
 * 
 * @example
 * import { transliterate } from './russian-transliteration/src/index.js';
 * 
 * const result = transliterate('Привет мир');
 * console.log(result); // 'privet mir'
 */
export function transliterate(text, options = {}) {
  if (Object.keys(options).length > 0) {
    // Create temporary transliterator with custom options
    const customTransliterator = new RussianTransliterator(options);
    return customTransliterator.transliterate(text);
  }
  
  return defaultTransliterator.transliterate(text);
}

/**
 * Analyze Russian text and provide detailed information
 * @param {string} text - Russian text to analyze
 * @param {Object} options - Analysis options
 * @returns {Object} Detailed analysis results
 * 
 * @example
 * const analysis = analyze('Привет, мир!');
 * console.log(analysis.transliteration); // 'privet, mir!'
 * console.log(analysis.cyrillicCharacters); // 8
 * console.log(analysis.coverage); // 1.0 (100% coverage)
 */
export function analyze(text, options = {}) {
  const transliterator = Object.keys(options).length > 0 
    ? new RussianTransliterator(options)
    : defaultTransliterator;
    
  const analysis = transliterator.analyze(text);
  
  // Add additional text analysis
  const textAnalysis = utils.analyzeText(text);
  const difficulty = utils.calculateReadingDifficulty(text);
  const mixedScript = utils.detectMixedScript(text);
  
  return {
    ...analysis,
    textAnalysis,
    difficulty,
    mixedScript,
    isValidRussian: utils.isValidRussianText(text)
  };
}

/**
 * Batch transliterate multiple texts
 * @param {string[]} texts - Array of Russian texts
 * @param {Object} options - Transliteration options
 * @returns {string[]} Array of Latin transliterations
 * 
 * @example
 * const results = transliterateBatch(['привет', 'мир', 'Россия']);
 * console.log(results); // ['privet', 'mir', 'rossiya']
 */
export function transliterateBatch(texts, options = {}) {
  const transliterator = Object.keys(options).length > 0 
    ? new RussianTransliterator(options)
    : defaultTransliterator;
    
  return transliterator.transliterateBatch(texts);
}

/**
 * Check if text contains Cyrillic characters
 * @param {string} text - Text to check
 * @returns {boolean} True if text contains Cyrillic characters
 * 
 * @example
 * console.log(hasCyrillicCharacters('Hello Привет')); // true
 * console.log(hasCyrillicCharacters('Hello World')); // false
 */
export function hasCyrillicCharacters(text) {
  return utils.hasCyrillicCharacters(text);
}

/**
 * Extract only Cyrillic characters from mixed text
 * @param {string} text - Mixed text
 * @returns {string[]} Array of Cyrillic characters
 * 
 * @example
 * const chars = extractCyrillicCharacters('Hello Привет World');
 * console.log(chars); // ['П', 'р', 'и', 'в', 'е', 'т']
 */
export function extractCyrillicCharacters(text) {
  return utils.extractCyrillicCharacters(text);
}

/**
 * Create a custom transliterator with specific options
 * @param {Object} options - Transliterator configuration
 * @returns {RussianTransliterator} Configured transliterator instance
 * 
 * @example
 * const customTransliterator = createTransliterator({
 *   system: 'simplified',
 *   preserveCase: true,
 *   showUntranslated: true
 * });
 * 
 * console.log(customTransliterator.transliterate('Привет')); // 'Privet'
 */
export function createTransliterator(options = {}) {
  return new RussianTransliterator(options);
}

/**
 * Get available romanization systems
 * @returns {Array} List of available romanization systems
 * 
 * @example
 * const systems = getAvailableSystems();
 * systems.forEach(sys => console.log(sys.id, '-', sys.name));
 */
export function getAvailableSystems() {
  return defaultTransliterator.getAvailableSystems();
}

/**
 * Transliterate with specific romanization system
 * @param {string} text - Russian text to transliterate
 * @param {string} system - System: 'gost', 'bgn', 'scientific', 'simplified'
 * @returns {string} Transliterated text
 * 
 * @example
 * console.log(transliterateWith('Москва', 'gost'));       // 'moskva'
 * console.log(transliterateWith('Москва', 'simplified')); // 'moskva'
 * console.log(transliterateWith('Москва', 'scientific')); // 'moskva'
 */
export function transliterateWith(text, system) {
  const transliterator = new RussianTransliterator({ system });
  return transliterator.transliterate(text);
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
        'hasCyrillicCharacters', 
        'extractCyrillicCharacters',
        'segmentText',
        'cleanRussianText',
        'countCyrillicCharacters',
        'splitPreservingRussian',
        'calculateReadingDifficulty',
        'findWordBoundaries',
        'normalizeRussianPunctuation',
        'detectMixedScript',
        'isValidRussianText',
        'extractRussianWords',
        'countSyllables',
        'isLikelyRussianName'
      ]
    }
  };
}

/**
 * Clean and normalize Russian text
 * @param {string} text - Text to clean
 * @param {Object} options - Cleaning options
 * @returns {string} Cleaned text
 * 
 * @example
 * const clean = cleanText('  Привет,,,   мир!!!  ');
 * console.log(clean); // 'Привет, мир!'
 */
export function cleanText(text, options = {}) {
  return utils.cleanRussianText(text, options);
}

/**
 * Segment Russian text into logical units
 * @param {string} text - Russian text to segment
 * @returns {string[]} Array of text segments
 * 
 * @example
 * const segments = segmentText('Привет, мир!');
 * console.log(segments); // ['Привет', ',', 'мир', '!']
 */
export function segmentText(text) {
  return utils.segmentText(text);
}

/**
 * Calculate reading difficulty of Russian text
 * @param {string} text - Russian text to analyze
 * @returns {Object} Difficulty analysis
 * 
 * @example
 * const difficulty = getReadingDifficulty('Это сложный текст для изучения');
 * console.log(difficulty.level); // 'medium', 'hard', etc.
 */
export function getReadingDifficulty(text) {
  return utils.calculateReadingDifficulty(text);
}

/**
 * Detect mixed Cyrillic-Latin script in text
 * @param {string} text - Text to analyze
 * @returns {Object} Mixed script analysis
 * 
 * @example
 * const mixed = detectMixedScript('Hello Привет');
 * console.log(mixed.isMixed); // true
 * console.log(mixed.cyrillicRatio); // 0.5
 */
export function detectMixedScript(text) {
  return utils.detectMixedScript(text);
}

/**
 * Extract Russian words from mixed text
 * @param {string} text - Mixed text
 * @returns {string[]} Array of Russian words
 * 
 * @example
 * const words = extractRussianWords('Hello Привет мир world');
 * console.log(words); // ['Привет', 'мир']
 */
export function extractRussianWords(text) {
  return utils.extractRussianWords(text);
}

/**
 * Find word boundaries in Russian text
 * @param {string} text - Russian text
 * @returns {string[]} Array of Russian words
 */
export function findWordBoundaries(text) {
  return utils.findWordBoundaries(text);
}

/**
 * Normalize Russian punctuation to standard equivalents
 * @param {string} text - Text with Russian punctuation
 * @returns {string} Text with normalized punctuation
 */
export function normalizePunctuation(text) {
  return utils.normalizeRussianPunctuation(text);
}

/**
 * Count syllables in Russian word (approximate)
 * @param {string} word - Russian word
 * @returns {number} Approximate syllable count
 */
export function countSyllables(word) {
  return utils.countSyllables(word);
}

/**
 * Check if word is likely a Russian name
 * @param {string} word - Word to check
 * @returns {boolean} True if likely a Russian name
 */
export function isLikelyRussianName(word) {
  return utils.isLikelyRussianName(word);
}

/**
 * Transliterate common Russian names with proper capitalization
 * @param {string} name - Russian name
 * @param {string} system - Romanization system
 * @returns {string} Transliterated name
 * 
 * @example
 * console.log(transliterateName('Владимир')); // 'Vladimir'
 * console.log(transliterateName('Екатерина')); // 'Ekaterina'
 */
export function transliterateName(name, system = 'gost') {
  const transliterator = new RussianTransliterator({ 
    system, 
    preserveCase: true,
    wordFirst: true 
  });
  return transliterator.transliterate(name);
}

/**
 * Compare transliteration results across different systems
 * @param {string} text - Russian text to compare
 * @returns {Object} Transliterations in all systems
 * 
 * @example
 * const comparison = compareTransliterations('Москва');
 * console.log(comparison.gost);       // 'moskva'
 * console.log(comparison.simplified); // 'moskva'
 * console.log(comparison.scientific); // 'moskva'
 */
export function compareTransliterations(text) {
  const systems = ['gost', 'bgn', 'scientific', 'simplified'];
  const results = {};
  
  systems.forEach(system => {
    results[system] = transliterateWith(text, system);
  });
  
  return results;
}

/**
 * Reverse transliteration: attempt to convert Latin back to Cyrillic
 * Note: This is approximate and may not be perfect due to romanization ambiguities
 * @param {string} latin - Latin text to reverse
 * @returns {string} Approximate Cyrillic text
 */
export function reverseTransliterate(latin) {
  if (!latin || typeof latin !== 'string') {
    return '';
  }

  // Create reverse mapping from russianWordsMap
  const reverseWordMap = {};
  for (const [cyrillic, romanized] of Object.entries(russianWordsMap)) {
    reverseWordMap[romanized.toLowerCase()] = cyrillic;
  }

  // Try word-level reverse translation first
  const words = latin.toLowerCase().split(/\s+/);
  const reversedWords = words.map(word => {
    const cleanWord = word.replace(/[.,!?;:]/g, '');
    return reverseWordMap[cleanWord] || word;
  });

  return reversedWords.join(' ');
}

// Export the transliterator class for advanced usage
export { RussianTransliterator };

// Export utility functions
export { utils };

// Export data mappings for direct access
export { 
  russianAlphabetMap,
  russianWordsMap,
  alternativeRomanizations,
  isCyrillicCharacter,
  getRomanization,
  isRussianText
};

// Default export for convenience
export default {
  transliterate,
  analyze,
  transliterateBatch,
  hasCyrillicCharacters,
  extractCyrillicCharacters,
  createTransliterator,
  getAvailableSystems,
  transliterateWith,
  getTransliteratorInfo,
  cleanText,
  segmentText,
  getReadingDifficulty,
  detectMixedScript,
  extractRussianWords,
  findWordBoundaries,
  normalizePunctuation,
  countSyllables,
  isLikelyRussianName,
  transliterateName,
  compareTransliterations,
  reverseTransliterate,
  RussianTransliterator,
  utils
};