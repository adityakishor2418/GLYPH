# Japanese Transliteration Library

A comprehensive JavaScript library for transliterating Japanese text (Hiragana, Katakana, and Kanji) to English pronunciation (romaji). Perfect for web applications and Node.js projects.

## 🌟 Features

- **Complete Hiragana Support**: All basic and combination characters
- **Complete Katakana Support**: Including extended katakana for foreign words
- **Essential Kanji Support**: Common Kanji with multiple reading options
- **Script Detection**: Automatic detection of Japanese script types
- **Mixed Script Handling**: Process text with multiple Japanese scripts
- **Special Character Support**: Handles gemination, long vowels, and combinations
- **Lightweight & Fast**: Minimal dependencies and optimized performance
- **DOM Integration**: Process web page elements (browser environment)

## 📦 Installation

### For Web Projects
```javascript
// ES6 Module
import { transliterate } from './src/index.js';

// Or use the built version
import JapaneseTransliterationLibrary from './dist/japanese-transliteration.js';
```

### For Node.js Projects
Copy the source files to your project and import as ES6 modules.

## 🚀 Quick Start

```javascript
import { transliterate, analyze, JapaneseTransliterator } from './src/index.js';

// Basic transliteration
console.log(transliterate("こんにちは"));    // "konnichiwa"
console.log(transliterate("アニメ"));        // "anime"
console.log(transliterate("日本"));          // "nihon"

// Mixed scripts
console.log(transliterate("こんにちは、アニメ日本！"));
// Output: "konnichiwa, anime nihon!"
```

## 📚 API Reference

### Core Functions

#### `transliterate(text, options?)`
Convert Japanese text to romaji pronunciation.

```javascript
transliterate("こんにちは");                    // "konnichiwa"
transliterate("がっこう");                      // "gakkou"
transliterate("コーヒー");                      // "koohii"
```

#### `analyze(text, options?)`
Get detailed analysis of Japanese text.

```javascript
const analysis = analyze("こんにちはアニメ");
console.log(analysis);
/*
{
  original: "こんにちはアニメ",
  transliterated: "konnichiwa anime",
  hasJapanese: true,
  predominantScript: "mixed",
  segments: [...],
  analysis: {
    hiraganaCount: 1,
    katakanaCount: 1,
    kanjiCount: 0,
    mixedCount: 0
  }
}
*/
```

#### `JapaneseTransliterator` Class
Advanced transliteration with custom options.

```javascript
const transliterator = new JapaneseTransliterator({
  kanjiReadingMode: 'all',           // 'first', 'all', 'context'
  handleSpecialCombinations: true,
  preserveSpacing: true
});

console.log(transliterator.transliterate("日本"));  // Shows multiple readings
```

### Utility Functions

```javascript
// Script detection
hasJapaneseCharacters("Hello こんにちは");    // true
detectTextScript("こんにちは");               // "hiragana"
isHiragana("あ");                            // true
isKatakana("ア");                            // true  
isKanji("日");                               // true

// Text processing
normalizeJapaneseText("　こんにちは　");      // "こんにちは"
segmentTextByScript("こんにちはアニメ");      // [{text: "こんにちは", script: "hiragana"}, ...]
```

## 🌐 Web Page Integration

### Basic DOM Processing

```javascript
// Process specific elements
import { transliterateDOMElement } from './src/index.js';

// Transliterate all Japanese text in a div
transliterateDOMElement('#content', {
  addTooltips: true,
  preserveHTML: true
});

// Process entire page body
transliterateDOMElement(document.body, {
  kanjiReadingMode: 'first',
  addTooltips: false
});
```

## 🔧 Configuration Options

```javascript
const options = {
  // Kanji reading preference
  kanjiReadingMode: 'first',     // 'first', 'all', 'context'
  
  // Handle special combinations (recommended: true)
  handleSpecialCombinations: true,
  
  // Preserve original spacing
  preserveSpacing: true,
  
  // Add tooltips in DOM processing
  addTooltips: true,
  
  // Maximum compound Kanji lookup length
  maxCompoundLength: 6
};
```

## 📖 Examples

### Basic Transliteration

```javascript
// Hiragana
transliterate("ひらがな");           // "hiragana"
transliterate("おはよう");           // "ohayou"
transliterate("ありがとう");         // "arigatou"

// Katakana  
transliterate("カタカナ");           // "katakana"
transliterate("コンピューター");     // "konpyuutaa"
transliterate("インターネット");     // "intaanetto"

// Kanji
transliterate("漢字");               // "kanji"
transliterate("日本語");             // "nihongo"
transliterate("東京");               // "tokyo"
```

### Special Characters

```javascript
// Small tsu (gemination)
transliterate("がっこう");           // "gakkou"
transliterate("ちょっと");           // "chotto"

// Long vowels
transliterate("おとうさん");         // "otousan"
transliterate("コーヒー");           // "koohii"

// Combinations
transliterate("きょう");             // "kyou"
transliterate("しゃしん");           // "shashin"
```

### Advanced Usage

```javascript
// Custom transliterator
const advanced = new JapaneseTransliterator({
  kanjiReadingMode: 'all',
  handleSpecialCombinations: true
});

// Batch processing
const texts = ["こんにちは", "アニメ", "日本"];
const results = transliterateBatch(texts);

// DOM processing (in browser)
transliterateDOMElement(document.body, {
  addTooltips: true,
  preserveHTML: true
});
```

## 🧪 Testing

Run the simple test suite:

```bash
node examples/test.js
```

Try the basic usage examples:

```bash
node examples/basic-usage.js
```

## 🏗️ Building

Build production bundles:

```bash
node build.js
```

This creates:
- `dist/japanese-transliteration.js` - Main library bundle
- `dist/japanese-transliteration.min.js` - Minified version
- `dist/data/` - Character mapping data files

## 📁 Project Structure

```
japanese-transliteration/
├── src/                          # Source code
│   ├── index.js                  # Main library entry point
│   ├── transliterator.js         # Core transliteration engine
│   └── utils.js                  # Utility functions
├── data/                         # Character mapping data
│   ├── hiragana.js               # Hiragana mappings
│   ├── katakana.js               # Katakana mappings  
│   └── kanji.js                  # Kanji mappings
├── examples/                     # Usage examples
│   ├── basic-usage.js            # Basic API examples
│   └── test.js                   # Simple test suite
└── dist/                         # Built files (created by build.js)
```

## 🎌 Supported Japanese Scripts

### Hiragana (ひらがな)
- All 46 basic characters
- Dakuten and handakuten variants
- Combination characters (yōon)
- Special characters (small tsu, long vowel marks)

### Katakana (カタカナ)
- All 46 basic characters
- Dakuten and handakuten variants
- Combination characters (yōon)
- Extended katakana for foreign words
- Long vowel marks

### Kanji (漢字)
- Essential 500+ common characters
- Multiple readings (on'yomi and kun'yomi)
- Common compound words
- Numbers, dates, and basic vocabulary

## 🔍 Script Detection

The library automatically detects and handles:
- Pure Hiragana text
- Pure Katakana text  
- Pure Kanji text
- Mixed Japanese scripts
- Japanese mixed with Latin text

## ⚡ Performance

- Optimized for real-time transliteration
- Handles large texts efficiently
- Minimal memory footprint
- Fast script detection algorithms

## 🤝 Contributing

This library is designed to be extensible. You can:
- Add more Kanji characters to `data/kanji.js`
- Improve compound word detection
- Add specialized domain vocabularies
- Enhance context-based reading selection

## 📄 License

MIT License - feel free to use in personal and commercial projects.

## 🙏 Acknowledgments

- Japanese language resources and romanization standards
- Unicode Consortium for Japanese character specifications
- Chrome Extension API documentation

---

**Ready to transliterate Japanese text instantly!** 🇯🇵 ➡️ 🔤

Perfect for web applications, Node.js projects, and anywhere you need Japanese text transliteration!