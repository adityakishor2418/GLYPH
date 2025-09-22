/**
 * Arabic to Latin Transliteration Engine
 * Converts Arabic script to Latin script using various romanization systems
 */

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

export class ArabicTransliterator {
  constructor(options = {}) {
    this.options = {
      // Romanization system: 'ala', 'bgn', 'iso', 'simplified'
      system: options.system || 'ala',
      
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
      
      // Remove Arabic diacritics before transliteration
      removeDiacritics: options.removeDiacritics !== false,
      
      // Preserve capitalization patterns
      preserveCase: options.preserveCase !== false,
      
      // Handle special Arabic features (definite article, etc.)
      handleArabicFeatures: options.handleArabicFeatures !== false
    };
  }

  /**
   * Main transliteration method
   * @param {string} text - Arabic text to transliterate
   * @returns {string} Romanized transliteration
   */
  transliterate(text) {
    if (!text || typeof text !== 'string') {
      return '';
    }

    // Remove diacritics if requested
    let processedText = text;
    if (this.options.removeDiacritics) {
      processedText = removeDiacritics(processedText);
    }

    return this._processText(processedText);
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

      // Handle non-Arabic characters (punctuation, numbers, Latin)
      if (!isArabicCharacter(char)) {
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
        // Handle special Arabic features first
        const specialResult = this._handleSpecialFeatures(text, i);
        if (specialResult.found) {
          result.push(specialResult.romanization);
          i += specialResult.length;
        } else {
          // Single character transliteration
          const romanized = this._transliterateCharacter(char);
          result.push(romanized);
          i++;
        }
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

    // Try words of decreasing length (max 30 characters for compound Arabic words)
    for (let length = Math.min(30, text.length - startIndex); length >= 2; length--) {
      const word = text.substr(startIndex, length);
      
      // Check if this could be a word boundary (ends with space, punctuation, or end of text)
      const nextChar = text[startIndex + length];
      const isWordBoundary = !nextChar || !isArabicCharacter(nextChar) || /\s/.test(nextChar);
      
      if (isWordBoundary && arabicWordsMap[word]) {
        return {
          found: true,
          romanization: arabicWordsMap[word],
          original: word,
          length: length
        };
      }
    }

    return { found: false };
  }

  /**
   * Handle special Arabic features like definite article, sun/moon letters
   * @private
   */
  _handleSpecialFeatures(text, index) {
    if (!this.options.handleArabicFeatures) {
      return { found: false };
    }

    const char = text[index];
    const nextChars = text.substr(index, 4);

    // Handle definite article 'ال' (al-)
    if (nextChars.startsWith('ال') && index + 2 < text.length) {
      const followingChar = text[index + 2];
      
      // Sun letters - assimilate the 'l' sound
      const sunLetters = 'تثدذرزسشصضطظلن';
      if (sunLetters.includes(followingChar)) {
        // Get the romanization of the sun letter and double it
        const sunLetter = this._transliterateCharacter(followingChar);
        return {
          found: true,
          romanization: `a${sunLetter}-`,
          length: 3
        };
      } else {
        // Moon letters - keep 'al-'
        return {
          found: true,
          romanization: 'al-',
          length: 2
        };
      }
    }

    // Handle ta marbuta at end of words
    if (char === 'ة') {
      const nextChar = text[index + 1];
      if (!nextChar || /\s/.test(nextChar)) {
        return {
          found: true,
          romanization: this.options.system === 'simplified' ? 'h' : 'ah',
          length: 1
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
    
    if (romanized !== null) {
      return this._formatRomanization(romanized, char);
    } else if (this.options.showUntranslated) {
      return `[${char}]`;
    } else {
      return char;
    }
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
   * Preserve capitalization pattern from original text (limited for Arabic)
   * @private
   */
  _preserveCase(romanized, original) {
    // Arabic doesn't have case, but this can be useful for mixed scripts
    return romanized;
  }

  /**
   * Analyze Arabic text and provide detailed information
   * @param {string} text - Arabic text to analyze
   * @returns {Object} Analysis results
   */
  analyze(text) {
    if (!text || typeof text !== 'string') {
      return {
        originalText: '',
        totalCharacters: 0,
        arabicCharacters: 0,
        transliteration: '',
        characterBreakdown: [],
        system: this.options.system
      };
    }

    const characters = Array.from(text);
    const arabicChars = characters.filter(isArabicCharacter);
    const breakdown = [];

    for (let i = 0; i < characters.length; i++) {
      const char = characters[i];
      if (isArabicCharacter(char)) {
        const romanized = this._transliterateCharacter(char);
        breakdown.push({
          character: char,
          romanized: romanized,
          position: i,
          found: getRomanization(char, this.options.system) !== null,
          isDiacritic: this._isDiacritic(char)
        });
      }
    }

    return {
      originalText: text,
      totalCharacters: characters.length,
      arabicCharacters: arabicChars.length,
      transliteration: this.transliterate(text),
      characterBreakdown: breakdown,
      coverage: breakdown.length > 0 ? breakdown.filter(c => c.found).length / breakdown.length : 0,
      system: this.options.system,
      isArabic: isArabicText(text),
      hasDiacritics: this._hasDiacritics(text),
      normalizedText: normalizeArabicText(text)
    };
  }

  /**
   * Check if character is a diacritic
   * @private
   */
  _isDiacritic(char) {
    const diacriticCodes = [0x064B, 0x064C, 0x064D, 0x064E, 0x064F, 0x0650, 0x0651, 0x0652, 0x0670];
    return diacriticCodes.includes(char.charCodeAt(0));
  }

  /**
   * Check if text has diacritics
   * @private
   */
  _hasDiacritics(text) {
    return Array.from(text).some(char => this._isDiacritic(char));
  }

  /**
   * Batch transliterate multiple texts
   * @param {string[]} texts - Array of Arabic texts
   * @returns {string[]} Array of romanized transliterations
   */
  transliterateBatch(texts) {
    if (!Array.isArray(texts)) {
      return [];
    }

    return texts.map(text => this.transliterate(text));
  }

  /**
   * Check if text contains Arabic characters
   * @param {string} text - Text to check
   * @returns {boolean} True if text contains Arabic characters
   */
  hasArabicCharacters(text) {
    if (!text || typeof text !== 'string') {
      return false;
    }

    return Array.from(text).some(isArabicCharacter);
  }

  /**
   * Get available romanization systems
   * @returns {Array} List of available systems
   */
  getAvailableSystems() {
    return [
      {
        id: 'ala',
        name: 'ALA-LC',
        description: 'American Library Association - Library of Congress'
      },
      {
        id: 'bgn',
        name: 'BGN/PCGN',
        description: 'US Board on Geographic Names / Permanent Committee on Geographical Names'
      },
      {
        id: 'iso',
        name: 'ISO 233',
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
    const availableSystems = ['ala', 'bgn', 'iso', 'simplified'];
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
      totalCharacters: Object.keys(arabicAlphabetMap).length,
      totalWords: Object.keys(arabicWordsMap).length,
      currentSystem: this.options.system,
      availableSystems: this.getAvailableSystems().length,
      version: '1.0.0',
      supportedFeatures: [
        'Multiple romanization systems',
        'Word-level transliteration',
        'Diacritic handling',
        'Definite article processing',
        'Sun/Moon letter assimilation',
        'Batch processing',
        'Text normalization'
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
      system: 'ala',
      lowercase: true,
      wordBoundaries: true,
      preservePunctuation: true,
      showUntranslated: false,
      wordFirst: true,
      removeDiacritics: true,
      preserveCase: false,
      handleArabicFeatures: true
    };
  }
}

// Export default instance with ALA-LC system
export default new ArabicTransliterator();