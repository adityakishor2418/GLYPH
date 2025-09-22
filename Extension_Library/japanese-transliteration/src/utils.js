/**
 * Utility functions for Japanese text processing and script detection
 */

import { isHiragana } from '../data/hiragana.js';
import { isKatakana } from '../data/katakana.js';
import { isKanji } from '../data/kanji.js';

/**
 * Japanese script types
 */
export const ScriptType = {
  HIRAGANA: 'hiragana',
  KATAKANA: 'katakana',
  KANJI: 'kanji',
  ROMAJI: 'romaji',
  MIXED: 'mixed',
  OTHER: 'other'
};

/**
 * Detect the script type of a single character
 * @param {string} char - Single character to analyze
 * @returns {string} Script type from ScriptType enum
 */
export function detectCharacterScript(char) {
  if (isHiragana(char)) return ScriptType.HIRAGANA;
  if (isKatakana(char)) return ScriptType.KATAKANA;
  if (isKanji(char)) return ScriptType.KANJI;
  if (isRomaji(char)) return ScriptType.ROMAJI;
  return ScriptType.OTHER;
}

/**
 * Detect the predominant script type of a text string
 * @param {string} text - Text to analyze
 * @returns {string} Predominant script type
 */
export function detectTextScript(text) {
  if (!text || text.length === 0) return ScriptType.OTHER;
  
  const scriptCounts = {
    [ScriptType.HIRAGANA]: 0,
    [ScriptType.KATAKANA]: 0,
    [ScriptType.KANJI]: 0,
    [ScriptType.ROMAJI]: 0,
    [ScriptType.OTHER]: 0
  };
  
  for (const char of text) {
    const script = detectCharacterScript(char);
    scriptCounts[script]++;
  }
  
  // Find the most common script
  let maxCount = 0;
  let predominantScript = ScriptType.OTHER;
  
  for (const [script, count] of Object.entries(scriptCounts)) {
    if (count > maxCount) {
      maxCount = count;
      predominantScript = script;
    }
  }
  
  // If multiple Japanese scripts are present, return MIXED
  const japaneseScriptCount = scriptCounts[ScriptType.HIRAGANA] + 
                             scriptCounts[ScriptType.KATAKANA] + 
                             scriptCounts[ScriptType.KANJI];
  
  if (japaneseScriptCount > 0) {
    let activeScripts = 0;
    if (scriptCounts[ScriptType.HIRAGANA] > 0) activeScripts++;
    if (scriptCounts[ScriptType.KATAKANA] > 0) activeScripts++;
    if (scriptCounts[ScriptType.KANJI] > 0) activeScripts++;
    
    if (activeScripts > 1) return ScriptType.MIXED;
  }
  
  return predominantScript;
}

/**
 * Check if a character is romaji (basic Latin alphabet)
 * @param {string} char - Character to check
 * @returns {boolean} True if character is romaji
 */
export function isRomaji(char) {
  const code = char.charCodeAt(0);
  return (code >= 65 && code <= 90) ||   // A-Z
         (code >= 97 && code <= 122) ||  // a-z
         (code >= 48 && code <= 57) ||   // 0-9
         char === ' ' || char === '\'' || char === '-';
}

/**
 * Check if text contains any Japanese characters
 * @param {string} text - Text to check
 * @returns {boolean} True if text contains Japanese characters
 */
export function hasJapaneseCharacters(text) {
  for (const char of text) {
    if (isHiragana(char) || isKatakana(char) || isKanji(char)) {
      return true;
    }
  }
  return false;
}

/**
 * Split text into segments by script type
 * @param {string} text - Text to segment
 * @returns {Array} Array of {text: string, script: string} objects
 */
export function segmentTextByScript(text) {
  if (!text) return [];
  
  const segments = [];
  let currentSegment = '';
  let currentScript = null;
  
  for (const char of text) {
    const charScript = detectCharacterScript(char);
    
    if (currentScript === null) {
      currentScript = charScript;
      currentSegment = char;
    } else if (currentScript === charScript) {
      currentSegment += char;
    } else {
      // Script change - save current segment and start new one
      segments.push({
        text: currentSegment,
        script: currentScript
      });
      currentSegment = char;
      currentScript = charScript;
    }
  }
  
  // Add the last segment
  if (currentSegment) {
    segments.push({
      text: currentSegment,
      script: currentScript
    });
  }
  
  return segments;
}

/**
 * Normalize Japanese text for better processing
 * @param {string} text - Text to normalize
 * @returns {string} Normalized text
 */
export function normalizeJapaneseText(text) {
  if (!text) return '';
  
  return text
    // Normalize full-width spaces to regular spaces
    .replace(/\u3000/g, ' ')
    // Remove zero-width characters
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    // Normalize whitespace
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Check if a string is likely a Japanese word boundary
 * @param {string} prev - Previous character
 * @param {string} current - Current character
 * @param {string} next - Next character
 * @returns {boolean} True if likely a word boundary
 */
export function isWordBoundary(prev, current, next) {
  if (!prev || !current) return false;
  
  const prevScript = detectCharacterScript(prev);
  const currentScript = detectCharacterScript(current);
  const nextScript = next ? detectCharacterScript(next) : null;
  
  // Boundaries between different script types
  if (prevScript !== currentScript) return true;
  
  // Kanji to Hiragana often indicates word boundary
  if (prevScript === ScriptType.KANJI && currentScript === ScriptType.HIRAGANA) {
    return true;
  }
  
  // Hiragana particle patterns
  if (currentScript === ScriptType.HIRAGANA) {
    const particles = ['は', 'を', 'が', 'の', 'に', 'で', 'と', 'から', 'まで', 'より'];
    if (particles.includes(current)) return true;
  }
  
  return false;
}

/**
 * Clean and prepare text for transliteration
 * @param {string} text - Raw input text
 * @returns {string} Cleaned text ready for processing
 */
export function cleanTextForTransliteration(text) {
  if (!text) return '';
  
  return normalizeJapaneseText(text)
    // Remove common punctuation that doesn't affect pronunciation
    .replace(/[、。！？]/g, ' ')
    // Clean up multiple spaces
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Check if text appears to be a proper noun (starts with capital letter in romaji)
 * @param {string} text - Text to check
 * @returns {boolean} True if appears to be proper noun
 */
export function isProperNoun(text) {
  if (!text) return false;
  
  // Check if it starts with a capital letter (already romanized)
  const firstChar = text.charAt(0);
  return firstChar >= 'A' && firstChar <= 'Z';
}

/**
 * Capitalize first letter of a string
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export function capitalizeFirst(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}