/**
 * Russian Cyrillic to Latin Transliteration Engine
 * Converts Russian Cyrillic text to Latin script using various romanization systems
 */

import {
  russianAlphabetMap,
  russianWordsMap,
  alternativeRomanizations,
  isCyrillicCharacter,
  getRomanization,
  isRussianText
} from '../data/cyrillic-characters.js';

export class RussianTransliterator {
  constructor(options = {}) {
    this.options = {
      // Romanization system: 'gost', 'bgn', 'scientific', 'simplified'
      system: options.system || 'gost',
      
      // Convert to lowercase
      lowercase: options.lowercase !== false,
      
      // Handle word boundaries intelligently
      wordBoundaries: options.wordBoundaries !== false,
      
      // Preserve punctuation and spacing
      preservePunctuation: options.preservePunctuation !== false,
      
      // Show original text in brackets if no translation found
      showUntranslated: options.showUntranslated !== false,
      
      // Attempt word-level translation before character-level
      wordFirst: options.wordFirst !== false,
      
      // Handle special letter combinations
      handleCombinations: options.handleCombinations !== false,
      
      // Preserve capitalization patterns
      preserveCase: options.preserveCase !== false
    };
  }

  /**
   * Main transliteration method
   * @param {string} text - Russian text to transliterate
   * @returns {string} Romanized transliteration
   */
  transliterate(text) {
    if (!text || typeof text !== 'string') {
      return '';
    }

    return this._processText(text);
  }

  /**
   * Process text with intelligent segmentation and transliteration
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

      // Handle non-Cyrillic characters (punctuation, numbers, Latin)
      if (!isCyrillicCharacter(char)) {
        if (this.options.preservePunctuation || /[a-zA-Z0-9]/.test(char)) {
          result.push(char);
        }
        i++;
        continue;
      }

      // Try to find the longest possible word match
      const wordResult = this._findLongestWord(text, i);
      if (wordResult.found) {
        let romanized = this._formatRomanization(wordResult.romanization, wordResult.original);
        result.push(romanized);
        i += wordResult.length;
      } else {
        // Single character transliteration
        const romanized = this._transliterateCharacter(char);
        result.push(romanized);
        i++;
      }
    }

    return result.join('').trim();
  }

  /**
   * Find the longest word match starting at position i
   * @private
   */
  _findLongestWord(text, startIndex) {
    if (!this.options.wordFirst) {
      return { found: false };
    }

    // Try words of decreasing length (max 20 characters for compound words)
    for (let length = Math.min(20, text.length - startIndex); length >= 2; length--) {
      const word = text.substr(startIndex, length);
      
      // Check if this could be a word boundary (ends with space, punctuation, or end of text)
      const nextChar = text[startIndex + length];
      const isWordBoundary = !nextChar || !isCyrillicCharacter(nextChar) || /\s/.test(nextChar);
      
      if (isWordBoundary && russianWordsMap[word.toLowerCase()]) {
        return {
          found: true,
          romanization: russianWordsMap[word.toLowerCase()],
          original: word,
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
    const romanized = getRomanization(char, this.options.system);
    
    if (romanized) {
      return this._formatRomanization(romanized, char);
    } else if (this.options.showUntranslated) {
      return `[${char}]`;
    } else {
      return char;
    }
  }

  /**
   * Handle special letter combinations and context-dependent transliteration
   * @private
   */
  _handleSpecialCombinations(text, index) {
    if (!this.options.handleCombinations) {
      return null;
    }

    const char = text[index];
    const nextChar = text[index + 1];
    const prevChar = text[index - 1];

    // Handle soft sign (ь) and hard sign (ъ) in context
    if (char === 'ь') {
      // Soft sign before vowels becomes 'y'
      if (nextChar && 'аеёиоуыэюя'.includes(nextChar.toLowerCase())) {
        return 'y';
      }
      // Otherwise, soft sign as apostrophe or nothing in simplified
      return this.options.system === 'simplified' ? '' : "'";
    }

    if (char === 'ъ') {
      // Hard sign before vowels
      if (nextChar && 'аеёиоуыэюя'.includes(nextChar.toLowerCase())) {
        return this.options.system === 'simplified' ? '' : '"';
      }
      return this.options.system === 'simplified' ? '' : '"';
    }

    // Handle ё at the beginning of words
    if (char === 'ё' && (!prevChar || !isCyrillicCharacter(prevChar))) {
      return this.options.system === 'simplified' ? 'e' : 'yo';
    }

    return null;
  }

  /**
   * Format romanization according to options
   * @private
   */
  _formatRomanization(romanization, original) {
    let formatted = romanization;

    // Preserve case if requested
    if (this.options.preserveCase && original) {
      formatted = this._preserveCase(formatted, original);
    }

    // Convert to lowercase if requested
    if (this.options.lowercase && !this.options.preserveCase) {
      formatted = formatted.toLowerCase();
    }

    return formatted;
  }

  /**
   * Preserve capitalization pattern from original text
   * @private
   */
  _preserveCase(romanized, original) {
    if (!original || !romanized) {
      return romanized;
    }

    let result = '';
    let romanizedIndex = 0;

    for (let i = 0; i < original.length && romanizedIndex < romanized.length; i++) {
      const originalChar = original[i];
      const romanizedChar = romanized[romanizedIndex];

      if (originalChar === originalChar.toUpperCase() && isCyrillicCharacter(originalChar)) {
        // Original is uppercase, make romanized uppercase
        result += romanizedChar.toUpperCase();
      } else {
        result += romanizedChar.toLowerCase();
      }
      romanizedIndex++;
    }

    // Add any remaining romanized characters
    while (romanizedIndex < romanized.length) {
      result += romanized[romanizedIndex].toLowerCase();
      romanizedIndex++;
    }

    return result;
  }

  /**
   * Analyze Russian text and provide detailed information
   * @param {string} text - Russian text to analyze
   * @returns {Object} Analysis results
   */
  analyze(text) {
    if (!text || typeof text !== 'string') {
      return {
        originalText: '',
        totalCharacters: 0,
        cyrillicCharacters: 0,
        transliteration: '',
        characterBreakdown: [],
        system: this.options.system
      };
    }

    const characters = Array.from(text);
    const cyrillicChars = characters.filter(isCyrillicCharacter);
    const breakdown = [];

    for (let i = 0; i < characters.length; i++) {
      const char = characters[i];
      if (isCyrillicCharacter(char)) {
        const romanized = this._transliterateCharacter(char);
        breakdown.push({
          character: char,
          romanized: romanized,
          position: i,
          found: getRomanization(char, this.options.system) !== null
        });
      }
    }

    return {
      originalText: text,
      totalCharacters: characters.length,
      cyrillicCharacters: cyrillicChars.length,
      transliteration: this.transliterate(text),
      characterBreakdown: breakdown,
      coverage: breakdown.length > 0 ? breakdown.filter(c => c.found).length / breakdown.length : 0,
      system: this.options.system,
      isRussian: isRussianText(text)
    };
  }

  /**
   * Batch transliterate multiple texts
   * @param {string[]} texts - Array of Russian texts
   * @returns {string[]} Array of romanized transliterations
   */
  transliterateBatch(texts) {
    if (!Array.isArray(texts)) {
      return [];
    }

    return texts.map(text => this.transliterate(text));
  }

  /**
   * Check if text contains Cyrillic characters
   * @param {string} text - Text to check
   * @returns {boolean} True if text contains Cyrillic characters
   */
  hasCyrillicCharacters(text) {
    if (!text || typeof text !== 'string') {
      return false;
    }

    return Array.from(text).some(isCyrillicCharacter);
  }

  /**
   * Get available romanization systems
   * @returns {Array} List of available systems
   */
  getAvailableSystems() {
    return [
      {
        id: 'gost',
        name: 'GOST 7.79-2000 System B',
        description: 'Russian federal standard for Cyrillic transliteration'
      },
      {
        id: 'bgn',
        name: 'BGN/PCGN',
        description: 'US Board on Geographic Names / Permanent Committee on Geographical Names'
      },
      {
        id: 'scientific',
        name: 'Scientific (ISO 9:1995)',
        description: 'International standard with diacritics'
      },
      {
        id: 'simplified',
        name: 'Simplified',
        description: 'ASCII-only romanization without diacritics'
      }
    ];
  }

  /**
   * Switch romanization system
   * @param {string} system - New romanization system
   */
  setSystem(system) {
    const availableSystems = ['gost', 'bgn', 'scientific', 'simplified'];
    if (availableSystems.includes(system)) {
      this.options.system = system;
    } else {
      throw new Error(`Invalid system: ${system}. Available: ${availableSystems.join(', ')}`);
    }
  }

  /**
   * Get statistics about the transliterator
   * @returns {Object} Statistics about available characters and words
   */
  getStats() {
    return {
      totalCharacters: Object.keys(russianAlphabetMap).length,
      totalWords: Object.keys(russianWordsMap).length,
      currentSystem: this.options.system,
      availableSystems: this.getAvailableSystems().length,
      version: '1.0.0',
      supportedFeatures: [
        'Multiple romanization systems',
        'Word-level transliteration',
        'Context-aware character handling',
        'Case preservation',
        'Batch processing',
        'Punctuation preservation'
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

  /**
   * Reset options to defaults
   */
  resetOptions() {
    this.options = {
      system: 'gost',
      lowercase: true,
      wordBoundaries: true,
      preservePunctuation: true,
      showUntranslated: false,
      wordFirst: true,
      handleCombinations: true,
      preserveCase: false
    };
  }
}

// Export default instance with GOST system
export default new RussianTransliterator();