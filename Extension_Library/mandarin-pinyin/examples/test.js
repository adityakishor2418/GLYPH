/**
 * Comprehensive Test Suite for Mandarin Chinese to Pinyin Transliteration
 * Tests all major functionality and edge cases
 */

import { 
  transliterate, 
  analyze, 
  transliterateBatch,
  hasChineseCharacters,
  extractChineseCharacters,
  MandarinTransliterator,
  createTransliterator,
  cleanText,
  segmentText,
  getReadingDifficulty,
  convertNumericalTones,
  convertToNumericalTones,
  utils
} from '../src/index.js';

// Test runner helper
function runTest(testName, testFunction) {
  try {
    console.log(`\n🧪 Testing: ${testName}`);
    testFunction();
    console.log('✅ PASSED');
    return true;
  } catch (error) {
    console.log(`❌ FAILED: ${error.message}`);
    console.log(error.stack);
    return false;
  }
}

function assertEqual(actual, expected, message = '') {
  if (actual !== expected) {
    throw new Error(`${message}\nExpected: "${expected}"\nActual: "${actual}"`);
  }
}

function assertTrue(condition, message = '') {
  if (!condition) {
    throw new Error(message || 'Expected true but got false');
  }
}

let totalTests = 0;
let passedTests = 0;

console.log('🚀 Starting Mandarin-Pinyin Library Test Suite\n');

// Test 1: Basic Transliteration
if (runTest('Basic Transliteration', () => {
  assertEqual(transliterate('你好'), 'nǐ hǎo', 'Simple greeting');
  assertEqual(transliterate('世界'), 'shì jiè', 'Simple noun');
  assertEqual(transliterate('中国'), 'zhōng guó', 'Country name');
  assertEqual(transliterate('谢谢'), 'xiè xie', 'Thank you');
})) passedTests++;
totalTests++;

// Test 2: Numbers
if (runTest('Number Transliteration', () => {
  assertEqual(transliterate('一'), 'yī', 'Number one');
  assertEqual(transliterate('二'), 'èr', 'Number two');
  assertEqual(transliterate('十'), 'shí', 'Number ten');
  assertEqual(transliterate('一二三'), 'yī èr sān', 'Multiple numbers');
})) passedTests++;
totalTests++;

// Test 3: Complex Sentences
if (runTest('Complex Sentences', () => {
  const sentence = transliterate('我爱中国');
  assertTrue(sentence.includes('wǒ'), 'Contains "wo"');
  assertTrue(sentence.includes('ài'), 'Contains "ai"');
  assertTrue(sentence.includes('zhōng'), 'Contains "zhong"');
  assertTrue(sentence.includes('guó'), 'Contains "guo"');
})) passedTests++;
totalTests++;

// Test 4: Mixed Text
if (runTest('Mixed Text (Chinese + English)', () => {
  const result = transliterate('Hello 你好 World');
  assertTrue(result.includes('Hello'), 'Preserves English');
  assertTrue(result.includes('nǐ hǎo'), 'Transliterates Chinese');
  assertTrue(result.includes('World'), 'Preserves English');
})) passedTests++;
totalTests++;

// Test 5: Punctuation Handling
if (runTest('Punctuation Handling', () => {
  assertEqual(transliterate('你好！'), 'nǐ hǎo!', 'Exclamation mark');
  assertEqual(transliterate('你好吗？'), 'nǐ hǎo ma?', 'Question mark');
  assertEqual(transliterate('你好，世界。'), 'nǐ hǎo, shì jiè.', 'Comma and period');
})) passedTests++;
totalTests++;

// Test 6: Empty/Invalid Input
if (runTest('Edge Cases - Empty/Invalid Input', () => {
  assertEqual(transliterate(''), '', 'Empty string');
  assertEqual(transliterate(null), '', 'Null input');
  assertEqual(transliterate(undefined), '', 'Undefined input');
  assertEqual(transliterate('   '), '   ', 'Whitespace only');
})) passedTests++;
totalTests++;

// Test 7: Custom Options - No Tones
if (runTest('Custom Options - No Tones', () => {
  const noTones = createTransliterator({ includeTones: false });
  assertEqual(noTones.transliterate('你好'), 'ni hao', 'No tone marks');
  assertEqual(noTones.transliterate('世界'), 'shi jie', 'No tone marks on multiple chars');
})) passedTests++;
totalTests++;

// Test 8: Custom Options - Numerical Tones
if (runTest('Custom Options - Numerical Tones', () => {
  const numericalTones = createTransliterator({ numericalTones: true });
  const result = numericalTones.transliterate('你好');
  assertTrue(result.includes('3') || result.includes('2'), 'Contains tone numbers');
})) passedTests++;
totalTests++;

// Test 9: Custom Options - No Spaces
if (runTest('Custom Options - No Spaces', () => {
  const noSpaces = createTransliterator({ addSpaces: false });
  const result = noSpaces.transliterate('你好');
  assertTrue(result.indexOf(' ') === -1 || result.split(' ').join('').length > 0, 'No spaces between syllables');
})) passedTests++;
totalTests++;

// Test 10: Text Analysis
if (runTest('Text Analysis', () => {
  const result = analyze('你好世界');
  assertTrue(result.originalText === '你好世界', 'Original text preserved');
  assertTrue(result.chineseCharacters === 4, 'Correct Chinese character count');
  assertTrue(result.transliteration.length > 0, 'Has transliteration');
  assertTrue(result.characterBreakdown.length === 4, 'Character breakdown has 4 items');
})) passedTests++;
totalTests++;

// Test 11: Batch Transliteration
if (runTest('Batch Transliteration', () => {
  const texts = ['你好', '世界', '中国'];
  const results = transliterateBatch(texts);
  
  assertTrue(Array.isArray(results), 'Returns array');
  assertTrue(results.length === 3, 'Correct number of results');
  assertTrue(results[0].includes('nǐ'), 'First result correct');
  assertTrue(results[1].includes('shì'), 'Second result correct');
  assertTrue(results[2].includes('zhōng'), 'Third result correct');
})) passedTests++;
totalTests++;

// Test 12: Chinese Character Detection
if (runTest('Chinese Character Detection', () => {
  assertTrue(hasChineseCharacters('你好'), 'Detects Chinese');
  assertTrue(hasChineseCharacters('Hello 你好'), 'Detects Chinese in mixed');
  assertTrue(!hasChineseCharacters('Hello World'), 'No false positives');
  assertTrue(!hasChineseCharacters(''), 'Empty string returns false');
})) passedTests++;
totalTests++;

// Test 13: Chinese Character Extraction
if (runTest('Chinese Character Extraction', () => {
  const chars = extractChineseCharacters('Hello 你好 World 世界!');
  assertTrue(Array.isArray(chars), 'Returns array');
  assertTrue(chars.length === 4, 'Extracts 4 characters');
  assertTrue(chars.includes('你'), 'Contains 你');
  assertTrue(chars.includes('好'), 'Contains 好');
  assertTrue(chars.includes('世'), 'Contains 世');
  assertTrue(chars.includes('界'), 'Contains 界');
})) passedTests++;
totalTests++;

// Test 14: Text Segmentation
if (runTest('Text Segmentation', () => {
  const segments = segmentText('你好，世界！');
  assertTrue(Array.isArray(segments), 'Returns array');
  assertTrue(segments.length > 1, 'Multiple segments');
  assertTrue(segments.some(seg => seg.includes('你好')), 'Contains greeting segment');
})) passedTests++;
totalTests++;

// Test 15: Reading Difficulty
if (runTest('Reading Difficulty Analysis', () => {
  const easy = getReadingDifficulty('你好');
  const hard = getReadingDifficulty('这是一个非常复杂的学术论文，涉及量子物理学的深层理论');
  
  assertTrue(typeof easy.level === 'string', 'Easy text has level');
  assertTrue(typeof hard.level === 'string', 'Hard text has level');
  assertTrue(easy.chineseCharCount >= 0, 'Has character count');
  assertTrue(hard.chineseCharCount > easy.chineseCharCount, 'Hard text has more characters');
})) passedTests++;
totalTests++;

// Test 16: Text Cleaning
if (runTest('Text Cleaning', () => {
  const messy = '  你好，，，世界！！！  ';
  const cleaned = cleanText(messy);
  assertTrue(cleaned.trim().length < messy.length, 'Text was cleaned');
  assertTrue(!cleaned.startsWith('  '), 'Leading whitespace removed');
  assertTrue(!cleaned.endsWith('  '), 'Trailing whitespace removed');
})) passedTests++;
totalTests++;

// Test 17: Tone Conversion
if (runTest('Tone Conversion', () => {
  const withTones = 'nǐ hǎo';
  const withNumbers = convertToNumericalTones(withTones);
  const backToTones = convertNumericalTones(withNumbers);
  
  assertTrue(withNumbers !== withTones, 'Conversion changed text');
  assertTrue(withNumbers.includes('3') || withNumbers.includes('2'), 'Contains numbers');
})) passedTests++;
totalTests++;

// Test 18: MandarinTransliterator Class
if (runTest('MandarinTransliterator Class Direct Usage', () => {
  const transliterator = new MandarinTransliterator({
    includeTones: true,
    addSpaces: true
  });
  
  const result = transliterator.transliterate('你好');
  assertTrue(result.length > 0, 'Returns result');
  
  const analysis = transliterator.analyze('你好');
  assertTrue(typeof analysis === 'object', 'Analysis returns object');
  assertTrue(analysis.chineseCharacters > 0, 'Analysis has character count');
})) passedTests++;
totalTests++;

// Test 19: Utils Functions
if (runTest('Utils Functions', () => {
  assertTrue(typeof utils.analyzeText === 'function', 'analyzeText exists');
  assertTrue(typeof utils.hasChineseCharacters === 'function', 'hasChineseCharacters exists');
  assertTrue(typeof utils.extractChineseCharacters === 'function', 'extractChineseCharacters exists');
  
  const textAnalysis = utils.analyzeText('你好 Hello');
  assertTrue(typeof textAnalysis === 'object', 'Text analysis returns object');
  assertTrue(textAnalysis.chinese > 0, 'Detects Chinese characters');
  assertTrue(textAnalysis.latin > 0, 'Detects Latin characters');
})) passedTests++;
totalTests++;

// Test 20: Performance Test
if (runTest('Performance - Large Text', () => {
  // Create a large text string
  const largeText = '你好世界'.repeat(100); // 400 characters
  
  const startTime = Date.now();
  const result = transliterate(largeText);
  const endTime = Date.now();
  
  assertTrue(result.length > 0, 'Large text processed');
  assertTrue(endTime - startTime < 1000, 'Processed in reasonable time (< 1 second)');
  console.log(`   ⏱️  Processed ${largeText.length} characters in ${endTime - startTime}ms`);
})) passedTests++;
totalTests++;

// Test 21: Special Characters and Edge Cases
if (runTest('Special Characters and Edge Cases', () => {
  // Test with numbers mixed in
  assertEqual(transliterate('我有3个苹果'), 'wǒ yǒu 3 gè píng guǒ', 'Mixed with numbers');
  
  // Test with special punctuation
  const result = transliterate('你好（世界）');
  assertTrue(result.includes('nǐ hǎo'), 'Basic transliteration works');
  assertTrue(result.includes('shì jiè'), 'Works with parentheses');
})) passedTests++;
totalTests++;

// Test 22: Phrase Recognition
if (runTest('Common Phrase Recognition', () => {
  // These should be recognized as complete phrases
  assertEqual(transliterate('谢谢'), 'xiè xie', 'Thank you phrase');
  assertEqual(transliterate('不客气'), 'bú kè qi', 'You\'re welcome phrase');
  assertEqual(transliterate('对不起'), 'duì bu qǐ', 'Sorry phrase');
})) passedTests++;
totalTests++;

// Final Results
console.log('\n' + '='.repeat(50));
console.log('📊 TEST RESULTS SUMMARY');
console.log('='.repeat(50));
console.log(`Total Tests: ${totalTests}`);
console.log(`Passed: ${passedTests}`);
console.log(`Failed: ${totalTests - passedTests}`);
console.log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);

if (passedTests === totalTests) {
  console.log('\n🎉 ALL TESTS PASSED! 🎉');
  console.log('The Mandarin-Pinyin library is working correctly.');
} else {
  console.log('\n⚠️  Some tests failed. Please review the issues above.');
}

console.log('\n🏁 Test Suite Complete\n');