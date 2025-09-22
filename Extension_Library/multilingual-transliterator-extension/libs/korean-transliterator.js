/**
 * Korean Transliteration Library
 * Comprehensive phonetic transliteration for Hangul (Korean script)
 * Supports multiple romanization schemes: Revised Romanization, McCune-Reischauer, Yale
 * Version: 2.0.0
 */

class KoreanTransliterator {
    constructor(scheme = 'rr') {
        this.scheme = scheme;
        this.initializeMaps();
    }

    initializeMaps() {
        // Revised Romanization (RR) - Official South Korean standard
        this.revisedRomanization = {
            // Initial consonants (초성)
            initial: {
                'ㄱ': 'g', 'ㄲ': 'kk', 'ㄴ': 'n', 'ㄷ': 'd', 'ㄸ': 'tt',
                'ㄹ': 'r', 'ㅁ': 'm', 'ㅂ': 'b', 'ㅃ': 'pp', 'ㅅ': 's',
                'ㅆ': 'ss', 'ㅇ': '', 'ㅈ': 'j', 'ㅉ': 'jj', 'ㅊ': 'ch',
                'ㅋ': 'k', 'ㅌ': 't', 'ㅍ': 'p', 'ㅎ': 'h'
            },
            // Vowels (중성)
            vowel: {
                'ㅏ': 'a', 'ㅐ': 'ae', 'ㅑ': 'ya', 'ㅒ': 'yae', 'ㅓ': 'eo',
                'ㅔ': 'e', 'ㅕ': 'yeo', 'ㅖ': 'ye', 'ㅗ': 'o', 'ㅘ': 'wa',
                'ㅙ': 'wae', 'ㅚ': 'oe', 'ㅛ': 'yo', 'ㅜ': 'u', 'ㅝ': 'wo',
                'ㅞ': 'we', 'ㅟ': 'wi', 'ㅠ': 'yu', 'ㅡ': 'eu', 'ㅢ': 'ui',
                'ㅣ': 'i'
            },
            // Final consonants (종성)
            final: {
                '': '', 'ㄱ': 'k', 'ㄲ': 'k', 'ㄳ': 'k', 'ㄴ': 'n',
                'ㄵ': 'n', 'ㄶ': 'n', 'ㄷ': 't', 'ㄹ': 'l', 'ㄺ': 'k',
                'ㄻ': 'm', 'ㄼ': 'l', 'ㄽ': 'l', 'ㄾ': 'l', 'ㄿ': 'p',
                'ㅀ': 'l', 'ㅁ': 'm', 'ㅂ': 'p', 'ㅄ': 'p', 'ㅅ': 't',
                'ㅆ': 't', 'ㅇ': 'ng', 'ㅈ': 't', 'ㅊ': 't', 'ㅋ': 'k',
                'ㅌ': 't', 'ㅍ': 'p', 'ㅎ': 't'
            }
        };

        // McCune-Reischauer romanization
        this.mccuneReischauer = {
            initial: {
                'ㄱ': 'k', 'ㄲ': 'kk', 'ㄴ': 'n', 'ㄷ': 't', 'ㄸ': 'tt',
                'ㄹ': 'r', 'ㅁ': 'm', 'ㅂ': 'p', 'ㅃ': 'pp', 'ㅅ': 's',
                'ㅆ': 'ss', 'ㅇ': '', 'ㅈ': 'ch', 'ㅉ': 'tch', 'ㅊ': "ch'",
                'ㅋ': "k'", 'ㅌ': "t'", 'ㅍ': "p'", 'ㅎ': 'h'
            },
            vowel: {
                'ㅏ': 'a', 'ㅐ': 'ae', 'ㅑ': 'ya', 'ㅒ': 'yae', 'ㅓ': 'ŏ',
                'ㅔ': 'e', 'ㅕ': 'yŏ', 'ㅖ': 'ye', 'ㅗ': 'o', 'ㅘ': 'wa',
                'ㅙ': 'wae', 'ㅚ': 'oe', 'ㅛ': 'yo', 'ㅜ': 'u', 'ㅝ': 'wŏ',
                'ㅞ': 'we', 'ㅟ': 'wi', 'ㅠ': 'yu', 'ㅡ': 'ŭ', 'ㅢ': 'ŭi',
                'ㅣ': 'i'
            },
            final: {
                '': '', 'ㄱ': 'k', 'ㄲ': 'k', 'ㄳ': 'k', 'ㄴ': 'n',
                'ㄵ': 'n', 'ㄶ': 'n', 'ㄷ': 't', 'ㄹ': 'l', 'ㄺ': 'k',
                'ㄻ': 'm', 'ㄼ': 'l', 'ㄽ': 'l', 'ㄾ': 'l', 'ㄿ': 'p',
                'ㅀ': 'l', 'ㅁ': 'm', 'ㅂ': 'p', 'ㅄ': 'p', 'ㅅ': 't',
                'ㅆ': 't', 'ㅇ': 'ng', 'ㅈ': 't', 'ㅊ': 't', 'ㅋ': 'k',
                'ㅌ': 't', 'ㅍ': 'p', 'ㅎ': 't'
            }
        };

        // Yale romanization
        this.yale = {
            initial: {
                'ㄱ': 'k', 'ㄲ': 'kk', 'ㄴ': 'n', 'ㄷ': 't', 'ㄸ': 'tt',
                'ㄹ': 'l', 'ㅁ': 'm', 'ㅂ': 'p', 'ㅃ': 'pp', 'ㅅ': 's',
                'ㅆ': 'ss', 'ㅇ': '', 'ㅈ': 'c', 'ㅉ': 'cc', 'ㅊ': 'ch',
                'ㅋ': 'kh', 'ㅌ': 'th', 'ㅍ': 'ph', 'ㅎ': 'h'
            },
            vowel: {
                'ㅏ': 'a', 'ㅐ': 'ay', 'ㅑ': 'ya', 'ㅒ': 'yay', 'ㅓ': 'e',
                'ㅔ': 'ey', 'ㅕ': 'ye', 'ㅖ': 'yey', 'ㅗ': 'o', 'ㅘ': 'wa',
                'ㅙ': 'way', 'ㅚ': 'oy', 'ㅛ': 'yo', 'ㅜ': 'wu', 'ㅝ': 'we',
                'ㅞ': 'wey', 'ㅟ': 'wuy', 'ㅠ': 'yu', 'ㅡ': 'u', 'ㅢ': 'uy',
                'ㅣ': 'i'
            },
            final: {
                '': '', 'ㄱ': 'k', 'ㄲ': 'k', 'ㄳ': 'ks', 'ㄴ': 'n',
                'ㄵ': 'nc', 'ㄶ': 'nh', 'ㄷ': 't', 'ㄹ': 'l', 'ㄺ': 'lk',
                'ㄻ': 'lm', 'ㄼ': 'lp', 'ㄽ': 'ls', 'ㄾ': 'lth', 'ㄿ': 'lph',
                'ㅀ': 'lh', 'ㅁ': 'm', 'ㅂ': 'p', 'ㅄ': 'ps', 'ㅅ': 's',
                'ㅆ': 'ss', 'ㅇ': 'ng', 'ㅈ': 'c', 'ㅊ': 'ch', 'ㅋ': 'kh',
                'ㅌ': 'th', 'ㅍ': 'ph', 'ㅎ': 'h'
            }
        };

        // Hangul syllable composition constants
        this.HANGUL_BASE = 0xAC00;
        this.INITIAL_COUNT = 19;
        this.VOWEL_COUNT = 21;
        this.FINAL_COUNT = 28;
    }

    // Detect if text contains Korean script
    isKorean(text) {
        // Hangul syllables, Jamo, and Korean symbols
        const koreanRange = /[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/;
        return koreanRange.test(text);
    }

    // Decompose Hangul syllable into components
    decomposeHangul(syllable) {
        const code = syllable.charCodeAt(0);
        
        if (code < this.HANGUL_BASE || code > this.HANGUL_BASE + (this.INITIAL_COUNT * this.VOWEL_COUNT * this.FINAL_COUNT)) {
            return null;
        }

        const syllableIndex = code - this.HANGUL_BASE;
        const finalIndex = syllableIndex % this.FINAL_COUNT;
        const vowelIndex = (syllableIndex - finalIndex) / this.FINAL_COUNT % this.VOWEL_COUNT;
        const initialIndex = ((syllableIndex - finalIndex) / this.FINAL_COUNT - vowelIndex) / this.VOWEL_COUNT;

        const initials = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
        const vowels = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
        const finals = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

        return {
            initial: initials[initialIndex],
            vowel: vowels[vowelIndex],
            final: finals[finalIndex]
        };
    }

    // Get current romanization scheme maps
    getCurrentMaps() {
        switch (this.scheme) {
            case 'mr':
                return this.mccuneReischauer;
            case 'yale':
                return this.yale;
            default:
                return this.revisedRomanization;
        }
    }

    // Apply sound changes for more natural pronunciation
    applySoundChanges(romanized, components, nextComponents) {
        const maps = this.getCurrentMaps();
        
        // Apply assimilation rules for Revised Romanization
        if (this.scheme === 'rr') {
            // Palatalization: ti -> chi, di -> ji
            if (components.initial === 'ㄷ' && (components.vowel === 'ㅣ' || components.vowel === 'ㅑ' || components.vowel === 'ㅕ' || components.vowel === 'ㅛ' || components.vowel === 'ㅠ')) {
                romanized = romanized.replace(/^d/, 'j');
            }
            if (components.initial === 'ㅌ' && (components.vowel === 'ㅣ' || components.vowel === 'ㅑ' || components.vowel === 'ㅕ' || components.vowel === 'ㅛ' || components.vowel === 'ㅠ')) {
                romanized = romanized.replace(/^t/, 'ch');
            }

            // Intervocalic voicing
            if (nextComponents && nextComponents.initial === 'ㅇ') {
                romanized = romanized.replace(/k$/, 'g').replace(/p$/, 'b').replace(/t$/, 'd');
            }
        }

        return romanized;
    }

    // Main transliteration function
    transliterate(text) {
        if (!this.isKorean(text)) {
            return text;
        }

        let result = '';
        const maps = this.getCurrentMaps();

        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            
            // Handle Hangul syllables
            if (char >= '\uAC00' && char <= '\uD7A3') {
                const components = this.decomposeHangul(char);
                if (components) {
                    const nextChar = text[i + 1];
                    const nextComponents = nextChar && nextChar >= '\uAC00' && nextChar <= '\uD7A3' 
                        ? this.decomposeHangul(nextChar) : null;

                    let romanized = maps.initial[components.initial] + 
                                   maps.vowel[components.vowel] + 
                                   maps.final[components.final];

                    romanized = this.applySoundChanges(romanized, components, nextComponents);
                    result += romanized;
                    continue;
                }
            }

            // Handle individual Jamo (if present)
            if (maps.initial[char]) {
                result += maps.initial[char];
            } else if (maps.vowel[char]) {
                result += maps.vowel[char];
            } else if (maps.final[char]) {
                result += maps.final[char];
            } else {
                result += char; // Keep non-Korean characters as is
            }
        }

        return this.postProcess(result);
    }

    // Post-processing for better readability
    postProcess(text) {
        return text
            .replace(/([kgtpbdmnlrshfv])([kgtpbdmnlrshfv])/g, '$1-$2') // Add hyphens between consonant clusters
            .replace(/\s+/g, ' ') // Normalize whitespace
            .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
            .trim();
    }

    // Set romanization scheme
    setScheme(scheme) {
        if (['rr', 'mr', 'yale'].includes(scheme)) {
            this.scheme = scheme;
            return true;
        }
        return false;
    }

    // Get available schemes
    getAvailableSchemes() {
        return ['rr', 'mr', 'yale'];
    }

    // Batch transliteration
    transliterateArray(textArray) {
        return textArray.map(text => this.transliterate(text));
    }

    // Get scheme information
    getSchemeInfo() {
        const schemes = {
            rr: {
                name: 'Revised Romanization',
                description: 'Official South Korean romanization standard (2000)',
                official: true,
                diacritics: false
            },
            mr: {
                name: 'McCune-Reischauer',
                description: 'Traditional academic romanization system',
                official: false,
                diacritics: true
            },
            yale: {
                name: 'Yale Romanization',
                description: 'Linguistic romanization system',
                official: false,
                diacritics: false
            }
        };
        return schemes[this.scheme];
    }

    // Convert Hanja numbers to Korean
    convertHanjaNumbers(text) {
        const hanjaNumbers = {
            '零': '영', '〇': '영', '一': '일', '二': '이', '三': '삼', '四': '사', '五': '오',
            '六': '육', '七': '칠', '八': '팔', '九': '구', '十': '십', '百': '백', '千': '천', '萬': '만'
        };

        let result = text;
        Object.entries(hanjaNumbers).forEach(([hanja, korean]) => {
            result = result.replace(new RegExp(hanja, 'g'), korean);
        });

        return result;
    }
}

// Common Korean word mappings for context-aware transliteration
const koreanWordMap = {
    // Greetings
    '안녕하세요': 'annyeonghaseyo',
    '안녕히 가세요': 'annyeonghi gaseyo',
    '안녕히 계세요': 'annyeonghi gyeseyo',
    '감사합니다': 'gamsahamnida',
    '고맙습니다': 'gomapseumnida',
    '죄송합니다': 'joesonghamnida',
    '미안합니다': 'mianhamnida',
    
    // Common phrases
    '네': 'ne',
    '아니요': 'aniyo',
    '괜찮아요': 'gwaenchanayo',
    '좋아요': 'johayo',
    '싫어요': 'silheoyo',
    '몰라요': 'mollayo',
    '알겠어요': 'algesseoyo',
    
    // Family
    '아버지': 'abeoji',
    '어머니': 'eomeoni',
    '형': 'hyeong',
    '누나': 'nuna',
    '오빠': 'oppa',
    '언니': 'eonni',
    '동생': 'dongsaeng',
    
    // Time
    '오늘': 'oneul',
    '어제': 'eoje',
    '내일': 'naeil',
    '아침': 'achim',
    '점심': 'jeomsim',
    '저녁': 'jeonyeok',
    '밤': 'bam',
    
    // Numbers
    '하나': 'hana',
    '둘': 'dul',
    '셋': 'set',
    '넷': 'net',
    '다섯': 'daseot',
    '여섯': 'yeoseot',
    '일곱': 'ilgop',
    '여덟': 'yeodeol',
    '아홉': 'ahop',
    '열': 'yeol',
    
    // Common objects
    '물': 'mul',
    '밥': 'bap',
    '김치': 'gimchi',
    '라면': 'ramyeon',
    '치킨': 'chikin',
    '맥주': 'maekju',
    '소주': 'soju',
    
    // Places
    '집': 'jip',
    '학교': 'hakgyo',
    '회사': 'hoesa',
    '병원': 'byeongwon',
    '시장': 'sijang',
    '공항': 'gonghang',
    '지하철': 'jihacheol',
    
    // Countries
    '한국': 'hanguk',
    '미국': 'miguk',
    '중국': 'jungguk',
    '일본': 'ilbon',
    '영국': 'yeongguk',
    '프랑스': 'peurangseu',
    '독일': 'dogil',
    '러시아': 'reosia'
};

// Export the transliterator class and word map
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { KoreanTransliterator, koreanWordMap };
} else if (typeof window !== 'undefined') {
    window.KoreanTransliterator = KoreanTransliterator;
    window.koreanWordMap = koreanWordMap;
}