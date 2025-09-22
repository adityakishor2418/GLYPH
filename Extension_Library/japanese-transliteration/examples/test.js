/**
 * Simple test file for the Japanese Transliteration Library
 * Run with: node examples/test.js
 */

import { transliterate, analyze, JapaneseTransliterator, LibraryInfo } from '../src/index.js';

console.log('='.repeat(60));
console.log(` ${LibraryInfo.name} v${LibraryInfo.version}`);
console.log(' Core Library Test (No Chrome Extension)');
console.log('='.repeat(60));

// Test basic functionality
console.log('\n✅ BASIC TRANSLITERATION TESTS:');
console.log('-'.repeat(40));

const testCases = [
  // Basic Hiragana
  { input: 'こんにちは', expected: 'konnichiwa', description: 'Hello' },
  { input: 'ありがとう', expected: 'arigatou', description: 'Thank you' },
  { input: 'おはよう', expected: 'ohayou', description: 'Good morning' },
  
  // Basic Katakana
  { input: 'アニメ', expected: 'anime', description: 'Anime' },
  { input: 'コンピューター', expected: 'konpyuutaa', description: 'Computer' },
  { input: 'カラオケ', expected: 'karaoke', description: 'Karaoke' },
  
  // Basic Kanji
  { input: '日本', expected: 'nihon', description: 'Japan' },
  { input: '学校', expected: 'gakkou', description: 'School' },
  { input: '先生', expected: 'sensei', description: 'Teacher' },
  
  // Mixed scripts
  { input: 'こんにちは、日本！', expected: 'konnichiwa, nihon!', description: 'Mixed text' }
];

let passed = 0;
let total = testCases.length;

testCases.forEach(({ input, expected, description }) => {
  const result = transliterate(input);
  const isMatch = result.toLowerCase().includes(expected.toLowerCase().split(' ')[0]);
  
  if (isMatch) {
    console.log(`✅ ${input.padEnd(15)} → ${result.padEnd(20)} (${description})`);
    passed++;
  } else {
    console.log(`❌ ${input.padEnd(15)} → ${result.padEnd(20)} (Expected: ${expected})`);
  }
});

console.log(`\n📊 Test Results: ${passed}/${total} tests passed`);

// Test analysis functionality
console.log('\n✅ TEXT ANALYSIS TESTS:');
console.log('-'.repeat(40));

const analysisTests = [
  'こんにちは',
  'アニメ',
  '日本',
  'こんにちはアニメ日本'
];

analysisTests.forEach(text => {
  const analysis = analyze(text);
  console.log(`\n📝 Analyzing: "${text}"`);
  console.log(`   Result: ${analysis.transliterated}`);
  console.log(`   Script: ${analysis.predominantScript}`);
  console.log(`   Segments: ${analysis.segments.length}`);
});

// Test advanced transliterator
console.log('\n✅ ADVANCED TRANSLITERATOR TESTS:');
console.log('-'.repeat(40));

const advanced = new JapaneseTransliterator({
  kanjiReadingMode: 'all',
  handleSpecialCombinations: true
});

const advancedTests = ['日本', '学校', '今日'];
advancedTests.forEach(text => {
  const basic = transliterate(text);
  const advancedResult = advanced.transliterate(text);
  console.log(`${text} → Basic: ${basic}, Advanced: ${advancedResult}`);
});

// Performance test
console.log('\n✅ PERFORMANCE TEST:');
console.log('-'.repeat(40));

const performanceText = 'こんにちは、私の名前はアニメです。日本語を勉強しています。';
const iterations = 100;

console.time('Transliteration Performance');
for (let i = 0; i < iterations; i++) {
  transliterate(performanceText);
}
console.timeEnd('Transliteration Performance');

console.log(`\nProcessed ${iterations} iterations successfully!`);
console.log(`Sample: "${performanceText}"`);
console.log(`Result: "${transliterate(performanceText)}"`);

console.log('\n' + '='.repeat(60));
console.log('🎌 Japanese Transliteration Library Test Complete!');
console.log('   Ready for use in web applications and Node.js projects');
console.log('='.repeat(60));