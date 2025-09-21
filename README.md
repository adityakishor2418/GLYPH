Extension that transliterates text into readable scripts set by the user

A Chrome extension that automatically detects and transliterates Japanese text on web pages to romaji (Latin/Roman alphabet). This extension uses the powerful WanaKana library to provide accurate Japanese text detection and romanization.

<img alt="Japanese Romanizer Extension" src="https://via.placeholder.com/640x400?text=Japanese+Romanizer+Demo">

Features

- One-Click Romanization: Toggle Japanese to romaji conversion with a single click
- Smart Detection: Automatically identifies Japanese characters (hiragana, katakana, and kanji)
- Mixed Text Support: Handles pages with mixed Japanese and non-Japanese content
- Preserves Original Text: Stores original text for restoration when disabled
- Dynamic Content Support: Works with dynamically loaded content using MutationObserver
- Kanji Support: Converts kanji characters to their romaji readings
- Enhanced Katakana Handling: Displays katakana in uppercase for visual distinction

Installation

From Source Code

- Clone this repository or download the source code (git clone https://github.com/adityakishor2418/rivendell/japanese-romanizer.git)
- Open Chrome and navigate to chrome://extensions/
- Enable "Developer mode" in the top-right corner
- Click "Load unpacked" and select the GLYPH SourceCode directory
- The extension should now appear in your Chrome toolbar

Usage

- Navigate to any webpage with Japanese text
- Click the Japanese Romanizer icon in your Chrome toolbar
- Toggle romanization on/off by clicking the "Enable Romanization" button
- View the converted text directly on the webpage
- Disable the romanization to restore the original text

How It Works

The extension utilizes several key components:

- Content Script: Scans the DOM for text nodes containing Japanese text
- WanaKana Library: Provides accurate Japanese detection and romanization
- Text Node Processing: Individually processes each text node to maintain document structure
- MutationObserver: Monitors for dynamically added content to ensure new text is processed
- Token-based Conversion: Uses tokenization for handling mixed Japanese/English content

Technical Details

Core Files

- manifest.json: Chrome extension configuration
- content.js: Text detection and romanization logic
- background.js: Extension lifecycle management
- popup.html/js: User interface for toggling functionality
- wanakana.js: Japanese text processing library

Permissions Used

- activeTab: Allows the extension to interact with the active tab
- scripting: Enables dynamic script execution in tabs

Dependencies

- WanaKana - A Japanese text detection and transliteration library

Limitations

- Cannot be used on Chrome internal pages (chrome:// URLs)
- Some complex text layouts might not be processed correctly
- Kanji with multiple readings might not always be transliterated with the correct reading

Credits

- WanaKana by Tofugu & WaniKani
- Extension developed by Team RIVENDELL

License

This project is licensed under the MIT License - see the LICENSE file for details.

Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

- Fork the repository
- Create your feature branch (git checkout -b feature/amazing-feature)
- Commit your changes (git commit -m 'Add some amazing feature')
- Push to the branch (git push origin feature/amazing-feature)
- Open a Pull Request

Feedback and Issues

If you encounter any issues or have suggestions for improvements, please file an issue in the GitHub repository.
