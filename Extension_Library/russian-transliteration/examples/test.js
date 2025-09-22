/**
 * Comprehensive Test Suite for Russian Cyrillic to Latin Transliteration
 * Tests all major functionality and edge cases
 */

import { 
  transliterate, 
  analyze, 
  transliterateBatch,
  hasCyrillicCharacters,
  extractCyrillicCharacters,
  RussianTransliterator,
  createTransliterator,
  cleanText,
  segmentText,
  getReadingDifficulty,
  detectMixedScript,
  extractRussianWords,
  transliterateWith,
  getAvailableSystems,
  compareTransliterations,
  transliterateName,
  countSyllables,
  isLikelyRussianName,
  reverseTransliterate,
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

function assertContains(text, substring, message = '') {
  if (!text.includes(substring)) {
    throw new Error(message || `Expected "${text}" to contain "${substring}"`);
  }
}

let totalTests = 0;
let passedTests = 0;

console.log('🚀 Starting Russian Transliteration Library Test Suite\n');

// Test 1: Basic Character Transliteration
if (runTest('Basic Character Transliteration', () => {
  assertEqual(transliterate('а'), 'a', 'Lowercase a');
  assertEqual(transliterate('А'), 'a', 'Uppercase A'); // default lowercase
  assertEqual(transliterate('ж'), 'zh', 'Letter zh');
  assertEqual(transliterate('щ'), 'shch', 'Letter shch');
  assertEqual(transliterate('ь'), "'", 'Soft sign');
  assertEqual(transliterate('ъ'), '"', 'Hard sign');
})) passedTests++;
totalTests++;

// Test 2: Basic Words
if (runTest('Basic Word Transliteration', () => {
  assertEqual(transliterate('привет'), 'privet', 'Hello');
  assertEqual(transliterate('мир'), 'mir', 'World/peace');
  assertEqual(transliterate('спасибо'), 'spasibo', 'Thank you');
  assertEqual(transliterate('да'), 'da', 'Yes');
  assertEqual(transliterate('нет'), 'net', 'No');
})) passedTests++;
totalTests++;

// Test 3: Complex Sentences
if (runTest('Complex Sentences', () => {
  const sentence = transliterate('Я изучаю русский язык');
  assertContains(sentence, 'ya', 'Contains "ya"');
  assertContains(sentence, 'izuchayu', 'Contains "izuchayu"');
  assertContains(sentence, 'russkij', 'Contains "russkij"');
  assertContains(sentence, 'yazyk', 'Contains "yazyk"');
})) passedTests++;
totalTests++;

// Test 4: Mixed Text (Cyrillic + Latin)
if (runTest('Mixed Text (Cyrillic + Latin)', () => {
  const result = transliterate('Hello привет World');
  assertContains(result, 'Hello', 'Preserves Latin');
  assertContains(result, 'privet', 'Transliterates Cyrillic');
  assertContains(result, 'World', 'Preserves Latin at end');
})) passedTests++;
totalTests++;

// Test 5: Punctuation Handling
if (runTest('Punctuation Handling', () => {
  assertEqual(transliterate('привет!'), 'privet!', 'Exclamation mark');
  assertEqual(transliterate('как дела?'), 'kak dela?', 'Question mark');
  assertEqual(transliterate('привет, мир.'), 'privet, mir.', 'Comma and period');
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

// Test 7: Different Romanization Systems
if (runTest('Different Romanization Systems', () => {
  const testWord = 'хорошо';
  const gost = transliterateWith(testWord, 'gost');
  const bgn = transliterateWith(testWord, 'bgn');
  const simplified = transliterateWith(testWord, 'simplified');
  const scientific = transliterateWith(testWord, 'scientific');
  
  assertTrue(gost.length > 0, 'GOST produces output');
  assertTrue(bgn.length > 0, 'BGN produces output');
  assertTrue(simplified.length > 0, 'Simplified produces output');
  assertTrue(scientific.length > 0, 'Scientific produces output');
  
  // Simplified should not have 'kh' combination
  assertTrue(simplified.includes('h') && !simplified.includes('kh'), 'Simplified uses h instead of kh');
})) passedTests++;
totalTests++;

// Test 8: Custom Transliterator Options
if (runTest('Custom Transliterator Options', () => {
  // Preserve case
  const preserveCase = createTransliterator({ preserveCase: true });
  const result = preserveCase.transliterate('ПРИВЕТ');
  assertTrue(result[0] === result[0].toUpperCase(), 'Preserves uppercase');
  
  // Show untranslated
  const showUntrans = createTransliterator({ showUntranslated: true });
  const untransResult = showUntrans.transliterate('привет XYZ');
  assertContains(untransResult, '[XYZ]', 'Shows untranslated in brackets');
})) passedTests++;
totalTests++;

// Test 9: System Comparison
if (runTest('System Comparison', () => {
  const comparison = compareTransliterations('привет');
  assertTrue(typeof comparison === 'object', 'Returns object');
  assertTrue(comparison.gost !== undefined, 'Has GOST result');
  assertTrue(comparison.simplified !== undefined, 'Has simplified result');
  assertTrue(comparison.scientific !== undefined, 'Has scientific result');
  assertTrue(comparison.bgn !== undefined, 'Has BGN result');
})) passedTests++;
totalTests++;

// Test 10: Text Analysis
if (runTest('Text Analysis', () => {
  const result = analyze('Привет мир');
  assertTrue(result.originalText === 'Привет мир', 'Original text preserved');
  assertTrue(result.cyrillicCharacters === 9, 'Correct Cyrillic character count');
  assertTrue(result.transliteration.length > 0, 'Has transliteration');
  assertTrue(result.characterBreakdown.length === 9, 'Character breakdown correct');
  assertTrue(result.system === 'gost', 'Default system is GOST');
  assertTrue(result.isRussian === true, 'Detects as Russian');
})) passedTests++;
totalTests++;

// Test 11: Batch Transliteration
if (runTest('Batch Transliteration', () => {
  const texts = ['привет', 'мир', 'спасибо'];
  const results = transliterateBatch(texts);
  
  assertTrue(Array.isArray(results), 'Returns array');
  assertTrue(results.length === 3, 'Correct number of results');
  assertEqual(results[0], 'privet', 'First result correct');
  assertEqual(results[1], 'mir', 'Second result correct');
  assertEqual(results[2], 'spasibo', 'Third result correct');
})) passedTests++;
totalTests++;

// Test 12: Cyrillic Character Detection
if (runTest('Cyrillic Character Detection', () => {
  assertTrue(hasCyrillicCharacters('привет'), 'Detects Cyrillic');
  assertTrue(hasCyrillicCharacters('Hello привет'), 'Detects Cyrillic in mixed');
  assertTrue(!hasCyrillicCharacters('Hello World'), 'No false positives');
  assertTrue(!hasCyrillicCharacters(''), 'Empty string returns false');
})) passedTests++;
totalTests++;

// Test 13: Cyrillic Character Extraction
if (runTest('Cyrillic Character Extraction', () => {
  const chars = extractCyrillicCharacters('Hello Привет World!');
  assertTrue(Array.isArray(chars), 'Returns array');
  assertTrue(chars.length === 6, 'Extracts 6 characters');
  assertTrue(chars.includes('П'), 'Contains П');
  assertTrue(chars.includes('р'), 'Contains р');
  assertTrue(chars.includes('и'), 'Contains и');
  assertTrue(chars.includes('в'), 'Contains в');
  assertTrue(chars.includes('е'), 'Contains е');
  assertTrue(chars.includes('т'), 'Contains т');
})) passedTests++;
totalTests++;

// Test 14: Text Segmentation
if (runTest('Text Segmentation', () => {
  const segments = segmentText('Привет, мир!');
  assertTrue(Array.isArray(segments), 'Returns array');
  assertTrue(segments.length > 1, 'Multiple segments');
  assertTrue(segments.includes('Привет'), 'Contains greeting segment');
  assertTrue(segments.includes(','), 'Contains comma');
  assertTrue(segments.includes('мир'), 'Contains word segment');
})) passedTests++;
totalTests++;

// Test 15: Reading Difficulty
if (runTest('Reading Difficulty Analysis', () => {
  const easy = getReadingDifficulty('да нет');
  const hard = getReadingDifficulty('Это чрезвычайно сложный академический текст про квантовую механику');
  
  assertTrue(typeof easy.level === 'string', 'Easy text has level');
  assertTrue(typeof hard.level === 'string', 'Hard text has level');
  assertTrue(easy.cyrillicCharCount >= 0, 'Has character count');
  assertTrue(hard.cyrillicCharCount > easy.cyrillicCharCount, 'Hard text has more characters');
  assertTrue(hard.wordCount > easy.wordCount, 'Hard text has more words');
})) passedTests++;
totalTests++;

// Test 16: Text Cleaning
if (runTest('Text Cleaning', () => {
  const messy = '  Привет,,,   мир!!!  ';
  const cleaned = cleanText(messy);
  assertTrue(cleaned.trim().length < messy.length, 'Text was cleaned');
  assertTrue(!cleaned.startsWith('  '), 'Leading whitespace removed');
  assertTrue(!cleaned.endsWith('  '), 'Trailing whitespace removed');
})) passedTests++;
totalTests++;

// Test 17: Mixed Script Detection
if (runTest('Mixed Script Detection', () => {
  const mixed = detectMixedScript('Hello Привет');
  const cyrillic = detectMixedScript('Привет мир');
  const latin = detectMixedScript('Hello World');
  
  assertTrue(mixed.isMixed === true, 'Detects mixed script');
  assertTrue(mixed.cyrillicRatio > 0, 'Has Cyrillic ratio');
  assertTrue(mixed.latinRatio > 0, 'Has Latin ratio');
  
  assertTrue(cyrillic.isMixed === false, 'Pure Cyrillic not mixed');
  assertTrue(latin.isMixed === false, 'Pure Latin not mixed');
})) passedTests++;
totalTests++;

// Test 18: Russian Word Extraction
if (runTest('Russian Word Extraction', () => {
  const words = extractRussianWords('Hello Привет мир world');
  assertTrue(Array.isArray(words), 'Returns array');
  assertTrue(words.length === 2, 'Extracts 2 Russian words');
  assertTrue(words.includes('Привет'), 'Contains Привет');
  assertTrue(words.includes('мир'), 'Contains мир');
})) passedTests++;
totalTests++;

// Test 19: Name Transliteration
if (runTest('Name Transliteration', () => {
  const name = transliterateName('Владимир');
  assertTrue(name.length > 0, 'Produces output');
  assertTrue(name[0] === name[0].toUpperCase(), 'Capitalizes first letter');
  assertContains(name.toLowerCase(), 'vladimir', 'Contains vladimir');
})) passedTests++;
totalTests++;

// Test 20: Syllable Counting
if (runTest('Syllable Counting', () => {
  assertTrue(countSyllables('да') === 1, 'Single syllable word');
  assertTrue(countSyllables('привет') === 2, 'Two syllable word');
  assertTrue(countSyllables('программирование') > 5, 'Long word has many syllables');
  assertTrue(countSyllables('') === 0, 'Empty string has 0 syllables');
})) passedTests++;
totalTests++;

// Test 21: Name Detection
if (runTest('Name Detection', () => {
  assertTrue(isLikelyRussianName('Владимир'), 'Detects Vladimir as name');
  assertTrue(isLikelyRussianName('Москва'), 'Detects Moscow as name');
  assertTrue(!isLikelyRussianName('привет'), 'Does not detect greeting as name');
  assertTrue(!isLikelyRussianName('да'), 'Does not detect short word as name');
})) passedTests++;
totalTests++;

// Test 22: Available Systems
if (runTest('Available Systems', () => {
  const systems = getAvailableSystems();
  assertTrue(Array.isArray(systems), 'Returns array');
  assertTrue(systems.length >= 4, 'Has at least 4 systems');
  assertTrue(systems.some(s => s.id === 'gost'), 'Includes GOST');
  assertTrue(systems.some(s => s.id === 'simplified'), 'Includes simplified');
})) passedTests++;
totalTests++;

// Test 23: RussianTransliterator Class Direct Usage
if (runTest('RussianTransliterator Class Direct Usage', () => {
  const transliterator = new RussianTransliterator({
    system: 'gost',
    preserveCase: true
  });
  
  const result = transliterator.transliterate('Привет');
  assertTrue(result.length > 0, 'Returns result');
  
  const analysis = transliterator.analyze('Привет');
  assertTrue(typeof analysis === 'object', 'Analysis returns object');
  assertTrue(analysis.cyrillicCharacters > 0, 'Analysis has character count');
  
  // Test system switching
  transliterator.setSystem('simplified');
  const simplifiedResult = transliterator.transliterate('хорошо');
  assertTrue(simplifiedResult.length > 0, 'System switch works');
})) passedTests++;
totalTests++;

// Test 24: Reverse Transliteration
if (runTest('Reverse Transliteration', () => {
  const reversed = reverseTransliterate('privet mir');
  assertTrue(reversed.length > 0, 'Produces output');
  // Note: reverse transliteration is approximate and may not be perfect
})) passedTests++;
totalTests++;

// Test 25: Utils Functions
if (runTest('Utils Functions', () => {
  assertTrue(typeof utils.analyzeText === 'function', 'analyzeText exists');
  assertTrue(typeof utils.hasCyrillicCharacters === 'function', 'hasCyrillicCharacters exists');
  assertTrue(typeof utils.extractCyrillicCharacters === 'function', 'extractCyrillicCharacters exists');
  
  const textAnalysis = utils.analyzeText('Привет Hello');
  assertTrue(typeof textAnalysis === 'object', 'Text analysis returns object');
  assertTrue(textAnalysis.cyrillic > 0, 'Detects Cyrillic characters');
  assertTrue(textAnalysis.latin > 0, 'Detects Latin characters');
  assertTrue(textAnalysis.primaryScript === 'mixed', 'Detects mixed script');
})) passedTests++;
totalTests++;

// Test 26: Performance Test
if (runTest('Performance - Large Text', () => {
  // Create a large text string
  const largeText = 'Привет мир как дела'.repeat(100); // ~1800 characters
  
  const startTime = Date.now();
  const result = transliterate(largeText);
  const endTime = Date.now();
  
  assertTrue(result.length > 0, 'Large text processed');
  assertTrue(endTime - startTime < 1000, 'Processed in reasonable time (< 1 second)');
  console.log(`   ⏱️  Processed ${largeText.length} characters in ${endTime - startTime}ms`);
})) passedTests++;
totalTests++;

// Test 27: Special Characters and Numbers
if (runTest('Special Characters and Numbers', () => {
  // Test with numbers mixed in
  const result1 = transliterate('У меня 5 собак');
  assertContains(result1, '5', 'Preserves numbers');
  assertContains(result1, 'u menya', 'Transliterates Russian');
  
  // Test with special punctuation
  const result2 = transliterate('Он сказал: «Привет!»');
  assertTrue(result2.includes('on skazal'), 'Basic transliteration works');
})) passedTests++;
totalTests++;

// Test 28: Word Boundary Detection
if (runTest('Word Boundary Detection', () => {
  const words = utils.findWordBoundaries('Привет, как дела?');
  assertTrue(Array.isArray(words), 'Returns array');
  assertTrue(words.length >= 3, 'Finds multiple words');
  assertTrue(words.includes('Привет'), 'Finds first word');
  assertTrue(words.includes('как'), 'Finds middle word');
  assertTrue(words.includes('дела'), 'Finds last word');
})) passedTests++;
totalTests++;

// Test 29: Error Handling for Invalid Systems
if (runTest('Error Handling for Invalid Systems', () => {
  try {
    const transliterator = new RussianTransliterator({ system: 'invalid' });
    transliterator.setSystem('nonexistent');
    assertTrue(false, 'Should have thrown error');
  } catch (error) {
    assertTrue(error.message.includes('Invalid system'), 'Throws appropriate error');
  }
})) passedTests++;
totalTests++;

// Test 30: Comprehensive Feature Test
if (runTest('Comprehensive Feature Integration', () => {
  const transliterator = new RussianTransliterator({
    system: 'gost',
    preserveCase: true,
    wordFirst: true,
    handleCombinations: true
  });
  
  const complexText = 'Владимир изучает программирование в Москве';
  const result = transliterator.transliterate(complexText);
  const analysis = transliterator.analyze(complexText);
  
  assertTrue(result.length > 0, 'Processes complex text');
  assertTrue(analysis.coverage > 0.8, 'High coverage');
  assertTrue(analysis.isRussian, 'Correctly identifies as Russian');
  
  const stats = transliterator.getStats();
  assertTrue(stats.totalWords > 100, 'Has substantial word database');
  assertTrue(stats.totalCharacters > 30, 'Has complete character set');
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
  console.log('The Russian Transliteration library is working correctly.');
} else {
  console.log('\n⚠️  Some tests failed. Please review the issues above.');
}

console.log('\n🏁 Test Suite Complete\n');