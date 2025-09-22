/**
 * Comprehensive Arabic to Latin transliteration mappings
 * Includes Arabic alphabet and common words/phrases with multiple romanization standards
 */

// Arabic alphabet with ALA-LC (American Library Association - Library of Congress) transliteration
export const arabicAlphabetMap = {
  // Basic Arabic letters (28 letters + hamza and alif variants)
  'ا': 'a',      // alif
  'أ': 'a',      // alif with hamza above
  'إ': 'i',      // alif with hamza below
  'آ': 'ā',      // alif with madda
  'ء': "'",     // hamza
  'ب': 'b',      // ba
  'ت': 't',      // ta
  'ث': 'th',     // tha
  'ج': 'j',      // jim
  'ح': 'ḥ',      // ha
  'خ': 'kh',     // kha
  'د': 'd',      // dal
  'ذ': 'dh',     // dhal
  'ر': 'r',      // ra
  'ز': 'z',      // za
  'س': 's',      // sin
  'ش': 'sh',     // shin
  'ص': 'ṣ',      // sad
  'ض': 'ḍ',      // dad
  'ط': 'ṭ',      // ta
  'ظ': 'ẓ',      // za
  'ع': "'",     // ain
  'غ': 'gh',     // ghain
  'ف': 'f',      // fa
  'ق': 'q',      // qaf
  'ك': 'k',      // kaf
  'ل': 'l',      // lam
  'م': 'm',      // mim
  'ن': 'n',      // nun
  'ه': 'h',      // ha
  'و': 'w',      // waw
  'ي': 'y',      // ya

  // Diacritics (Tashkeel)
  'َ': 'a',      // fatha
  'ِ': 'i',      // kasra
  'ُ': 'u',      // damma
  'ً': 'an',     // tanwin fath
  'ٍ': 'in',     // tanwin kasr
  'ٌ': 'un',     // tanwin damm
  'ْ': '',       // sukun (no vowel)
  'ّ': '',       // shadda (doubling)
  'ٰ': 'ā',      // alif khanjariyya

  // Persian/Urdu additional letters (commonly used)
  'پ': 'p',      // pe
  'چ': 'ch',     // che
  'ژ': 'zh',     // zhe
  'گ': 'g',      // gaf

  // Special combinations
  'لا': 'lā',    // lam-alif ligature
  'الله': 'Allāh', // Allah
};

// Common Arabic words and phrases with accurate transliteration
export const arabicWordsMap = {
  // Religious terms
  'الله': 'Allāh',
  'اسلام': 'Islām',
  'قرآن': 'Qurʾān',
  'محمد': 'Muḥammad',
  'مسلم': 'Muslim',
  'صلاة': 'ṣalāh',
  'زكاة': 'zakāh',
  'حج': 'ḥajj',
  'صوم': 'ṣawm',
  'جهاد': 'jihād',
  'شريعة': 'sharīʿah',
  'سنة': 'sunnah',
  'حديث': 'ḥadīth',
  'إمام': 'imām',
  'مسجد': 'masjid',
  'رمضان': 'Ramaḍān',
  'عيد': 'ʿīd',

  // Greetings and common phrases
  'السلام عليكم': 'al-salāmu ʿalaykum',
  'وعليكم السلام': 'wa-ʿalaykumu al-salām',
  'أهلا وسهلا': 'ahlan wa-sahlan',
  'مرحبا': 'marḥaban',
  'شكرا': 'shukran',
  'عفواً': 'ʿafwan',
  'من فضلك': 'min faḍlik',
  'لو سمحت': 'law samaḥt',
  'إن شاء الله': 'in shāʾ Allāh',
  'الحمد لله': 'al-ḥamdu li-llāh',
  'ماشاء الله': 'mā shāʾa Allāh',
  'بارك الله فيك': 'bāraka Allāhu fīk',

  // Basic vocabulary
  'بيت': 'bayt',
  'مدرسة': 'madrasah',
  'كتاب': 'kitāb',
  'قلم': 'qalam',
  'ورقة': 'waraqah',
  'ماء': 'māʾ',
  'خبز': 'khubz',
  'لحم': 'laḥm',
  'سمك': 'samak',
  'فواكه': 'fawākih',
  'خضروات': 'khuḍrāwāt',

  // Family terms
  'أب': 'ab',
  'أم': 'umm',
  'ابن': 'ibn',
  'بنت': 'bint',
  'أخ': 'akh',
  'أخت': 'ukht',
  'جد': 'jadd',
  'جدة': 'jaddah',
  'عم': 'ʿamm',
  'عمة': 'ʿammah',
  'خال': 'khāl',
  'خالة': 'khālah',
  'زوج': 'zawj',
  'زوجة': 'zawjah',

  // Numbers
  'واحد': 'wāḥid',
  'اثنان': 'ithnān',
  'ثلاثة': 'thalāthah',
  'أربعة': 'arbaʿah',
  'خمسة': 'khamsah',
  'ستة': 'sittah',
  'سبعة': 'sabʿah',
  'ثمانية': 'thamāniyah',
  'تسعة': 'tisʿah',
  'عشرة': 'ʿasharah',
  'عشرون': 'ʿishrūn',
  'ثلاثون': 'thalāthūn',
  'أربعون': 'arbaʿūn',
  'خمسون': 'khamsūn',
  'مئة': 'miʾah',
  'ألف': 'alf',

  // Days of the week
  'الأحد': 'al-Aḥad',
  'الاثنين': 'al-Ithnavn',
  'الثلاثاء': 'al-Thalāthāʾ',
  'الأربعاء': 'al-Arbiʿāʾ',
  'الخميس': 'al-Khamīs',
  'الجمعة': 'al-Jumʿah',
  'السبت': 'al-Sabt',

  // Colors
  'أبيض': 'abyaḍ',
  'أسود': 'aswad',
  'أحمر': 'aḥmar',
  'أزرق': 'azraq',
  'أخضر': 'akhḍar',
  'أصفر': 'aṣfar',

  // Directions
  'شمال': 'shamāl',
  'يمين': 'yamīn',
  'شرق': 'sharq',
  'غرب': 'gharb',
  'شمال': 'shimāl',
  'جنوب': 'janūb',

  // Time expressions
  'اليوم': 'al-yawm',
  'غدا': 'ghadan',
  'أمس': 'ams',
  'صباح': 'ṣabāḥ',
  'مساء': 'masāʾ',
  'ليل': 'layl',
  'نهار': 'nahār',
  'ساعة': 'sāʿah',
  'دقيقة': 'daqīqah',
  'ثانية': 'thāniyah',

  // Places and locations
  'مصر': 'Miṣr',
  'سوريا': 'Sūriyā',
  'العراق': 'al-ʿIrāq',
  'الأردن': 'al-Urdun',
  'لبنان': 'Lubnān',
  'المغرب': 'al-Maghrib',
  'الجزائر': 'al-Jazāʾir',
  'تونس': 'Tūnis',
  'السعودية': 'al-Saʿūdiyyah',
  'الإمارات': 'al-Imārāt',
  'قطر': 'Qaṭar',
  'الكويت': 'al-Kuwayt',
  'البحرين': 'al-Baḥrayn',
  'عمان': 'ʿUmān',
  'اليمن': 'al-Yaman',

  // Academic and professional terms
  'جامعة': 'jāmiʿah',
  'طالب': 'ṭālib',
  'طالبة': 'ṭālibah',
  'أستاذ': 'ustādh',
  'معلم': 'muʿallim',
  'طبيب': 'ṭabīb',
  'مهندس': 'muhandis',
  'محاسب': 'muḥāsib',
  'محامي': 'muḥāmī',

  // Common verbs (in root form)
  'كتب': 'kataba',
  'قرأ': 'qaraʾa',
  'ذهب': 'dhahaba',
  'أكل': 'akala',
  'شرب': 'shariba',
  'نام': 'nāma',
  'عمل': 'ʿamila',
  'درس': 'darasa',
  'تعلم': 'taʿallama',

  // Adjectives
  'كبير': 'kabīr',
  'صغير': 'ṣaghīr',
  'طويل': 'ṭawīl',
  'قصير': 'qaṣīr',
  'جميل': 'jamīl',
  'قبيح': 'qabīḥ',
  'سريع': 'sarīʿ',
  'بطيء': 'baṭīʾ',
  'ذكي': 'dhakī',
  'غبي': 'ghubī',

  // Question words
  'ما': 'mā',
  'من': 'man',
  'متى': 'matā',
  'أين': 'ayna',
  'كيف': 'kayfa',
  'لماذا': 'li-mādhā',
  'كم': 'kam',

  // Prepositions
  'في': 'fī',
  'على': 'ʿalā',
  'تحت': 'taḥta',
  'فوق': 'fawqa',
  'أمام': 'amāma',
  'وراء': 'warāʾa',
  'بين': 'bayna',
  'مع': 'maʿa',
  'بدون': 'bidūn',
};

// Alternative romanization systems
export const alternativeRomanizations = {
  // BGN/PCGN (Board on Geographic Names) system
  bgn: {
    'ح': 'h',      // instead of ḥ
    'خ': 'kh',
    'ذ': 'th',     // instead of dh
    'ص': 's',      // instead of ṣ
    'ض': 'd',      // instead of ḍ
    'ط': 't',      // instead of ṭ
    'ظ': 'z',      // instead of ẓ
    'ع': "'",      // apostrophe
    'غ': 'gh',
    'ق': 'q',
    'ث': 'th',
    'ج': 'j',
    'ش': 'sh',
  },

  // ISO 233 system
  iso: {
    'ا': 'ā',
    'أ': 'aʾ',
    'إ': 'iʾ',
    'آ': 'ʾā',
    'ء': 'ʾ',
    'ب': 'b',
    'ت': 't',
    'ث': 'ṯ',
    'ج': 'ǧ',
    'ح': 'ḥ',
    'خ': 'ḫ',
    'د': 'd',
    'ذ': 'ḏ',
    'ر': 'r',
    'ز': 'z',
    'س': 's',
    'ش': 'š',
    'ص': 'ṣ',
    'ض': 'ḍ',
    'ط': 'ṭ',
    'ظ': 'ẓ',
    'ع': 'ʿ',
    'غ': 'ġ',
    'ف': 'f',
    'ق': 'q',
    'ك': 'k',
    'ل': 'l',
    'م': 'm',
    'ن': 'n',
    'ه': 'h',
    'و': 'w',
    'ي': 'y',
  },

  // Simplified ASCII-only system
  simplified: {
    'ا': 'a',
    'أ': 'a',
    'إ': 'i',
    'آ': 'aa',
    'ء': '',
    'ب': 'b',
    'ت': 't',
    'ث': 'th',
    'ج': 'j',
    'ح': 'h',
    'خ': 'kh',
    'د': 'd',
    'ذ': 'dh',
    'ر': 'r',
    'ز': 'z',
    'س': 's',
    'ش': 'sh',
    'ص': 's',
    'ض': 'd',
    'ط': 't',
    'ظ': 'z',
    'ع': '',
    'غ': 'gh',
    'ف': 'f',
    'ق': 'q',
    'ك': 'k',
    'ل': 'l',
    'م': 'm',
    'ن': 'n',
    'ه': 'h',
    'و': 'w',
    'ي': 'y',
    'ة': 'h',  // ta marbuta
  }
};

// Unicode ranges for Arabic script detection
export const arabicRanges = [
  { start: 0x0600, end: 0x06FF },  // Arabic
  { start: 0x0750, end: 0x077F },  // Arabic Supplement
  { start: 0x08A0, end: 0x08FF },  // Arabic Extended-A
  { start: 0xFB50, end: 0xFDFF },  // Arabic Presentation Forms-A
  { start: 0xFE70, end: 0xFEFF },  // Arabic Presentation Forms-B
];

/**
 * Check if a character is Arabic
 * @param {string} char - Single character to check
 * @returns {boolean} True if character is Arabic
 */
export function isArabicCharacter(char) {
  const code = char.charCodeAt(0);
  return arabicRanges.some(range => code >= range.start && code <= range.end);
}

/**
 * Get romanization for an Arabic character or word
 * @param {string} text - Arabic character(s) or word
 * @param {string} system - Romanization system ('ala', 'bgn', 'iso', 'simplified')
 * @returns {string|null} Romanized text or null if not found
 */
export function getRomanization(text, system = 'ala') {
  // First try word/phrase mapping
  if (arabicWordsMap[text]) {
    return arabicWordsMap[text];
  }
  
  // Then try character mapping with specified system
  if (system === 'ala' && arabicAlphabetMap[text]) {
    return arabicAlphabetMap[text];
  }
  
  if (alternativeRomanizations[system] && alternativeRomanizations[system][text]) {
    return alternativeRomanizations[system][text];
  }
  
  // Fallback to ALA-LC system
  return arabicAlphabetMap[text] || null;
}

/**
 * Check if text is primarily Arabic
 * @param {string} text - Text to check
 * @returns {boolean} True if text is primarily Arabic
 */
export function isArabicText(text) {
  if (!text || typeof text !== 'string') {
    return false;
  }
  
  const chars = Array.from(text);
  const arabicCount = chars.filter(isArabicCharacter).length;
  
  return arabicCount / chars.length > 0.3;
}

/**
 * Remove Arabic diacritics (tashkeel) from text
 * @param {string} text - Arabic text with diacritics
 * @returns {string} Text without diacritics
 */
export function removeDiacritics(text) {
  if (!text || typeof text !== 'string') {
    return '';
  }
  
  // Arabic diacritics unicode range
  const diacriticsRegex = /[\u064B-\u0652\u0670\u0640]/g;
  return text.replace(diacriticsRegex, '');
}

/**
 * Normalize Arabic text (remove diacritics, normalize alif forms)
 * @param {string} text - Arabic text to normalize
 * @returns {string} Normalized Arabic text
 */
export function normalizeArabicText(text) {
  if (!text || typeof text !== 'string') {
    return '';
  }
  
  let normalized = removeDiacritics(text);
  
  // Normalize different alif forms
  normalized = normalized.replace(/[إأآ]/g, 'ا');
  
  // Normalize ta marbuta
  normalized = normalized.replace(/ة/g, 'ه');
  
  // Remove tatweel (kashida)
  normalized = normalized.replace(/ـ/g, '');
  
  return normalized;
}

export default {
  arabicAlphabetMap,
  arabicWordsMap,
  alternativeRomanizations,
  isArabicCharacter,
  getRomanization,
  isArabicText,
  removeDiacritics,
  normalizeArabicText
};