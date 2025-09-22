/**
 * Basic Usage Examples for Mandarin Chinese to Pinyin Transliteration
 * Demonstrates various features of the mandarin-pinyin library
 */

// Import the library
import mandarinPinyin from '../src/index.js';
import { MandarinTransliterator, transliterate, analyze } from '../src/index.js';

// Example 1: Basic transliteration
console.log('=== Basic Transliteration ===');
console.log(transliterate('你好'));           // nǐ hǎo
console.log(transliterate('世界'));           // shì jiè
console.log(transliterate('中国'));           // zhōng guó
console.log(transliterate('谢谢'));           // xiè xie
console.log(transliterate('再见'));           // zài jiàn

// Example 2: Complex sentences
console.log('\n=== Complex Sentences ===');
console.log(transliterate('我爱中国'));        // wǒ ài zhōng guó
console.log(transliterate('今天天气很好'));     // jīn tiān tiān qì hěn hǎo
console.log(transliterate('我想吃中国菜'));     // wǒ xiǎng chī zhōng guó cài
console.log(transliterate('你去哪里？'));       // nǐ qù nǎ lǐ?

// Example 3: Different options
console.log('\n=== Different Options ===');

// Without tone marks
const noTones = new MandarinTransliterator({ includeTones: false });
console.log('No tones:', noTones.transliterate('你好世界')); // ni hao shi jie

// Numerical tones
const numericalTones = new MandarinTransliterator({ numericalTones: true });
console.log('Numerical:', numericalTones.transliterate('你好世界')); // ni3 hao3 shi4 jie4

// Uppercase
const uppercase = new MandarinTransliterator({ lowercase: false });
console.log('Uppercase:', uppercase.transliterate('你好世界')); // Nǐ Hǎo Shì Jiè

// No spaces between syllables
const noSpaces = new MandarinTransliterator({ addSpaces: false });
console.log('No spaces:', noSpaces.transliterate('你好世界')); // nǐhǎoshìjiè

// Example 4: Text analysis
console.log('\n=== Text Analysis ===');
const analysis = analyze('你好，我叫小明。今年二十岁。');
console.log('Original text:', analysis.originalText);
console.log('Transliteration:', analysis.transliteration);
console.log('Total characters:', analysis.totalCharacters);
console.log('Chinese characters:', analysis.chineseCharacters);
console.log('Coverage:', (analysis.coverage * 100).toFixed(1) + '%');
console.log('Difficulty level:', analysis.difficulty.level);

// Character breakdown
console.log('\nCharacter breakdown:');
analysis.characterBreakdown.forEach(char => {
  console.log(`${char.character} -> ${char.pinyin} ${char.found ? '✓' : '✗'}`);
});

// Example 5: Batch transliteration
console.log('\n=== Batch Transliteration ===');
const chineseTexts = [
  '早上好',
  '晚上好', 
  '吃饭了吗？',
  '工作怎么样？',
  '周末愉快'
];

const results = mandarinPinyin.transliterateBatch(chineseTexts);
results.forEach((result, index) => {
  console.log(`${chineseTexts[index]} -> ${result}`);
});

// Example 6: Utility functions
console.log('\n=== Utility Functions ===');

// Check for Chinese characters
console.log('Has Chinese:', mandarinPinyin.hasChineseCharacters('Hello 你好 World')); // true
console.log('Has Chinese:', mandarinPinyin.hasChineseCharacters('Hello World')); // false

// Extract Chinese characters
const mixed = 'Hello 你好 World 世界！';
const chineseChars = mandarinPinyin.extractChineseCharacters(mixed);
console.log('Chinese chars:', chineseChars); // ['你', '好', '世', '界']

// Text segmentation
const segments = mandarinPinyin.segmentText('我爱学习中文，你呢？');
console.log('Segments:', segments); // ['我爱学习中文', '，', '你呢', '？']

// Reading difficulty
const difficulty = mandarinPinyin.getReadingDifficulty('这是一个非常复杂的句子，包含很多高级词汇。');
console.log('Difficulty:', difficulty.level, 'Score:', difficulty.score);

// Example 7: Custom transliterator with specific settings
console.log('\n=== Custom Transliterator ===');
const customTransliterator = mandarinPinyin.createTransliterator({
  numericalTones: true,
  addSpaces: false,
  lowercase: true,
  showUntranslated: true
});

console.log('Custom result:', customTransliterator.transliterate('你好世界！未知字符'));

// Example 8: Tone conversion
console.log('\n=== Tone Conversion ===');
const withTones = 'nǐ hǎo shì jiè';
const withNumbers = mandarinPinyin.convertToNumericalTones(withTones);
console.log('Tones to numbers:', withNumbers); // ni3 hao3 shi4 jie4

const backToTones = mandarinPinyin.convertNumericalTones(withNumbers);
console.log('Numbers to tones:', backToTones); // nǐ hǎo shì jiè

// Example 9: Text cleaning
console.log('\n=== Text Cleaning ===');
const messyText = '  你好，，，世界！！！   ';
const cleaned = mandarinPinyin.cleanText(messyText, {
  removeExtraSpaces: true,
  normalizeQuotes: true
});
console.log('Cleaned:', `"${cleaned}"`); // "你好，世界！"

// Example 10: Library information
console.log('\n=== Library Information ===');
const info = mandarinPinyin.getTransliteratorInfo();
console.log('Characters available:', info.totalCharacters);
console.log('Phrases available:', info.totalPhrases);
console.log('Version:', info.version);
console.log('Features:', info.supportedFeatures.join(', '));

console.log('\n=== All Examples Complete ===');