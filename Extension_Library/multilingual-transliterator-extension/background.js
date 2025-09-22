// Enhanced Multilingual Transliterator v2.0 - Background Script
console.log('🌍 Enhanced Multilingual Transliterator v2.0 - Background loaded');

// Extension installation and update handling
chrome.runtime.onInstalled.addListener((details) => {
    console.log('📦 Extension installed/updated:', details.reason);
    
    // Initialize default settings for 9 writing systems
    const defaultSettings = {
        enabled: true,
        languages: {
            arabic: { enabled: true, description: 'Arabic, Persian, Urdu' },
            russian: { enabled: true, description: 'Russian, Bulgarian, Serbian' },
            japanese: { enabled: true, description: 'Hiragana, Katakana, extended' },
            chinese: { enabled: true, description: 'Simplified & Traditional' },
            korean: { enabled: true, description: 'Hangul syllables' },
            hindi: { enabled: true, description: 'Devanagari script' },
            greek: { enabled: true, description: 'Modern Greek with diacritics' },
            hebrew: { enabled: true, description: 'Hebrew with nikud' },
            thai: { enabled: true, description: 'Thai with tone marks' }
        },
        autoDetection: true,
        showNotifications: true
    };
    
    // Set default settings if not already exists
    chrome.storage.sync.get(['transliteratorSettings'], (result) => {
        if (!result.transliteratorSettings) {
            chrome.storage.sync.set({ transliteratorSettings: defaultSettings });
            console.log('✅ Default settings initialized');
        }
    });
    
    // Show welcome notification for new installations
    if (details.reason === 'install') {
        chrome.notifications?.create({
            type: 'basic',
            iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiIGZpbGw9IiNGRjk4MDAiLz4KPHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSI4IiB5PSI4Ij4KPHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9zdmc+',
            title: 'Enhanced Multilingual Transliterator Installed!',
            message: '9 writing systems supported! Real-time phonetic transliteration for Arabic, Russian, Japanese, Chinese, Korean, Hindi, Greek, Hebrew, and Thai.'
        });
    }
});

// Handle extension icon clicks
chrome.action.onClicked.addListener((tab) => {
    console.log('🖱️ Extension icon clicked for tab:', tab.id);
    
    // Toggle extension state for current tab
    chrome.storage.sync.get(['transliteratorSettings'], (result) => {
        const settings = result.transliteratorSettings || {};
        const newState = !settings.enabled;
        
        chrome.storage.sync.set({
            transliteratorSettings: { ...settings, enabled: newState }
        });
        
        // Send message to content script
        chrome.tabs.sendMessage(tab.id, {
            action: 'toggleTransliterator',
            enabled: newState
        }).catch(() => {
            console.log('ℹ️ Content script not ready yet');
        });
        
        // Show notification
        chrome.notifications?.create({
            type: 'basic',
            iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiIGZpbGw9IiNGRjk4MDAiLz4KPHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSI4IiB5PSI4Ij4KPHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9zdmc+',
            title: 'Multilingual Transliterator',
            message: newState ? '🟢 Extension started - Real-time transliteration active' : '🔴 Extension stopped - Transliteration paused'
        });
    });
});

// Handle messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('📨 Message received:', request.action);
    
    switch (request.action) {
        case 'getSettings':
            chrome.storage.sync.get(['transliteratorSettings'], (result) => {
                sendResponse(result.transliteratorSettings || {});
            });
            return true;
            
        case 'updateSettings':
            chrome.storage.sync.set({ 
                transliteratorSettings: request.settings 
            }, () => {
                sendResponse({ success: true });
            });
            return true;
            
        case 'reportStats':
            console.log('📊 Transliteration stats:', {
                detectedLanguages: request.languages,
                textProcessed: request.textLength,
                transliterationsCount: request.count
            });
            break;
    }
});