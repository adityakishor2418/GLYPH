/**
 * Utility functions for Russian Cyrillic text processing
 * Helper functions for script detection, text analysis, and processing
 */

import { isCyrillicCharacter, isRussianText } from '../data/cyrillic-characters.js';

/**
 * Analyze text composition and script types
 * @param {string} text - Text to analyze
 * @returns {Object} Character type analysis
 */
export function analyzeText(text) {
  if (!text || typeof text !== 'string') {
    return {
      cyrillic: 0,
      latin: 0,
      numbers: 0,
      punctuation: 0,
      whitespace: 0,
      other: 0,
      total: 0,
      primaryScript: 'unknown'
    };
  }

  const chars = Array.from(text);
  const analysis = {
    cyrillic: 0,
    latin: 0,
    numbers: 0,
    punctuation: 0,
    whitespace: 0,
    other: 0,
    total: chars.length,
    primaryScript: 'unknown'
  };

  chars.forEach(char => {
    if (isCyrillicCharacter(char)) {
      analysis.cyrillic++;
    } else if (/[a-zA-Z]/.test(char)) {
      analysis.latin++;
    } else if (/[0-9]/.test(char)) {
      analysis.numbers++;
    } else if (/\s/.test(char)) {
      analysis.whitespace++;
    } else if (/[.,!?;:'"()[\]{}.,!?;:""''()«»—–]/.test(char)) {
      analysis.punctuation++;
    } else {
      analysis.other++;
    }
  });

  // Determine primary script
  if (analysis.cyrillic > analysis.latin && analysis.cyrillic > analysis.other) {
    analysis.primaryScript = 'cyrillic';
  } else if (analysis.latin > analysis.cyrillic && analysis.latin > analysis.other) {
    analysis.primaryScript = 'latin';
  } else if (analysis.cyrillic + analysis.latin + analysis.numbers === 0) {
    analysis.primaryScript = 'none';
  } else {
    analysis.primaryScript = 'mixed';
  }

  return analysis;
}

/**
 * Check if text contains Cyrillic characters
 * @param {string} text - Text to check
 * @returns {boolean} True if text contains Cyrillic characters
 */
export function hasCyrillicCharacters(text) {
  if (!text || typeof text !== 'string') {
    return false;
  }

  return Array.from(text).some(isCyrillicCharacter);
}

/**
 * Extract all Cyrillic characters from text
 * @param {string} text - Input text
 * @returns {string[]} Array of Cyrillic characters
 */
export function extractCyrillicCharacters(text) {
  if (!text || typeof text !== 'string') {
    return [];
  }

  return Array.from(text).filter(isCyrillicCharacter);
}

/**
 * Segment Russian text into words and punctuation
 * @param {string} text - Russian text to segment
 * @returns {string[]} Array of text segments
 */
export function segmentText(text) {
  if (!text || typeof text !== 'string') {
    return [];
  }

  const segments = [];
  let currentSegment = '';

  for (const char of text) {
    if (isCyrillicCharacter(char)) {
      currentSegment += char;
    } else if (/[a-zA-Z0-9]/.test(char)) {
      // Handle mixed Latin-Cyrillic text
      currentSegment += char;
    } else {
      if (currentSegment) {
        segments.push(currentSegment);
        currentSegment = '';
      }
      
      // Keep punctuation and whitespace as separate segments
      if (char.trim()) {
        segments.push(char);
      }
    }
  }

  if (currentSegment) {
    segments.push(currentSegment);
  }

  return segments.filter(segment => segment.trim());
}

/**
 * Clean and normalize Russian text
 * @param {string} text - Text to clean
 * @param {Object} options - Cleaning options
 * @returns {string} Cleaned text
 */
export function cleanRussianText(text, options = {}) {
  if (!text || typeof text !== 'string') {
    return '';
  }

  const opts = {
    removeExtraSpaces: options.removeExtraSpaces !== false,
    normalizeQuotes: options.normalizeQuotes !== false,
    normalizeDashes: options.normalizeDashes !== false,
    removeDuplicateChars: options.removeDuplicateChars === true,
    trimWhitespace: options.trimWhitespace !== false
  };

  let cleaned = text;

  // Normalize quotes
  if (opts.normalizeQuotes) {
    cleaned = cleaned
      .replace(/[«»]/g, '"')     // Russian quotes to standard quotes
      .replace(/['']/g, "'")     // Smart quotes to straight quotes
      .replace(/[""]/g, '"');    // Smart double quotes
  }

  // Normalize dashes
  if (opts.normalizeDashes) {
    cleaned = cleaned
      .replace(/[—–]/g, '-')     // Em dash and en dash to hyphen
      .replace(/\s*-\s*/g, ' - '); // Normalize spacing around dashes
  }

  // Remove extra spaces
  if (opts.removeExtraSpaces) {
    cleaned = cleaned.replace(/\s+/g, ' ');
  }

  // Remove duplicate consecutive characters (if requested)
  if (opts.removeDuplicateChars) {
    cleaned = cleaned.replace(/(.)\1{2,}/g, '$1$1');
  }

  // Trim whitespace
  if (opts.trimWhitespace) {
    cleaned = cleaned.trim();
  }

  return cleaned;
}

/**
 * Count Cyrillic characters, excluding whitespace and punctuation
 * @param {string} text - Text to count
 * @returns {number} Character count
 */
export function countCyrillicCharacters(text) {
  if (!text || typeof text !== 'string') {
    return 0;
  }

  return extractCyrillicCharacters(text).length;
}

/**
 * Split text while preserving Russian words together
 * @param {string} text - Text to split
 * @param {number} maxLength - Maximum length per chunk
 * @returns {string[]} Array of text chunks
 */
export function splitPreservingRussian(text, maxLength = 100) {
  if (!text || typeof text !== 'string') {
    return [];
  }

  if (text.length <= maxLength) {
    return [text];
  }

  const chunks = [];
  let currentChunk = '';

  for (const char of text) {
    if (currentChunk.length + 1 > maxLength) {
      // Try to break at a natural point
      const lastSpace = currentChunk.lastIndexOf(' ');
      const lastPunct = Math.max(
        currentChunk.lastIndexOf('.'),
        currentChunk.lastIndexOf(','),
        currentChunk.lastIndexOf('!'),
        currentChunk.lastIndexOf('?'),
        currentChunk.lastIndexOf(';')
      );

      const breakPoint = Math.max(lastSpace, lastPunct);
      
      if (breakPoint > 0) {
        chunks.push(currentChunk.substring(0, breakPoint + 1).trim());
        currentChunk = currentChunk.substring(breakPoint + 1) + char;
      } else {
        chunks.push(currentChunk);
        currentChunk = char;
      }
    } else {
      currentChunk += char;
    }
  }

  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}

/**
 * Calculate reading difficulty based on word length and frequency patterns
 * @param {string} text - Russian text to analyze
 * @returns {Object} Difficulty analysis
 */
export function calculateReadingDifficulty(text) {
  if (!text || typeof text !== 'string') {
    return {
      score: 0,
      level: 'unknown',
      cyrillicCharCount: 0,
      wordCount: 0,
      avgWordLength: 0
    };
  }

  const cyrillicChars = extractCyrillicCharacters(text);
  const words = segmentText(text).filter(segment => hasCyrillicCharacters(segment));
  const avgWordLength = words.length > 0 ? cyrillicChars.length / words.length : 0;
  
  let score = 0;
  
  if (cyrillicChars.length === 0) {
    return { 
      score: 0, 
      level: 'no-cyrillic', 
      cyrillicCharCount: 0, 
      wordCount: 0, 
      avgWordLength: 0 
    };
  }

  // Base score on text length
  if (cyrillicChars.length <= 20) score += 1;
  else if (cyrillicChars.length <= 100) score += 2;
  else if (cyrillicChars.length <= 500) score += 3;
  else score += 4;

  // Adjust for average word length (longer words = harder)
  if (avgWordLength > 8) score += 2;
  else if (avgWordLength > 6) score += 1;

  // Adjust for word count (more words = more complex)
  if (words.length > 50) score += 1;

  const levels = {
    1: 'very-easy',
    2: 'easy', 
    3: 'medium',
    4: 'hard',
    5: 'very-hard'
  };

  return {
    score: Math.min(score, 5),
    level: levels[Math.min(score, 5)] || 'medium',
    cyrillicCharCount: cyrillicChars.length,
    wordCount: words.length,
    avgWordLength: Math.round(avgWordLength * 10) / 10
  };
}

/**
 * Find word boundaries in Russian text
 * @param {string} text - Russian text
 * @returns {string[]} Array of words
 */
export function findWordBoundaries(text) {
  if (!text || typeof text !== 'string') {
    return [];
  }

  // Split on punctuation and whitespace, keep words with Cyrillic
  const words = text
    .split(/[\s.,!?;:""''()«»—–]+/)
    .filter(word => word.trim() && hasCyrillicCharacters(word));

  return words;
}

/**
 * Convert Russian punctuation to standard equivalents
 * @param {string} text - Text with Russian punctuation
 * @returns {string} Text with normalized punctuation
 */
export function normalizeRussianPunctuation(text) {
  if (!text || typeof text !== 'string') {
    return '';
  }

  const punctuationMap = {
    '«': '"',
    '»': '"',
    '„': '"',
    '"': '"',
    '\u2018': "'",  // Left single quotation mark
    '\u2019': "'",  // Right single quotation mark
    '—': '-',
    '–': '-',
    '…': '...'
  };

  let result = text;
  for (const [russian, standard] of Object.entries(punctuationMap)) {
    result = result.replace(new RegExp(russian, 'g'), standard);
  }

  return result;
}

/**
 * Detect if text is mixed Cyrillic-Latin
 * @param {string} text - Text to check
 * @returns {Object} Mixed script analysis
 */
export function detectMixedScript(text) {
  if (!text || typeof text !== 'string') {
    return { isMixed: false, cyrillicRatio: 0, latinRatio: 0 };
  }

  const analysis = analyzeText(text);
  const totalLetters = analysis.cyrillic + analysis.latin;
  
  if (totalLetters === 0) {
    return { isMixed: false, cyrillicRatio: 0, latinRatio: 0 };
  }

  const cyrillicRatio = analysis.cyrillic / totalLetters;
  const latinRatio = analysis.latin / totalLetters;
  
  return {
    isMixed: cyrillicRatio > 0.1 && latinRatio > 0.1,
    cyrillicRatio: Math.round(cyrillicRatio * 100) / 100,
    latinRatio: Math.round(latinRatio * 100) / 100,
    totalLetters: totalLetters
  };
}

/**
 * Validate if text is valid Russian
 * @param {string} text - Text to validate
 * @returns {boolean} True if valid Russian text
 */
export function isValidRussianText(text) {
  if (!text || typeof text !== 'string') {
    return false;
  }

  return isRussianText(text);
}

/**
 * Extract Russian words from mixed text
 * @param {string} text - Mixed text
 * @returns {string[]} Array of Russian words
 */
export function extractRussianWords(text) {
  if (!text || typeof text !== 'string') {
    return [];
  }

  const words = findWordBoundaries(text);
  return words.filter(word => {
    const analysis = analyzeText(word);
    return analysis.cyrillic > analysis.latin;
  });
}

/**
 * Count syllables in Russian word (approximate)
 * @param {string} word - Russian word
 * @returns {number} Approximate syllable count
 */
export function countSyllables(word) {
  if (!word || typeof word !== 'string') {
    return 0;
  }

  // Russian vowels
  const vowels = 'аеёиоуыэюя';
  let count = 0;
  
  for (const char of word.toLowerCase()) {
    if (vowels.includes(char)) {
      count++;
    }
  }
  
  return Math.max(count, 1); // At least 1 syllable
}

/**
 * Check if word is likely a Russian name (capitalized)
 * @param {string} word - Word to check
 * @returns {boolean} True if likely a Russian name
 */
export function isLikelyRussianName(word) {
  if (!word || typeof word !== 'string') {
    return false;
  }

  // Must start with capital letter and contain mostly Cyrillic
  const firstChar = word[0];
  const analysis = analyzeText(word);
  
  return firstChar === firstChar.toUpperCase() && 
         isCyrillicCharacter(firstChar) &&
         analysis.cyrillic > analysis.latin &&
         word.length >= 3;
}

// Export all utility functions
export default {
  analyzeText,
  hasCyrillicCharacters,
  extractCyrillicCharacters,
  segmentText,
  cleanRussianText,
  countCyrillicCharacters,
  splitPreservingRussian,
  calculateReadingDifficulty,
  findWordBoundaries,
  normalizeRussianPunctuation,
  detectMixedScript,
  isValidRussianText,
  extractRussianWords,
  countSyllables,
  isLikelyRussianName
};