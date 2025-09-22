# Mandarin Chinese to Pinyin Transliteration Library

A comprehensive JavaScript library for converting Simplified Chinese characters to their Pinyin romanization. This library provides accurate transliteration with tone marks, extensive character coverage, and flexible configuration options.

## 🌟 Features

- **Comprehensive Character Coverage**: Over 1000+ common Simplified Chinese characters
- **Phrase Recognition**: Smart phrase-level transliteration for better accuracy
- **Flexible Tone Options**: Tone marks (nǐ hǎo), numerical tones (ni3 hao3), or no tones (ni hao)
- **Text Analysis**: Detailed analysis of Chinese text with character breakdown
- **Batch Processing**: Transliterate multiple texts efficiently
- **Mixed Text Support**: Handles Chinese-English mixed text seamlessly
- **Utility Functions**: Text cleaning, segmentation, and difficulty analysis
- **ES6 Modules**: Modern JavaScript with full ES6 module support
- **Lightweight**: No external dependencies

## 📦 Installation

Simply include the library files in your project:

```bash
# Copy the mandarin-pinyin folder to your project
cp -r mandarin-pinyin/ your-project/
```

## 🚀 Quick Start

```javascript
import { transliterate } from './mandarin-pinyin/src/index.js';

// Basic transliteration
console.log(transliterate('你好世界')); // nǐ hǎo shì jiè

// Mixed text
console.log(transliterate('Hello 你好 World')); // Hello nǐ hǎo World
```

## 📖 API Documentation

### Basic Functions

#### `transliterate(text, options?)`
Convert Chinese text to Pinyin with default settings.

```javascript
import { transliterate } from './mandarin-pinyin/src/index.js';

transliterate('你好');           // 'nǐ hǎo'
transliterate('我爱中国');        // 'wǒ ài zhōng guó'
transliterate('今天天气很好');     // 'jīn tiān tiān qì hěn hǎo'
```

#### `analyze(text, options?)`
Get detailed analysis of Chinese text.

```javascript
import { analyze } from './mandarin-pinyin/src/index.js';

const result = analyze('你好世界');
console.log(result.transliteration);     // 'nǐ hǎo shì jiè'
console.log(result.chineseCharacters);   // 4
console.log(result.coverage);            // 1.0 (100% coverage)
console.log(result.characterBreakdown);  // Detailed character info
```

#### `transliterateBatch(texts, options?)`
Transliterate multiple texts at once.

```javascript
import { transliterateBatch } from './mandarin-pinyin/src/index.js';

const texts = ['你好', '世界', '中国'];
const results = transliterateBatch(texts);
// ['nǐ hǎo', 'shì jiè', 'zhōng guó']
```

### Custom Transliteration Options

#### `createTransliterator(options)`
Create a custom transliterator with specific settings.

```javascript
import { createTransliterator } from './mandarin-pinyin/src/index.js';

const customTransliterator = createTransliterator({
  includeTones: true,        // Include tone marks (default: true)
  numericalTones: false,     // Use numerical tones 1,2,3,4 (default: false)  
  addSpaces: true,           // Add spaces between syllables (default: true)
  lowercase: true,           // Convert to lowercase (default: true)
  showUntranslated: false,   // Show [char] for unknown characters (default: false)
  wordFirst: true,           // Try phrase matching first (default: true)
  preservePunctuation: true  // Keep punctuation (default: true)
});

// Different tone options
const noTones = createTransliterator({ includeTones: false });
console.log(noTones.transliterate('你好')); // 'ni hao'

const numerical = createTransliterator({ numericalTones: true });
console.log(numerical.transliterate('你好')); // 'ni3 hao3'

const noSpaces = createTransliterator({ addSpaces: false });
console.log(noSpaces.transliterate('你好')); // 'nǐhǎo'
```

### Utility Functions

#### Text Detection and Analysis

```javascript
import { 
  hasChineseCharacters, 
  extractChineseCharacters,
  getReadingDifficulty 
} from './mandarin-pinyin/src/index.js';

// Check for Chinese characters
hasChineseCharacters('Hello 你好');  // true
hasChineseCharacters('Hello World'); // false

// Extract Chinese characters only
extractChineseCharacters('Hello 你好 World 世界'); // ['你', '好', '世', '界']

// Analyze reading difficulty
const difficulty = getReadingDifficulty('这是一个复杂的句子');
console.log(difficulty.level);  // 'medium', 'hard', etc.
console.log(difficulty.score);  // 1-5 difficulty score
```

#### Text Processing

```javascript
import { cleanText, segmentText } from './mandarin-pinyin/src/index.js';

// Clean and normalize text
const messy = '  你好，，，世界！！！  ';
const clean = cleanText(messy); // '你好，世界！'

// Segment text into logical units  
const segments = segmentText('我爱学习中文，你呢？');
// ['我爱学习中文', '，', '你呢', '？']
```

#### Tone Conversion

```javascript
import { 
  convertToNumericalTones, 
  convertNumericalTones 
} from './mandarin-pinyin/src/index.js';

// Convert tone marks to numbers
convertToNumericalTones('nǐ hǎo'); // 'ni3 hao3'

// Convert numbers to tone marks
convertNumericalTones('ni3 hao3'); // 'nǐ hǎo'
```

### Advanced Usage

#### Direct Class Usage

```javascript
import { MandarinTransliterator } from './mandarin-pinyin/src/index.js';

const transliterator = new MandarinTransliterator({
  includeTones: true,
  addSpaces: true,
  wordFirst: true
});

const result = transliterator.transliterate('你好世界');
const analysis = transliterator.analyze('你好世界');
const stats = transliterator.getStats();

// Update options dynamically
transliterator.setOptions({ numericalTones: true });
```

#### Accessing Raw Data

```javascript
import { 
  chineseCharacterMap, 
  chinesePhraseMap,
  isChineseCharacter 
} from './mandarin-pinyin/src/index.js';

// Direct character lookup
console.log(chineseCharacterMap['你']); // 'nǐ'
console.log(chinesePhraseMap['你好']); // 'nǐ hǎo'

// Character detection
isChineseCharacter('你'); // true
isChineseCharacter('A');  // false
```

## 📝 Examples

### Example 1: Basic Usage
```javascript
import mandarin from './mandarin-pinyin/src/index.js';

// Simple transliteration
console.log(mandarin.transliterate('你好')); // 'nǐ hǎo'
console.log(mandarin.transliterate('谢谢')); // 'xiè xie'
console.log(mandarin.transliterate('再见')); // 'zài jiàn'

// Complex sentences
console.log(mandarin.transliterate('我想学习中文')); 
// 'wǒ xiǎng xué xí zhōng wén'
```

### Example 2: Different Tone Formats
```javascript
import { createTransliterator } from './mandarin-pinyin/src/index.js';

const text = '你好世界';

// With tone marks (default)
const withTones = createTransliterator({ includeTones: true });
console.log(withTones.transliterate(text)); // 'nǐ hǎo shì jiè'

// Without tones
const noTones = createTransliterator({ includeTones: false });
console.log(noTones.transliterate(text)); // 'ni hao shi jie'

// Numerical tones
const numerical = createTransliterator({ numericalTones: true });
console.log(numerical.transliterate(text)); // 'ni3 hao3 shi4 jie4'
```

### Example 3: Text Analysis
```javascript
import { analyze } from './mandarin-pinyin/src/index.js';

const analysis = analyze('我今天很高兴，因为学会了中文！');

console.log('Original:', analysis.originalText);
console.log('Pinyin:', analysis.transliteration);
console.log('Chinese chars:', analysis.chineseCharacters);
console.log('Coverage:', (analysis.coverage * 100) + '%');
console.log('Difficulty:', analysis.difficulty.level);

// Character-by-character breakdown
analysis.characterBreakdown.forEach(char => {
  console.log(`${char.character} -> ${char.pinyin}`);
});
```

### Example 4: Batch Processing
```javascript
import { transliterateBatch } from './mandarin-pinyin/src/index.js';

const chineseNames = [
  '北京',
  '上海', 
  '广州',
  '深圳',
  '香港'
];

const pinyinNames = transliterateBatch(chineseNames);
pinyinNames.forEach((pinyin, index) => {
  console.log(`${chineseNames[index]} -> ${pinyin}`);
});
// 北京 -> běi jīng
// 上海 -> shàng hǎi
// 广州 -> guǎng zhōu
// 深圳 -> shēn zhèn  
// 香港 -> xiāng gǎng
```

## 🧪 Testing

Run the comprehensive test suite:

```javascript
// Run basic examples
import './mandarin-pinyin/examples/basic-usage.js';

// Run full test suite
import './mandarin-pinyin/examples/test.js';
```

The test suite covers:
- Basic transliteration
- Custom options
- Edge cases and error handling
- Performance testing
- Utility functions
- Mixed text handling

## 📊 Character Coverage

The library includes:
- **1000+** common Simplified Chinese characters
- **200+** common phrases and expressions
- Numbers, colors, family terms, time expressions
- Food, places, emotions, actions
- Educational and technology terms

Coverage areas:
- HSK Level 1-4 vocabulary
- Common daily conversation
- Basic business and academic terms
- Geographic names (China, major cities)
- Cultural terms and expressions

## ⚙️ Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `includeTones` | boolean | `true` | Include tone marks (ā, á, ǎ, à) |
| `numericalTones` | boolean | `false` | Use numerical tones (1,2,3,4) |
| `addSpaces` | boolean | `true` | Add spaces between syllables |
| `lowercase` | boolean | `true` | Convert output to lowercase |
| `showUntranslated` | boolean | `false` | Show [char] for unknown characters |
| `wordFirst` | boolean | `true` | Try phrase matching before character-level |
| `preservePunctuation` | boolean | `true` | Keep original punctuation |

## 🔧 Browser Compatibility

- Modern browsers with ES6 module support
- Chrome 61+, Firefox 60+, Safari 11+, Edge 16+
- Node.js 12+ with ES modules enabled

## 📚 Library Structure

```
mandarin-pinyin/
├── src/
│   ├── index.js          # Main API interface
│   ├── transliterator.js # Core transliteration engine
│   └── utils.js          # Utility functions
├── data/
│   └── chinese-characters.js # Character and phrase mappings
├── examples/
│   ├── basic-usage.js    # Usage examples
│   └── test.js          # Comprehensive test suite
└── README.md            # This file
```

## 🤝 Contributing

This library is designed to be comprehensive and extensible. Key areas for contribution:
- Adding more character mappings
- Improving phrase recognition
- Enhanced word segmentation algorithms
- Performance optimizations

## 📄 License

This library is provided as-is for educational and development purposes.

## 🙋‍♂️ Support

For issues, questions, or feature requests, please refer to the test suite and examples for comprehensive usage patterns.

## 📈 Performance

- **Small footprint**: ~50KB for core library
- **Fast processing**: 1000+ characters per second
- **Memory efficient**: Optimized lookup tables
- **No dependencies**: Pure JavaScript implementation

---

*Built with ❤️ for the Chinese language learning community*