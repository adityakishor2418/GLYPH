/**
 * Arabic Transliteration Library - Basic Usage Examples
 * Demonstrates how to use the Arabic to Latin transliteration library
 */

import {
  transliterate,
  analyze,
  transliterateBatch,
  createTransliterator,
  compareTransliterations,
  cleanText,
  stripDiacritics,
  normalizeText,
  transliterateName,
  processArabicText
} from '../src/index.js';

// Basic transliteration examples
console.log('=== Basic Transliteration Examples ===');
console.log();

// Simple greeting
console.log('Arabic:', 'السلام عليكم');
console.log('Transliteration:', transliterate('السلام عليكم'));
console.log();

// Religious phrases
console.log('Arabic:', 'بسم الله الرحمن الرحيم');
console.log('Transliteration:', transliterate('بسم الله الرحمن الرحيم'));
console.log();

console.log('Arabic:', 'الحمد لله');
console.log('Transliteration:', transliterate('الحمد لله'));
console.log();

// Names
console.log('Arabic Name:', 'محمد');
console.log('Transliterated Name:', transliterateName('محمد'));
console.log();

console.log('Arabic Name:', 'فاطمة');
console.log('Transliterated Name:', transliterateName('فاطمة'));
console.log();

// Different romanization systems
console.log('=== Romanization System Comparison ===');
const testWord = 'محمد';
console.log();
console.log(`Comparing different systems for: ${testWord}`);
const comparison = compareTransliterations(testWord);
Object.entries(comparison).forEach(([system, result]) => {
  console.log(`${system.toUpperCase()}:`, result);
});
console.log();

// Batch transliteration
console.log('=== Batch Transliteration ===');
const arabicWords = [
  'مرحبا',
  'شكرا', 
  'من فضلك',
  'عذرا',
  'نعم',
  'لا',
  'صباح الخير',
  'مساء الخير'
];

console.log('Arabic words:', arabicWords.join(', '));
const transliteratedWords = transliterateBatch(arabicWords);
console.log('Transliterated:', transliteratedWords.join(', '));
console.log();

// Text with diacritics
console.log('=== Diacritic Handling ===');
const textWithDiacritics = 'مَرْحَبًا بِالْعَالَمِ';
console.log('Original with diacritics:', textWithDiacritics);
console.log('Without diacritics:', stripDiacritics(textWithDiacritics));
console.log('Transliteration (with diacritics):', transliterate(textWithDiacritics, { removeDiacritics: false }));
console.log('Transliteration (without diacritics):', transliterate(textWithDiacritics, { removeDiacritics: true }));
console.log();

// Custom transliterator with specific options
console.log('=== Custom Transliterator Settings ===');
const customTransliterator = createTransliterator({
  system: 'simplified',
  lowercase: false,
  removeDiacritics: true,
  handleArabicFeatures: true
});

const arabicSentence = 'أهلا وسهلا في المكتبة العربية';
console.log('Arabic:', arabicSentence);
console.log('Default transliteration:', transliterate(arabicSentence));
console.log('Custom transliteration:', customTransliterator.transliterate(arabicSentence));
console.log();

// Text analysis
console.log('=== Text Analysis ===');
const analysisText = 'هذا نص تجريبي للتحليل والترجمة الصوتية';
console.log('Arabic text:', analysisText);
const analysis = analyze(analysisText);
console.log('Analysis results:');
console.log('- Total characters:', analysis.totalCharacters);
console.log('- Arabic characters:', analysis.arabicCharacters);
console.log('- Coverage:', Math.round(analysis.coverage * 100) + '%');
console.log('- System:', analysis.system);
console.log('- Is Arabic:', analysis.isArabic);
console.log('- Text direction:', analysis.textDirection);
console.log('- Reading difficulty:', analysis.difficulty.level);
console.log('- Transliteration:', analysis.transliteration);
console.log();

// Processing mixed text
console.log('=== Mixed Script Processing ===');
const mixedText = 'Hello مرحبا World العالم!';
console.log('Mixed text:', mixedText);
const mixedAnalysis = analyze(mixedText);
console.log('Mixed script analysis:');
console.log('- Is mixed:', mixedAnalysis.mixedScript.isMixed);
console.log('- Arabic ratio:', Math.round(mixedAnalysis.mixedScript.arabicRatio * 100) + '%');
console.log('- Latin ratio:', Math.round(mixedAnalysis.mixedScript.latinRatio * 100) + '%');
console.log('- Transliteration:', transliterate(mixedText));
console.log();

// Countries and places
console.log('=== Geographic Names ===');
const places = [
  'مصر',
  'المملكة العربية السعودية',
  'الإمارات العربية المتحدة',
  'بيروت',
  'القاهرة',
  'دمشق',
  'بغداد'
];

console.log('Arabic place names:');
places.forEach(place => {
  console.log(`${place} → ${transliterate(place)}`);
});
console.log();

// Numbers and dates
console.log('=== Numbers and Dates ===');
const numberText = 'العدد ١٢٣ في التاريخ ٢٠٢٤';
console.log('Arabic with numerals:', numberText);
console.log('Transliteration:', transliterate(numberText));
console.log();

// Religious and cultural terms
console.log('=== Religious and Cultural Terms ===');
const religiousTerms = [
  'الله',
  'إسلام',
  'قرآن',
  'صلاة',
  'زكاة',
  'حج',
  'رمضان',
  'عيد'
];

console.log('Religious terms:');
religiousTerms.forEach(term => {
  console.log(`${term} → ${transliterate(term)}`);
});
console.log();

// Complex processing
console.log('=== Advanced Text Processing ===');
const complexText = 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ * الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ';
console.log('Complex Arabic text:', complexText);

const processedResult = processArabicText(complexText, {
  normalize: true,
  removeDiacritics: true
});

console.log('Processing results:');
console.log('- Cleaned text:', processedResult.cleaned);
console.log('- Transliteration:', processedResult.transliteration);
console.log('- Reading difficulty:', processedResult.analysis.difficulty.level);
console.log('- Suggested system:', processedResult.suggestions.system);
console.log();

// Family terms
console.log('=== Family Terms ===');
const familyTerms = [
  'أب',
  'أم', 
  'ابن',
  'بنت',
  'أخ',
  'أخت',
  'جد',
  'جدة'
];

console.log('Family terms:');
familyTerms.forEach(term => {
  console.log(`${term} → ${transliterate(term)}`);
});
console.log();

// Days of the week
console.log('=== Days of the Week ===');
const days = [
  'الأحد',
  'الاثنين', 
  'الثلاثاء',
  'الأربعاء',
  'الخميس',
  'الجمعة',
  'السبت'
];

console.log('Days of the week:');
days.forEach(day => {
  console.log(`${day} → ${transliterate(day)}`);
});
console.log();

// Text cleaning example
console.log('=== Text Cleaning ===');
const messyText = '  مرحبا   ،،، بالعالم   !!!   ';
console.log('Messy text:', `"${messyText}"`);
console.log('Cleaned text:', `"${cleanText(messyText)}"`);
console.log('Transliteration:', transliterate(cleanText(messyText)));
console.log();

console.log('=== Usage Examples Complete ===');
console.log('For more advanced usage, see the test.js file or README.md');