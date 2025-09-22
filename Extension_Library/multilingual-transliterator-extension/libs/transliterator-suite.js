/**
 * Enhanced Multilingual Transliteration Library Suite
 * Comprehensive transliteration system for 9 major writing systems
 * Version: 2.0.0
 */

// Import all transliterator classes
// Note: In browser environment, these should be loaded via script tags

class EnhancedTransliteratorSuite {
    constructor() {
        this.transliterators = {};
        this.wordMaps = {};
        this.initializeTransliterators();
    }

    initializeTransliterators() {
        // Initialize Devanagari transliterator
        if (typeof DevanagariTransliterator !== 'undefined') {
            this.transliterators.devanagari = new DevanagariTransliterator('iast');
            this.wordMaps.hindi = hindiWordMap || {};
        }

        // Initialize Korean transliterator
        if (typeof KoreanTransliterator !== 'undefined') {
            this.transliterators.korean = new KoreanTransliterator('rr');
            this.wordMaps.korean = koreanWordMap || {};
        }

        // Initialize Thai transliterator
        if (typeof ThaiTransliterator !== 'undefined') {
            this.transliterators.thai = new ThaiTransliterator('rtgs');
            this.wordMaps.thai = thaiWordMap || {};
        }
    }

    // Detect script type from text
    detectScript(text) {
        const scripts = [];

        // Devanagari detection
        if (/[\u0900-\u097F]/.test(text)) {
            scripts.push('devanagari');
        }

        // Korean detection
        if (/[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/.test(text)) {
            scripts.push('korean');
        }

        // Thai detection
        if (/[\u0E00-\u0E7F]/.test(text)) {
            scripts.push('thai');
        }

        return scripts;
    }

    // Auto-transliterate text based on detected script
    autoTransliterate(text) {
        const detectedScripts = this.detectScript(text);
        
        if (detectedScripts.length === 0) {
            return text; // No supported scripts detected
        }

        let result = text;

        // Apply transliteration for each detected script
        for (const script of detectedScripts) {
            if (this.transliterators[script]) {
                result = this.applyWordBasedTransliteration(result, script);
                result = this.transliterators[script].transliterate(result);
            }
        }

        return result;
    }

    // Apply word-based transliteration for better accuracy
    applyWordBasedTransliteration(text, script) {
        const wordMap = this.wordMaps[script === 'devanagari' ? 'hindi' : script];
        if (!wordMap) return text;

        let result = text;
        
        // Sort by length (longest first) to handle longer phrases first
        const sortedWords = Object.keys(wordMap).sort((a, b) => b.length - a.length);
        
        for (const word of sortedWords) {
            const romanized = wordMap[word];
            // Use word boundaries to avoid partial matches
            const regex = new RegExp(`\\b${this.escapeRegex(word)}\\b`, 'g');
            result = result.replace(regex, romanized);
        }

        return result;
    }

    // Escape special regex characters
    escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    // Transliterate specific script with custom scheme
    transliterateScript(text, script, scheme = null) {
        const transliterator = this.transliterators[script];
        if (!transliterator) {
            throw new Error(`Transliterator for script '${script}' not found`);
        }

        if (scheme && transliterator.setScheme) {
            const originalScheme = transliterator.scheme;
            transliterator.setScheme(scheme);
            const result = transliterator.transliterate(text);
            transliterator.setScheme(originalScheme); // Restore original scheme
            return result;
        }

        return transliterator.transliterate(text);
    }

    // Set scheme for a specific transliterator
    setScheme(script, scheme) {
        const transliterator = this.transliterators[script];
        if (!transliterator || !transliterator.setScheme) {
            return false;
        }
        return transliterator.setScheme(scheme);
    }

    // Get available schemes for a script
    getAvailableSchemes(script) {
        const transliterator = this.transliterators[script];
        if (!transliterator || !transliterator.getAvailableSchemes) {
            return [];
        }
        return transliterator.getAvailableSchemes();
    }

    // Get scheme information
    getSchemeInfo(script) {
        const transliterator = this.transliterators[script];
        if (!transliterator || !transliterator.getSchemeInfo) {
            return null;
        }
        return transliterator.getSchemeInfo();
    }

    // Batch transliteration
    transliterateArray(textArray) {
        return textArray.map(text => this.autoTransliterate(text));
    }

    // Get supported scripts
    getSupportedScripts() {
        return Object.keys(this.transliterators);
    }

    // Check if a script is supported
    isScriptSupported(script) {
        return this.transliterators.hasOwnProperty(script);
    }

    // Get transliterator statistics
    getStatistics() {
        const stats = {
            totalTransliterators: Object.keys(this.transliterators).length,
            supportedScripts: this.getSupportedScripts(),
            totalWordMappings: 0,
            schemeSupport: {}
        };

        // Count word mappings
        Object.values(this.wordMaps).forEach(wordMap => {
            stats.totalWordMappings += Object.keys(wordMap).length;
        });

        // Get scheme support info
        this.getSupportedScripts().forEach(script => {
            stats.schemeSupport[script] = {
                schemes: this.getAvailableSchemes(script),
                currentScheme: this.transliterators[script].scheme,
                info: this.getSchemeInfo(script)
            };
        });

        return stats;
    }

    // Analyze text complexity
    analyzeText(text) {
        const analysis = {
            length: text.length,
            detectedScripts: this.detectScript(text),
            scriptRanges: {},
            estimatedComplexity: 'simple'
        };

        // Analyze script distribution
        for (const script of analysis.detectedScripts) {
            const ranges = this.getScriptRanges(text, script);
            analysis.scriptRanges[script] = ranges;
        }

        // Determine complexity
        if (analysis.detectedScripts.length > 1) {
            analysis.estimatedComplexity = 'mixed-script';
        } else if (analysis.length > 1000) {
            analysis.estimatedComplexity = 'large-text';
        } else if (analysis.detectedScripts.length === 1) {
            analysis.estimatedComplexity = 'single-script';
        }

        return analysis;
    }

    // Get character ranges for a specific script in text
    getScriptRanges(text, script) {
        const ranges = [];
        let start = -1;

        const scriptPatterns = {
            devanagari: /[\u0900-\u097F]/,
            korean: /[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/,
            thai: /[\u0E00-\u0E7F]/
        };

        const pattern = scriptPatterns[script];
        if (!pattern) return ranges;

        for (let i = 0; i < text.length; i++) {
            const isScriptChar = pattern.test(text[i]);
            
            if (isScriptChar && start === -1) {
                start = i; // Start of script range
            } else if (!isScriptChar && start !== -1) {
                ranges.push({ start, end: i - 1, text: text.substring(start, i) });
                start = -1;
            }
        }

        // Handle range that goes to end of text
        if (start !== -1) {
            ranges.push({ start, end: text.length - 1, text: text.substring(start) });
        }

        return ranges;
    }

    // Performance benchmark
    benchmark(text, iterations = 100) {
        const results = {};
        const scripts = this.detectScript(text);

        if (scripts.length === 0) {
            return { error: 'No supported scripts detected in text' };
        }

        // Benchmark auto-transliteration
        const autoStart = performance.now();
        for (let i = 0; i < iterations; i++) {
            this.autoTransliterate(text);
        }
        const autoEnd = performance.now();
        results.autoTransliteration = {
            totalTime: autoEnd - autoStart,
            averageTime: (autoEnd - autoStart) / iterations,
            iterations
        };

        // Benchmark individual scripts
        for (const script of scripts) {
            const scriptStart = performance.now();
            for (let i = 0; i < iterations; i++) {
                this.transliterators[script].transliterate(text);
            }
            const scriptEnd = performance.now();
            results[script] = {
                totalTime: scriptEnd - scriptStart,
                averageTime: (scriptEnd - scriptStart) / iterations,
                iterations
            };
        }

        return results;
    }
}

// Enhanced text processing utilities
class TransliterationUtils {
    // Clean text for better transliteration
    static cleanText(text) {
        return text
            .replace(/\u200C/g, '') // Remove zero-width non-joiner
            .replace(/\u200D/g, '') // Remove zero-width joiner
            .replace(/\uFEFF/g, '') // Remove byte order mark
            .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // Remove control characters
            .trim();
    }

    // Normalize whitespace
    static normalizeWhitespace(text) {
        return text
            .replace(/\s+/g, ' ')
            .replace(/\u00A0/g, ' ') // Replace non-breaking space
            .trim();
    }

    // Split text into processable chunks
    static chunkText(text, chunkSize = 1000) {
        const chunks = [];
        for (let i = 0; i < text.length; i += chunkSize) {
            chunks.push(text.substring(i, i + chunkSize));
        }
        return chunks;
    }

    // Merge transliterated chunks
    static mergeChunks(chunks) {
        return chunks.join('');
    }

    // Validate transliteration result
    static validateResult(original, transliterated) {
        return {
            originalLength: original.length,
            transliteratedLength: transliterated.length,
            compressionRatio: transliterated.length / original.length,
            hasNonLatin: /[^\u0000-\u024F\u1E00-\u1EFF]/.test(transliterated),
            isEmpty: transliterated.trim().length === 0
        };
    }
}

// Export classes for different environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        EnhancedTransliteratorSuite, 
        TransliterationUtils 
    };
} else if (typeof window !== 'undefined') {
    window.EnhancedTransliteratorSuite = EnhancedTransliteratorSuite;
    window.TransliterationUtils = TransliterationUtils;
}