/**
 * Basic usage examples for the Japanese Transliteration Library
 * Run with: node examples/basic-usage.js
 */

import { transliterate, analyze, JapaneseTransliterator, LibraryInfo } from '../src/index.js';

console.log('='.repeat(60));
console.log(` ${LibraryInfo.name} v${LibraryInfo.version}`);
console.log('='.repeat(60));

// Basic transliteration examples
console.log('\n1. BASIC TRANSLITERATION:');
console.log('-'.repeat(40));

const examples = [
  'こんにちは',           // Hello
  'ありがとう',           // Thank you
  'おはよう',             // Good morning
  'さようなら',           // Goodbye
  'すみません',           // Excuse me
  'アニメ',               // Anime
  'カラオケ',             // Karaoke
  'コンピューター',       // Computer
  'インターネット',       // Internet
  '日本',                 // Japan
  '東京',                 // Tokyo
  '日本語',               // Japanese language
  '学校',                 // School
  '先生',                 // Teacher
  'こんにちは、日本！',   // Mixed text
  '私の名前はアニメです。' // Complex sentence
];

examples.forEach(text => {
  const result = transliterate(text);
  console.log(`${text.padEnd(20)} → ${result}`);
});

// Advanced configuration examples
console.log('\n2. ADVANCED CONFIGURATION:');
console.log('-'.repeat(40));

const advancedTransliterator = new JapaneseTransliterator({
  kanjiReadingMode: 'all',        // Show all possible readings
  handleSpecialCombinations: true,
  preserveSpacing: true
});

const complexTexts = [
  '日本',      // Multiple readings
  '今日',      // Today
  '明日',      // Tomorrow
  '学校'       // School
];

complexTexts.forEach(text => {
  const basic = transliterate(text);
  const advanced = advancedTransliterator.transliterate(text);
  console.log(`${text} → Basic: ${basic}, All readings: ${advanced}`);
});

// Analysis examples
console.log('\n3. TEXT ANALYSIS:');
console.log('-'.repeat(40));

const analysisTexts = [
  'こんにちはアニメ日本',
  'Hello こんにちは World',
  'カラオケで歌いました'
];

analysisTexts.forEach(text => {
  const analysis = analyze(text);
  console.log(`\nAnalyzing: "${text}"`);
  console.log(`  Transliterated: ${analysis.transliterated}`);
  console.log(`  Predominant script: ${analysis.predominantScript}`);
  console.log(`  Has Japanese: ${analysis.hasJapanese}`);
  console.log(`  Segments: ${analysis.segments.length}`);
  analysis.segments.forEach((segment, i) => {
    console.log(`    ${i + 1}. "${segment.text}" (${segment.script})`);
  });
});

// Special character handling
console.log('\n4. SPECIAL CHARACTER HANDLING:');
console.log('-'.repeat(40));

const specialTexts = [
  'がっこう',        // Gemination (small tsu)
  'おとうさん',      // Long vowel
  'きょう',          // Combination character
  'ちょっと',        // Small tsu + combination
  'コーヒー',        // Long vowel mark
  'ファイル',        // Foreign sound
  'ディスク'         // Extended katakana
];

specialTexts.forEach(text => {
  const result = transliterate(text);
  console.log(`${text.padEnd(15)} → ${result}`);
});

// Performance test
console.log('\n5. PERFORMANCE TEST:');
console.log('-'.repeat(40));

const performanceText = 'こんにちは、私の名前はアニメです。日本語を勉強しています。東京に住んでいます。';
const iterations = 1000;

console.time('Transliteration Performance');
for (let i = 0; i < iterations; i++) {
  transliterate(performanceText);
}
console.timeEnd('Transliteration Performance');

console.log(`\nProcessed ${iterations} iterations of:`);
console.log(`"${performanceText}"`);
console.log(`Result: "${transliterate(performanceText)}"`);

console.log('\n' + '='.repeat(60));
console.log('Basic examples completed successfully!');
console.log('='.repeat(60));