# Japanese Romanizer Chrome Extension

This Chrome extension transliterates Japanese text into Romanized text using the romaji4j library. It detects Japanese text in the DOM of web pages and replaces it with its Romanized equivalent.

## Features

- Automatically detects Japanese text on web pages.
- Uses the romaji4j library for accurate transliteration.
- Minimal communication between background and content scripts to enhance performance.

## Project Structure

```
japanese-romanizer-extension
├── src
│   ├── background.js       # Background script managing extension lifecycle
│   ├── content.js          # Content script for DOM manipulation
│   ├── popup.html          # HTML structure for the popup interface
│   ├── popup.js            # JavaScript logic for the popup
│   ├── popup.css           # Styles for the popup interface
│   └── lib
│       └── romaji4j.js    # Library for transliterating Japanese text
├── icons
│   ├── icon16.png         # 16x16 pixel icon for the extension
│   ├── icon48.png         # 48x48 pixel icon for the extension
│   └── icon128.png        # 128x128 pixel icon for the extension
├── manifest.json           # Configuration file for the Chrome extension
└── README.md               # Documentation for the project
```

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/jikyo/romaji4j.git
   ```
2. Navigate to the `GLYPH SourceCode` directory.
3. Open Chrome and go to `chrome://extensions/`.
4. Enable "Developer mode" in the top right corner.
5. Click on "Load unpacked" and select the `japanese-romanizer-extension` directory.

## Usage

1. After installation, click on the extension icon in the Chrome toolbar.
2. The popup interface will appear. Click the button to start the transliteration process.
3. The extension will automatically detect and replace Japanese text on the current web page with its Romanized version.

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes. 

## License

This project is licensed under the MIT License.
