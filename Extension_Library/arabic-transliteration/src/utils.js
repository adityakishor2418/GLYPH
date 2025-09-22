/**
 * Arabic Text Analysis and Utility Functions
 * Comprehensive utilities for processing and analyzing Arabic script text
 */

import {
  arabicAlphabetMap,
  arabicWordsMap,
  isArabicCharacter,
  isArabicText,
  removeDiacritics,
  normalizeArabicText
} from '../data/arabic-characters.js';

/**
 * Analyze Arabic text and provide comprehensive information
 * @param {string} text - Arabic text to analyze
 * @returns {Object} Detailed analysis results
 */
export function analyzeText(text) {
  if (!text || typeof text !== 'string') {
    return {
      totalCharacters: 0,
      arabicCharacters: 0,
      diacritics: 0,
      words: 0,
      sentences: 0,
      arabicRatio: 0
    };
  }

  const chars = Array.from(text);
  const arabicChars = chars.filter(isArabicCharacter);
  const diacritics = chars.filter(char => isDiacritic(char));
  const words = extractArabicWords(text);
  const sentences = text.split(/[.!?؟।]/g).filter(s => s.trim()).length;

  return {
    totalCharacters: chars.length,
    arabicCharacters: arabicChars.length,
    diacritics: diacritics.length,
    words: words.length,
    sentences: sentences,
    arabicRatio: chars.length > 0 ? arabicChars.length / chars.length : 0,
    hasNumbers: /[٠-٩0-9]/.test(text),
    hasPunctuation: /[.،؛:!؟"]/.test(text),
    uniqueCharacters: [...new Set(arabicChars)].length,
    averageWordLength: words.length > 0 ? words.reduce((sum, word) => sum + word.length, 0) / words.length : 0
  };
}

/**
 * Check if text contains Arabic characters
 * @param {string} text - Text to check
 * @returns {boolean} True if text contains Arabic characters
 */
export function hasArabicCharacters(text) {
  if (!text || typeof text !== 'string') {
    return false;
  }
  return Array.from(text).some(isArabicCharacter);
}

/**
 * Extract only Arabic characters from mixed text
 * @param {string} text - Mixed text
 * @returns {string[]} Array of Arabic characters
 */
export function extractArabicCharacters(text) {
  if (!text || typeof text !== 'string') {
    return [];
  }
  return Array.from(text).filter(isArabicCharacter);
}

/**
 * Segment Arabic text into logical units (words, punctuation)
 * @param {string} text - Arabic text to segment
 * @returns {string[]} Array of text segments
 */
export function segmentText(text) {
  if (!text || typeof text !== 'string') {
    return [];
  }

  // Split by whitespace and punctuation while preserving them
  const segments = text.split(/(\s+|[.،؛:!؟"()[\]{}])/);
  return segments.filter(segment => segment.trim() || /[.،؛:!؟"()[\]{}]/.test(segment));
}

/**
 * Clean Arabic text by removing extra whitespace and normalizing
 * @param {string} text - Text to clean
 * @param {Object} options - Cleaning options
 * @returns {string} Cleaned text
 */
export function cleanArabicText(text, options = {}) {
  if (!text || typeof text !== 'string') {
    return '';
  }

  let cleaned = text;

  // Remove extra whitespace
  cleaned = cleaned.replace(/\s+/g, ' ').trim();

  // Normalize Arabic text if requested
  if (options.normalize !== false) {
    cleaned = normalizeArabicText(cleaned);
  }

  // Remove diacritics if requested
  if (options.removeDiacritics) {
    cleaned = removeDiacritics(cleaned);
  }

  // Fix punctuation spacing
  cleaned = cleaned.replace(/\s+([.،؛:!؟])/g, '$1');
  cleaned = cleaned.replace(/([.،؛:!؟])\s*/g, '$1 ');

  return cleaned.trim();
}

/**
 * Count Arabic characters in text (excluding diacritics)
 * @param {string} text - Text to analyze
 * @returns {number} Number of Arabic characters
 */
export function countArabicCharacters(text) {
  if (!text || typeof text !== 'string') {
    return 0;
  }
  return Array.from(text).filter(char => isArabicCharacter(char) && !isDiacritic(char)).length;
}

/**
 * Split text while preserving Arabic text integrity
 * @param {string} text - Text to split
 * @param {string|RegExp} separator - Separator pattern
 * @returns {string[]} Array of text parts
 */
export function splitPreservingArabic(text, separator = /\s+/) {
  if (!text || typeof text !== 'string') {
    return [];
  }

  // Simple split that respects Arabic word boundaries
  return text.split(separator).filter(part => part.trim());
}

/**
 * Calculate reading difficulty of Arabic text (simplified heuristic)
 * @param {string} text - Arabic text to analyze
 * @returns {Object} Difficulty analysis
 */
export function calculateReadingDifficulty(text) {
  if (!text || typeof text !== 'string') {
    return { level: 'unknown', score: 0, factors: [] };
  }

  const analysis = analyzeText(text);
  const factors = [];
  let score = 0;

  // Word length factor
  if (analysis.averageWordLength > 6) {
    score += 2;
    factors.push('Long average word length');
  } else if (analysis.averageWordLength > 4) {
    score += 1;
    factors.push('Moderate word length');
  }

  // Sentence length factor (approximate)
  const avgSentenceLength = analysis.words / Math.max(analysis.sentences, 1);
  if (avgSentenceLength > 20) {
    score += 2;
    factors.push('Long sentences');
  } else if (avgSentenceLength > 12) {
    score += 1;
    factors.push('Moderate sentence length');
  }

  // Diacritics factor (paradoxically, more diacritics can make reading easier)
  const diacriticRatio = analysis.diacritics / Math.max(analysis.arabicCharacters, 1);
  if (diacriticRatio < 0.1) {
    score += 1;
    factors.push('Few or no diacritics');
  }

  // Unique character diversity
  const characterDiversity = analysis.uniqueCharacters / Math.max(analysis.arabicCharacters, 1);
  if (characterDiversity > 0.4) {
    score += 1;
    factors.push('High character diversity');
  }

  let level = 'beginner';
  if (score >= 4) level = 'advanced';
  else if (score >= 2) level = 'intermediate';

  return {
    level,
    score,
    factors,
    wordCount: analysis.words,
    sentenceCount: analysis.sentences,
    averageWordLength: analysis.averageWordLength
  };
}

/**
 * Find word boundaries in Arabic text
 * @param {string} text - Arabic text
 * @returns {string[]} Array of words
 */
export function findWordBoundaries(text) {
  if (!text || typeof text !== 'string') {
    return [];
  }

  // Arabic word boundary detection
  const words = text
    .split(/[\s.،؛:!؟"()[\]{}]+/)
    .filter(word => word.trim() && hasArabicCharacters(word));

  return words;
}

/**
 * Normalize Arabic punctuation to standard equivalents
 * @param {string} text - Text with Arabic punctuation
 * @returns {string} Text with normalized punctuation
 */
export function normalizeArabicPunctuation(text) {
  if (!text || typeof text !== 'string') {
    return '';
  }

  let normalized = text;
  
  // Normalize Arabic punctuation to Latin equivalents
  const punctuationMap = {
    '؟': '?',    // Arabic question mark
    '؛': ';',    // Arabic semicolon
    '،': ',',    // Arabic comma
    '٪': '%',    // Arabic percent sign
  };

  Object.entries(punctuationMap).forEach(([arabic, latin]) => {
    normalized = normalized.replace(new RegExp(arabic, 'g'), latin);
  });

  return normalized;
}

/**
 * Detect mixed Arabic-Latin script in text
 * @param {string} text - Text to analyze
 * @returns {Object} Mixed script analysis
 */
export function detectMixedScript(text) {
  if (!text || typeof text !== 'string') {
    return { isMixed: false, arabicRatio: 0, latinRatio: 0 };
  }

  const chars = Array.from(text).filter(char => /\S/.test(char)); // Non-whitespace
  const arabicChars = chars.filter(isArabicCharacter).length;
  const latinChars = chars.filter(char => /[a-zA-Z]/.test(char)).length;
  const totalLetters = arabicChars + latinChars;

  if (totalLetters === 0) {
    return { isMixed: false, arabicRatio: 0, latinRatio: 0 };
  }

  const arabicRatio = arabicChars / totalLetters;
  const latinRatio = latinChars / totalLetters;

  return {
    isMixed: arabicChars > 0 && latinChars > 0,
    arabicRatio,
    latinRatio,
    totalLetters,
    arabicChars,
    latinChars
  };
}

/**
 * Check if text is valid Arabic text
 * @param {string} text - Text to validate
 * @returns {boolean} True if valid Arabic text
 */
export function isValidArabicText(text) {
  if (!text || typeof text !== 'string') {
    return false;
  }

  // Must contain at least some Arabic characters
  if (!hasArabicCharacters(text)) {
    return false;
  }

  // Check for valid Arabic character patterns
  const analysis = analyzeText(text);
  
  // At least 30% should be Arabic for it to be considered valid Arabic text
  return analysis.arabicRatio >= 0.3;
}

/**
 * Extract Arabic words from mixed text
 * @param {string} text - Mixed text
 * @returns {string[]} Array of Arabic words
 */
export function extractArabicWords(text) {
  if (!text || typeof text !== 'string') {
    return [];
  }

  const words = findWordBoundaries(text);
  return words.filter(word => isValidArabicText(word));
}

/**
 * Count syllables in Arabic word (approximate)
 * @param {string} word - Arabic word
 * @returns {number} Approximate syllable count
 */
export function countSyllables(word) {
  if (!word || typeof word !== 'string') {
    return 0;
  }

  // Remove diacritics for counting
  const cleanWord = removeDiacritics(word);
  
  // Arabic vowels (approximate)
  const vowels = 'اأإآوي';
  let syllableCount = 0;
  
  for (let char of cleanWord) {
    if (vowels.includes(char)) {
      syllableCount++;
    }
  }

  // Ensure at least one syllable if word has characters
  return Math.max(syllableCount, cleanWord.length > 0 ? 1 : 0);
}

/**
 * Check if word is likely an Arabic name
 * @param {string} word - Word to check
 * @returns {boolean} True if likely an Arabic name
 */
export function isLikelyArabicName(word) {
  if (!word || typeof word !== 'string') {
    return false;
  }

  // Common Arabic name patterns and prefixes
  const namePatterns = [
    'محمد', 'أحمد', 'علي', 'حسن', 'حسين', 'عبد',
    'فاطمة', 'خديجة', 'عائشة', 'زينب',
    'أبو', 'ابن', 'بن', 'بنت'
  ];

  const normalizedWord = normalizeArabicText(word.toLowerCase());
  
  return namePatterns.some(pattern => 
    normalizedWord.includes(pattern) || pattern.includes(normalizedWord)
  );
}

/**
 * Check if character is a diacritic
 * @param {string} char - Character to check
 * @returns {boolean} True if character is a diacritic
 */
export function isDiacritic(char) {
  if (!char || typeof char !== 'string') {
    return false;
  }
  
  const code = char.charCodeAt(0);
  // Arabic diacritics range
  return (code >= 0x064B && code <= 0x0652) || code === 0x0670 || code === 0x0640;
}

/**
 * Get text direction for Arabic text (always RTL)
 * @param {string} text - Text to check
 * @returns {string} Text direction ('rtl' for Arabic)
 */
export function getTextDirection(text) {
  if (!text || typeof text !== 'string') {
    return 'ltr';
  }
  
  return hasArabicCharacters(text) ? 'rtl' : 'ltr';
}

/**
 * Convert Arabic-Indic numerals to Western numerals
 * @param {string} text - Text containing Arabic-Indic numerals
 * @returns {string} Text with Western numerals
 */
export function convertArabicNumerals(text) {
  if (!text || typeof text !== 'string') {
    return '';
  }
  
  const arabicNumerals = '٠١٢٣٤٥٦٧٨٩';
  const westernNumerals = '0123456789';
  
  let result = text;
  for (let i = 0; i < arabicNumerals.length; i++) {
    result = result.replace(new RegExp(arabicNumerals[i], 'g'), westernNumerals[i]);
  }
  
  return result;
}

/**
 * Check if text contains Arabic numerals
 * @param {string} text - Text to check
 * @returns {boolean} True if contains Arabic numerals
 */
export function hasArabicNumerals(text) {
  if (!text || typeof text !== 'string') {
    return false;
  }
  
  return /[٠-٩]/.test(text);
}

export default {
  analyzeText,
  hasArabicCharacters,
  extractArabicCharacters,
  segmentText,
  cleanArabicText,
  countArabicCharacters,
  splitPreservingArabic,
  calculateReadingDifficulty,
  findWordBoundaries,
  normalizeArabicPunctuation,
  detectMixedScript,
  isValidArabicText,
  extractArabicWords,
  countSyllables,
  isLikelyArabicName,
  isDiacritic,
  getTextDirection,
  convertArabicNumerals,
  hasArabicNumerals
};