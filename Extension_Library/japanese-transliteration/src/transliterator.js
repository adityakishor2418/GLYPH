/**
 * Core transliteration engine for Japanese text
 * Converts Hiragana, Katakana, and Kanji to romaji pronunciation
 */

import { hiraganaMap, hiraganaSpecialCombos, isHiragana } from '../data/hiragana.js';
import { katakanaMap, katakanaSpecialCombos, isKatakana } from '../data/katakana.js';
import { kanjiMap, kanjiCompounds, isKanji, getKanjiReadings } from '../data/kanji.js';
import { 
  detectCharacterScript, 
  detectTextScript, 
  ScriptType, 
  segmentTextByScript,
  cleanTextForTransliteration,
  hasJapaneseCharacters 
} from './utils.js';

/**
 * Main transliteration class
 */
export class JapaneseTransliterator {
  constructor(options = {}) {
    this.options = {
      // Kanji reading preference: 'first' (use first reading), 'context' (try to guess from context), 'all' (show all readings)
      kanjiReadingMode: options.kanjiReadingMode || 'first',
      // Whether to handle special combinations (gemination, long vowels)
      handleSpecialCombinations: options.handleSpecialCombinations !== false,
      // Whether to preserve spacing
      preserveSpacing: options.preserveSpacing !== false,
      // Whether to capitalize proper nouns
      capitalizeProperNouns: options.capitalizeProperNouns || false,
      // Maximum length for compound Kanji lookup
      maxCompoundLength: options.maxCompoundLength || 6
    };
  }

  /**
   * Main transliteration method
   * @param {string} text - Japanese text to transliterate
   * @returns {string} Romanized text
   */
  transliterate(text) {
    if (!text || !hasJapaneseCharacters(text)) {
      return text; // Return as-is if no Japanese characters
    }

    const cleanText = cleanTextForTransliteration(text);
    const segments = segmentTextByScript(cleanText);
    
    let result = '';
    
    for (const segment of segments) {
      switch (segment.script) {
        case ScriptType.HIRAGANA:
          result += this.transliterateHiragana(segment.text);
          break;
        case ScriptType.KATAKANA:
          result += this.transliterateKatakana(segment.text);
          break;
        case ScriptType.KANJI:
          result += this.transliterateKanji(segment.text);
          break;
        case ScriptType.MIXED:
          result += this.transliterateMixed(segment.text);
          break;
        default:
          result += segment.text; // Pass through non-Japanese text
      }
    }

    return this.postProcess(result);
  }

  /**
   * Transliterate Hiragana text
   * @param {string} text - Hiragana text
   * @returns {string} Romanized text
   */
  transliterateHiragana(text) {
    if (!text) return '';
    
    let result = '';
    let i = 0;
    
    while (i < text.length) {
      let matched = false;
      
      // Try to match special combinations first (2-3 characters)
      if (this.options.handleSpecialCombinations) {
        for (let len = 3; len >= 2; len--) {
          if (i + len <= text.length) {
            const combo = text.substring(i, i + len);
            if (hiraganaSpecialCombos[combo]) {
              result += hiraganaSpecialCombos[combo];
              i += len;
              matched = true;
              break;
            }
          }
        }
      }
      
      // Try single character match
      if (!matched) {
        const char = text[i];
        
        // Handle small tsu (っ) for gemination
        if (char === 'っ' && i + 1 < text.length) {
          const nextChar = text[i + 1];
          const nextRomaji = hiraganaMap[nextChar];
          if (nextRomaji && nextRomaji.length > 0) {
            // Double the first consonant
            const firstConsonant = nextRomaji[0];
            if (!'aeiou'.includes(firstConsonant)) {
              result += firstConsonant;
            }
          }
          i++;
          continue;
        }
        
        // Handle long vowel mark (ー) - extend previous vowel
        if (char === 'ー' && result.length > 0) {
          const lastChar = result[result.length - 1];
          if ('aiueo'.includes(lastChar)) {
            result += lastChar;
          }
          i++;
          continue;
        }
        
        // Regular character mapping
        if (hiraganaMap[char]) {
          result += hiraganaMap[char];
        } else {
          result += char; // Pass through unknown characters
        }
        i++;
      }
    }
    
    return result;
  }

  /**
   * Transliterate Katakana text
   * @param {string} text - Katakana text
   * @returns {string} Romanized text
   */
  transliterateKatakana(text) {
    if (!text) return '';
    
    let result = '';
    let i = 0;
    
    while (i < text.length) {
      let matched = false;
      
      // Try to match special combinations first (2-3 characters)
      if (this.options.handleSpecialCombinations) {
        for (let len = 3; len >= 2; len--) {
          if (i + len <= text.length) {
            const combo = text.substring(i, i + len);
            if (katakanaSpecialCombos[combo]) {
              result += katakanaSpecialCombos[combo];
              i += len;
              matched = true;
              break;
            }
          }
        }
      }
      
      // Try single character match
      if (!matched) {
        const char = text[i];
        
        // Handle small tsu (ッ) for gemination
        if (char === 'ッ' && i + 1 < text.length) {
          const nextChar = text[i + 1];
          const nextRomaji = katakanaMap[nextChar];
          if (nextRomaji && nextRomaji.length > 0) {
            // Double the first consonant
            const firstConsonant = nextRomaji[0];
            if (!'aeiou'.includes(firstConsonant)) {
              result += firstConsonant;
            }
          }
          i++;
          continue;
        }
        
        // Handle long vowel mark (ー) - extend previous vowel
        if (char === 'ー' && result.length > 0) {
          const lastChar = result[result.length - 1];
          if ('aiueo'.includes(lastChar)) {
            result += lastChar;
          }
          i++;
          continue;
        }
        
        // Regular character mapping
        if (katakanaMap[char]) {
          result += katakanaMap[char];
        } else {
          result += char; // Pass through unknown characters
        }
        i++;
      }
    }
    
    return result;
  }

  /**
   * Transliterate Kanji text
   * @param {string} text - Kanji text
   * @returns {string} Romanized text
   */
  transliterateKanji(text) {
    if (!text) return '';
    
    // First try to match compound words
    let result = '';
    let i = 0;
    
    while (i < text.length) {
      let matched = false;
      
      // Try compound words first (longest match)
      for (let len = Math.min(this.options.maxCompoundLength, text.length - i); len >= 2; len--) {
        const compound = text.substring(i, i + len);
        if (kanjiCompounds[compound]) {
          result += kanjiCompounds[compound];
          if (i + len < text.length) result += ' '; // Add space between words
          i += len;
          matched = true;
          break;
        }
      }
      
      // Try single Kanji
      if (!matched) {
        const char = text[i];
        if (isKanji(char)) {
          const readings = getKanjiReadings(char);
          if (readings && readings.length > 0) {
            switch (this.options.kanjiReadingMode) {
              case 'first':
                result += readings[0];
                break;
              case 'all':
                result += readings.join('/');
                break;
              case 'context':
                // Simple context-based selection (prefer kun-yomi for single Kanji)
                result += readings[readings.length - 1]; // Last reading is often kun-yomi
                break;
              default:
                result += readings[0];
            }
          } else {
            result += char; // Unknown Kanji, pass through
          }
        } else {
          result += char; // Non-Kanji character
        }
        
        if (i + 1 < text.length) result += ' '; // Add space between Kanji
        i++;
      }
    }
    
    return result.trim();
  }

  /**
   * Transliterate mixed script text
   * @param {string} text - Mixed script text
   * @returns {string} Romanized text
   */
  transliterateMixed(text) {
    if (!text) return '';
    
    let result = '';
    let i = 0;
    
    while (i < text.length) {
      const char = text[i];
      const script = detectCharacterScript(char);
      
      // Collect consecutive characters of the same script
      let segment = char;
      let j = i + 1;
      
      while (j < text.length && detectCharacterScript(text[j]) === script) {
        segment += text[j];
        j++;
      }
      
      // Transliterate the segment
      switch (script) {
        case ScriptType.HIRAGANA:
          result += this.transliterateHiragana(segment);
          break;
        case ScriptType.KATAKANA:
          result += this.transliterateKatakana(segment);
          break;
        case ScriptType.KANJI:
          result += this.transliterateKanji(segment);
          break;
        default:
          result += segment;
      }
      
      i = j;
    }
    
    return result;
  }

  /**
   * Post-process the transliterated text
   * @param {string} text - Raw transliterated text
   * @returns {string} Processed text
   */
  postProcess(text) {
    if (!text) return '';
    
    let result = text;
    
    // Clean up multiple spaces
    result = result.replace(/\s+/g, ' ').trim();
    
    // Handle word boundaries and spacing
    if (this.options.preserveSpacing) {
      // Add proper spacing between words
      result = result.replace(/([a-z])([A-Z])/g, '$1 $2');
    }
    
    return result;
  }

  /**
   * Get detailed transliteration information
   * @param {string} text - Japanese text to analyze
   * @returns {Object} Detailed analysis object
   */
  analyze(text) {
    if (!text) return null;
    
    const cleanText = cleanTextForTransliteration(text);
    const segments = segmentTextByScript(cleanText);
    const transliterated = this.transliterate(text);
    
    return {
      original: text,
      cleaned: cleanText,
      transliterated: transliterated,
      hasJapanese: hasJapaneseCharacters(text),
      predominantScript: detectTextScript(cleanText),
      segments: segments,
      analysis: {
        hiraganaCount: segments.filter(s => s.script === ScriptType.HIRAGANA).length,
        katakanaCount: segments.filter(s => s.script === ScriptType.KATAKANA).length,
        kanjiCount: segments.filter(s => s.script === ScriptType.KANJI).length,
        mixedCount: segments.filter(s => s.script === ScriptType.MIXED).length
      }
    };
  }
}