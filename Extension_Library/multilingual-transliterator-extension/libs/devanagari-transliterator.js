/**
 * Devanagari Transliteration Library
 * Comprehensive phonetic transliteration for Hindi, Sanskrit, Marathi, Nepali
 * Supports multiple romanization schemes: IAST, Harvard-Kyoto, Simplified
 * Version: 2.0.0
 */

class DevanagariTransliterator {
    constructor(scheme = 'iast') {
        this.scheme = scheme;
        this.transliterationMaps = this.initializeMaps();
    }

    initializeMaps() {
        const maps = {
            // IAST (International Alphabet of Sanskrit Transliteration)
            iast: {
                // Vowels
                'अ': 'a', 'आ': 'ā', 'इ': 'i', 'ई': 'ī', 'उ': 'u', 'ऊ': 'ū',
                'ऋ': 'ṛ', 'ॠ': 'ṝ', 'ऌ': 'ḷ', 'ॡ': 'ḹ', 'ए': 'e', 'ऐ': 'ai',
                'ओ': 'o', 'औ': 'au',

                // Consonants - Stops
                'क': 'ka', 'ख': 'kha', 'ग': 'ga', 'घ': 'gha', 'ङ': 'ṅa',
                'च': 'ca', 'छ': 'cha', 'ज': 'ja', 'झ': 'jha', 'ञ': 'ña',
                'ट': 'ṭa', 'ठ': 'ṭha', 'ड': 'ḍa', 'ढ': 'ḍha', 'ण': 'ṇa',
                'त': 'ta', 'थ': 'tha', 'द': 'da', 'ध': 'dha', 'न': 'na',
                'प': 'pa', 'फ': 'pha', 'ब': 'ba', 'भ': 'bha', 'म': 'ma',

                // Semivowels and Sibilants
                'य': 'ya', 'र': 'ra', 'ल': 'la', 'व': 'va',
                'श': 'śa', 'ष': 'ṣa', 'स': 'sa', 'ह': 'ha',

                // Additional consonants
                'क्ष': 'kṣa', 'त्र': 'tra', 'ज्ञ': 'jña',

                // Vowel diacritics (matras)
                'ा': 'ā', 'ि': 'i', 'ी': 'ī', 'ु': 'u', 'ू': 'ū',
                'ृ': 'ṛ', 'ॄ': 'ṝ', 'ॢ': 'ḷ', 'ॣ': 'ḹ',
                'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au',

                // Special marks
                '्': '', // Virama (halant)
                'ं': 'ṃ', // Anusvara
                'ः': 'ḥ', // Visarga
                'ँ': '̃', // Candrabindu
                '़': '', // Nukta

                // Numbers
                '०': '0', '१': '1', '२': '2', '३': '3', '४': '4',
                '५': '5', '६': '6', '७': '7', '८': '8', '९': '9',

                // Punctuation
                '।': '.', '॥': '..', '॰': '', // Abbreviation sign
            },

            // Harvard-Kyoto transliteration
            harvard: {
                // Vowels
                'अ': 'a', 'आ': 'A', 'इ': 'i', 'ई': 'I', 'उ': 'u', 'ऊ': 'U',
                'ऋ': 'R', 'ॠ': 'RR', 'ऌ': 'lR', 'ॡ': 'lRR', 'ए': 'e', 'ऐ': 'ai',
                'ओ': 'o', 'औ': 'au',

                // Consonants
                'क': 'ka', 'ख': 'kha', 'ग': 'ga', 'घ': 'gha', 'ङ': 'Ga',
                'च': 'ca', 'छ': 'cha', 'ज': 'ja', 'झ': 'jha', 'ञ': 'Ja',
                'ट': 'Ta', 'ठ': 'Tha', 'ड': 'Da', 'ढ': 'Dha', 'ण': 'Na',
                'त': 'ta', 'थ': 'tha', 'द': 'da', 'ध': 'dha', 'न': 'na',
                'प': 'pa', 'फ': 'pha', 'ब': 'ba', 'भ': 'bha', 'म': 'ma',
                'य': 'ya', 'र': 'ra', 'ल': 'la', 'व': 'va',
                'श': 'za', 'ष': 'Sa', 'स': 'sa', 'ह': 'ha',

                // Vowel diacritics
                'ा': 'A', 'ि': 'i', 'ी': 'I', 'ु': 'u', 'ू': 'U',
                'ृ': 'R', 'ॄ': 'RR', 'ॢ': 'lR', 'ॣ': 'lRR',
                'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au',

                // Special marks
                '्': '', 'ं': 'M', 'ः': 'H', 'ँ': '~',

                // Numbers
                '०': '0', '१': '1', '२': '2', '३': '3', '४': '4',
                '५': '5', '६': '6', '७': '7', '८': '8', '९': '9',
            },

            // Simplified transliteration
            simplified: {
                // Vowels
                'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ee', 'उ': 'u', 'ऊ': 'oo',
                'ऋ': 'ri', 'ॠ': 'ree', 'ऌ': 'li', 'ॡ': 'lee', 'ए': 'e', 'ऐ': 'ai',
                'ओ': 'o', 'औ': 'au',

                // Consonants
                'क': 'ka', 'ख': 'kha', 'ग': 'ga', 'घ': 'gha', 'ङ': 'nga',
                'च': 'cha', 'छ': 'chha', 'ज': 'ja', 'झ': 'jha', 'ञ': 'nya',
                'ट': 'ta', 'ठ': 'tha', 'ड': 'da', 'ढ': 'dha', 'ण': 'na',
                'त': 'ta', 'थ': 'tha', 'द': 'da', 'ध': 'dha', 'न': 'na',
                'प': 'pa', 'फ': 'pha', 'ब': 'ba', 'भ': 'bha', 'म': 'ma',
                'य': 'ya', 'र': 'ra', 'ल': 'la', 'व': 'va',
                'श': 'sha', 'ष': 'sha', 'स': 'sa', 'ह': 'ha',

                // Compound consonants
                'क्ष': 'ksha', 'त्र': 'tra', 'ज्ञ': 'gya',

                // Vowel diacritics
                'ा': 'aa', 'ि': 'i', 'ी': 'ee', 'ु': 'u', 'ू': 'oo',
                'ृ': 'ri', 'ॄ': 'ree', 'ॢ': 'li', 'ॣ': 'lee',
                'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au',

                // Special marks
                '्': '', 'ं': 'n', 'ः': 'h', 'ँ': 'n',

                // Numbers
                '०': '0', '१': '1', '२': '2', '३': '3', '४': '4',
                '५': '5', '६': '6', '७': '7', '८': '8', '९': '9',
            }
        };

        // Extended characters for regional variants
        const extended = {
            // Marathi specific
            'ळ': maps[this.scheme]['ल'], // Retroflex L
            'ऱ': maps[this.scheme]['र'], // Flapped R

            // Vedic Sanskrit extensions
            'ॐ': 'om', // Om symbol
            'ऽ': "'", // Avagraha

            // Additional punctuation
            '।': '.', '॥': '..', '॰': '',
        };

        return { ...maps[this.scheme], ...extended };
    }

    // Detect if text contains Devanagari script
    isDevanagari(text) {
        const devanagariRange = /[\u0900-\u097F]/;
        return devanagariRange.test(text);
    }

    // Main transliteration function
    transliterate(text) {
        if (!this.isDevanagari(text)) {
            return text;
        }

        let result = '';
        const map = this.transliterationMaps;
        
        // Process text character by character with context awareness
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const nextChar = text[i + 1];
            const prevChar = text[i - 1];

            // Handle compound characters first
            if (nextChar) {
                const compound = char + nextChar;
                if (map[compound]) {
                    result += map[compound];
                    i++; // Skip next character as it's part of compound
                    continue;
                }
            }

            // Handle special combinations
            if (char === '्' && nextChar) {
                // Virama followed by consonant - create conjunct
                const conjunct = this.handleConjunct(char, nextChar);
                if (conjunct) {
                    result += conjunct;
                    i++; // Skip next character
                    continue;
                }
            }

            // Handle vowel marks after consonants
            if (this.isVowelMark(char) && this.isConsonant(prevChar)) {
                result += map[char] || char;
                continue;
            }

            // Handle inherent vowel suppression
            if (this.isConsonant(char)) {
                const consonantSound = map[char] || char;
                // Remove inherent 'a' if followed by virama or vowel mark
                if (nextChar === '्' || this.isVowelMark(nextChar)) {
                    result += consonantSound.replace(/a$/, '');
                } else {
                    result += consonantSound;
                }
                continue;
            }

            // Default transliteration
            result += map[char] || char;
        }

        return this.postProcess(result);
    }

    // Handle conjunct consonants
    handleConjunct(virama, nextChar) {
        const map = this.transliterationMaps;
        if (this.isConsonant(nextChar)) {
            const consonant = map[nextChar] || nextChar;
            return consonant.replace(/a$/, ''); // Remove inherent vowel
        }
        return null;
    }

    // Check if character is a vowel mark (matra)
    isVowelMark(char) {
        const vowelMarks = ['ा', 'ि', 'ी', 'ु', 'ू', 'ृ', 'ॄ', 'ॢ', 'ॣ', 'े', 'ै', 'ो', 'ौ'];
        return vowelMarks.includes(char);
    }

    // Check if character is a consonant
    isConsonant(char) {
        const consonantRange = /[\u0915-\u0939\u0958-\u095F]/;
        return consonantRange.test(char);
    }

    // Post-processing for better readability
    postProcess(text) {
        return text
            .replace(/([kgcjṭḍtdpb])h([aeiou])/g, '$1h$2') // Maintain aspiration
            .replace(/aa/g, this.scheme === 'simplified' ? 'aa' : 'ā') // Normalize long vowels
            .replace(/\s+/g, ' ') // Normalize whitespace
            .trim();
    }

    // Change transliteration scheme
    setScheme(scheme) {
        if (['iast', 'harvard', 'simplified'].includes(scheme)) {
            this.scheme = scheme;
            this.transliterationMaps = this.initializeMaps();
            return true;
        }
        return false;
    }

    // Get available schemes
    getAvailableSchemes() {
        return ['iast', 'harvard', 'simplified'];
    }

    // Batch transliteration for multiple texts
    transliterateArray(textArray) {
        return textArray.map(text => this.transliterate(text));
    }

    // Get scheme information
    getSchemeInfo() {
        const schemes = {
            iast: {
                name: 'IAST',
                description: 'International Alphabet of Sanskrit Transliteration',
                academic: true,
                diacritics: true
            },
            harvard: {
                name: 'Harvard-Kyoto',
                description: 'ASCII-compatible transliteration scheme',
                academic: true,
                diacritics: false
            },
            simplified: {
                name: 'Simplified',
                description: 'Easy-to-read phonetic transliteration',
                academic: false,
                diacritics: false
            }
        };
        return schemes[this.scheme];
    }
}

// Word-based transliteration for common Hindi words
const hindiWordMap = {
    // Common greetings and phrases
    'नमस्ते': 'namaste',
    'नमस्कार': 'namaskar',
    'धन्यवाद': 'dhanyawad',
    'स्वागत': 'swagat',
    'अलविदा': 'alvida',
    
    // Time expressions
    'आज': 'aaj',
    'कल': 'kal',
    'परसों': 'parson',
    'सुबह': 'subah',
    'शाम': 'shaam',
    'रात': 'raat',
    
    // Family terms
    'माता': 'mata',
    'पिता': 'pita',
    'भाई': 'bhai',
    'बहन': 'bahan',
    'पत्नी': 'patni',
    'पति': 'pati',
    
    // Common verbs
    'जाना': 'jaana',
    'आना': 'aana',
    'करना': 'karna',
    'होना': 'hona',
    'देना': 'dena',
    'लेना': 'lena',
    
    // Numbers
    'एक': 'ek',
    'दो': 'do',
    'तीन': 'teen',
    'चार': 'chaar',
    'पांच': 'paanch',
    'छह': 'chah',
    'सात': 'saat',
    'आठ': 'aath',
    'नौ': 'nau',
    'दस': 'das',
    
    // Colors
    'लाल': 'laal',
    'नीला': 'neela',
    'हरा': 'hara',
    'पीला': 'peela',
    'काला': 'kaala',
    'सफेद': 'safed',
    
    // Directions
    'उत्तर': 'uttar',
    'दक्षिण': 'dakshin',
    'पूर्व': 'purva',
    'पश्चिम': 'pashchim',
    
    // Common objects
    'पानी': 'paani',
    'रोटी': 'roti',
    'चावल': 'chawal',
    'दूध': 'doodh',
    'चाय': 'chai',
    'कॉफी': 'coffee',
    
    // Places
    'घर': 'ghar',
    'स्कूल': 'school',
    'अस्पताल': 'aspatal',
    'बाजार': 'bazaar',
    'रेलवे': 'railway',
    'हवाई अड्डा': 'hawai adda'
};

// Export the transliterator class and word map
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DevanagariTransliterator, hindiWordMap };
} else if (typeof window !== 'undefined') {
    window.DevanagariTransliterator = DevanagariTransliterator;
    window.hindiWordMap = hindiWordMap;
}