/**
 * Utility functions for Mandarin Chinese text processing
 * Helper functions for script detection, text analysis, and processing
 */

import { isChineseCharacter } from '../data/chinese-characters.js';

/**
 * Detect the type of characters in a string
 * @param {string} text - Text to analyze
 * @returns {Object} Character type analysis
 */
export function analyzeText(text) {
  if (!text || typeof text !== 'string') {
    return {
      chinese: 0,
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
    chinese: 0,
    latin: 0,
    numbers: 0,
    punctuation: 0,
    whitespace: 0,
    other: 0,
    total: chars.length,
    primaryScript: 'unknown'
  };

  chars.forEach(char => {
    if (isChineseCharacter(char)) {
      analysis.chinese++;
    } else if (/[a-zA-Z]/.test(char)) {
      analysis.latin++;
    } else if (/[0-9]/.test(char)) {
      analysis.numbers++;
    } else if (/\s/.test(char)) {
      analysis.whitespace++;
    } else if (/[.,!?;:'"()[\]{}。，！？；：''""（）【】]/.test(char)) {
      analysis.punctuation++;
    } else {
      analysis.other++;
    }
  });

  // Determine primary script
  if (analysis.chinese > analysis.latin && analysis.chinese > analysis.other) {
    analysis.primaryScript = 'chinese';
  } else if (analysis.latin > analysis.chinese && analysis.latin > analysis.other) {
    analysis.primaryScript = 'latin';
  } else if (analysis.chinese + analysis.latin + analysis.numbers === 0) {
    analysis.primaryScript = 'none';
  } else {
    analysis.primaryScript = 'mixed';
  }

  return analysis;
}

/**
 * Check if text contains Chinese characters
 * @param {string} text - Text to check
 * @returns {boolean} True if text contains Chinese characters
 */
export function hasChineseCharacters(text) {
  if (!text || typeof text !== 'string') {
    return false;
  }

  return Array.from(text).some(isChineseCharacter);
}

/**
 * Extract all Chinese characters from text
 * @param {string} text - Input text
 * @returns {string[]} Array of Chinese characters
 */
export function extractChineseCharacters(text) {
  if (!text || typeof text !== 'string') {
    return [];
  }

  return Array.from(text).filter(isChineseCharacter);
}

/**
 * Segment Chinese text into logical units (characters and phrases)
 * This is a simple segmentation - for production use, consider advanced segmentation libraries
 * @param {string} text - Chinese text to segment
 * @returns {string[]} Array of text segments
 */
export function segmentText(text) {
  if (!text || typeof text !== 'string') {
    return [];
  }

  const segments = [];
  let currentSegment = '';

  for (const char of text) {
    if (isChineseCharacter(char)) {
      currentSegment += char;
    } else {
      if (currentSegment) {
        segments.push(currentSegment);
        currentSegment = '';
      }
      
      // Keep whitespace and punctuation as separate segments
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
 * Clean and normalize Chinese text
 * @param {string} text - Text to clean
 * @param {Object} options - Cleaning options
 * @returns {string} Cleaned text
 */
export function cleanChineseText(text, options = {}) {
  if (!text || typeof text !== 'string') {
    return '';
  }

  const opts = {
    removeExtraSpaces: options.removeExtraSpaces !== false,
    normalizeQuotes: options.normalizeQuotes !== false,
    removeDuplicateChars: options.removeDuplicateChars === true,
    trimWhitespace: options.trimWhitespace !== false
  };

  let cleaned = text;

  // Normalize quotes
  if (opts.normalizeQuotes) {
    cleaned = cleaned
      .replace(/[""]/g, '"')
      .replace(/['']/g, "'")
      .replace(/[（）]/g, match => match === '（' ? '(' : ')');
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
 * Count characters, excluding whitespace and punctuation
 * @param {string} text - Text to count
 * @returns {number} Character count
 */
export function countChineseCharacters(text) {
  if (!text || typeof text !== 'string') {
    return 0;
  }

  return extractChineseCharacters(text).length;
}

/**
 * Split text while preserving Chinese characters together
 * @param {string} text - Text to split
 * @param {number} maxLength - Maximum length per chunk
 * @returns {string[]} Array of text chunks
 */
export function splitPreservingChinese(text, maxLength = 100) {
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
        currentChunk.lastIndexOf('。'),
        currentChunk.lastIndexOf('，'),
        currentChunk.lastIndexOf('！'),
        currentChunk.lastIndexOf('？')
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
 * Calculate reading difficulty score based on character frequency
 * @param {string} text - Chinese text to analyze
 * @returns {Object} Difficulty analysis
 */
export function calculateReadingDifficulty(text) {
  if (!text || typeof text !== 'string') {
    return {
      score: 0,
      level: 'unknown',
      chineseCharCount: 0,
      uniqueChars: 0
    };
  }

  const chineseChars = extractChineseCharacters(text);
  const uniqueChars = new Set(chineseChars);
  
  // Simple heuristic based on character count and unique characters
  const ratio = uniqueChars.size / chineseChars.length;
  let score = 0;
  
  if (chineseChars.length === 0) {
    return { score: 0, level: 'no-chinese', chineseCharCount: 0, uniqueChars: 0 };
  }

  // Base score on character count
  if (chineseChars.length <= 10) score += 1;
  else if (chineseChars.length <= 50) score += 2;
  else if (chineseChars.length <= 200) score += 3;
  else score += 4;

  // Adjust for character variety (more unique chars = harder)
  if (ratio > 0.8) score += 2;
  else if (ratio > 0.6) score += 1;

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
    chineseCharCount: chineseChars.length,
    uniqueChars: uniqueChars.size,
    ratio: ratio
  };
}

/**
 * Find potential word boundaries in Chinese text
 * Simple heuristic - for production, use proper word segmentation
 * @param {string} text - Chinese text
 * @returns {string[]} Array of potential words
 */
export function findWordBoundaries(text) {
  if (!text || typeof text !== 'string') {
    return [];
  }

  // Simple approach: split on punctuation and whitespace
  const words = text
    .split(/[\s，。！？；：""''（）【】]+/)
    .filter(word => word.trim() && hasChineseCharacters(word));

  return words;
}

/**
 * Convert traditional punctuation to simplified equivalents
 * @param {string} text - Text with mixed punctuation
 * @returns {string} Text with normalized punctuation
 */
export function normalizePunctuation(text) {
  if (!text || typeof text !== 'string') {
    return '';
  }

  const punctuationMap = {
    '，': ',',
    '。': '.',
    '！': '!',
    '？': '?',
    '：': ':',
    '；': ';',
    '"': '"',
    '"': '"',
    '\u2018': "'",  // Left single quotation mark
    '\u2019': "'",  // Right single quotation mark
    '（': '(',
    '）': ')',
    '【': '[',
    '】': ']'
  };

  let result = text;
  for (const [chinese, english] of Object.entries(punctuationMap)) {
    result = result.replace(new RegExp(chinese, 'g'), english);
  }

  return result;
}

/**
 * Validate if text is valid Chinese
 * @param {string} text - Text to validate
 * @returns {boolean} True if valid Chinese text
 */
export function isValidChineseText(text) {
  if (!text || typeof text !== 'string') {
    return false;
  }

  const analysis = analyzeText(text);
  return analysis.chinese > 0 && (
    analysis.chinese / analysis.total > 0.3 || 
    analysis.primaryScript === 'chinese'
  );
}

// Export all utility functions
export default {
  analyzeText,
  hasChineseCharacters,
  extractChineseCharacters,
  segmentText,
  cleanChineseText,
  countChineseCharacters,
  splitPreservingChinese,
  calculateReadingDifficulty,
  findWordBoundaries,
  normalizePunctuation,
  isValidChineseText
};