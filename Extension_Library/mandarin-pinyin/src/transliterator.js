/**
 * Mandarin Chinese to Pinyin Transliteration Engine
 * Converts Simplified Chinese characters to their pinyin romanization
 */

import {
  chineseCharacterMap,
  chinesePhraseMap,
  isChineseCharacter,
  getCharacterPinyin
} from '../data/chinese-characters.js';

export class MandarinTransliterator {
  constructor(options = {}) {
    this.options = {
      // Include tone marks in output (ā, á, ǎ, à)
      includeTones: options.includeTones !== false,
      
      // Convert to lowercase
      lowercase: options.lowercase !== false,
      
      // Add spaces between syllables
      addSpaces: options.addSpaces !== false,
      
      // Convert tone marks to numbers (1,2,3,4,5)
      numericalTones: options.numericalTones === true,
      
      // Handle punctuation
      preservePunctuation: options.preservePunctuation !== false,
      
      // Show original text in brackets if no translation found
      showUntranslated: options.showUntranslated !== false,
      
      // Attempt word-level translation before character-level
      wordFirst: options.wordFirst !== false
    };
  }

  /**
   * Main transliteration method
   * @param {string} text - Chinese text to transliterate
   * @returns {string} Pinyin transliteration
   */
  transliterate(text) {
    if (!text || typeof text !== 'string') {
      return '';
    }

    return this._processText(text);
  }

  /**
   * Process text with intelligent segmentation
   * @private
   */
  _processText(text) {
    const result = [];
    let i = 0;

    while (i < text.length) {
      const char = text[i];
      
      // Handle whitespace
      if (/\s/.test(char)) {
        result.push(char);
        i++;
        continue;
      }

      // Handle punctuation
      if (!isChineseCharacter(char)) {
        if (this.options.preservePunctuation) {
          result.push(char);
        }
        i++;
        continue;
      }

      // Try to find the longest possible phrase match
      const phraseResult = this._findLongestPhrase(text, i);
      if (phraseResult.found) {
        const pinyin = this._formatPinyin(phraseResult.pinyin);
        result.push(pinyin);
        i += phraseResult.length;
      } else {
        // Single character transliteration
        const pinyin = this._transliterateCharacter(char);
        result.push(pinyin);
        i++;
      }
    }

    return result.join('').trim();
  }

  /**
   * Find the longest phrase match starting at position i
   * @private
   */
  _findLongestPhrase(text, startIndex) {
    if (!this.options.wordFirst) {
      return { found: false };
    }

    // Try phrases of decreasing length (max 8 characters)
    for (let length = Math.min(8, text.length - startIndex); length >= 2; length--) {
      const phrase = text.substr(startIndex, length);
      const pinyin = chinesePhraseMap[phrase];
      
      if (pinyin) {
        return {
          found: true,
          pinyin: pinyin,
          length: length
        };
      }
    }

    return { found: false };
  }

  /**
   * Transliterate a single character
   * @private
   */
  _transliterateCharacter(char) {
    const pinyin = chineseCharacterMap[char];
    
    if (pinyin) {
      return this._formatPinyin(pinyin);
    } else if (this.options.showUntranslated) {
      return `[${char}]`;
    } else {
      return char;
    }
  }

  /**
   * Format pinyin according to options
   * @private
   */
  _formatPinyin(pinyin) {
    let formatted = pinyin;

    // Convert tone marks to numbers if requested
    if (this.options.numericalTones) {
      formatted = this._convertTonesToNumbers(formatted);
    } else if (!this.options.includeTones) {
      formatted = this._removeToneMarks(formatted);
    }

    // Convert to lowercase
    if (this.options.lowercase) {
      formatted = formatted.toLowerCase();
    }

    // Add space after each syllable if requested
    if (this.options.addSpaces && !formatted.includes(' ')) {
      // Add space after each syllable (this is a simple heuristic)
      formatted = formatted.replace(/([aeiouüvāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]+[ng]?)/gi, '$1 ').trim();
    }

    return formatted;
  }

  /**
   * Convert tone marks to numerical tones
   * @private
   */
  _convertTonesToNumbers(pinyin) {
    const toneMap = {
      // First tone (high level)
      'ā': 'a1', 'ē': 'e1', 'ī': 'i1', 'ō': 'o1', 'ū': 'u1', 'ǖ': 'v1',
      // Second tone (rising)
      'á': 'a2', 'é': 'e2', 'í': 'i2', 'ó': 'o2', 'ú': 'u2', 'ǘ': 'v2',
      // Third tone (falling-rising)
      'ǎ': 'a3', 'ě': 'e3', 'ǐ': 'i3', 'ǒ': 'o3', 'ǔ': 'u3', 'ǚ': 'v3',
      // Fourth tone (falling)
      'à': 'a4', 'è': 'e4', 'ì': 'i4', 'ò': 'o4', 'ù': 'u4', 'ǜ': 'v4'
    };

    let result = pinyin;
    for (const [toned, numbered] of Object.entries(toneMap)) {
      result = result.replace(new RegExp(toned, 'g'), numbered);
    }

    // Handle neutral tone (no mark) - add 5 if requested
    return result;
  }

  /**
   * Remove tone marks from pinyin
   * @private
   */
  _removeToneMarks(pinyin) {
    const toneMap = {
      'ā': 'a', 'á': 'a', 'ǎ': 'a', 'à': 'a',
      'ē': 'e', 'é': 'e', 'ě': 'e', 'è': 'e',
      'ī': 'i', 'í': 'i', 'ǐ': 'i', 'ì': 'i',
      'ō': 'o', 'ó': 'o', 'ǒ': 'o', 'ò': 'o',
      'ū': 'u', 'ú': 'u', 'ǔ': 'u', 'ù': 'u',
      'ǖ': 'v', 'ǘ': 'v', 'ǚ': 'v', 'ǜ': 'v'
    };

    let result = pinyin;
    for (const [toned, plain] of Object.entries(toneMap)) {
      result = result.replace(new RegExp(toned, 'g'), plain);
    }

    return result;
  }

  /**
   * Analyze Chinese text and provide detailed information
   * @param {string} text - Chinese text to analyze
   * @returns {Object} Analysis results
   */
  analyze(text) {
    if (!text || typeof text !== 'string') {
      return {
        originalText: '',
        totalCharacters: 0,
        chineseCharacters: 0,
        transliteration: '',
        characterBreakdown: []
      };
    }

    const characters = Array.from(text);
    const chineseChars = characters.filter(isChineseCharacter);
    const breakdown = [];

    for (let i = 0; i < characters.length; i++) {
      const char = characters[i];
      if (isChineseCharacter(char)) {
        const pinyin = this._transliterateCharacter(char);
        breakdown.push({
          character: char,
          pinyin: pinyin,
          position: i,
          found: chineseCharacterMap[char] !== undefined
        });
      }
    }

    return {
      originalText: text,
      totalCharacters: characters.length,
      chineseCharacters: chineseChars.length,
      transliteration: this.transliterate(text),
      characterBreakdown: breakdown,
      coverage: breakdown.length > 0 ? breakdown.filter(c => c.found).length / breakdown.length : 0
    };
  }

  /**
   * Batch transliterate multiple texts
   * @param {string[]} texts - Array of Chinese texts
   * @returns {string[]} Array of pinyin transliterations
   */
  transliterateBatch(texts) {
    if (!Array.isArray(texts)) {
      return [];
    }

    return texts.map(text => this.transliterate(text));
  }

  /**
   * Check if text contains Chinese characters
   * @param {string} text - Text to check
   * @returns {boolean} True if text contains Chinese characters
   */
  hasChineseCharacters(text) {
    if (!text || typeof text !== 'string') {
      return false;
    }

    return Array.from(text).some(isChineseCharacter);
  }

  /**
   * Get statistics about the transliterator's character coverage
   * @returns {Object} Statistics about available characters
   */
  getStats() {
    return {
      totalCharacters: Object.keys(chineseCharacterMap).length,
      totalPhrases: Object.keys(chinesePhraseMap).length,
      version: '1.0.0',
      supportedFeatures: [
        'Tone marks',
        'Numerical tones',
        'Phrase matching',
        'Character-by-character fallback',
        'Punctuation preservation',
        'Batch processing'
      ]
    };
  }

  /**
   * Update transliteration options
   * @param {Object} newOptions - New options to merge
   */
  setOptions(newOptions) {
    this.options = { ...this.options, ...newOptions };
  }
}

// Export default instance
export default new MandarinTransliterator();