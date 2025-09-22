/**
 * Arabic to Latin Transliteration Library
 * Main API interface for converting Arabic script to Latin script
 * 
 * @author AI Assistant
 * @version 1.0.0
 */

import { ArabicTransliterator } from './transliterator.js';
import utils from './utils.js';
import { 
  arabicAlphabetMap,
  arabicWordsMap,
  alternativeRomanizations,
  isArabicCharacter,
  getRomanization,
  isArabicText,
  removeDiacritics,
  normalizeArabicText
} from '../data/arabic-characters.js';

// Create default transliterator instance with ALA-LC system
const defaultTransliterator = new ArabicTransliterator();

/**
 * Transliterate Arabic text with default ALA-LC system
 * @param {string} text - Arabic text to transliterate
 * @param {Object} options - Transliteration options
 * @returns {string} Latin transliteration
 * 
 * @example
 * import { transliterate } from './arabic-transliteration/src/index.js';
 * 
 * const result = transliterate('السلام عليكم');
 * console.log(result); // 'al-salām ʿalaykum'
 */
export function transliterate(text, options = {}) {
  if (Object.keys(options).length > 0) {
    // Create temporary transliterator with custom options
    const customTransliterator = new ArabicTransliterator(options);
    return customTransliterator.transliterate(text);
  }
  
  return defaultTransliterator.transliterate(text);
}

/**
 * Analyze Arabic text and provide detailed information
 * @param {string} text - Arabic text to analyze
 * @param {Object} options - Analysis options
 * @returns {Object} Detailed analysis results
 * 
 * @example
 * const analysis = analyze('مرحبا بالعالم!');
 * console.log(analysis.transliteration); // 'marḥaban bi-l-ʿālam!'
 * console.log(analysis.arabicCharacters); // 12
 * console.log(analysis.coverage); // 1.0 (100% coverage)
 */
export function analyze(text, options = {}) {
  const transliterator = Object.keys(options).length > 0 
    ? new ArabicTransliterator(options)
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
    isValidArabic: utils.isValidArabicText(text),
    textDirection: utils.getTextDirection(text),
    hasNumerals: utils.hasArabicNumerals(text)
  };
}

/**
 * Batch transliterate multiple texts
 * @param {string[]} texts - Array of Arabic texts
 * @param {Object} options - Transliteration options
 * @returns {string[]} Array of Latin transliterations
 * 
 * @example
 * const results = transliterateBatch(['مرحبا', 'شكرا', 'السلام عليكم']);
 * console.log(results); // ['marḥaban', 'shukran', 'al-salāmu ʿalaykum']
 */
export function transliterateBatch(texts, options = {}) {
  const transliterator = Object.keys(options).length > 0 
    ? new ArabicTransliterator(options)
    : defaultTransliterator;
    
  return transliterator.transliterateBatch(texts);
}

/**
 * Check if text contains Arabic characters
 * @param {string} text - Text to check
 * @returns {boolean} True if text contains Arabic characters
 * 
 * @example
 * console.log(hasArabicCharacters('Hello مرحبا')); // true
 * console.log(hasArabicCharacters('Hello World')); // false
 */
export function hasArabicCharacters(text) {
  return utils.hasArabicCharacters(text);
}

/**
 * Extract only Arabic characters from mixed text
 * @param {string} text - Mixed text
 * @returns {string[]} Array of Arabic characters
 * 
 * @example
 * const chars = extractArabicCharacters('Hello مرحبا World');
 * console.log(chars); // ['م', 'ر', 'ح', 'ب', 'ا']
 */
export function extractArabicCharacters(text) {
  return utils.extractArabicCharacters(text);
}

/**
 * Create a custom transliterator with specific options
 * @param {Object} options - Transliterator configuration
 * @returns {ArabicTransliterator} Configured transliterator instance
 * 
 * @example
 * const customTransliterator = createTransliterator({
 *   system: 'simplified',
 *   removeDiacritics: true,
 *   showUntranslated: true
 * });
 * 
 * console.log(customTransliterator.transliterate('مَرْحَبًا')); // 'marhaba'
 */
export function createTransliterator(options = {}) {
  return new ArabicTransliterator(options);
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
 * @param {string} text - Arabic text to transliterate
 * @param {string} system - System: 'ala', 'bgn', 'iso', 'simplified'
 * @returns {string} Transliterated text
 * 
 * @example
 * console.log(transliterateWith('الله', 'ala'));        // 'Allāh'
 * console.log(transliterateWith('الله', 'simplified')); // 'Allah'
 * console.log(transliterateWith('الله', 'iso'));        // 'ʾAllāh'
 */
export function transliterateWith(text, system) {
  const transliterator = new ArabicTransliterator({ system });
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
        'hasArabicCharacters', 
        'extractArabicCharacters',
        'segmentText',
        'cleanArabicText',
        'countArabicCharacters',
        'splitPreservingArabic',
        'calculateReadingDifficulty',
        'findWordBoundaries',
        'normalizeArabicPunctuation',
        'detectMixedScript',
        'isValidArabicText',
        'extractArabicWords',
        'countSyllables',
        'isLikelyArabicName',
        'isDiacritic',
        'getTextDirection',
        'convertArabicNumerals',
        'hasArabicNumerals'
      ]
    }
  };
}

/**
 * Clean and normalize Arabic text
 * @param {string} text - Text to clean
 * @param {Object} options - Cleaning options
 * @returns {string} Cleaned text
 * 
 * @example
 * const clean = cleanText('  مرحبا،،،   بالعالم!!!  ');
 * console.log(clean); // 'مرحبا، بالعالم!'
 */
export function cleanText(text, options = {}) {
  return utils.cleanArabicText(text, options);
}

/**
 * Segment Arabic text into logical units
 * @param {string} text - Arabic text to segment
 * @returns {string[]} Array of text segments
 * 
 * @example
 * const segments = segmentText('مرحبا، بالعالم!');
 * console.log(segments); // ['مرحبا', '،', 'بالعالم', '!']
 */
export function segmentText(text) {
  return utils.segmentText(text);
}

/**
 * Calculate reading difficulty of Arabic text
 * @param {string} text - Arabic text to analyze
 * @returns {Object} Difficulty analysis
 * 
 * @example
 * const difficulty = getReadingDifficulty('هذا نص معقد للغاية للدراسة');
 * console.log(difficulty.level); // 'intermediate', 'advanced', etc.
 */
export function getReadingDifficulty(text) {
  return utils.calculateReadingDifficulty(text);
}

/**
 * Detect mixed Arabic-Latin script in text
 * @param {string} text - Text to analyze
 * @returns {Object} Mixed script analysis
 * 
 * @example
 * const mixed = detectMixedScript('Hello مرحبا');
 * console.log(mixed.isMixed); // true
 * console.log(mixed.arabicRatio); // 0.5
 */
export function detectMixedScript(text) {
  return utils.detectMixedScript(text);
}

/**
 * Extract Arabic words from mixed text
 * @param {string} text - Mixed text
 * @returns {string[]} Array of Arabic words
 * 
 * @example
 * const words = extractArabicWords('Hello مرحبا بالعالم world');
 * console.log(words); // ['مرحبا', 'بالعالم']
 */
export function extractArabicWords(text) {
  return utils.extractArabicWords(text);
}

/**
 * Find word boundaries in Arabic text
 * @param {string} text - Arabic text
 * @returns {string[]} Array of Arabic words
 */
export function findWordBoundaries(text) {
  return utils.findWordBoundaries(text);
}

/**
 * Normalize Arabic punctuation to standard equivalents
 * @param {string} text - Text with Arabic punctuation
 * @returns {string} Text with normalized punctuation
 */
export function normalizePunctuation(text) {
  return utils.normalizeArabicPunctuation(text);
}

/**
 * Count syllables in Arabic word (approximate)
 * @param {string} word - Arabic word
 * @returns {number} Approximate syllable count
 */
export function countSyllables(word) {
  return utils.countSyllables(word);
}

/**
 * Check if word is likely an Arabic name
 * @param {string} word - Word to check
 * @returns {boolean} True if likely an Arabic name
 */
export function isLikelyArabicName(word) {
  return utils.isLikelyArabicName(word);
}

/**
 * Remove Arabic diacritics from text
 * @param {string} text - Arabic text with diacritics
 * @returns {string} Text without diacritics
 * 
 * @example
 * console.log(stripDiacritics('مَرْحَبًا')); // 'مرحبا'
 */
export function stripDiacritics(text) {
  return removeDiacritics(text);
}

/**
 * Normalize Arabic text (remove diacritics, standardize forms)
 * @param {string} text - Arabic text to normalize
 * @returns {string} Normalized text
 * 
 * @example
 * console.log(normalizeText('أهْلاً وَسَهْلاً')); // 'اهلا وسهلا'
 */
export function normalizeText(text) {
  return normalizeArabicText(text);
}

/**
 * Get text direction for display
 * @param {string} text - Text to check
 * @returns {string} 'rtl' for Arabic text, 'ltr' otherwise
 */
export function getTextDirection(text) {
  return utils.getTextDirection(text);
}

/**
 * Convert Arabic-Indic numerals to Western numerals
 * @param {string} text - Text with Arabic-Indic numerals
 * @returns {string} Text with Western numerals
 * 
 * @example
 * console.log(convertNumerals('العدد ١٢٣٪')); // 'العدد 123%'
 */
export function convertNumerals(text) {
  return utils.convertArabicNumerals(text);
}

/**
 * Check if character is a diacritic
 * @param {string} char - Character to check
 * @returns {boolean} True if diacritic
 */
export function isDiacritic(char) {
  return utils.isDiacritic(char);
}

/**
 * Transliterate common Arabic names with proper formatting
 * @param {string} name - Arabic name
 * @param {string} system - Romanization system
 * @returns {string} Transliterated name
 * 
 * @example
 * console.log(transliterateName('محمد')); // 'Muḥammad'
 * console.log(transliterateName('فاطمة')); // 'Fāṭimah'
 */
export function transliterateName(name, system = 'ala') {
  const transliterator = new ArabicTransliterator({ 
    system, 
    preserveCase: true,
    wordFirst: true,
    removeDiacritics: false
  });
  const result = transliterator.transliterate(name);
  
  // Capitalize first letter
  return result.charAt(0).toUpperCase() + result.slice(1);
}

/**
 * Compare transliteration results across different systems
 * @param {string} text - Arabic text to compare
 * @returns {Object} Transliterations in all systems
 * 
 * @example
 * const comparison = compareTransliterations('محمد');
 * console.log(comparison.ala);        // 'Muḥammad'
 * console.log(comparison.simplified); // 'Muhammad'
 * console.log(comparison.iso);        // 'Muḥammad'
 */
export function compareTransliterations(text) {
  const systems = ['ala', 'bgn', 'iso', 'simplified'];
  const results = {};
  
  systems.forEach(system => {
    results[system] = transliterateWith(text, system);
  });
  
  return results;
}

/**
 * Reverse transliteration: attempt to convert Latin back to Arabic
 * Note: This is approximate and may not be perfect due to romanization ambiguities
 * @param {string} latin - Latin text to reverse
 * @returns {string} Approximate Arabic text
 */
export function reverseTransliterate(latin) {
  if (!latin || typeof latin !== 'string') {
    return '';
  }

  // Create reverse mapping from arabicWordsMap
  const reverseWordMap = {};
  for (const [arabic, romanized] of Object.entries(arabicWordsMap)) {
    reverseWordMap[romanized.toLowerCase()] = arabic;
  }

  // Try word-level reverse translation first
  const words = latin.toLowerCase().split(/\s+/);
  const reversedWords = words.map(word => {
    const cleanWord = word.replace(/[.,!?;:]/g, '');
    return reverseWordMap[cleanWord] || word;
  });

  return reversedWords.join(' ');
}

/**
 * Process Arabic text for better transliteration
 * @param {string} text - Arabic text to process
 * @param {Object} options - Processing options
 * @returns {Object} Processed text and analysis
 */
export function processArabicText(text, options = {}) {
  const cleaned = cleanText(text, options);
  const analysis = analyze(cleaned);
  const transliteration = transliterate(cleaned, options);
  
  return {
    original: text,
    cleaned: cleaned,
    transliteration: transliteration,
    analysis: analysis,
    suggestions: {
      removeDiacritics: analysis.hasDiacritics,
      normalize: analysis.textAnalysis.arabicRatio > 0.8,
      system: analysis.difficulty.level === 'advanced' ? 'simplified' : 'ala'
    }
  };
}

// Export the transliterator class for advanced usage
export { ArabicTransliterator };

// Export utility functions
export { utils };

// Export data mappings for direct access
export { 
  arabicAlphabetMap,
  arabicWordsMap,
  alternativeRomanizations,
  isArabicCharacter,
  getRomanization,
  isArabicText,
  removeDiacritics,
  normalizeArabicText
};

// Default export for convenience
export default {
  transliterate,
  analyze,
  transliterateBatch,
  hasArabicCharacters,
  extractArabicCharacters,
  createTransliterator,
  getAvailableSystems,
  transliterateWith,
  getTransliteratorInfo,
  cleanText,
  segmentText,
  getReadingDifficulty,
  detectMixedScript,
  extractArabicWords,
  findWordBoundaries,
  normalizePunctuation,
  countSyllables,
  isLikelyArabicName,
  stripDiacritics,
  normalizeText,
  getTextDirection,
  convertNumerals,
  isDiacritic,
  transliterateName,
  compareTransliterations,
  reverseTransliterate,
  processArabicText,
  ArabicTransliterator,
  utils
};