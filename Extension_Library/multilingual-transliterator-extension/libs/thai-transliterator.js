/**
 * Thai Transliteration Library
 * Comprehensive phonetic transliteration for Thai script
 * Supports multiple romanization schemes: RTGS, ALA-LC, Simplified
 * Handles tone marks, vowel positioning, and consonant clusters
 * Version: 2.0.0
 */

class ThaiTransliterator {
    constructor(scheme = 'rtgs') {
        this.scheme = scheme;
        this.initializeMaps();
    }

    initializeMaps() {
        // Royal Thai General System (RTGS) - Official Thai romanization
        this.rtgs = {
            // Consonants
            consonants: {
                'ก': 'k', 'ข': 'kh', 'ฃ': 'kh', 'ค': 'kh', 'ฅ': 'kh', 'ฆ': 'kh',
                'ง': 'ng', 'จ': 'ch', 'ฉ': 'ch', 'ช': 'ch', 'ซ': 's', 'ฌ': 'ch',
                'ญ': 'y', 'ฎ': 'd', 'ฏ': 't', 'ฐ': 'th', 'ฑ': 'th', 'ฒ': 'th',
                'ณ': 'n', 'ด': 'd', 'ต': 't', 'ถ': 'th', 'ท': 'th', 'ธ': 'th',
                'น': 'n', 'บ': 'b', 'ป': 'p', 'ผ': 'ph', 'ฝ': 'f', 'พ': 'ph',
                'ฟ': 'f', 'ภ': 'ph', 'ม': 'm', 'ย': 'y', 'ร': 'r', 'ฤ': 'rue',
                'ล': 'l', 'ฦ': 'lue', 'ว': 'w', 'ศ': 's', 'ษ': 's', 'ส': 's',
                'ห': 'h', 'ฬ': 'l', 'อ': '', 'ฮ': 'h'
            },
            
            // Vowels
            vowels: {
                'ะ': 'a', 'ั': 'a', 'า': 'a', 'ำ': 'am',
                'ิ': 'i', 'ี': 'i', 'ึ': 'ue', 'ื': 'ue',
                'ุ': 'u', 'ู': 'u', 'เ': 'e', 'แ': 'ae',
                'โ': 'o', 'ใ': 'ai', 'ไ': 'ai', 'ๆ': '',
                'ฯ': '', '็': '', '์': '', '์': ''
            },

            // Complex vowels
            complexVowels: {
                'เ.ะ': 'e', 'เ.': 'e', 'แ.ะ': 'ae', 'แ.': 'ae',
                'โ.ะ': 'o', 'โ.': 'o', 'เ.าะ': 'o', 'เ.า': 'ao',
                'เ.อะ': 'oe', 'เ.อ': 'oe', 'เ.ียะ': 'ia', 'เ.ีย': 'ia',
                'เ.ือะ': 'uea', 'เ.ือ': 'uea', 'ัวะ': 'ua', 'ัว': 'ua'
            },

            // Tone marks
            tones: {
                '่': '', '้': '', '๊': '', '๋': ''
            }
        };

        // ALA-LC (American Library Association - Library of Congress)
        this.alaLC = {
            consonants: {
                'ก': 'k', 'ข': 'kh', 'ฃ': 'kh', 'ค': 'kh', 'ฅ': 'kh', 'ฆ': 'kh',
                'ง': 'ng', 'จ': 'ch', 'ฉ': 'ch', 'ช': 'ch', 'ซ': 's', 'ฌ': 'ch',
                'ญ': 'ỳ', 'ฎ': 'ḍ', 'ฏ': 'ṭ', 'ฐ': 'ṭh', 'ฑ': 'ṭh', 'ฒ': 'ṭh',
                'ณ': 'ṇ', 'ด': 'd', 'ต': 't', 'ถ': 'th', 'ท': 'th', 'ธ': 'th',
                'น': 'n', 'บ': 'b', 'ป': 'p', 'ผ': 'ph', 'ฝ': 'f', 'พ': 'ph',
                'ฟ': 'f', 'ภ': 'ph', 'ม': 'm', 'ย': 'y', 'ร': 'r', 'ฤ': 'r̥',
                'ล': 'l', 'ฦ': 'l̥', 'ว': 'w', 'ศ': 'ś', 'ษ': 'ṣ', 'ส': 's',
                'ห': 'h', 'ฬ': 'ḷ', 'อ': '', 'ฮ': 'h'
            },
            
            vowels: {
                'ะ': 'a', 'ั': 'a', 'า': 'ā', 'ำ': 'am̐',
                'ิ': 'i', 'ี': 'ī', 'ึ': 'ụ̄', 'ื': 'ụ̄',
                'ุ': 'u', 'ู': 'ū', 'เ': 'e', 'แ': 'æ',
                'โ': 'o', 'ใ': 'ịy', 'ไ': 'ịy'
            },

            complexVowels: {
                'เ.ะ': 'e', 'เ.': 'ē', 'แ.ะ': 'æ', 'แ.': 'ǣ',
                'โ.ะ': 'o', 'โ.': 'ō', 'เ.าะ': 'ǭ', 'เ.า': 'ao',
                'เ.อะ': 'ệ', 'เ.อ': 'ệ̄', 'เ.ียะ': 'īya', 'เ.ีย': 'īya',
                'เ.ือะ': 'ụ̄ya', 'เ.ือ': 'ụ̄ya', 'ัวะ': 'ụwa', 'ัว': 'ụwa'
            },

            tones: {
                '่': '̀', '้': '̂', '๊': '́', '๋': '̌'
            }
        };

        // Simplified romanization (phonetic, no diacritics)
        this.simplified = {
            consonants: {
                'ก': 'g', 'ข': 'k', 'ฃ': 'k', 'ค': 'k', 'ฅ': 'k', 'ฆ': 'k',
                'ง': 'ng', 'จ': 'j', 'ฉ': 'ch', 'ช': 'ch', 'ซ': 's', 'ฌ': 'ch',
                'ญ': 'y', 'ฎ': 'd', 'ฏ': 't', 'ฐ': 'th', 'ฑ': 'th', 'ฒ': 'th',
                'ณ': 'n', 'ด': 'd', 'ต': 't', 'ถ': 'th', 'ท': 'th', 'ธ': 'th',
                'น': 'n', 'บ': 'b', 'ป': 'p', 'ผ': 'ph', 'ฝ': 'f', 'พ': 'ph',
                'ฟ': 'f', 'ภ': 'ph', 'ม': 'm', 'ย': 'y', 'ร': 'r', 'ฤ': 'ri',
                'ล': 'l', 'ฦ': 'lu', 'ว': 'w', 'ศ': 's', 'ษ': 's', 'ส': 's',
                'ห': 'h', 'ฬ': 'l', 'อ': '', 'ฮ': 'h'
            },
            
            vowels: {
                'ะ': 'a', 'ั': 'a', 'า': 'aa', 'ำ': 'am',
                'ิ': 'i', 'ี': 'ii', 'ึ': 'ue', 'ื': 'ue',
                'ุ': 'u', 'ู': 'uu', 'เ': 'e', 'แ': 'ae',
                'โ': 'o', 'ใ': 'ai', 'ไ': 'ai'
            },

            complexVowels: {
                'เ.ะ': 'e', 'เ.': 'e', 'แ.ะ': 'ae', 'แ.': 'ae',
                'โ.ะ': 'o', 'โ.': 'o', 'เ.าะ': 'aw', 'เ.า': 'aw',
                'เ.อะ': 'er', 'เ.อ': 'er', 'เ.ียะ': 'ia', 'เ.ีย': 'ia',
                'เ.ือะ': 'uea', 'เ.ือ': 'uea', 'ัวะ': 'ua', 'ัว': 'ua'
            },

            tones: {
                '่': '', '้': '', '๊': '', '๋': ''
            }
        };

        // Thai numerals
        this.numbers = {
            '๐': '0', '๑': '1', '๒': '2', '๓': '3', '๔': '4',
            '๕': '5', '๖': '6', '๗': '7', '๘': '8', '๙': '9'
        };

        // Punctuation
        this.punctuation = {
            '๚': '', '๛': '', 'ๆ': '2', 'ฯ': '...'
        };
    }

    // Detect if text contains Thai script
    isThai(text) {
        const thaiRange = /[\u0E00-\u0E7F]/;
        return thaiRange.test(text);
    }

    // Get current romanization scheme maps
    getCurrentMaps() {
        switch (this.scheme) {
            case 'ala':
                return this.alaLC;
            case 'simplified':
                return this.simplified;
            default:
                return this.rtgs;
        }
    }

    // Check if character is a vowel
    isVowel(char) {
        const vowelChars = ['ะ', 'ั', 'า', 'ำ', 'ิ', 'ี', 'ึ', 'ื', 'ุ', 'ู', 'เ', 'แ', 'โ', 'ใ', 'ไ'];
        return vowelChars.includes(char);
    }

    // Check if character is a tone mark
    isToneMark(char) {
        const toneMarks = ['่', '้', '๊', '๋'];
        return toneMarks.includes(char);
    }

    // Check if character is a consonant
    isConsonant(char) {
        const maps = this.getCurrentMaps();
        return maps.consonants.hasOwnProperty(char);
    }

    // Handle complex vowel patterns
    handleComplexVowels(text, index, maps) {
        const char = text[index];
        const nextChar = text[index + 1];
        const nextNextChar = text[index + 2];

        // Check for patterns like เ_ะ, เ_า, etc.
        if (char === 'เ') {
            // Look ahead for vowel ending patterns
            for (let i = index + 1; i < text.length; i++) {
                const checkChar = text[i];
                if (this.isConsonant(checkChar)) {
                    continue; // Skip consonants
                }
                
                // Check various endings
                if (checkChar === 'ะ') {
                    return { vowel: maps.vowels['เ'] || 'e', length: i - index + 1 };
                } else if (checkChar === 'า') {
                    if (text[i + 1] === 'ะ') {
                        return { vowel: 'aw', length: i - index + 2 };
                    } else {
                        return { vowel: 'aw', length: i - index + 1 };
                    }
                } else if (checkChar === 'อ') {
                    if (text[i + 1] === 'ะ') {
                        return { vowel: 'er', length: i - index + 2 };
                    } else {
                        return { vowel: 'er', length: i - index + 1 };
                    }
                }
                break;
            }
        }

        // Handle ัว, ัวะ patterns
        if (char === 'ั' && nextChar === 'ว') {
            if (nextNextChar === 'ะ') {
                return { vowel: 'ua', length: 3 };
            } else {
                return { vowel: 'ua', length: 2 };
            }
        }

        return null;
    }

    // Main transliteration function
    transliterate(text) {
        if (!this.isThai(text)) {
            return text;
        }

        let result = '';
        const maps = this.getCurrentMaps();
        let i = 0;

        while (i < text.length) {
            const char = text[i];

            // Handle numbers
            if (this.numbers[char]) {
                result += this.numbers[char];
                i++;
                continue;
            }

            // Handle punctuation
            if (this.punctuation[char]) {
                result += this.punctuation[char];
                i++;
                continue;
            }

            // Handle complex vowels first
            const complexVowel = this.handleComplexVowels(text, i, maps);
            if (complexVowel) {
                result += complexVowel.vowel;
                i += complexVowel.length;
                continue;
            }

            // Handle consonants
            if (maps.consonants[char]) {
                let consonant = maps.consonants[char];
                
                // Check for following vowels and tone marks
                let hasVowel = false;
                let j = i + 1;
                
                // Skip tone marks and process vowels
                while (j < text.length) {
                    const nextChar = text[j];
                    
                    if (this.isToneMark(nextChar)) {
                        if (this.scheme === 'ala' && maps.tones[nextChar]) {
                            // Add tone mark to the vowel or consonant
                            consonant += maps.tones[nextChar];
                        }
                        j++;
                        continue;
                    }
                    
                    if (maps.vowels[nextChar]) {
                        result += consonant + maps.vowels[nextChar];
                        hasVowel = true;
                        i = j + 1;
                        break;
                    }
                    
                    if (this.isConsonant(nextChar) || nextChar === ' ') {
                        break;
                    }
                    
                    j++;
                }
                
                if (!hasVowel) {
                    // Add inherent vowel 'a' for consonants without explicit vowels
                    result += consonant + (consonant === '' ? '' : 'a');
                    i++;
                }
                continue;
            }

            // Handle standalone vowels
            if (maps.vowels[char]) {
                result += maps.vowels[char];
                i++;
                continue;
            }

            // Handle tone marks (if not processed above)
            if (this.isToneMark(char)) {
                if (this.scheme === 'ala' && maps.tones[char]) {
                    result += maps.tones[char];
                }
                i++;
                continue;
            }

            // Handle special characters
            if (char === '์') {
                // Silent character - skip
                i++;
                continue;
            }

            if (char === '็') {
                // Short vowel marker - usually ignored in romanization
                i++;
                continue;
            }

            // Keep unknown characters as is
            result += char;
            i++;
        }

        return this.postProcess(result);
    }

    // Post-processing for better readability
    postProcess(text) {
        return text
            .replace(/([aeiou])\1+/g, '$1') // Remove duplicate vowels
            .replace(/aa/g, this.scheme === 'simplified' ? 'aa' : 'a') // Handle long vowels
            .replace(/\s+/g, ' ') // Normalize whitespace
            .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
            .trim();
    }

    // Set romanization scheme
    setScheme(scheme) {
        if (['rtgs', 'ala', 'simplified'].includes(scheme)) {
            this.scheme = scheme;
            return true;
        }
        return false;
    }

    // Get available schemes
    getAvailableSchemes() {
        return ['rtgs', 'ala', 'simplified'];
    }

    // Batch transliteration
    transliterateArray(textArray) {
        return textArray.map(text => this.transliterate(text));
    }

    // Get scheme information
    getSchemeInfo() {
        const schemes = {
            rtgs: {
                name: 'RTGS',
                description: 'Royal Thai General System of Transcription',
                official: true,
                diacritics: false
            },
            ala: {
                name: 'ALA-LC',
                description: 'American Library Association - Library of Congress',
                official: false,
                diacritics: true
            },
            simplified: {
                name: 'Simplified',
                description: 'Easy-to-read phonetic romanization',
                official: false,
                diacritics: false
            }
        };
        return schemes[this.scheme];
    }

    // Convert Thai numerals to Arabic
    convertNumbers(text) {
        let result = text;
        Object.entries(this.numbers).forEach(([thai, arabic]) => {
            result = result.replace(new RegExp(thai, 'g'), arabic);
        });
        return result;
    }

    // Analyze tone class (for linguistic analysis)
    analyzeToneClass(syllable) {
        // This is a simplified tone analysis
        // Real Thai tone analysis requires complex rules
        const toneMarks = {
            '่': 'mai ek',
            '้': 'mai tho',
            '๊': 'mai tri',
            '๋': 'mai chattawa'
        };

        for (const char of syllable) {
            if (toneMarks[char]) {
                return toneMarks[char];
            }
        }
        return 'no tone mark';
    }
}

// Common Thai word mappings for context-aware transliteration
const thaiWordMap = {
    // Greetings
    'สวัสดี': 'sawasdee',
    'สวัสดีครับ': 'sawasdee khrap',
    'สวัสดีค่ะ': 'sawasdee kha',
    'ขอบคุณ': 'khob khun',
    'ขอบคุณครับ': 'khob khun khrap',
    'ขอบคุณค่ะ': 'khob khun kha',
    'ขอโทษ': 'kho thot',
    'ไม่เป็นไร': 'mai pen rai',

    // Common phrases
    'ใช่': 'chai',
    'ไม่ใช่': 'mai chai',
    'ไม่': 'mai',
    'ได้': 'dai',
    'ไม่ได้': 'mai dai',
    'เข้าใจ': 'khao jai',
    'ไม่เข้าใจ': 'mai khao jai',

    // Family
    'พ่อ': 'pho',
    'แม่': 'mae',
    'ลูก': 'luk',
    'พี่': 'phi',
    'น้อง': 'nong',
    'ปู่': 'pu',
    'ย่า': 'ya',
    'ตา': 'ta',
    'ยาย': 'yaai',

    // Time
    'วันนี้': 'wan nee',
    'เมื่อวาน': 'meua wan',
    'พรุ่งนี้': 'phrung nee',
    'เช้า': 'chao',
    'เที่ยง': 'thiang',
    'เย็น': 'yen',
    'กลางคืน': 'klaang khuen',

    // Numbers
    'หนึ่ง': 'neung',
    'สอง': 'song',
    'สาม': 'saam',
    'สี่': 'see',
    'ห้า': 'haa',
    'หก': 'hok',
    'เจ็ด': 'jet',
    'แปด': 'paet',
    'เก้า': 'kao',
    'สิบ': 'sip',

    // Food
    'ข้าว': 'khao',
    'น้ำ': 'nam',
    'อาหาร': 'aahaan',
    'ต้มยำ': 'tom yam',
    'ผัดไท': 'phat thai',
    'ส้มตำ': 'som tam',
    'มะม่วง': 'mamuang',
    'ข้าวโพด': 'khao phot',

    // Places
    'บ้าน': 'baan',
    'โรงเรียน': 'rong rian',
    'โรงพยาบาล': 'rong phayabaan',
    'ตลาด': 'talaat',
    'วัด': 'wat',
    'สถานี': 'sathanii',

    // Countries
    'ไทย': 'thai',
    'อเมริกา': 'amerika',
    'จีน': 'jiin',
    'ญี่ปุ่น': 'yiipun',
    'เกาหลี': 'kaoli',
    'อังกฤษ': 'angkrit',
    'ฝรั่งเศส': 'farangset',
    'เยอรมนี': 'yoeraman'
};

// Export the transliterator class and word map
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ThaiTransliterator, thaiWordMap };
} else if (typeof window !== 'undefined') {
    window.ThaiTransliterator = ThaiTransliterator;
    window.thaiWordMap = thaiWordMap;
}