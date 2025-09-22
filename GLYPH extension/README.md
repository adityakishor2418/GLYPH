# GLYPH Extension

⚡ Instant AI Transliterator Chrome Extension

## Installation

1. Load unpacked extension in Chrome (`chrome://extensions/`)
2. Enable Developer mode and select this folder
3. Click extension icon to configure

## Usage

- **Toggle**: Ctrl+Shift+T or click extension icon
- **Process Selected Text**: Ctrl+Shift+P
- **Test**: Open `quick-test.html` or `test.html`

## Configuration

- **AI Mode**: Requires API keys (OpenAI, Anthropic, Google, etc.)
- **Free Mode**: Uses free translation services (Google Translate, MyMemory, LibreTranslate)

## Core Files

- `manifest.json` - Extension configuration
- `background.js` - Service worker for API handling  
- `content.js` - Instant text processing engine
- `popup.html/js` - Main interface
- `options.html/js` - Settings page

## 🚀 Features

### 🤖 Advanced AI Processing
- **Multiple AI Providers**: OpenAI GPT, Anthropic Claude, Google Gemini, Cohere, Together AI
- **Smart Transliteration**: Context-aware transliteration preserving meaning and pronunciation
- **Intelligent Translation**: High-quality translation between 20+ languages
- **Text Enhancement**: Improve grammar, clarity, and style
- **Content Summarization**: Create concise summaries of long text

### ⚡ Real-time Auto Processing
- **Auto Transliteration**: Automatically process all text on any webpage
- **Smart Detection**: Intelligently detect and process relevant text content
- **Live Processing**: Real-time processing of dynamically added content
- **Visual Indicators**: Clear visual feedback during processing
- **Batch Processing**: Efficient handling of large amounts of text

### 🌐 Multiple Translation APIs
- **AI-Powered**: Premium quality using advanced AI models (requires API key)
- **Free Translation**: No API key required, uses free translation services
  - Google Translate (free)
  - MyMemory Translation
  - LibreTranslate
- **Language Support**: 20+ languages including Hindi, Bengali, Tamil, Chinese, Japanese, Arabic, and more

### 🎯 Smart Controls
- **Keyboard Shortcuts**: Ctrl+Shift+T (toggle), Ctrl+Shift+P (process selection)
- **Context Menu**: Right-click options for quick processing
- **Selection Processing**: Process any selected text instantly
- **Mode Switching**: Toggle between AI and free translation modes

### ⚙️ Advanced Configuration
- **Provider Management**: Configure multiple AI providers simultaneously
- **Custom Prompts**: Override default prompts for specific needs
- **Processing Settings**: Adjust temperature, max tokens, and other parameters
- **Element Filtering**: Exclude specific elements from auto-processing
- **Export/Import**: Backup and restore your settings

## 🛠️ Installation

### Development Installation

1. **Clone or Download**
   ```bash
   git clone <repository-url>
   cd ai-auto-transliterator-pro
   ```

2. **Load in Chrome**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked" and select the project directory
   - The extension will appear in your extensions list

### Production Installation
*Coming soon: Chrome Web Store listing*

## 🔧 Setup & Configuration

### 1. API Key Configuration (for AI features)

#### OpenAI
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Copy the key (starts with `sk-`)
4. Paste in extension settings

#### Google Gemini
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create an API key
3. Copy the key (starts with `AI`)
4. Paste in extension settings

#### Anthropic Claude
1. Visit [Anthropic Console](https://console.anthropic.com/)
2. Generate an API key
3. Copy the key (starts with `sk-ant-`)
4. Paste in extension settings

#### Cohere
1. Visit [Cohere Dashboard](https://dashboard.cohere.ai/api-keys)
2. Generate an API key
3. Copy and paste in extension settings

#### Together AI
1. Visit [Together AI](https://api.together.xyz/settings/api-keys)
2. Create an API key
3. Copy and paste in extension settings

### 2. Processing Mode Selection

**AI Transliteration Mode** (Recommended)
- Best quality results
- Context-aware processing
- Preserves meaning and nuance
- Requires API key

**Free Translation Mode**
- No API key required
- Good quality translation
- Works with free APIs
- Perfect for basic needs

## 💡 Usage

### Auto Transliteration
1. Click the extension icon
2. Select your source and target languages
3. Choose processing mode (AI or Free)
4. Click "Enable Auto Transliteration"
5. All text on the page will be processed automatically

### Manual Processing
1. Select any text on a webpage
2. Press `Ctrl+Shift+P` or click the extension icon
3. Choose an action (Transliterate, Translate, Improve, Summarize)
4. The selected text will be processed and replaced

### Keyboard Shortcuts
- **Ctrl+Shift+T**: Toggle auto transliteration on/off
- **Ctrl+Shift+P**: Process selected text
- **Right-click menu**: Quick access to processing options

### Advanced Settings
- Click "Advanced Settings" in the popup
- Configure multiple API providers
- Set custom prompts and parameters
- Export/import your settings
- Adjust processing behavior

## 🌍 Supported Languages

### Input Languages
- **Indian Languages**: Hindi (हिन्दी), Bengali (বাংলা), Tamil (தமிழ்), Telugu (తెలుగు), Marathi (मराठी), Gujarati (ગુજરાતી), Kannada (ಕನ್ನಡ), Malayalam (മലയാളം), Punjabi (ਪੰਜਾਬੀ), Odia (ଓଡିଆ), Urdu (اردو), Assamese (অসমীয়া)
- **East Asian**: Chinese (中文), Japanese (日本語), Korean (한국어)
- **Middle Eastern**: Arabic (العربية)
- **European**: Russian (русский), French (français), German (Deutsch), Spanish (español)
- **Auto-detection**: Automatically detect source language

### Output Languages
- All the above languages plus English as the primary target
- Smart language pair detection
- Contextual translation based on content

## 🛡️ Privacy & Security

- **Local Storage**: All API keys stored locally in Chrome's secure storage
- **No Data Collection**: No text or usage data sent to external servers except chosen AI providers
- **Secure Processing**: All communication encrypted via HTTPS
- **No Tracking**: No analytics or user tracking implemented
- **Offline Capable**: Core functionality works without internet (except AI processing)

## 🔧 Technical Details

### Architecture
- **Content Script**: Handles DOM manipulation and text processing
- **Background Service**: Manages API calls and provider communication
- **Popup Interface**: User controls and settings
- **Options Page**: Advanced configuration and management

### Processing Features
- **Smart Text Detection**: Ignores code, scripts, and UI elements
- **Batch Processing**: Efficient handling of multiple text nodes
- **Queue Management**: Prevents overwhelming APIs with requests
- **Error Handling**: Graceful fallback and retry mechanisms
- **Visual Feedback**: Real-time processing indicators

### Performance Optimizations
- **Lazy Loading**: Process text only when needed
- **Debounced Processing**: Prevents excessive API calls
- **Memory Management**: Efficient cleanup of processed nodes
- **Selective Processing**: Skip already processed content

## 🚀 Advanced Usage

### Custom Prompts
Override default prompts in the options page:
```json
{
  "transliterate": "Convert this text to English script while preserving pronunciation: ",
  "translate": "Translate this text to fluent English: ",
  "improve": "Enhance this text for better clarity and style: ",
  "summarize": "Create a concise summary of this text: "
}
```

### Processing Settings
- **Max Tokens**: Control response length (100-4000)
- **Temperature**: Adjust creativity (0=focused, 1=creative)
- **Element Exclusion**: Skip specific HTML elements
- **Text Length Limits**: Set minimum and maximum text length for processing

### Automation Features
- **Auto-save Settings**: Automatically save changes
- **Background Processing**: Continue processing while browsing
- **Smart Retry**: Automatic retry on API failures
- **Rate Limiting**: Built-in rate limiting to prevent API quota exhaustion

## 🔍 Troubleshooting

### Common Issues

1. **Extension Not Working**
   - Check if extension is enabled in `chrome://extensions/`
   - Refresh the webpage after enabling
   - Check browser console for errors

2. **API Key Issues**
   - Verify API key is correct and has proper permissions
   - Check if you have sufficient credits/quota
   - Test the key using the "Test" button in settings

3. **Auto Transliteration Not Working**
   - Ensure API key is configured (for AI mode)
   - Check if auto-transliteration is enabled
   - Verify the page content isn't being blocked

4. **Poor Translation Quality**
   - Try switching to AI mode if using free translation
   - Adjust temperature settings for more creative results
   - Use custom prompts for specific use cases

### Support Resources
- Check the extension's options page for detailed settings
- Use the help dialog in the popup for quick reference
- Review browser console for detailed error messages

## 📈 Changelog

### Version 2.0.0 (Current)
- ✨ **New**: Real-time auto transliteration
- ✨ **New**: Multiple free translation APIs
- ✨ **New**: Advanced language support (20+ languages)
- ✨ **New**: Smart text detection and processing
- ✨ **New**: Visual processing indicators
- ✨ **New**: Keyboard shortcuts and context menu
- ✨ **New**: Enhanced options page with export/import
- ✨ **New**: Processing mode selection (AI vs Free)
- 🔧 **Improved**: Better error handling and retry logic
- 🔧 **Improved**: Enhanced UI with better language controls
- 🔧 **Improved**: Performance optimizations for large pages
- 🔧 **Improved**: Memory management and cleanup

### Version 1.0.0 (Previous)
- Initial release with basic AI text processing
- Support for 5 major AI providers
- Basic text processing actions
- Simple popup interface

## 🤝 Contributing

We welcome contributions! Please feel free to:
- Report bugs and issues
- Suggest new features
- Submit pull requests
- Improve documentation

### Development Setup
1. Clone the repository
2. Make your changes
3. Test thoroughly with different websites
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🙏 Acknowledgments

- Thanks to all AI providers for their excellent APIs
- Open source translation services for free alternatives
- Chrome Extension developers community for guidance
- Beta testers and early adopters for feedback

---

**Made with ❤️ for global communication and accessibility**

*Transform any webpage text instantly with the power of AI*