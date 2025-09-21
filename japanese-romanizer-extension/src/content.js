// Content script that detects Japanese text in the DOM and romanizes it
// Minimizes communication with background script

let isRomanizationEnabled = false;
const originalTextMap = new Map(); // Store original text for toggle functionality

// Simple Japanese character detection
function containsJapanese(text) {
    const japaneseRegex = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/;
    return japaneseRegex.test(text);
}

// Process text nodes and romanize Japanese text
function processTextNode(node) {
    if (!node.textContent || !containsJapanese(node.textContent)) {
        return;
    }
    
    const originalText = node.textContent;
    if (!originalTextMap.has(node)) {
        originalTextMap.set(node, originalText);
    }
    
    if (isRomanizationEnabled) {
        // Use romaji4j library to convert
        const romanizedText = Romaji4j.toRomaji(originalText);
        node.textContent = romanizedText;
    } else {
        node.textContent = originalTextMap.get(node) || originalText;
    }
}

// Walk through all text nodes in the document
function processAllTextNodes() {
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: function(node) {
                // Skip script and style elements
                const parent = node.parentElement;
                if (parent && (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE')) {
                    return NodeFilter.FILTER_REJECT;
                }
                return NodeFilter.FILTER_ACCEPT;
            }
        }
    );
    
    const textNodes = [];
    let node;
    while (node = walker.nextNode()) {
        textNodes.push(node);
    }
    
    textNodes.forEach(processTextNode);
}

// Toggle romanization
function toggleRomanization() {
    isRomanizationEnabled = !isRomanizationEnabled;
    processAllTextNodes();
    
    // Send minimal status update to background (optional)
    chrome.runtime.sendMessage({
        action: "transliterate",
        enabled: isRomanizationEnabled
    });
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "toggle") {
        toggleRomanization();
        sendResponse({ enabled: isRomanizationEnabled });
    }
});

// Initial processing when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        processAllTextNodes();
    });
} else {
    processAllTextNodes();
}