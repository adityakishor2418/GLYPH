/**
 * Basic Usage Examples for Russian Cyrillic to Latin Transliteration
 * Demonstrates various features of the russian-transliteration library
 */

// Import the library
import russianTranslit from '../src/index.js';
import { 
  RussianTransliterator, 
  transliterate, 
  analyze,
  transliterateWith,
  getAvailableSystems,
  compareTransliterations
} from '../src/index.js';

console.log('🇷🇺 Russian Transliteration Library Examples\n');

// Example 1: Basic transliteration
console.log('=== Basic Transliteration ===');
console.log(transliterate('Привет'));          // privet
console.log(transliterate('мир'));             // mir
console.log(transliterate('Россия'));          // rossiya
console.log(transliterate('спасибо'));         // spasibo
console.log(transliterate('до свидания'));     // do svidaniya

// Example 2: Complex sentences
console.log('\n=== Complex Sentences ===');
console.log(transliterate('Я изучаю русский язык'));           // ya izuchayu russkij yazyk
console.log(transliterate('Москва - столица России'));         // moskva - stolitsa rossii
console.log(transliterate('Как дела? Всё хорошо!'));          // kak dela? vsyo khorosho!
console.log(transliterate('Добро пожаловать в Санкт-Петербург')); // dobro pozhalovat' v sankt-peterburg

// Example 3: Different romanization systems
console.log('\n=== Different Romanization Systems ===');
const testText = 'Хорошо';

console.log('Available systems:');
getAvailableSystems().forEach(sys => {
  console.log(`- ${sys.id}: ${sys.name}`);
});

console.log('\nSame text in different systems:');
console.log('GOST:      ', transliterateWith(testText, 'gost'));       // khorosho
console.log('BGN:       ', transliterateWith(testText, 'bgn'));        // khorosho
console.log('Scientific:', transliterateWith(testText, 'scientific'));  // khorosho
console.log('Simplified:', transliterateWith(testText, 'simplified'));  // horosho

// Example 4: System comparison
console.log('\n=== System Comparison ===');
const comparison = compareTransliterations('Щёлково');
console.log('Text: Щёлково');
Object.entries(comparison).forEach(([system, result]) => {
  console.log(`${system.padEnd(10)}: ${result}`);
});

// Example 5: Custom transliterator options
console.log('\n=== Custom Options ===');

// Preserve case
const preserveCase = new RussianTransliterator({ preserveCase: true });
console.log('Preserve case:', preserveCase.transliterate('МОСКВА Привет'));

// Show untranslated
const showUntrans = new RussianTransliterator({ showUntranslated: true });
console.log('Show untranslated:', showUntrans.transliterate('Привет XYZ мир'));

// Character-first (no word matching)
const charFirst = new RussianTransliterator({ wordFirst: false });
console.log('Character-first:', charFirst.transliterate('спасибо'));

// Simplified system
const simplified = new RussianTransliterator({ system: 'simplified' });
console.log('Simplified system:', simplified.transliterate('Хорошо'));

// Example 6: Text analysis
console.log('\n=== Text Analysis ===');
const analysis = analyze('Привет, меня зовут Владимир. Я изучаю программирование.');
console.log('Original text:', analysis.originalText);
console.log('Transliteration:', analysis.transliteration);
console.log('Total characters:', analysis.totalCharacters);
console.log('Cyrillic characters:', analysis.cyrillicCharacters);
console.log('Coverage:', (analysis.coverage * 100).toFixed(1) + '%');
console.log('System used:', analysis.system);
console.log('Is Russian:', analysis.isRussian);
console.log('Difficulty level:', analysis.difficulty.level);
console.log('Average word length:', analysis.difficulty.avgWordLength);

// Character breakdown
console.log('\nCharacter breakdown (first 10):');
analysis.characterBreakdown.slice(0, 10).forEach(char => {
  console.log(`${char.character} -> ${char.romanized} ${char.found ? '✓' : '✗'}`);
});

// Example 7: Batch transliteration
console.log('\n=== Batch Transliteration ===');
const russianTexts = [
  'Доброе утро',
  'Добрый день', 
  'Добрый вечер',
  'Спокойной ночи',
  'Увидимся завтра'
];

const results = russianTranslit.transliterateBatch(russianTexts);
results.forEach((result, index) => {
  console.log(`${russianTexts[index]} -> ${result}`);
});

// Example 8: Utility functions
console.log('\n=== Utility Functions ===');

// Check for Cyrillic characters
console.log('Has Cyrillic:', russianTranslit.hasCyrillicCharacters('Hello Привет World')); // true
console.log('Has Cyrillic:', russianTranslit.hasCyrillicCharacters('Hello World')); // false

// Extract Cyrillic characters
const mixed = 'Hello Привет World мир!';
const cyrillicChars = russianTranslit.extractCyrillicCharacters(mixed);
console.log('Cyrillic chars:', cyrillicChars); // ['П', 'р', 'и', 'в', 'е', 'т', 'м', 'и', 'р']

// Text segmentation
const segments = russianTranslit.segmentText('Привет, как дела?');
console.log('Segments:', segments); // ['Привет', ',', 'как', 'дела', '?']

// Reading difficulty
const difficulty = russianTranslit.getReadingDifficulty('Это сложный научный текст про квантовую механику и теоретическую физику.');
console.log('Difficulty:', difficulty.level, 'Score:', difficulty.score);
console.log('Words:', difficulty.wordCount, 'Avg length:', difficulty.avgWordLength);

// Mixed script detection
const mixedScript = russianTranslit.detectMixedScript('Hello Привет мир world');
console.log('Mixed script:', mixedScript.isMixed);
console.log('Cyrillic ratio:', mixedScript.cyrillicRatio);
console.log('Latin ratio:', mixedScript.latinRatio);

// Example 9: Name transliteration
console.log('\n=== Name Transliteration ===');
const russianNames = ['Владимир', 'Екатерина', 'Александр', 'Наталья', 'Дмитрий'];

russianNames.forEach(name => {
  const transliterated = russianTranslit.transliterateName(name);
  console.log(`${name} -> ${transliterated}`);
});

// Example 10: Text cleaning
console.log('\n=== Text Cleaning ===');
const messyText = '  Привет,,,   мир!!!   ';
const cleaned = russianTranslit.cleanText(messyText, {
  removeExtraSpaces: true,
  normalizeQuotes: true,
  normalizeDashes: true
});
console.log('Original:', `"${messyText}"`);
console.log('Cleaned:', `"${cleaned}"`);

// Example 11: Word extraction
console.log('\n=== Russian Word Extraction ===');
const mixedText = 'I love изучение русского языка and programming код';
const russianWords = russianTranslit.extractRussianWords(mixedText);
console.log('Russian words found:', russianWords);

// Example 12: Syllable counting
console.log('\n=== Syllable Counting ===');
const words = ['привет', 'программирование', 'да', 'хорошо', 'университет'];
words.forEach(word => {
  const syllables = russianTranslit.countSyllables(word);
  console.log(`${word}: ${syllables} syllable${syllables !== 1 ? 's' : ''}`);
});

// Example 13: Name detection
console.log('\n=== Name Detection ===');
const testWords = ['Москва', 'привет', 'Владимир', 'хорошо', 'Петров'];
testWords.forEach(word => {
  const isName = russianTranslit.isLikelyRussianName(word);
  console.log(`${word}: ${isName ? 'likely name' : 'not a name'}`);
});

// Example 14: Punctuation normalization
console.log('\n=== Punctuation Normalization ===');
const russianPunct = 'Он сказал: «Привет!» — и ушёл...';
const normalized = russianTranslit.normalizePunctuation(russianPunct);
console.log('Original:', russianPunct);
console.log('Normalized:', normalized);

// Example 15: Reverse transliteration (experimental)
console.log('\n=== Reverse Transliteration (Experimental) ===');
const latinText = 'privet mir kak dela';
const reversed = russianTranslit.reverseTransliterate(latinText);
console.log('Latin:', latinText);
console.log('Reversed:', reversed);

// Example 16: Library information
console.log('\n=== Library Information ===');
const info = russianTranslit.getTransliteratorInfo();
console.log('Characters available:', info.totalCharacters);
console.log('Words available:', info.totalWords);
console.log('Current system:', info.currentSystem);
console.log('Available systems:', info.availableSystems);
console.log('Version:', info.version);
console.log('Features:', info.supportedFeatures.join(', '));

// Example 17: Advanced transliterator usage
console.log('\n=== Advanced Transliterator Usage ===');
const advanced = new RussianTransliterator({
  system: 'scientific',
  preserveCase: true,
  handleCombinations: true,
  wordFirst: true,
  showUntranslated: true
});

console.log('Advanced result:', advanced.transliterate('Большое Спасибо!'));

// Get stats
const stats = advanced.getStats();
console.log('Advanced stats:', {
  system: stats.currentSystem,
  features: stats.supportedFeatures.length
});

// Switch system
advanced.setSystem('simplified');
console.log('After switching to simplified:', advanced.transliterate('Большое Спасибо!'));

// Example 18: Error handling
console.log('\n=== Error Handling ===');
try {
  console.log('Empty string:', `"${transliterate('')}"`);
  console.log('Null input:', `"${transliterate(null)}"`);
  console.log('Number input:', `"${transliterate(123)}"`);
} catch (error) {
  console.log('Error caught:', error.message);
}

// Example 19: Performance test
console.log('\n=== Performance Test ===');
const largeText = 'Привет мир как дела '.repeat(50); // 1000 characters

console.log(`Testing with ${largeText.length} characters...`);
const startTime = Date.now();
const perfResult = transliterate(largeText);
const endTime = Date.now();

console.log(`Processed in ${endTime - startTime}ms`);
console.log(`Result length: ${perfResult.length} characters`);
console.log(`Speed: ${Math.round(largeText.length / (endTime - startTime) * 1000)} chars/second`);

console.log('\n=== All Examples Complete ===');
console.log('🎉 Russian transliteration library is working correctly!');