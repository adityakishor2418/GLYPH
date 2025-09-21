/* GLyPh Web3 Chrome Extension Website - JavaScript */

// Advanced Translation Engine with Transliteration
class TranslationEngine {
    constructor() {
        this.transliterationMaps = this.initializeTransliterationMaps();
        this.sampleTranslations = this.initializeSampleData();
    }

    initializeTransliterationMaps() {
        return {
            hi: { // Hindi to Roman
                'क': 'k', 'ख': 'kh', 'ग': 'g', 'घ': 'gh', 'ङ': 'ng',
                'च': 'ch', 'छ': 'chh', 'ज': 'j', 'झ': 'jh', 'ञ': 'ny',
                'ट': 't', 'ठ': 'th', 'ड': 'd', 'ढ': 'dh', 'ण': 'n',
                'त': 't', 'थ': 'th', 'द': 'd', 'ध': 'dh', 'न': 'n',
                'प': 'p', 'फ': 'ph', 'ब': 'b', 'भ': 'bh', 'म': 'm',
                'य': 'y', 'र': 'r', 'ल': 'l', 'व': 'v', 'श': 'sh',
                'ष': 'sh', 'स': 's', 'ह': 'h',
                'ा': 'aa', 'ि': 'i', 'ी': 'ii', 'ु': 'u', 'ू': 'uu',
                'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au', '्': ''
            },
            ar: { // Arabic to Roman (simplified)
                'ا': 'a', 'ب': 'b', 'ت': 't', 'ث': 'th', 'ج': 'j',
                'ح': 'h', 'خ': 'kh', 'د': 'd', 'ذ': 'dh', 'ر': 'r',
                'ز': 'z', 'س': 's', 'ش': 'sh', 'ص': 's', 'ض': 'd',
                'ط': 't', 'ظ': 'z', 'ع': 'a', 'غ': 'gh', 'ف': 'f',
                'ق': 'q', 'ك': 'k', 'ل': 'l', 'م': 'm', 'ن': 'n',
                'ه': 'h', 'و': 'w', 'ي': 'y'
            }
        };
    }

    initializeSampleData() {
        return {
            'What will happen next?': {
                hi: {
                    translation: 'क्या होगा आगे?',
                    transliteration: 'kya hoga aage?',
                    pronunciation: 'kya ho-ga aa-ge?'
                },
                ar: {
                    translation: 'ماذا سيحدث بعد ذلك؟',
                    transliteration: 'madha sayahduth baad dhalik?',
                    pronunciation: 'maa-dha sa-ya-hduth baad dha-lik?'
                },
                ja: {
                    translation: '次に何が起こるでしょうか？',
                    transliteration: 'tsugi ni nani ga okoru deshou ka?',
                    pronunciation: 'tsu-gi ni na-ni ga o-ko-ru de-shou ka?'
                },
                zh: {
                    translation: '接下来会发生什么？',
                    transliteration: 'jiēxiàlái huì fāshēng shénme?',
                    pronunciation: 'jie-xia-lai hui fa-sheng shen-me?'
                }
            },
            'Hello, how are you?': {
                hi: {
                    translation: 'नमस्ते, आप कैसे हैं?',
                    transliteration: 'namaste, aap kaise hain?',
                    pronunciation: 'na-mas-te, aap kai-se hain?'
                },
                ar: {
                    translation: 'مرحبا، كيف حالك؟',
                    transliteration: 'marhaban, kayf halak?',
                    pronunciation: 'mar-ha-ban, kayf ha-lak?'
                },
                ja: {
                    translation: 'こんにちは、元気ですか？',
                    transliteration: 'konnichiwa, genki desu ka?',
                    pronunciation: 'kon-ni-chi-wa, gen-ki de-su ka?'
                },
                zh: {
                    translation: '你好，你好吗？',
                    transliteration: 'nǐhǎo, nǐ hǎo ma?',
                    pronunciation: 'ni-hao, ni hao ma?'
                },
                ko: {
                    translation: '안녕하세요, 어떻게 지내세요?',
                    transliteration: 'annyeonghaseyo, eotteoke jinaeseyo?',
                    pronunciation: 'an-nyeong-ha-se-yo, eo-tteo-ke ji-nae-se-yo?'
                }
            },
            'Thank you very much': {
                hi: {
                    translation: 'बहुत धन्यवाद',
                    transliteration: 'bahut dhanyawad',
                    pronunciation: 'ba-hut dhan-ya-waad'
                },
                ar: {
                    translation: 'شكرا جزيلا',
                    transliteration: 'shukran jazeelan',
                    pronunciation: 'shuk-ran ja-zee-lan'
                },
                ja: {
                    translation: 'どうもありがとうございます',
                    transliteration: 'doumo arigatou gozaimasu',
                    pronunciation: 'dou-mo a-ri-ga-tou go-za-i-ma-su'
                },
                zh: {
                    translation: '非常感谢',
                    transliteration: 'fēicháng gǎnxiè',
                    pronunciation: 'fei-chang gan-xie'
                }
            },
            'I would like to schedule a meeting': {
                hi: {
                    translation: 'मैं एक मीटिंग शेड्यूल करना चाहूंगा',
                    transliteration: 'main ek meeting schedule karna chahunga',
                    pronunciation: 'main ek mee-ting sche-du-le kar-na cha-hun-ga'
                },
                ja: {
                    translation: '会議をスケジュールしたいと思います',
                    transliteration: 'kaigi wo sukejuuru shitai to omoimasu',
                    pronunciation: 'kai-gi wo su-ke-juu-ru shi-tai to o-mo-i-ma-su'
                }
            },
            'Where is the nearest hotel?': {
                zh: {
                    translation: '最近的酒店在哪里？',
                    transliteration: 'zuìjìn de jiǔdiàn zài nǎlǐ?',
                    pronunciation: 'zui-jin de jiu-dian zai na-li?'
                },
                ko: {
                    translation: '가장 가까운 호텔은 어디에 있나요?',
                    transliteration: 'gajang gakkaun hoteureun eodie innayo?',
                    pronunciation: 'ga-jang gak-ka-un ho-te-eul-eun eo-di-e in-na-yo?'
                }
            },
            'This food is delicious': {
                ko: {
                    translation: '이 음식은 맛있습니다',
                    transliteration: 'i eumsik-eun mas-issseumnida',
                    pronunciation: 'i eum-sik-eun ma-si-sseum-ni-da'
                },
                ja: {
                    translation: 'この食べ物は美味しいです',
                    transliteration: 'kono tabemono wa oishii desu',
                    pronunciation: 'ko-no ta-be-mo-no wa o-i-shi-i de-su'
                }
            }
        };
    }

    async translateText(text, sourceLanguage, targetLanguage, options = {}) {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // For demo purposes, use sample data
        const sampleData = this.sampleTranslations[text];
        if (sampleData && sampleData[targetLanguage]) {
            return {
                original: text,
                translation: sampleData[targetLanguage].translation,
                transliteration: options.includeTransliteration ? sampleData[targetLanguage].transliteration : null,
                pronunciation: options.includePronunciation ? sampleData[targetLanguage].pronunciation : null,
                sourceLanguage,
                targetLanguage,
                confidence: 0.98
            };
        }

        // Fallback for unsupported text
        return {
            original: text,
            translation: `[Translated to ${targetLanguage}] ${text}`,
            transliteration: options.includeTransliteration ? this.generateTransliteration(text, targetLanguage) : null,
            pronunciation: options.includePronunciation ? this.generatePronunciation(text, targetLanguage) : null,
            sourceLanguage,
            targetLanguage,
            confidence: 0.85
        };
    }

    generateTransliteration(text, targetLanguage) {
        // Basic transliteration logic
        const map = this.transliterationMaps[targetLanguage];
        if (!map) return text.toLowerCase();
        
        let result = text;
        for (const [native, roman] of Object.entries(map)) {
            result = result.replace(new RegExp(native, 'g'), roman);
        }
        return result;
    }

    generatePronunciation(text, targetLanguage) {
        // Generate pronunciation guide
        const syllables = text.toLowerCase().split(' ').map(word => {
            if (word.length > 3) {
                const mid = Math.floor(word.length / 2);
                return word.substring(0, mid) + '-' + word.substring(mid);
            }
            return word;
        });
        return syllables.join(' ');
    }
}

// Web3 and Application State
class GLyPhApp {
    constructor() {
        this.web3 = null;
        this.isWeb3Enabled = false;
        this.connectedAccount = null;
        this.chainId = null;
        this.extensionVersion = "3.2.1";
        this.downloadCount = 0;
        this.isLoading = false;
        this.supportedLanguages = 120;
        this.translationAccuracy = 98;
        this.theme = 'light'; // Default theme
        this.themeMode = 'auto'; // 'light', 'dark', or 'auto'
        
        // Translation Engine
        this.translationEngine = new TranslationEngine();
        
        // Initialize the application
        this.init();
    }

    async init() {
        try {
            // Initialize theme first
            this.initializeTheme();
            
            // Initialize UI components
            this.initializeUI();
            
            // Check for Web3 provider
            await this.checkWeb3Provider();
            
            // Set up event listeners
            this.setupEventListeners();
            
            // Initialize animations
            this.initializeAnimations();
            
            // Load initial data
            await this.loadInitialData();
            
            console.log("GLyPh App initialized successfully");
        } catch (error) {
            console.error("Error initializing GLyPh App:", error);
        }
    }

    // Theme Management
    initializeTheme() {
        // Get saved theme mode preference or default to 'auto'
        const savedMode = localStorage.getItem('glyph-theme-mode') || 'auto';
        this.themeMode = savedMode;
        
        if (savedMode === 'auto') {
            // Use system preference
            const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.theme = systemPrefersDark ? 'dark' : 'light';
            this.applyTheme(this.theme, false); // Don't save to localStorage for auto mode
        } else {
            // Use saved manual preference
            this.theme = savedMode;
            this.applyTheme(this.theme, false);
        }
        
        // Listen for system theme changes
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', (e) => {
                // Only auto-switch if user is in auto mode
                if (this.themeMode === 'auto') {
                    const newTheme = e.matches ? 'dark' : 'light';
                    this.theme = newTheme;
                    this.applyTheme(newTheme, false); // Don't save to localStorage
                    this.updateThemeToggleButton();
                }
            });
        }
        
        // Update theme toggle button and footer buttons
        this.updateThemeToggleButton();
    }

    applyTheme(theme, savePreference = true) {
        // Use Tailwind's dark mode class system
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        
        this.theme = theme;
        
        // Only save to localStorage if explicitly requested (user manually changed)
        if (savePreference) {
            localStorage.setItem('glyph-theme', theme);
        }
    }

    toggleTheme() {
        const newTheme = this.theme === 'light' ? 'dark' : 'light';
        
        // When user manually toggles, switch from auto mode to manual mode
        this.setThemeMode(newTheme);
        
        // Add smooth transition animation
        document.documentElement.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.documentElement.style.transition = '';
        }, 300);
    }

    updateThemeToggleButton() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                if (this.theme === 'dark') {
                    icon.className = 'fas fa-sun';
                    themeToggle.setAttribute('aria-label', 'Switch to light mode');
                } else {
                    icon.className = 'fas fa-moon';
                    themeToggle.setAttribute('aria-label', 'Switch to dark mode');
                }
            }
        }
        
        // Update footer theme buttons
        this.updateThemeButtons();
    }

    // New theme management methods for footer controls
    setThemeMode(mode) {
        this.themeMode = mode;
        localStorage.setItem('glyph-theme-mode', mode);

        if (mode === 'auto') {
            // Remove manual theme preference and use system preference
            localStorage.removeItem('glyph-theme');
            const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            const newTheme = systemPrefersDark ? 'dark' : 'light';
            this.theme = newTheme;
            this.applyTheme(newTheme, false); // Don't save to localStorage
        } else {
            // Set specific theme and save preference
            this.theme = mode;
            this.applyTheme(mode, true);
        }

        this.updateThemeToggleButton();
        this.showNotification(`Theme set to ${mode}`, 'success');
    }

    updateThemeButtons() {
        const buttons = {
            light: document.getElementById('theme-light'),
            auto: document.getElementById('theme-auto'),
            dark: document.getElementById('theme-dark')
        };

        // Reset all buttons
        Object.values(buttons).forEach(btn => {
            if (btn) {
                btn.classList.remove('bg-blue-600', 'text-white');
                btn.classList.add('text-gray-400', 'hover:text-white', 'hover:bg-gray-700');
            }
        });

        // Highlight active button
        const activeButton = buttons[this.themeMode];
        if (activeButton) {
            activeButton.classList.remove('text-gray-400', 'hover:text-white', 'hover:bg-gray-700');
            activeButton.classList.add('bg-blue-600', 'text-white');
        }
    }

    // Web3 Integration
    async checkWeb3Provider() {
        if (typeof window.ethereum !== 'undefined') {
            this.web3 = new Web3(window.ethereum);
            this.isWeb3Enabled = true;
            console.log("Web3 provider detected");
            
            // Check if already connected
            try {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts.length > 0) {
                    this.connectedAccount = accounts[0];
                    this.updateWalletUI(true);
                }
            } catch (error) {
                console.error("Error checking connected accounts:", error);
            }
        } else {
            console.log("No Web3 provider detected");
            this.updateWalletUI(false);
        }
    }

    async connectWallet() {
        if (!this.isWeb3Enabled) {
            this.showNotification("Please install MetaMask or another Web3 wallet", "error");
            return;
        }

        try {
            this.showLoading(true, "Connecting to wallet...");
            
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });
            
            this.connectedAccount = accounts[0];
            
            // Get network info
            this.chainId = await window.ethereum.request({
                method: 'eth_chainId'
            });
            
            this.updateWalletUI(true);
            this.showNotification("Wallet connected successfully!", "success");
            
            // Store connection in localStorage
            localStorage.setItem('walletConnected', 'true');
            localStorage.setItem('connectedAccount', this.connectedAccount);
            
        } catch (error) {
            console.error("Error connecting wallet:", error);
            this.showNotification("Failed to connect wallet", "error");
        } finally {
            this.showLoading(false);
        }
    }

    async disconnectWallet() {
        this.connectedAccount = null;
        this.updateWalletUI(false);
        localStorage.removeItem('walletConnected');
        localStorage.removeItem('connectedAccount');
        this.showNotification("Wallet disconnected", "info");
    }

    updateWalletUI(connected) {
        const walletBtn = document.getElementById('walletConnect');
        const walletText = walletBtn.querySelector('.wallet-text');
        
        // For translation extension, this button shows translation demo
        walletText.textContent = 'Try Translation';
        walletBtn.onclick = () => this.showTranslationDemo();
    }

    showTranslationDemo() {
        const modal = document.createElement('div');
        modal.className = 'translation-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>🌐 Translation Demo</h2>
                    <button class="close-btn" onclick="this.parentElement.parentElement.parentElement.remove()">✕</button>
                </div>
                <div class="modal-body">
                    <div class="demo-interface">
                        <div class="demo-section">
                            <h3>Try Live Translation</h3>
                            <div class="translation-example">
                                <div class="input-section">
                                    <label>Original Text (Spanish):</label>
                                    <div class="demo-text original">¡Hola! ¿Cómo estás? Me gusta mucho este sitio web.</div>
                                </div>
                                <div class="arrow-section">
                                    <div class="translate-arrow">⬇️</div>
                                    <button class="translate-btn" onclick="this.closest('.translation-example').classList.add('translated')">
                                        Translate
                                    </button>
                                </div>
                                <div class="output-section">
                                    <label>Translated Text (English):</label>
                                    <div class="demo-text translated-result">Hello! How are you? I really like this website.</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="demo-features-list">
                            <div class="demo-feature">
                                <span class="feature-icon">⚡</span>
                                <span>Instant translation in under 100ms</span>
                            </div>
                            <div class="demo-feature">
                                <span class="feature-icon">🎯</span>
                                <span>98% accuracy with context awareness</span>
                            </div>
                            <div class="demo-feature">
                                <span class="feature-icon">🔒</span>
                                <span>Privacy-first: translations happen locally</span>
                            </div>
                            <div class="demo-feature">
                                <span class="feature-icon">🌍</span>
                                <span>Support for 120+ languages</span>
                            </div>
                        </div>
                        
                        <div class="demo-cta">
                            <button class="demo-download-btn" onclick="app.downloadExtension('chrome-store')">
                                Download GLyPh Extension
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    getNetworkName(chainId) {
        const networks = {
            '0x1': 'Ethereum Mainnet',
            '0x89': 'Polygon',
            '0x38': 'Binance Smart Chain',
            '0xa4b1': 'Arbitrum One',
            '0xa': 'Optimism',
            '0x5': 'Goerli Testnet'
        };
        return networks[chainId] || 'Unknown Network';
    }

    // IPFS Integration
    async checkIPFSConnection() {
        try {
            // Simulate IPFS connection check
            const statusElement = document.getElementById('ipfsStatus');
            if (statusElement) {
                statusElement.innerHTML = `
                    <span class="status-dot connected"></span>
                    <span>Connected to IPFS</span>
                `;
            }
            return true;
        } catch (error) {
            console.error("IPFS connection failed:", error);
            const statusElement = document.getElementById('ipfsStatus');
            if (statusElement) {
                statusElement.innerHTML = `
                    <span class="status-dot disconnected"></span>
                    <span>IPFS unavailable</span>
                `;
            }
            return false;
        }
    }

    // Extension Download System
    async downloadExtension(method = 'chrome-store') {
        try {
            this.showLoading(true, "Preparing download...");
            
            // Track download analytics
            await this.trackDownload(method);
            
            if (method === 'chrome-store') {
                // Open Chrome Web Store - replace with your actual extension ID
                // For demo purposes, opening Chrome Web Store homepage
                window.open('https://chrome.google.com/webstore/category/extensions', '_blank');
                this.showNotification("Redirecting to Chrome Web Store...", "success");
            } else if (method === 'direct') {
                // Create and download a demo extension file
                this.createAndDownloadExtension();
                this.showNotification("Extension download started!", "success");
            }
            
        } catch (error) {
            console.error("Download failed:", error);
            this.showNotification("Download failed. Please try again.", "error");
        } finally {
            this.showLoading(false);
        }
    }

    createAndDownloadExtension() {
        // Create a demo extension package with manifest and basic files
        const manifest = {
            manifest_version: 3,
            name: "GLyPh Live Translation Extension",
            version: this.extensionVersion,
            description: "Revolutionary Chrome extension that provides real-time translation for any website, video, or text.",
            permissions: [
                "activeTab",
                "storage",
                "tabs"
            ],
            content_scripts: [{
                matches: ["<all_urls>"],
                js: ["content.js"],
                css: ["content.css"]
            }],
            background: {
                service_worker: "background.js"
            },
            action: {
                default_popup: "popup.html",
                default_title: "GLyPh Translator"
            },
            icons: {
                16: "icon16.png",
                48: "icon48.png",
                128: "icon128.png"
            }
        };

        const contentScript = `
// GLyPh Live Translation Content Script
console.log('GLyPh Extension Loaded!');

// Demo translation functionality
function initializeTranslation() {
    console.log('Translation system initialized');
    // Add your translation logic here
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTranslation);
} else {
    initializeTranslation();
}
        `;

        const popupHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { width: 300px; padding: 20px; font-family: Arial, sans-serif; }
        .header { text-align: center; margin-bottom: 20px; }
        .translate-btn { width: 100%; padding: 10px; background: #4285f4; color: white; border: none; border-radius: 5px; cursor: pointer; }
        .translate-btn:hover { background: #3367d6; }
    </style>
</head>
<body>
    <div class="header">
        <h2>🔗 GLyPh Translator</h2>
        <p>Real-time translation for any content</p>
    </div>
    <button class="translate-btn">Start Translation</button>
    <script src="popup.js"></script>
</body>
</html>
        `;

        // Create a ZIP-like structure (simplified for demo)
        const extensionData = {
            'manifest.json': JSON.stringify(manifest, null, 2),
            'content.js': contentScript,
            'popup.html': popupHtml,
            'README.md': `# GLyPh Live Translation Extension v${this.extensionVersion}

## Installation Instructions:
1. Open Chrome and navigate to chrome://extensions/
2. Enable "Developer mode" in the top right
3. Click "Load unpacked" 
4. Select the extracted GLyPh extension folder
5. The extension should now appear in your extensions list

## Features:
- Real-time webpage translation
- 120+ language support  
- AI-powered accuracy
- Privacy-first design

## Support:
For support and updates, visit our website.
            `
        };

        // Create downloadable file
        const blob = new Blob([JSON.stringify(extensionData, null, 2)], { 
            type: 'application/json' 
        });
        
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `glyph-extension-v${this.extensionVersion}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up the object URL
        setTimeout(() => URL.revokeObjectURL(url), 100);
    }

    // Advanced Translation Demo Methods
    async performTranslation() {
        const inputText = document.getElementById('inputText');
        const sourceLanguage = document.getElementById('sourceLanguage');
        const targetLanguage = document.getElementById('targetLanguage');
        const includeTransliteration = document.getElementById('includeTransliteration');
        const includePronunciation = document.getElementById('includePronunciation');
        const translateBtn = document.getElementById('translateBtn');
        const resultsDiv = document.getElementById('translationResults');

        if (!inputText || !sourceLanguage || !targetLanguage) {
            this.showNotification('Demo elements not found', 'error');
            return;
        }

        if (!inputText.value.trim()) {
            this.showNotification('Please enter text to translate', 'warning');
            inputText.focus();
            return;
        }

        // Update UI to show loading
        translateBtn.innerHTML = '<span class="mr-2">⏳</span>Translating...';
        translateBtn.disabled = true;

        // Add loading animation to results div
        resultsDiv.classList.remove('hidden');
        resultsDiv.innerHTML = `
            <div class="flex items-center justify-center p-8">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
                <span class="text-gray-600 dark:text-gray-300">Processing translation...</span>
            </div>
        `;

        try {
            const result = await this.translationEngine.translateText(
                inputText.value.trim(),
                sourceLanguage.value,
                targetLanguage.value,
                {
                    includeTransliteration: includeTransliteration ? includeTransliteration.checked : false,
                    includePronunciation: includePronunciation ? includePronunciation.checked : false
                }
            );

            this.displayTranslationResults(result);
            this.showNotification('Translation completed successfully!', 'success');
            
        } catch (error) {
            console.error('Translation error:', error);
            this.showNotification('Translation failed. Please try again.', 'error');
            resultsDiv.classList.add('hidden');
        } finally {
            // Reset button
            translateBtn.innerHTML = '<span class="mr-2">🔄</span>Translate & Transliterate';
            translateBtn.disabled = false;
        }
    }

    displayTranslationResults(result) {
        const resultsDiv = document.getElementById('translationResults');
        
        // Create the results HTML structure
        let resultsHTML = `
            <!-- Translation -->
            <div class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg mb-4">
                <div class="flex items-center justify-between mb-2">
                    <label class="text-sm font-medium text-green-800 dark:text-green-300">Translation</label>
                    <button onclick="app.copyToClipboard('${result.translation}', 'Translation')" class="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200 transition-colors" title="Copy translation">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
                            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
                        </svg>
                    </button>
                </div>
                <p class="text-lg text-green-900 dark:text-green-100 font-medium">${result.translation}</p>
                <div class="mt-2 flex items-center text-sm text-green-700 dark:text-green-300">
                    <div class="flex items-center mr-4">
                        <div class="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span>Confidence: ${Math.round(result.confidence * 100)}%</span>
                    </div>
                    <div class="flex items-center">
                        <span class="text-xs bg-green-100 dark:bg-green-800 px-2 py-1 rounded">${this.getLanguageName(result.sourceLanguage)} → ${this.getLanguageName(result.targetLanguage)}</span>
                    </div>
                </div>
            </div>`;

        // Add transliteration if available
        if (result.transliteration) {
            resultsHTML += `
                <div class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg mb-4">
                    <div class="flex items-center justify-between mb-2">
                        <label class="text-sm font-medium text-blue-800 dark:text-blue-300">Transliteration (Roman Script)</label>
                        <button onclick="app.copyToClipboard('${result.transliteration}', 'Transliteration')" class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors" title="Copy transliteration">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
                                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
                            </svg>
                        </button>
                    </div>
                    <p class="text-lg text-blue-900 dark:text-blue-100 font-medium italic">${result.transliteration}</p>
                    <div class="mt-2 text-sm text-blue-700 dark:text-blue-300">
                        <span class="text-xs bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">Roman script conversion</span>
                    </div>
                </div>`;
        }

        // Add pronunciation if available
        if (result.pronunciation) {
            resultsHTML += `
                <div class="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
                    <div class="flex items-center justify-between mb-2">
                        <label class="text-sm font-medium text-purple-800 dark:text-purple-300">Pronunciation Guide</label>
                        <div class="flex items-center space-x-2">
                            <button onclick="app.playPronunciation()" class="flex items-center space-x-1 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200 transition-colors bg-purple-100 dark:bg-purple-800 px-2 py-1 rounded text-xs" title="Play pronunciation">
                                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.814L4.75 14H2a1 1 0 01-1-1V7a1 1 0 011-1h2.75l3.633-2.814a1 1 0 011.617.814zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clip-rule="evenodd"></path>
                                </svg>
                                <span>Play</span>
                            </button>
                            <button onclick="app.copyToClipboard('${result.pronunciation}', 'Pronunciation')" class="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200 transition-colors" title="Copy pronunciation">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
                                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <p class="text-lg text-purple-900 dark:text-purple-100 font-medium">${result.pronunciation}</p>
                    <div class="mt-2 text-sm text-purple-700 dark:text-purple-300">
                        <span class="text-xs bg-purple-100 dark:bg-purple-800 px-2 py-1 rounded">Phonetic guide</span>
                    </div>
                </div>`;
        }

        // Add sample sentences if available
        resultsHTML += `
            <div class="mt-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Quick Sample Texts</h4>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <button onclick="app.loadSampleText('greeting')" class="text-xs bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-left">
                        <div class="font-medium text-gray-900 dark:text-white">Greeting</div>
                        <div class="text-gray-500 dark:text-gray-400">"Hello, how are you?"</div>
                    </button>
                    <button onclick="app.loadSampleText('thanks')" class="text-xs bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-left">
                        <div class="font-medium text-gray-900 dark:text-white">Thanks</div>
                        <div class="text-gray-500 dark:text-gray-400">"Thank you very much"</div>
                    </button>
                    <button onclick="app.loadSampleText('question')" class="text-xs bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-left">
                        <div class="font-medium text-gray-900 dark:text-white">Question</div>
                        <div class="text-gray-500 dark:text-gray-400">"What will happen next?"</div>
                    </button>
                </div>
            </div>`;

        resultsDiv.innerHTML = resultsHTML;
        resultsDiv.classList.remove('hidden');

        // Store result for pronunciation playback
        this.currentTranslationResult = result;

        // Animate results appearance
        setTimeout(() => {
            resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }

    playPronunciation() {
        if (!this.currentTranslationResult || !this.currentTranslationResult.pronunciation) {
            this.showNotification('No pronunciation data available', 'warning');
            return;
        }

        // Use Speech Synthesis API if available
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(this.currentTranslationResult.original);
            
            // Try to set the language
            const langCode = this.currentTranslationResult.sourceLanguage;
            const voiceLangMap = {
                'hi': 'hi-IN',
                'ar': 'ar-SA',
                'ja': 'ja-JP',
                'ko': 'ko-KR',
                'ru': 'ru-RU',
                'zh': 'zh-CN',
                'en': 'en-US'
            };
            
            utterance.lang = voiceLangMap[langCode] || 'en-US';
            utterance.rate = 0.8;
            utterance.pitch = 1;
            
            speechSynthesis.speak(utterance);
            this.showNotification('Playing pronunciation...', 'info');
        } else {
            // Fallback: show pronunciation guide
            this.showNotification(`Pronunciation: ${this.currentTranslationResult.pronunciation}`, 'info');
        }
    }

    // Sample text suggestions with enhanced functionality
    loadSampleText(sampleKey) {
        const inputText = document.getElementById('inputText');
        const sourceLanguage = document.getElementById('sourceLanguage');
        const targetLanguage = document.getElementById('targetLanguage');
        
        const samples = {
            'greeting': {
                text: 'Hello, how are you?',
                source: 'en',
                target: 'hi'
            },
            'thanks': {
                text: 'Thank you very much',
                source: 'en', 
                target: 'ar'
            },
            'question': {
                text: 'What will happen next?',
                source: 'en',
                target: 'hi'
            },
            'business': {
                text: 'I would like to schedule a meeting',
                source: 'en',
                target: 'ja'
            },
            'travel': {
                text: 'Where is the nearest hotel?',
                source: 'en',
                target: 'zh'
            },
            'food': {
                text: 'This food is delicious',
                source: 'en',
                target: 'ko'
            }
        };
        
        const sample = samples[sampleKey];
        if (inputText && sample) {
            inputText.value = sample.text;
            
            // Update language selections if elements exist
            if (sourceLanguage && sample.source) {
                sourceLanguage.value = sample.source;
            }
            if (targetLanguage && sample.target) {
                targetLanguage.value = sample.target;
            }
            
            // Auto-translate after a brief delay
            setTimeout(() => {
                this.performTranslation();
            }, 500);
            
            this.showNotification(`Sample text loaded: ${sampleKey}`, 'info');
        }
    }

    // Copy to clipboard functionality
    async copyToClipboard(text, label = 'Text') {
        try {
            await navigator.clipboard.writeText(text);
            this.showNotification(`${label} copied to clipboard!`, 'success');
        } catch (error) {
            // Fallback for browsers that don't support clipboard API
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            try {
                document.execCommand('copy');
                this.showNotification(`${label} copied to clipboard!`, 'success');
            } catch (err) {
                this.showNotification('Unable to copy to clipboard', 'error');
            }
            
            document.body.removeChild(textArea);
        }
    }

    // Get language display name
    getLanguageName(langCode) {
        const languages = {
            'en': 'English',
            'hi': 'Hindi',
            'ar': 'Arabic',
            'ja': 'Japanese',
            'ko': 'Korean',
            'zh': 'Chinese',
            'ru': 'Russian',
            'es': 'Spanish',
            'fr': 'French',
            'de': 'German',
            'it': 'Italian',
            'pt': 'Portuguese'
        };
        return languages[langCode] || langCode.toUpperCase();
    }

    async trackDownload(method) {
        // Simulate download tracking
        this.downloadCount++;
        
        // Store in localStorage for demo
        localStorage.setItem('downloadCount', this.downloadCount.toString());
        
        // In a real app, you'd send this to your analytics service
        console.log(`Download tracked: ${method}, Total: ${this.downloadCount}`);
    }

    // UI Interactions
    initializeUI() {
        // Mobile menu toggle
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Close mobile menu if open
                    if (navMenu.classList.contains('active')) {
                        hamburger.classList.remove('active');
                        navMenu.classList.remove('active');
                    }
                }
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    setupEventListeners() {
        // Theme toggle button (navbar)
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }

        // Theme settings buttons (footer)
        const themeLightBtn = document.getElementById('theme-light');
        const themeAutoBtn = document.getElementById('theme-auto');
        const themeDarkBtn = document.getElementById('theme-dark');

        if (themeLightBtn) {
            themeLightBtn.addEventListener('click', () => {
                this.setThemeMode('light');
            });
        }

        if (themeAutoBtn) {
            themeAutoBtn.addEventListener('click', () => {
                this.setThemeMode('auto');
            });
        }

        if (themeDarkBtn) {
            themeDarkBtn.addEventListener('click', () => {
                this.setThemeMode('dark');
            });
        }

        // Wallet connect button
        const walletBtn = document.getElementById('walletConnect');
        if (walletBtn) {
            walletBtn.addEventListener('click', () => {
                if (this.connectedAccount) {
                    this.showWalletMenu();
                } else {
                    this.connectWallet();
                }
            });
        }

        // Download buttons
        const primaryDownload = document.getElementById('primaryDownload');
        const chromeDownload = document.getElementById('chromeDownload');
        const directDownload = document.getElementById('directDownload');
        
        if (primaryDownload) {
            primaryDownload.addEventListener('click', () => this.downloadExtension('chrome-store'));
        }
        if (chromeDownload) {
            chromeDownload.addEventListener('click', () => this.downloadExtension('chrome-store'));
        }
        if (directDownload) {
            directDownload.addEventListener('click', () => this.downloadExtension('direct'));
        }

        // Translation Demo functionality
        const translateBtn = document.getElementById('translateBtn');
        if (translateBtn) {
            translateBtn.addEventListener('click', () => this.performTranslation());
        }

        // Auto-translate on input change (with debounce)
        const inputText = document.getElementById('inputText');
        if (inputText) {
            let debounceTimer;
            
            // Real-time translation with debounce
            inputText.addEventListener('input', () => {
                clearTimeout(debounceTimer);
                
                // Update character count
                const charCount = document.getElementById('charCount');
                if (charCount) {
                    charCount.textContent = inputText.value.length;
                }
                
                debounceTimer = setTimeout(() => {
                    if (inputText.value.trim() && inputText.value.trim().length > 2) {
                        this.performTranslation();
                    }
                }, 1500);
            });

            // Clear results when input is empty
            inputText.addEventListener('input', () => {
                if (!inputText.value.trim()) {
                    const resultsDiv = document.getElementById('translationResults');
                    if (resultsDiv) {
                        resultsDiv.classList.add('hidden');
                    }
                }
            });

            // Handle keyboard shortcuts
            inputText.addEventListener('keydown', (e) => {
                // Ctrl+Enter or Cmd+Enter to translate
                if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                    e.preventDefault();
                    this.performTranslation();
                }
                // Escape to clear
                if (e.key === 'Escape') {
                    inputText.value = '';
                    const resultsDiv = document.getElementById('translationResults');
                    if (resultsDiv) {
                        resultsDiv.classList.add('hidden');
                    }
                    // Update character count
                    const charCount = document.getElementById('charCount');
                    if (charCount) {
                        charCount.textContent = '0';
                    }
                }
            });
            
            // Initialize character count on page load
            const charCount = document.getElementById('charCount');
            if (charCount) {
                charCount.textContent = inputText.value.length;
            }
        }

        // Language change handlers with auto-translation
        const sourceLanguage = document.getElementById('sourceLanguage');
        const targetLanguage = document.getElementById('targetLanguage');
        
        if (sourceLanguage) {
            sourceLanguage.addEventListener('change', () => {
                const inputText = document.getElementById('inputText');
                if (inputText && inputText.value.trim()) {
                    this.showNotification(`Source language changed to ${this.getLanguageName(sourceLanguage.value)}`, 'info');
                    this.performTranslation();
                }
            });
        }

        if (targetLanguage) {
            targetLanguage.addEventListener('change', () => {
                const inputText = document.getElementById('inputText');
                if (inputText && inputText.value.trim()) {
                    this.showNotification(`Target language changed to ${this.getLanguageName(targetLanguage.value)}`, 'info');
                    this.performTranslation();
                }
            });
        }

        // Translation options change handlers
        const includeTransliteration = document.getElementById('includeTransliteration');
        const includePronunciation = document.getElementById('includePronunciation');
        const preserveOriginalScript = document.getElementById('preserveOriginalScript');

        [includeTransliteration, includePronunciation, preserveOriginalScript].forEach(checkbox => {
            if (checkbox) {
                checkbox.addEventListener('change', () => {
                    const inputText = document.getElementById('inputText');
                    if (inputText && inputText.value.trim()) {
                        this.performTranslation();
                    }
                });
            }
        });

        // Language swap functionality
        this.addLanguageSwapButton();
        
        // Pronunciation playback (handled by displayTranslationResults)
        // Sample text buttons (handled by loadSampleText method)

        // Learn more button
        const learnMore = document.getElementById('learnMore');
        if (learnMore) {
            learnMore.addEventListener('click', () => {
                document.getElementById('features').scrollIntoView({
                    behavior: 'smooth'
                });
            });
        }

        // Governance button
        const govBtn = document.getElementById('govBtn');
        if (govBtn) {
            govBtn.addEventListener('click', () => this.showGovernanceModal());
        }

        // Listen for account changes
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts) => {
                if (accounts.length === 0) {
                    this.disconnectWallet();
                } else {
                    this.connectedAccount = accounts[0];
                    this.updateWalletUI(true);
                }
            });

            window.ethereum.on('chainChanged', (chainId) => {
                this.chainId = chainId;
                this.showNotification(`Switched to ${this.getNetworkName(chainId)}`, "info");
            });
        }
    }

    // Animations and Counters
    initializeAnimations() {
        // Animate counter numbers
        this.animateCounters();
        
        // Intersection Observer for animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1
        });

        // Observe elements for animation
        document.querySelectorAll('.feature-card, .download-card, .web3-card').forEach(el => {
            observer.observe(el);
        });
    }

    animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 100;
            let count = 0;
            
            const updateCounter = () => {
                if (count < target) {
                    count += increment;
                    counter.textContent = Math.ceil(count);
                    setTimeout(updateCounter, 20);
                } else {
                    counter.textContent = target;
                }
            };
            
            // Start animation when element is in view
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    updateCounter();
                    observer.disconnect();
                }
            });
            
            observer.observe(counter);
        });
    }

    // Modal Systems
    showGovernanceModal() {
        const modal = document.createElement('div');
        modal.className = 'governance-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>DAO Governance</h2>
                    <button class="close-btn" onclick="this.parentElement.parentElement.parentElement.remove()">✕</button>
                </div>
                <div class="modal-body">
                    <div class="governance-stats">
                        <div class="stat-card">
                            <h3>Active Proposals</h3>
                            <div class="stat-number">7</div>
                        </div>
                        <div class="stat-card">
                            <h3>Total Voters</h3>
                            <div class="stat-number">12,543</div>
                        </div>
                        <div class="stat-card">
                            <h3>Treasury Value</h3>
                            <div class="stat-number">$2.1M</div>
                        </div>
                    </div>
                    
                    <div class="proposals-list">
                        <h3>Recent Proposals</h3>
                        <div class="proposal-item">
                            <div class="proposal-title">Upgrade Extension to v3.0</div>
                            <div class="proposal-status active">Voting Active</div>
                            <div class="proposal-votes">1,234 votes • 2 days left</div>
                        </div>
                        <div class="proposal-item">
                            <div class="proposal-title">Add Solana Network Support</div>
                            <div class="proposal-status passed">Passed</div>
                            <div class="proposal-votes">2,156 votes • Executed</div>
                        </div>
                        <div class="proposal-item">
                            <div class="proposal-title">Community Grant Program</div>
                            <div class="proposal-status active">Voting Active</div>
                            <div class="proposal-votes">987 votes • 5 days left</div>
                        </div>
                    </div>
                    
                    <div class="governance-actions">
                        <button class="vote-btn" ${!this.connectedAccount ? 'disabled' : ''}>
                            ${this.connectedAccount ? 'Vote on Proposals' : 'Connect Wallet to Vote'}
                        </button>
                        <button class="propose-btn" ${!this.connectedAccount ? 'disabled' : ''}>
                            Create Proposal
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    showNotification(message, type = 'info') {
        // Remove any existing notifications of the same type to avoid spam
        const existingNotifications = document.querySelectorAll('.theme-notification');
        existingNotifications.forEach(notification => {
            if (notification.textContent.includes('Theme set')) {
                notification.remove();
            }
        });

        const notification = document.createElement('div');
        
        // Tailwind classes for notification
        const baseClasses = 'fixed top-4 right-4 z-50 max-w-sm p-4 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out theme-notification';
        const typeClasses = {
            success: 'bg-green-100 dark:bg-green-900 border border-green-500 text-green-800 dark:text-green-200',
            error: 'bg-red-100 dark:bg-red-900 border border-red-500 text-red-800 dark:text-red-200',
            warning: 'bg-yellow-100 dark:bg-yellow-900 border border-yellow-500 text-yellow-800 dark:text-yellow-200',
            info: 'bg-blue-100 dark:bg-blue-900 border border-blue-500 text-blue-800 dark:text-blue-200'
        };
        
        notification.className = `${baseClasses} ${typeClasses[type]}`;
        notification.innerHTML = `
            <div class="flex items-center">
                <span class="text-xl mr-3">
                    ${type === 'success' ? '✅' : type === 'error' ? '❌' : type === 'warning' ? '⚠️' : 'ℹ️'}
                </span>
                <span class="flex-1 text-sm font-medium">${message}</span>
                <button class="ml-3 text-current opacity-70 hover:opacity-100 transition-opacity" onclick="this.closest('div').remove()">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 3 seconds for theme notifications, 5 seconds for others
        const autoRemoveTime = message.includes('Theme set') ? 3000 : 5000;
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 300);
            }
        }, autoRemoveTime);
    }

    showLoading(show, message = 'Loading...') {
        let overlay = document.getElementById('loadingOverlay');
        
        // Create overlay if it doesn't exist
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'loadingOverlay';
            overlay.className = 'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 invisible transition-all duration-300';
            overlay.innerHTML = `
                <div class="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl flex flex-col items-center max-w-sm mx-4">
                    <div class="w-12 h-12 border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin mb-4"></div>
                    <p class="text-gray-700 dark:text-gray-300 text-center font-medium">Loading...</p>
                </div>
            `;
            document.body.appendChild(overlay);
        }
        
        const loadingText = overlay.querySelector('p');
        
        if (show) {
            loadingText.textContent = message;
            overlay.classList.add('visible');
            this.isLoading = true;
        } else {
            overlay.classList.remove('visible');
            this.isLoading = false;
        }
    }

    // Data Loading
    async loadInitialData() {
        try {
            // Load saved preferences
            const savedDownloadCount = localStorage.getItem('downloadCount');
            if (savedDownloadCount) {
                this.downloadCount = parseInt(savedDownloadCount);
            }

            // Check IPFS connection
            await this.checkIPFSConnection();
            
            // Load extension info
            await this.loadExtensionInfo();
            
        } catch (error) {
            console.error("Error loading initial data:", error);
        }
    }

    async loadExtensionInfo() {
        // Simulate loading extension information
        const versionElements = document.querySelectorAll('.btn-version, .btn-badge');
        versionElements.forEach(el => {
            el.textContent = `v${this.extensionVersion}`;
        });
    }

    // Add language swap functionality
    addLanguageSwapButton() {
        // Find the language selection area and add a swap button
        const sourceSelect = document.getElementById('sourceLanguage');
        const targetSelect = document.getElementById('targetLanguage');
        
        if (sourceSelect && targetSelect) {
            // Check if swap button already exists
            if (document.getElementById('languageSwapBtn')) return;
            
            const swapButton = document.createElement('button');
            swapButton.id = 'languageSwapBtn';
            swapButton.type = 'button';
            swapButton.className = 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300 flex items-center justify-center hover:scale-110';
            swapButton.innerHTML = '⇄';
            swapButton.title = 'Swap languages';
            
            // Add the swap functionality
            swapButton.addEventListener('click', () => {
                const sourceValue = sourceSelect.value;
                const targetValue = targetSelect.value;
                
                sourceSelect.value = targetValue;
                targetSelect.value = sourceValue;
                
                // Auto-translate if there's text
                const inputText = document.getElementById('inputText');
                if (inputText && inputText.value.trim()) {
                    this.showNotification('Languages swapped!', 'info');
                    this.performTranslation();
                } else {
                    this.showNotification('Languages swapped!', 'info');
                }
            });
            
            // Insert the button between the selects
            const parentContainer = sourceSelect.closest('.grid');
            if (parentContainer) {
                parentContainer.style.position = 'relative';
                parentContainer.appendChild(swapButton);
            }
        }
    }

    // Utility Functions
    formatAddress(address, length = 4) {
        if (!address) return '';
        return `${address.slice(0, length + 2)}...${address.slice(-length)}`;
    }

    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    // Error Handling
    handleError(error, context) {
        console.error(`Error in ${context}:`, error);
        this.showNotification(`An error occurred: ${error.message}`, 'error');
    }
}

// Additional CSS for dynamic components
const dynamicStyles = `
    <style>
    .wallet-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease-out;
    }

    .wallet-modal-content {
        background: white;
        border-radius: 1rem;
        padding: 2rem;
        min-width: 400px;
        max-width: 90vw;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        animation: slideUp 0.3s ease-out;
    }

    .wallet-modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #e5e7eb;
    }

    .wallet-modal-header h3 {
        font-size: 1.25rem;
        font-weight: 700;
        color: #1f2937;
    }

    .close-btn {
        background: #f3f4f6;
        border-radius: 50%;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.15s ease;
    }

    .close-btn:hover {
        background: #e5e7eb;
    }

    .wallet-info {
        margin-bottom: 2rem;
    }

    .wallet-address, .wallet-network {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
        padding: 1rem;
        background: #f9fafb;
        border-radius: 0.5rem;
    }

    .wallet-address label, .wallet-network label {
        font-weight: 600;
        color: #374151;
        min-width: 80px;
    }

    .address {
        font-family: monospace;
        font-size: 0.9rem;
        color: #6b7280;
        flex: 1;
    }

    .copy-btn {
        padding: 0.25rem 0.5rem;
        background: #6366f1;
        color: white;
        border-radius: 0.25rem;
        font-size: 0.8rem;
        cursor: pointer;
    }

    .disconnect-btn {
        width: 100%;
        padding: 0.75rem;
        background: #ef4444;
        color: white;
        border-radius: 0.5rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.15s ease;
    }

    .disconnect-btn:hover {
        background: #dc2626;
    }

    .translation-modal .modal-content {
        min-width: 600px;
        max-height: 80vh;
        overflow-y: auto;
    }

    .demo-interface {
        padding: 1rem 0;
    }

    .demo-section {
        margin-bottom: 2rem;
    }

    .demo-section h3 {
        font-size: 1.2rem;
        font-weight: 700;
        color: #1f2937;
        margin-bottom: 1rem;
    }

    .translation-example {
        background: #f9fafb;
        padding: 1.5rem;
        border-radius: 0.75rem;
        border: 1px solid #e5e7eb;
    }

    .input-section, .output-section {
        margin-bottom: 1rem;
    }

    .input-section label, .output-section label {
        display: block;
        font-weight: 600;
        color: #374151;
        margin-bottom: 0.5rem;
        font-size: 0.9rem;
    }

    .demo-text {
        padding: 1rem;
        background: white;
        border-radius: 0.5rem;
        border: 1px solid #d1d5db;
        font-size: 1rem;
        line-height: 1.5;
    }

    .demo-text.original {
        color: #1f2937;
        font-style: italic;
    }

    .translated-result {
        color: #059669;
        font-weight: 500;
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.5s ease;
    }

    .translation-example.translated .translated-result {
        opacity: 1;
        transform: translateY(0);
    }

    .arrow-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 1rem 0;
    }

    .translate-arrow {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
    }

    .translate-btn {
        padding: 0.5rem 1rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-radius: 0.5rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.15s ease;
    }

    .translate-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }

    .demo-features-list {
        margin-bottom: 2rem;
    }

    .demo-feature {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem;
        margin-bottom: 0.5rem;
        background: white;
        border-radius: 0.5rem;
        border: 1px solid #e5e7eb;
    }

    .feature-icon {
        font-size: 1.2rem;
    }

    .demo-cta {
        text-align: center;
        padding-top: 1rem;
        border-top: 1px solid #e5e7eb;
    }

    .demo-download-btn {
        padding: 0.75rem 2rem;
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        border-radius: 0.75rem;
        font-weight: 700;
        font-size: 1.1rem;
        cursor: pointer;
        transition: all 0.15s ease;
    }

    .demo-download-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
    }

    .governance-stats {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        margin-bottom: 2rem;
    }

    .stat-card {
        padding: 1.5rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-radius: 0.75rem;
        text-align: center;
    }

    .stat-card h3 {
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
        opacity: 0.9;
    }

    .stat-card .stat-number {
        font-size: 1.5rem;
        font-weight: 800;
    }

    .proposals-list {
        margin-bottom: 2rem;
    }

    .proposals-list h3 {
        margin-bottom: 1rem;
        font-size: 1.1rem;
        font-weight: 700;
        color: #1f2937;
    }

    .proposal-item {
        padding: 1rem;
        background: #f9fafb;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
        border-left: 4px solid #6366f1;
    }

    .proposal-title {
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 0.5rem;
    }

    .proposal-status {
        display: inline-block;
        padding: 0.25rem 0.75rem;
        border-radius: 9999px;
        font-size: 0.8rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
    }

    .proposal-status.active {
        background: #10b981;
        color: white;
    }

    .proposal-status.passed {
        background: #6366f1;
        color: white;
    }

    .proposal-votes {
        color: #6b7280;
        font-size: 0.9rem;
    }

    .governance-actions {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }

    .vote-btn, .propose-btn {
        padding: 0.75rem 1rem;
        border-radius: 0.5rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.15s ease;
    }

    .vote-btn {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
    }

    .vote-btn:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }

    .propose-btn {
        background: #f3f4f6;
        color: #374151;
        border: 1px solid #d1d5db;
    }

    .propose-btn:hover:not(:disabled) {
        background: #e5e7eb;
    }

    .vote-btn:disabled, .propose-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1100;
        min-width: 300px;
        max-width: 500px;
        animation: slideInRight 0.3s ease-out;
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem 1.5rem;
        background: white;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        border-left: 4px solid #6366f1;
    }

    .notification-success .notification-content {
        border-left-color: #10b981;
    }

    .notification-error .notification-content {
        border-left-color: #ef4444;
    }

    .notification-warning .notification-content {
        border-left-color: #f59e0b;
    }

    .notification-message {
        flex: 1;
        font-weight: 500;
        color: #374151;
    }

    .notification-close {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: #f3f4f6;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 0.8rem;
        color: #6b7280;
    }

    .notification-close:hover {
        background: #e5e7eb;
    }

    .wallet-connect-btn.connected {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    }

    .status-dot.connected {
        background: #10b981;
    }

    .status-dot.disconnected {
        background: #ef4444;
    }

    .animate-in {
        animation: slideUpFade 0.6s ease-out forwards;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes slideUp {
        from { 
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideUpFade {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    </style>
`;

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add dynamic styles
    document.head.insertAdjacentHTML('beforeend', dynamicStyles);
    
    // Initialize the GLyPh app
    window.app = new GLyPhApp();
});

// Service Worker registration for PWA features
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered successfully:', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}
