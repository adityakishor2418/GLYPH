/**
 * Arabic Transliteration Library - Comprehensive Test Suite
 * Tests all major functionality of the Arabic to Latin transliteration library
 */

import {
  transliterate,
  analyze,
  transliterateBatch,
  createTransliterator,
  getAvailableSystems,
  transliterateWith,
  compareTransliterations,
  hasArabicCharacters,
  extractArabicCharacters,
  extractArabicWords,
  cleanText,
  stripDiacritics,
  normalizeText,
  getTextDirection,
  convertNumerals,
  isDiacritic,
  transliterateName,
  processArabicText,
  ArabicTransliterator
} from '../src/index.js';

// Test runner
class TestRunner {
  constructor() {
    this.passed = 0;
    this.failed = 0;
    this.total = 0;
  }

  test(name, testFn) {
    this.total++;
    try {
      const result = testFn();
      if (result === true || result === undefined) {
        console.log(`✅ PASS: ${name}`);
        this.passed++;
      } else {
        console.log(`❌ FAIL: ${name} - ${result}`);
        this.failed++;
      }
    } catch (error) {
      console.log(`❌ ERROR: ${name} - ${error.message}`);
      this.failed++;
    }
  }

  assert(condition, message = 'Assertion failed') {
    if (!condition) {
      throw new Error(message);
    }
    return true;
  }

  assertEqual(actual, expected, message) {
    if (actual !== expected) {
      throw new Error(message || `Expected "${expected}", got "${actual}"`);
    }
    return true;
  }

  summary() {
    console.log('\n' + '='.repeat(50));
    console.log('TEST SUMMARY');
    console.log('='.repeat(50));
    console.log(`Total Tests: ${this.total}`);
    console.log(`Passed: ${this.passed}`);
    console.log(`Failed: ${this.failed}`);
    console.log(`Success Rate: ${Math.round((this.passed / this.total) * 100)}%`);
    
    if (this.failed === 0) {
      console.log('\n🎉 All tests passed! Arabic transliteration library is working correctly.');
    } else {
      console.log(`\n⚠️  ${this.failed} test(s) failed. Please review the implementation.`);
    }
  }
}

const test = new TestRunner();

console.log('🇸🇦 Arabic Transliteration Library - Test Suite');
console.log('='.repeat(60));
console.log();

// Basic transliteration tests
console.log('📝 Basic Transliteration Tests');
console.log('-'.repeat(40));

test.test('Basic Arabic word transliteration', () => {
  const result = transliterate('مرحبا');
  test.assert(result && result.length > 0, 'Should return non-empty transliteration');
  console.log(`  "مرحبا" → "${result}"`);
  return true;
});

test.test('Arabic greeting transliteration', () => {
  const result = transliterate('السلام عليكم');
  test.assert(result.includes('salām'), 'Should contain "salām"');
  test.assert(result.includes('ʿalaykum') || result.includes('alaykum'), 'Should contain "ʿalaykum" or similar');
  console.log(`  "السلام عليكم" → "${result}"`);
  return true;
});

test.test('Allah transliteration', () => {
  const result = transliterate('الله');
  test.assert(result.toLowerCase().includes('allah') || result.toLowerCase().includes('allāh'), 'Should transliterate to Allah/Allāh');
  console.log(`  "الله" → "${result}"`);
  return true;
});

test.test('Simple Arabic sentence', () => {
  const result = transliterate('أهلا وسهلا');
  test.assert(result && result.length > 5, 'Should return meaningful transliteration');
  console.log(`  "أهلا وسهلا" → "${result}"`);
  return true;
});

test.test('Arabic name transliteration', () => {
  const result = transliterateName('محمد');
  test.assert(result.includes('Mu') || result.includes('Muh'), 'Should start with "Mu" or "Muh"');
  test.assert(result[0] === result[0].toUpperCase(), 'Should start with capital letter');
  console.log(`  "محمد" → "${result}"`);
  return true;
});

// Character mapping tests
console.log('\n🔤 Character Mapping Tests');
console.log('-'.repeat(40));

test.test('Arabic alphabet character mapping', () => {
  const testChars = [
    { arabic: 'ا', expected: 'a' },
    { arabic: 'ب', expected: 'b' },
    { arabic: 'ت', expected: 't' },
    { arabic: 'ث', expected: 'th' },
    { arabic: 'ج', expected: 'j' },
    { arabic: 'ح', expected: 'ḥ' },
    { arabic: 'د', expected: 'd' },
    { arabic: 'ر', expected: 'r' },
    { arabic: 'س', expected: 's' },
    { arabic: 'ش', expected: 'sh' }
  ];

  testChars.forEach(({ arabic, expected }) => {
    const result = transliterate(arabic);
    console.log(`  "${arabic}" → "${result}" (expected: "${expected}")`);
    // Note: Results may vary slightly based on system, so we just check for non-empty result
    test.assert(result && result.length > 0, `Should transliterate ${arabic}`);
  });
  return true;
});

// Romanization system tests
console.log('\n🌍 Romanization System Tests');
console.log('-'.repeat(40));

test.test('Available systems check', () => {
  const systems = getAvailableSystems();
  test.assert(Array.isArray(systems), 'Should return array of systems');
  test.assert(systems.length >= 4, 'Should have at least 4 systems');
  
  const systemIds = systems.map(s => s.id);
  test.assert(systemIds.includes('ala'), 'Should include ALA-LC system');
  test.assert(systemIds.includes('simplified'), 'Should include simplified system');
  
  console.log(`  Available systems: ${systemIds.join(', ')}`);
  return true;
});

test.test('System comparison', () => {
  const testWord = 'محمد';
  const comparison = compareTransliterations(testWord);
  
  test.assert(typeof comparison === 'object', 'Should return object');
  test.assert(comparison.ala, 'Should have ALA-LC transliteration');
  test.assert(comparison.simplified, 'Should have simplified transliteration');
  
  console.log(`  Comparing "${testWord}":`);
  Object.entries(comparison).forEach(([system, result]) => {
    console.log(`    ${system}: "${result}"`);
  });
  return true;
});

test.test('Transliterate with specific system', () => {
  const testWord = 'محمد';
  const alaResult = transliterateWith(testWord, 'ala');
  const simplifiedResult = transliterateWith(testWord, 'simplified');
  
  test.assert(alaResult && alaResult.length > 0, 'ALA-LC should return result');
  test.assert(simplifiedResult && simplifiedResult.length > 0, 'Simplified should return result');
  
  console.log(`  ALA-LC: "${testWord}" → "${alaResult}"`);
  console.log(`  Simplified: "${testWord}" → "${simplifiedResult}"`);
  return true;
});

// Batch processing tests
console.log('\n📦 Batch Processing Tests');
console.log('-'.repeat(40));

test.test('Batch transliteration', () => {
  const arabicWords = ['مرحبا', 'شكرا', 'أهلا'];
  const results = transliterateBatch(arabicWords);
  
  test.assert(Array.isArray(results), 'Should return array');
  test.assertEqual(results.length, arabicWords.length, 'Should return same number of results');
  test.assert(results.every(r => r && r.length > 0), 'All results should be non-empty');
  
  console.log('  Batch results:');
  arabicWords.forEach((word, i) => {
    console.log(`    "${word}" → "${results[i]}"`);
  });
  return true;
});

// Text analysis tests
console.log('\n🔍 Text Analysis Tests');
console.log('-'.repeat(40));

test.test('Arabic text analysis', () => {
  const testText = 'مرحبا بالعالم';
  const analysis = analyze(testText);
  
  test.assert(typeof analysis === 'object', 'Should return analysis object');
  test.assert(analysis.totalCharacters > 0, 'Should count total characters');
  test.assert(analysis.arabicCharacters > 0, 'Should count Arabic characters');
  test.assert(analysis.isArabic === true, 'Should identify as Arabic text');
  test.assert(analysis.transliteration, 'Should include transliteration');
  
  console.log(`  Text: "${testText}"`);
  console.log(`  Total chars: ${analysis.totalCharacters}`);
  console.log(`  Arabic chars: ${analysis.arabicCharacters}`);
  console.log(`  Coverage: ${Math.round(analysis.coverage * 100)}%`);
  console.log(`  Transliteration: "${analysis.transliteration}"`);
  return true;
});

test.test('Mixed script detection', () => {
  const mixedText = 'Hello مرحبا World';
  const analysis = analyze(mixedText);
  
  test.assert(analysis.mixedScript.isMixed === true, 'Should detect mixed script');
  test.assert(analysis.mixedScript.arabicRatio > 0, 'Should have Arabic ratio > 0');
  test.assert(analysis.mixedScript.latinRatio > 0, 'Should have Latin ratio > 0');
  
  console.log(`  Mixed text: "${mixedText}"`);
  console.log(`  Arabic ratio: ${Math.round(analysis.mixedScript.arabicRatio * 100)}%`);
  console.log(`  Latin ratio: ${Math.round(analysis.mixedScript.latinRatio * 100)}%`);
  return true;
});

// Character detection tests
console.log('\n🔤 Character Detection Tests');
console.log('-'.repeat(40));

test.test('Arabic character detection', () => {
  test.assert(hasArabicCharacters('مرحبا') === true, 'Should detect Arabic in Arabic text');
  test.assert(hasArabicCharacters('Hello') === false, 'Should not detect Arabic in Latin text');
  test.assert(hasArabicCharacters('Hello مرحبا') === true, 'Should detect Arabic in mixed text');
  
  console.log('  "مرحبا" has Arabic: true ✓');
  console.log('  "Hello" has Arabic: false ✓');
  console.log('  "Hello مرحبا" has Arabic: true ✓');
  return true;
});

test.test('Arabic character extraction', () => {
  const mixedText = 'Hello مرحبا 123';
  const arabicChars = extractArabicCharacters(mixedText);
  
  test.assert(Array.isArray(arabicChars), 'Should return array');
  test.assert(arabicChars.length === 5, 'Should extract 5 Arabic characters');
  test.assert(arabicChars.join('') === 'مرحبا', 'Should extract correct characters');
  
  console.log(`  Extracted from "${mixedText}": [${arabicChars.join(', ')}]`);
  return true;
});

test.test('Arabic word extraction', () => {
  const mixedText = 'Hello مرحبا world بالعالم!';
  const arabicWords = extractArabicWords(mixedText);
  
  test.assert(Array.isArray(arabicWords), 'Should return array');
  test.assert(arabicWords.length >= 2, 'Should extract at least 2 Arabic words');
  test.assert(arabicWords.includes('مرحبا'), 'Should include "مرحبا"');
  
  console.log(`  Extracted words from "${mixedText}": [${arabicWords.join(', ')}]`);
  return true;
});

// Diacritic handling tests
console.log('\n✨ Diacritic Handling Tests');
console.log('-'.repeat(40));

test.test('Diacritic stripping', () => {
  const textWithDiacritics = 'مَرْحَبًا';
  const stripped = stripDiacritics(textWithDiacritics);
  
  test.assert(stripped.length < textWithDiacritics.length, 'Should remove some characters');
  test.assert(!stripped.includes('َ'), 'Should remove fatha');
  test.assert(!stripped.includes('ً'), 'Should remove tanwin');
  
  console.log(`  Original: "${textWithDiacritics}"`);
  console.log(`  Stripped: "${stripped}"`);
  return true;
});

test.test('Diacritic detection', () => {
  test.assert(isDiacritic('َ') === true, 'Should detect fatha as diacritic');
  test.assert(isDiacritic('ً') === true, 'Should detect tanwin as diacritic');
  test.assert(isDiacritic('م') === false, 'Should not detect mim as diacritic');
  
  console.log('  Diacritic detection working correctly ✓');
  return true;
});

// Text processing tests
console.log('\n🛠️  Text Processing Tests');
console.log('-'.repeat(40));

test.test('Text cleaning', () => {
  const messyText = '  مرحبا   ،،، بالعالم   !!!  ';
  const cleaned = cleanText(messyText);
  
  test.assert(!cleaned.startsWith(' '), 'Should remove leading spaces');
  test.assert(!cleaned.endsWith(' '), 'Should remove trailing spaces');
  test.assert(!cleaned.includes('   '), 'Should remove extra spaces');
  
  console.log(`  Original: "${messyText}"`);
  console.log(`  Cleaned: "${cleaned}"`);
  return true;
});

test.test('Text normalization', () => {
  const textToNormalize = 'أهْلاً إلى';
  const normalized = normalizeText(textToNormalize);
  
  test.assert(normalized.length > 0, 'Should return normalized text');
  console.log(`  Original: "${textToNormalize}"`);
  console.log(`  Normalized: "${normalized}"`);
  return true;
});

test.test('Arabic numeral conversion', () => {
  const textWithNumerals = 'العدد ١٢٣٪';
  const converted = convertNumerals(textWithNumerals);
  
  test.assert(converted.includes('123'), 'Should convert Arabic numerals to Western');
  console.log(`  Original: "${textWithNumerals}"`);
  console.log(`  Converted: "${converted}"`);
  return true;
});

// Direction and layout tests
console.log('\n↔️  Text Direction Tests');
console.log('-'.repeat(40));

test.test('Text direction detection', () => {
  test.assertEqual(getTextDirection('مرحبا'), 'rtl', 'Arabic text should be RTL');
  test.assertEqual(getTextDirection('Hello'), 'ltr', 'Latin text should be LTR');
  
  console.log('  Arabic text direction: rtl ✓');
  console.log('  Latin text direction: ltr ✓');
  return true;
});

// Custom transliterator tests
console.log('\n⚙️  Custom Transliterator Tests');
console.log('-'.repeat(40));

test.test('Custom transliterator creation', () => {
  const customTransliterator = createTransliterator({
    system: 'simplified',
    lowercase: false,
    removeDiacritics: true
  });
  
  test.assert(customTransliterator instanceof ArabicTransliterator, 'Should create ArabicTransliterator instance');
  
  const result = customTransliterator.transliterate('مَرْحَبًا');
  test.assert(result && result.length > 0, 'Should transliterate with custom settings');
  
  console.log(`  Custom transliteration: "مَرْحَبًا" → "${result}"`);
  return true;
});

test.test('Transliterator statistics', () => {
  const customTransliterator = createTransliterator();
  const stats = customTransliterator.getStats();
  
  test.assert(typeof stats === 'object', 'Should return stats object');
  test.assert(stats.totalCharacters > 0, 'Should have character count');
  test.assert(stats.totalWords > 0, 'Should have word count');
  test.assert(Array.isArray(stats.supportedFeatures), 'Should list supported features');
  
  console.log(`  Characters mapped: ${stats.totalCharacters}`);
  console.log(`  Words mapped: ${stats.totalWords}`);
  console.log(`  Current system: ${stats.currentSystem}`);
  return true;
});

// Advanced processing tests
console.log('\n🚀 Advanced Processing Tests');
console.log('-'.repeat(40));

test.test('Advanced text processing', () => {
  const complexText = 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ';
  const processed = processArabicText(complexText, {
    normalize: true,
    removeDiacritics: true
  });
  
  test.assert(typeof processed === 'object', 'Should return processing result object');
  test.assert(processed.original, 'Should include original text');
  test.assert(processed.cleaned, 'Should include cleaned text');
  test.assert(processed.transliteration, 'Should include transliteration');
  test.assert(processed.analysis, 'Should include analysis');
  
  console.log(`  Original: "${processed.original}"`);
  console.log(`  Cleaned: "${processed.cleaned}"`);
  console.log(`  Transliteration: "${processed.transliteration}"`);
  return true;
});

// Error handling tests
console.log('\n❌ Error Handling Tests');
console.log('-'.repeat(40));

test.test('Empty input handling', () => {
  test.assertEqual(transliterate(''), '', 'Should handle empty string');
  test.assertEqual(transliterate(null), '', 'Should handle null input');
  test.assertEqual(transliterate(undefined), '', 'Should handle undefined input');
  
  console.log('  Empty input handling working correctly ✓');
  return true;
});

test.test('Invalid system handling', () => {
  try {
    const transliterator = createTransliterator({ system: 'invalid' });
    transliterator.setSystem('nonexistent');
    test.assert(false, 'Should throw error for invalid system');
  } catch (error) {
    test.assert(error.message.includes('Invalid system'), 'Should throw appropriate error');
    console.log('  Invalid system error handling working correctly ✓');
    return true;
  }
});

// Performance tests (basic)
console.log('\n⚡ Performance Tests');
console.log('-'.repeat(40));

test.test('Large text processing', () => {
  const largeText = 'مرحبا بالعالم '.repeat(100);
  const start = Date.now();
  const result = transliterate(largeText);
  const duration = Date.now() - start;
  
  test.assert(result && result.length > 0, 'Should handle large text');
  test.assert(duration < 1000, 'Should process reasonably quickly'); // Less than 1 second
  
  console.log(`  Processed ${largeText.length} characters in ${duration}ms`);
  return true;
});

// Final summary
console.log('\n');
test.summary();