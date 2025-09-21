/**
 * GLyPh Application - Modern JavaScript Implementation
 * Complete TypeScript-to-JavaScript conversion with all features
 */

// Language constants
const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', rtl: true },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' }
];

// Type checking functions
const isLanguageCode = (code) => {
  return SUPPORTED_LANGUAGES.some(lang => lang.code === code);
};

const isThemeMode = (mode) => {
  return ['light', 'dark', 'auto'].includes(mode);
};

// Error classes
class TranslationError extends Error {
  constructor(message, code, sourceLanguage, targetLanguage) {
    super(message);
    this.name = 'TranslationError';
    this.code = code;
    this.sourceLanguage = sourceLanguage;
    this.targetLanguage = targetLanguage;
  }
}

class ThemeError extends Error {
  constructor(message, themeMode) {
    super(message);
    this.name = 'ThemeError';
    this.themeMode = themeMode;
  }
}

// Theme Manager Class
class ThemeManager {
  constructor() {
    this.currentTheme = 'light';
    this.themeMode = 'auto';
    this.systemPrefersDark = false;
    this.mediaQuery = null;
    this.eventListeners = [];
    
    this.initializeTheme();
    this.setupSystemThemeListener();
  }

  initializeTheme() {
    try {
      const savedMode = localStorage.getItem('glyph-theme-mode');
      if (savedMode && isThemeMode(savedMode)) {
        this.themeMode = savedMode;
      }

      if (this.themeMode === 'auto') {
        this.systemPrefersDark = this.getSystemPreference();
        this.currentTheme = this.systemPrefersDark ? 'dark' : 'light';
      } else {
        this.currentTheme = this.themeMode;
      }

      this.applyTheme(this.currentTheme);
    } catch (error) {
      console.error('Theme initialization failed:', error);
      this.currentTheme = 'light';
      this.themeMode = 'light';
      this.applyTheme('light');
    }
  }

  getSystemPreference() {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return false;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  setupSystemThemeListener() {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e) => {
      if (this.themeMode === 'auto') {
        const oldTheme = this.currentTheme;
        const newTheme = e.matches ? 'dark' : 'light';
        
        this.systemPrefersDark = e.matches;
        this.currentTheme = newTheme;
        this.applyTheme(newTheme);
        
        this.dispatchThemeEvent({
          type: 'theme_changed',
          payload: { oldTheme, newTheme }
        });
      }
    };

    if (this.mediaQuery.addEventListener) {
      this.mediaQuery.addEventListener('change', handleSystemThemeChange);
    } else {
      this.mediaQuery.addListener(handleSystemThemeChange);
    }
  }

  applyTheme(theme) {
    if (typeof document === 'undefined') {
      return;
    }

    const htmlElement = document.documentElement;
    htmlElement.classList.remove('light', 'dark');
    
    if (theme === 'dark') {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.add('light');
    }

    this.currentTheme = theme;
  }

  setThemeMode(mode) {
    if (!isThemeMode(mode)) {
      throw new ThemeError(`Invalid theme mode: ${mode}. Must be 'light', 'dark', or 'auto'`, mode);
    }

    const oldTheme = this.currentTheme;
    this.themeMode = mode;

    try {
      localStorage.setItem('glyph-theme-mode', mode);

      let newTheme;

      if (mode === 'auto') {
        localStorage.removeItem('glyph-theme');
        this.systemPrefersDark = this.getSystemPreference();
        newTheme = this.systemPrefersDark ? 'dark' : 'light';
        this.applyTheme(newTheme);
      } else {
        newTheme = mode;
        this.applyTheme(newTheme);
        localStorage.setItem('glyph-theme', mode);
      }

      this.dispatchThemeEvent({
        type: 'theme_changed',
        payload: { oldTheme, newTheme }
      });

    } catch (error) {
      throw new ThemeError(`Failed to set theme mode: ${error.message}`, mode);
    }
  }

  toggleTheme() {
    const newMode = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setThemeMode(newMode);
  }

  getCurrentTheme() {
    return this.currentTheme;
  }

  getThemeMode() {
    return this.themeMode;
  }

  isDarkMode() {
    return this.currentTheme === 'dark';
  }

  addEventListener(callback) {
    this.eventListeners.push(callback);
  }

  removeEventListener(callback) {
    const index = this.eventListeners.indexOf(callback);
    if (index > -1) {
      this.eventListeners.splice(index, 1);
    }
  }

  dispatchThemeEvent(event) {
    this.eventListeners.forEach(callback => {
      try {
        callback(event);
      } catch (error) {
        console.error('Theme event listener error:', error);
      }
    });
  }

  updateThemeButtons() {
    const buttons = {
      light: document.getElementById('theme-light'),
      auto: document.getElementById('theme-auto'),
      dark: document.getElementById('theme-dark')
    };

    Object.values(buttons).forEach(btn => {
      if (btn) {
        btn.classList.remove('bg-blue-600', 'text-white');
        btn.classList.add('text-gray-600', 'dark:text-gray-300', 'hover:text-gray-900', 'dark:hover:text-white', 'hover:bg-gray-300', 'dark:hover:bg-gray-600');
      }
    });

    const activeButton = buttons[this.themeMode];
    if (activeButton) {
      activeButton.classList.remove('text-gray-600', 'dark:text-gray-300', 'hover:text-gray-900', 'dark:hover:text-white', 'hover:bg-gray-300', 'dark:hover:bg-gray-600');
      activeButton.classList.add('bg-blue-600', 'text-white');
    }
  }

  updateThemeToggleButton() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    const icon = themeToggle.querySelector('i');
    if (icon) {
      if (this.currentTheme === 'dark') {
        icon.className = 'fas fa-sun';
        themeToggle.setAttribute('aria-label', 'Switch to light mode');
        themeToggle.title = 'Switch to light mode';
      } else {
        icon.className = 'fas fa-moon';
        themeToggle.setAttribute('aria-label', 'Switch to dark mode');
        themeToggle.title = 'Switch to dark mode';
      }
    }
  }

  destroy() {
    if (this.mediaQuery) {
      if (this.mediaQuery.removeEventListener) {
        this.mediaQuery.removeEventListener('change', this.setupSystemThemeListener);
      }
    }
    this.eventListeners = [];
  }
}

// Translation Engine Class
class TranslationEngine {
  constructor() {
    this.sampleTranslations = {
      'What will happen next?': {
        'hi': {
          translation: 'क्या होगा आगे?',
          transliteration: 'Kya hoga aage?',
          pronunciation: 'kya ho-ga a-ge'
        },
        'ar': {
          translation: 'ماذا سيحدث بعد ذلك؟',
          transliteration: 'Maza sayahduth baad zalik?',
          pronunciation: 'ma-za sa-ya-hduth baad za-lik'
        },
        'ja': {
          translation: '次に何が起こるでしょうか？',
          transliteration: 'Tsugi ni nani ga okoru deshou ka?',
          pronunciation: 'tsu-gi ni na-ni ga o-ko-ru de-sho ka'
        },
        'zh': {
          translation: '接下来会发生什么？',
          transliteration: 'Jiē xiàlái huì fāshēng shénme?',
          pronunciation: 'jie xia-lai hui fa-sheng shen-me'
        },
        'ko': {
          translation: '다음에는 무엇이 일어날까요?',
          transliteration: 'Daeume-neun mueosi ileonalkka-yo?',
          pronunciation: 'da-eum-e-neun mu-eo-si il-eo-nal-kka-yo'
        }
      },
      'Hello, how are you?': {
        'hi': {
          translation: 'नमस्ते, आप कैसे हैं?',
          transliteration: 'Namaste, aap kaise hain?',
          pronunciation: 'na-mas-te, aap kai-se hain'
        },
        'ar': {
          translation: 'مرحبا، كيف حالك؟',
          transliteration: 'Marhaban, kayf halak?',
          pronunciation: 'mar-ha-ban, kayf ha-lak'
        },
        'ja': {
          translation: 'こんにちは、元気ですか？',
          transliteration: 'Konnichiwa, genki desu ka?',
          pronunciation: 'kon-ni-chi-wa, gen-ki de-su ka'
        },
        'zh': {
          translation: '你好，你好吗？',
          transliteration: 'Nǐ hǎo, nǐ hǎo ma?',
          pronunciation: 'ni hao, ni hao ma'
        },
        'ko': {
          translation: '안녕하세요, 어떻게 지내세요?',
          transliteration: 'Annyeonghaseyo, eotteoke jinaeseyo?',
          pronunciation: 'an-nyeong-ha-se-yo, eo-tteo-ke ji-nae-se-yo'
        }
      },
      'Thank you very much': {
        'hi': {
          translation: 'बहुत धन्यवाद',
          transliteration: 'Bahut dhanyawad',
          pronunciation: 'ba-hut dhan-ya-wad'
        },
        'ar': {
          translation: 'شكرا جزيلا',
          transliteration: 'Shukran jazeelan',
          pronunciation: 'shuk-ran ja-zee-lan'
        },
        'ja': {
          translation: 'どうもありがとうございます',
          transliteration: 'Doumo arigatou gozaimasu',
          pronunciation: 'dou-mo a-ri-ga-tou go-za-i-ma-su'
        },
        'zh': {
          translation: '非常感谢',
          transliteration: 'Fēicháng gǎnxiè',
          pronunciation: 'fei-chang gan-xie'
        }
      },
      'I would like to schedule a meeting': {
        'hi': {
          translation: 'मैं एक मीटिंग शेड्यूल करना चाहूंगा',
          transliteration: 'Main ek meeting schedule karna chahunga',
          pronunciation: 'main ek mee-ting she-dyul kar-na cha-hun-ga'
        },
        'ja': {
          translation: '会議をスケジュールしたいと思います',
          transliteration: 'Kaigi wo sukejuuru shitai to omoimasu',
          pronunciation: 'kai-gi wo su-ke-juu-ru shi-tai to o-mo-i-ma-su'
        }
      },
      'Where is the nearest hotel?': {
        'zh': {
          translation: '最近的酒店在哪里？',
          transliteration: 'Zuìjìn de jiǔdiàn zài nǎlǐ?',
          pronunciation: 'zui-jin de jiu-dian zai na-li'
        },
        'ko': {
          translation: '가장 가까운 호텔은 어디에 있나요?',
          transliteration: 'Gajang gakkaun hoteoleun eodie issnayo?',
          pronunciation: 'ga-jang ga-kka-un ho-tel-eun eo-di-e iss-na-yo'
        }
      },
      'This food is delicious': {
        'ko': {
          translation: '이 음식은 맛있습니다',
          transliteration: 'I eumsig-eun mas-issseubnida',
          pronunciation: 'i eum-sig-eun ma-siss-seub-ni-da'
        },
        'ja': {
          translation: 'この食べ物は美味しいです',
          transliteration: 'Kono tabemono wa oishii desu',
          pronunciation: 'ko-no ta-be-mo-no wa o-i-shii de-su'
        }
      }
    };

    this.processingCache = new Map();
  }

  async translate(text, sourceLanguage, targetLanguage, options = {}) {
    if (!text.trim()) {
      throw new TranslationError('Input text cannot be empty', 'EMPTY_INPUT');
    }

    if (sourceLanguage === targetLanguage) {
      throw new TranslationError('Source and target languages cannot be the same', 'SAME_LANGUAGE');
    }

    const startTime = performance.now();

    try {
      // Check cache first
      const cacheKey = `${text}|${sourceLanguage}|${targetLanguage}`;
      if (options.cacheResults !== false && this.processingCache.has(cacheKey)) {
        return this.processingCache.get(cacheKey);
      }

      // Get sample data for translation
      const sampleData = this.sampleTranslations[text];
      let result;

      if (sampleData && sampleData[targetLanguage]) {
        const sample = sampleData[targetLanguage];
        result = {
          original: text,
          translatedText: sample.translation,
          transliteration: options.includeTransliteration ? sample.transliteration : undefined,
          pronunciation: options.includePronunciation ? sample.pronunciation : undefined,
          sourceLanguage,
          targetLanguage,
          detectedLanguage: sourceLanguage,
          confidence: 0.98,
          timestamp: new Date(),
          processingTime: Math.round(performance.now() - startTime)
        };
      } else {
        // Generate fallback translation
        const languageName = SUPPORTED_LANGUAGES.find(lang => lang.code === targetLanguage)?.name || targetLanguage;
        result = {
          original: text,
          translatedText: `[Translated to ${languageName}] ${text}`,
          transliteration: options.includeTransliteration ? this.generateTransliteration(text, targetLanguage) : undefined,
          pronunciation: options.includePronunciation ? this.generatePronunciation(text, targetLanguage) : undefined,
          sourceLanguage,
          targetLanguage,
          detectedLanguage: sourceLanguage,
          confidence: 0.85,
          timestamp: new Date(),
          processingTime: Math.round(performance.now() - startTime)
        };
      }

      // Cache the result
      if (options.cacheResults !== false) {
        this.processingCache.set(cacheKey, result);
      }

      return result;

    } catch (error) {
      throw new TranslationError(
        `Translation failed: ${error.message}`,
        'TRANSLATION_FAILED',
        sourceLanguage,
        targetLanguage
      );
    }
  }

  generateTransliteration(text, targetLanguage) {
    return `[${text} transliterated to ${targetLanguage}]`;
  }

  generatePronunciation(text, targetLanguage) {
    return `[${text} pronunciation in ${targetLanguage}]`;
  }
}

// Main GLyPh Application Class
class GLyPhApp {
  constructor(config = {}) {
    this.config = {
      enableKeyboardShortcuts: true,
      enableSoundEffects: false,
      defaultSourceLanguage: 'en',
      defaultTargetLanguage: 'hi',
      cacheEnabled: true,
      debugMode: false,
      ...config
    };

    this.translationEngine = new TranslationEngine();
    this.themeManager = new ThemeManager();

    this.demoState = {
      isActive: false,
      sourceLanguage: this.config.defaultSourceLanguage,
      targetLanguage: this.config.defaultTargetLanguage,
      inputText: '',
      translationResult: null,
      isLoading: false,
      error: null
    };

    this.initialize();
  }

  initialize() {
    this.setupEventListeners();
    this.setupKeyboardShortcuts();
    this.initializeDemo();
    this.updateUI();

    this.themeManager.addEventListener((event) => {
      if (event.type === 'theme_changed') {
        this.updateUI();
      }
    });

    if (this.config.debugMode) {
      console.log('GLyPh Application initialized', {
        config: this.config,
        demoState: this.demoState
      });
    }
  }

  setupEventListeners() {
    // Theme control buttons
    const themeButtons = ['light', 'auto', 'dark'];
    themeButtons.forEach(mode => {
      const button = document.getElementById(`theme-${mode}`);
      if (button) {
        button.addEventListener('click', () => {
          this.handleThemeChange(mode);
        });
      }
    });

    // Theme toggle button
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        this.themeManager.toggleTheme();
      });
    }

    // Demo controls
    const translateButton = document.getElementById('translate-button');
    if (translateButton) {
      translateButton.addEventListener('click', () => {
        this.handleTranslate();
      });
    }

    const clearButton = document.getElementById('clear-button');
    if (clearButton) {
      clearButton.addEventListener('click', () => {
        this.handleClearDemo();
      });
    }

    const copyButton = document.getElementById('copy-button');
    if (copyButton) {
      copyButton.addEventListener('click', () => {
        this.handleCopyResult();
      });
    }

    const swapButton = document.getElementById('swap-languages');
    if (swapButton) {
      swapButton.addEventListener('click', () => {
        this.handleSwapLanguages();
      });
    }

    // Input text area
    const inputText = document.getElementById('input-text');
    if (inputText) {
      inputText.addEventListener('input', (e) => {
        this.demoState.inputText = e.target.value;
        this.updateTranslateButton();
      });

      inputText.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
          e.preventDefault();
          this.handleTranslate();
        }
      });
    }

    // Language selectors
    const sourceSelect = document.getElementById('source-language');
    if (sourceSelect) {
      sourceSelect.addEventListener('change', (e) => {
        const language = e.target.value;
        if (isLanguageCode(language)) {
          this.demoState.sourceLanguage = language;
        }
      });
    }

    const targetSelect = document.getElementById('target-language');
    if (targetSelect) {
      targetSelect.addEventListener('change', (e) => {
        const language = e.target.value;
        if (isLanguageCode(language)) {
          this.demoState.targetLanguage = language;
        }
      });
    }

    // Sample text buttons
    const sampleButtons = document.querySelectorAll('.sample-text-btn');
    sampleButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        const sampleText = e.target.getAttribute('data-text');
        if (sampleText && inputText) {
          inputText.value = sampleText;
          this.demoState.inputText = sampleText;
          this.updateTranslateButton();
          inputText.focus();
        }
      });
    });
  }

  setupKeyboardShortcuts() {
    if (!this.config.enableKeyboardShortcuts) return;

    document.addEventListener('keydown', (e) => {
      // Alt + T: Toggle theme
      if (e.altKey && e.key.toLowerCase() === 't') {
        e.preventDefault();
        this.themeManager.toggleTheme();
      }

      // Alt + 1/2/3: Set theme mode
      if (e.altKey && ['1', '2', '3'].includes(e.key)) {
        e.preventDefault();
        const modes = ['light', 'auto', 'dark'];
        const mode = modes[parseInt(e.key) - 1];
        if (mode) {
          this.handleThemeChange(mode);
        }
      }

      // Ctrl/Cmd + Shift + T: Translate
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 't') {
        e.preventDefault();
        this.handleTranslate();
      }

      // Ctrl/Cmd + Shift + C: Copy result
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'c') {
        e.preventDefault();
        this.handleCopyResult();
      }

      // Ctrl/Cmd + Shift + X: Clear demo
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'x') {
        e.preventDefault();
        this.handleClearDemo();
      }

      // Ctrl/Cmd + Shift + S: Swap languages
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 's') {
        e.preventDefault();
        this.handleSwapLanguages();
      }
    });
  }

  initializeDemo() {
    this.updateTranslateButton();
    this.updateLanguageSelectors();
    this.showKeyboardShortcuts();
  }

  handleThemeChange(mode) {
    try {
      this.themeManager.setThemeMode(mode);
      this.showNotification('success', `Theme switched to ${mode} mode`);
    } catch (error) {
      this.showNotification('error', `Failed to change theme: ${error.message}`);
    }
  }

  async handleTranslate() {
    if (!this.demoState.inputText.trim()) {
      this.showNotification('warning', 'Please enter some text to translate');
      return;
    }

    this.demoState.isLoading = true;
    this.demoState.error = null;
    this.updateUI();

    try {
      const options = {
        includeTransliteration: true,
        includePronunciation: true,
        cacheResults: true
      };

      const result = await this.translationEngine.translate(
        this.demoState.inputText,
        this.demoState.sourceLanguage,
        this.demoState.targetLanguage,
        options
      );

      this.demoState.translationResult = result;
      this.demoState.isLoading = false;
      this.updateUI();

      this.showNotification('success', 'Translation completed successfully!');
    } catch (error) {
      this.demoState.isLoading = false;
      this.demoState.error = error.message;
      this.updateUI();
      
      this.showNotification('error', `Translation failed: ${this.demoState.error}`);
    }
  }

  async handleCopyResult() {
    if (!this.demoState.translationResult) {
      this.showNotification('warning', 'No translation to copy');
      return;
    }

    try {
      await navigator.clipboard.writeText(this.demoState.translationResult.translatedText);
      this.showNotification('success', 'Translation copied to clipboard!');
    } catch (error) {
      // Fallback for browsers without clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = this.demoState.translationResult.translatedText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      this.showNotification('success', 'Translation copied to clipboard!');
    }
  }

  handleClearDemo() {
    this.demoState.inputText = '';
    this.demoState.translationResult = null;
    this.demoState.error = null;
    this.demoState.isLoading = false;

    const inputText = document.getElementById('input-text');
    if (inputText) {
      inputText.value = '';
      inputText.focus();
    }

    this.updateUI();
    this.showNotification('info', 'Demo cleared');
  }

  handleSwapLanguages() {
    const oldSource = this.demoState.sourceLanguage;
    const oldTarget = this.demoState.targetLanguage;

    this.demoState.sourceLanguage = oldTarget;
    this.demoState.targetLanguage = oldSource;

    // If we have a translation result, swap input and output
    if (this.demoState.translationResult) {
      const inputText = document.getElementById('input-text');
      if (inputText) {
        const newInput = this.demoState.translationResult.translatedText;
        inputText.value = newInput;
        this.demoState.inputText = newInput;
      }
      
      // Clear the result since we're swapping
      this.demoState.translationResult = null;
    }

    this.updateLanguageSelectors();
    this.showNotification('info', 'Languages swapped');
  }

  updateUI() {
    this.themeManager.updateThemeButtons();
    this.themeManager.updateThemeToggleButton();
    this.updateTranslateButton();
    this.updateResultDisplay();
    this.updateLoadingState();
  }

  updateTranslateButton() {
    const translateButton = document.getElementById('translate-button');
    if (!translateButton) return;

    const hasText = this.demoState.inputText.trim().length > 0;
    const isLoading = this.demoState.isLoading;

    translateButton.disabled = !hasText || isLoading;

    if (isLoading) {
      translateButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Translating...';
      translateButton.classList.add('opacity-75');
    } else {
      translateButton.innerHTML = '<i class="fas fa-language mr-2"></i>Translate';
      translateButton.classList.remove('opacity-75');
    }
  }

  updateLanguageSelectors() {
    const sourceSelect = document.getElementById('source-language');
    const targetSelect = document.getElementById('target-language');

    if (sourceSelect) {
      sourceSelect.value = this.demoState.sourceLanguage;
    }

    if (targetSelect) {
      targetSelect.value = this.demoState.targetLanguage;
    }
  }

  updateResultDisplay() {
    const resultContainer = document.getElementById('translation-result');
    if (!resultContainer) return;

    if (this.demoState.error) {
      resultContainer.innerHTML = `
        <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div class="flex items-center text-red-600 dark:text-red-400">
            <i class="fas fa-exclamation-triangle mr-2"></i>
            <span class="font-medium">Translation Error</span>
          </div>
          <p class="text-red-700 dark:text-red-300 mt-1">${this.demoState.error}</p>
        </div>
      `;
    } else if (this.demoState.translationResult) {
      const result = this.demoState.translationResult;
      resultContainer.innerHTML = `
        <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center text-green-600 dark:text-green-400">
              <i class="fas fa-check-circle mr-2"></i>
              <span class="font-medium">Translation Result</span>
            </div>
            <button id="copy-result-btn" class="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 p-1 rounded">
              <i class="fas fa-copy"></i>
            </button>
          </div>
          
          <div class="space-y-3">
            <div>
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Translated Text:</h4>
              <p class="text-gray-900 dark:text-white text-lg">${result.translatedText}</p>
            </div>
            
            ${result.transliteration ? `
              <div>
                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Transliteration:</h4>
                <p class="text-gray-700 dark:text-gray-300">${result.transliteration}</p>
              </div>
            ` : ''}
            
            ${result.pronunciation ? `
              <div>
                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pronunciation:</h4>
                <p class="text-gray-700 dark:text-gray-300">${result.pronunciation}</p>
              </div>
            ` : ''}
            
            <div class="text-xs text-gray-500 dark:text-gray-400 border-t pt-2">
              Confidence: ${Math.round(result.confidence * 100)}% | 
              Detected Language: ${result.detectedLanguage} |
              Time: ${result.processingTime}ms
            </div>
          </div>
        </div>
      `;

      // Re-attach copy button listener
      const copyButton = document.getElementById('copy-result-btn');
      if (copyButton) {
        copyButton.addEventListener('click', () => this.handleCopyResult());
      }
    } else {
      resultContainer.innerHTML = '';
    }
  }

  updateLoadingState() {
    const loadingIndicator = document.getElementById('loading-indicator');
    if (!loadingIndicator) return;

    if (this.demoState.isLoading) {
      loadingIndicator.classList.remove('hidden');
    } else {
      loadingIndicator.classList.add('hidden');
    }
  }

  showKeyboardShortcuts() {
    if (!this.config.enableKeyboardShortcuts) return;

    const shortcutsInfo = document.getElementById('keyboard-shortcuts');
    if (shortcutsInfo) {
      shortcutsInfo.classList.remove('hidden');
    }
  }

  showNotification(type, message) {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 max-w-sm p-4 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full`;
    
    switch (type) {
      case 'success':
        notification.classList.add('bg-green-500', 'text-white');
        break;
      case 'error':
        notification.classList.add('bg-red-500', 'text-white');
        break;
      case 'warning':
        notification.classList.add('bg-yellow-500', 'text-white');
        break;
      case 'info':
        notification.classList.add('bg-blue-500', 'text-white');
        break;
    }

    const iconMap = {
      success: 'check',
      error: 'exclamation-triangle',
      warning: 'exclamation',
      info: 'info-circle'
    };

    notification.innerHTML = `
      <div class="flex items-center">
        <i class="fas fa-${iconMap[type]} mr-2"></i>
        <span>${message}</span>
      </div>
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.classList.remove('translate-x-full');
    }, 100);

    // Auto remove after 3 seconds
    setTimeout(() => {
      notification.classList.add('translate-x-full');
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  getState() {
    return {
      config: this.config,
      demoState: this.demoState,
      themeStats: {
        currentTheme: this.themeManager.getCurrentTheme(),
        themeMode: this.themeManager.getThemeMode(),
        isDarkMode: this.themeManager.isDarkMode()
      }
    };
  }

  destroy() {
    this.themeManager.destroy();
  }
}

// Export for global access
window.GLyPhApp = GLyPhApp;
window.TranslationEngine = TranslationEngine;
window.ThemeManager = ThemeManager;

// Auto-download functionality
function initializeAutoDownload() {
  // Handle auto-download button
  const autoDownloadBtn = document.getElementById('autoDownloadBtn');
  const primaryDownloadBtn = document.getElementById('primaryDownload');
  
  function triggerDownload() {
    // Show loading notification
    showDownloadNotification('Preparing download...');
    
    // Create a direct download link for the extension file
    const tempLink = document.createElement('a');
    tempLink.href = './glyph-extension.crx'; // Direct file path
    tempLink.download = 'GLYPH-Transliterator-Extension.crx';
    tempLink.style.display = 'none';
    document.body.appendChild(tempLink);
    
    // Trigger the actual download
    tempLink.click();
    document.body.removeChild(tempLink);
    
    // Show success notification
    setTimeout(() => {
      showDownloadNotification('Download started! Check your Downloads folder.', 'success');
    }, 500);
    
    // Show installation guide after a short delay
    setTimeout(() => {
      showInstallationGuide();
    }, 1500);
  }
  
  function showDownloadNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full`;
    
    if (type === 'success') {
      notification.className += ' bg-green-500 text-white';
    } else {
      notification.className += ' bg-blue-500 text-white';
    }
    
    notification.innerHTML = `
      <div class="flex items-center">
        <svg class="w-5 h-5 mr-2 ${type === 'success' ? '' : 'animate-spin'}" fill="none" stroke="currentColor" viewBox="0 0 24 24" ${type === 'success' ? 'style="display:none"' : ''}>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
        </svg>
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" ${type !== 'success' ? 'style="display:none"' : ''}>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>${message}</span>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Slide in
    setTimeout(() => {
      notification.classList.remove('translate-x-full');
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
      notification.classList.add('translate-x-full');
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 4000);
  }
  
  function showInstallationGuide() {
    // Create modal for installation guide
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4';
    modal.innerHTML = `
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 transform scale-95 opacity-0 transition-all duration-300" id="installModal">
        <div class="text-center">
          <div class="w-16 h-16 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Download Complete! �</h3>
          <p class="text-gray-600 dark:text-gray-300 mb-6">Follow these steps to install GLYPH extension:</p>
          
          <div class="text-left space-y-4 mb-6">
            <div class="flex items-start">
              <span class="w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">1</span>
              <div class="text-gray-700 dark:text-gray-300">
                <p class="font-medium">Open Chrome Extensions</p>
                <p class="text-sm opacity-75">Type "chrome://extensions" in address bar</p>
              </div>
            </div>
            <div class="flex items-start">
              <span class="w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">2</span>
              <div class="text-gray-700 dark:text-gray-300">
                <p class="font-medium">Enable Developer Mode</p>
                <p class="text-sm opacity-75">Toggle the switch in top-right corner</p>
              </div>
            </div>
            <div class="flex items-start">
              <span class="w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">3</span>
              <div class="text-gray-700 dark:text-gray-300">
                <p class="font-medium">Drag & Drop Extension</p>
                <p class="text-sm opacity-75">Drag the downloaded .crx file to the page</p>
              </div>
            </div>
            <div class="flex items-start">
              <span class="w-7 h-7 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">✓</span>
              <div class="text-gray-700 dark:text-gray-300">
                <p class="font-medium">Start Learning New Words!</p>
                <p class="text-sm opacity-75">GLYPH is ready to use 🎯</p>
              </div>
            </div>
          </div>
          
          <div class="flex gap-2">
            <button onclick="window.open('chrome://extensions/', '_blank')" class="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-300 text-sm">
              Open Extensions
            </button>
            <button onclick="this.closest('.fixed').remove()" class="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg font-medium hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors duration-300 text-sm">
              Got it!
            </button>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
      const modalContent = modal.querySelector('#installModal');
      modalContent.classList.remove('scale-95', 'opacity-0');
      modalContent.classList.add('scale-100', 'opacity-100');
    }, 100);
    
    // Auto-close after 20 seconds
    setTimeout(() => {
      if (document.body.contains(modal)) {
        modal.remove();
      }
    }, 20000);
  }
  
  // Add event listeners for direct download
  if (autoDownloadBtn) {
    autoDownloadBtn.addEventListener('click', (e) => {
      e.preventDefault();
      triggerDownload();
    });
  }
  
  if (primaryDownloadBtn) {
    primaryDownloadBtn.addEventListener('click', (e) => {
      e.preventDefault();
      triggerDownload();
    });
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.glyphApp = new GLyPhApp({ debugMode: true });
    initializeAutoDownload();
  });
} else {
  window.glyphApp = new GLyPhApp({ debugMode: true });
  initializeAutoDownload();
}