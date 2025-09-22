class InstantPopupManager {
  constructor() {
    this.currentProvider = 'google';
    this.apiKeys = {};
    this.settings = {};
    this.isAutoEnabled = false;
    this.sourceLanguage = 'auto';
    this.targetLanguage = 'en';
    this.processingMode = 'instant'; // Default to instant mode
    this.translationProvider = 'google_translate';
    this.init();
  }

  async init() {
    await this.loadSettings();
    this.setupEventListeners();
    this.updateUI();
  }

  async loadSettings() {
    try {
      const result = await chrome.storage.local.get([
        'selectedProvider',
        'apiKeys',
        'settings',
        'autoTransliterate',
        'sourceLanguage',
        'targetLanguage',
        'processingMode',
        'translationProvider'
      ]);
      
      this.currentProvider = result.selectedProvider || 'google';
      this.apiKeys = result.apiKeys || {};
      this.settings = result.settings || {};
      this.isAutoEnabled = result.autoTransliterate || false;
      this.sourceLanguage = result.sourceLanguage || 'auto';
      this.targetLanguage = result.targetLanguage || 'en';
      this.processingMode = result.processingMode || 'instant';
      this.translationProvider = result.translationProvider || 'google_translate';
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  }

  async saveSettings() {
    try {
      await chrome.storage.local.set({
        selectedProvider: this.currentProvider,
        apiKeys: this.apiKeys,
        settings: this.settings,
        autoTransliterate: this.isAutoEnabled,
        sourceLanguage: this.sourceLanguage,
        targetLanguage: this.targetLanguage,
        processingMode: this.processingMode,
        translationProvider: this.translationProvider
      });
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  }

  setupEventListeners() {
    // Provider selection
    const providerSelect = document.getElementById('providerSelect');
    if (providerSelect) {
      providerSelect.addEventListener('change', (e) => {
        this.currentProvider = e.target.value;
        this.updateUI();
        this.saveSettings();
      });
    }

    // API key management
    const saveApiKeyBtn = document.getElementById('saveApiKey');
    if (saveApiKeyBtn) {
      saveApiKeyBtn.addEventListener('click', () => {
        this.saveApiKey();
      });
    }

    const testApiKeyBtn = document.getElementById('testApiKey');
    if (testApiKeyBtn) {
      testApiKeyBtn.addEventListener('click', () => {
        this.testApiKey();
      });
    }

    // Language selection
    const sourceLanguageSelect = document.getElementById('sourceLanguage');
    if (sourceLanguageSelect) {
      sourceLanguageSelect.addEventListener('change', (e) => {
        this.sourceLanguage = e.target.value;
        this.saveSettings();
      });
    }

    const targetLanguageSelect = document.getElementById('targetLanguage');
    if (targetLanguageSelect) {
      targetLanguageSelect.addEventListener('change', (e) => {
        this.targetLanguage = e.target.value;
        this.saveSettings();
      });
    }

    // Processing mode selection
    const modeRadios = document.querySelectorAll('input[name="processingMode"]');
    modeRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        if (e.target.checked) {
          this.processingMode = e.target.value;
          this.saveSettings();
          this.updateUI();
        }
      });
    });

    // Auto transliteration toggle
    const toggleAutoBtn = document.getElementById('toggleAutoBtn');
    if (toggleAutoBtn) {
      toggleAutoBtn.addEventListener('click', () => {
        this.toggleAutoTransliteration();
      });
    }

    // Quick action buttons
    const transliterateBtn = document.getElementById('transliterateBtn');
    if (transliterateBtn) {
      transliterateBtn.addEventListener('click', () => {
        this.processText('transliterate');
      });
    }

    const translateBtn = document.getElementById('translateBtn');
    if (translateBtn) {
      translateBtn.addEventListener('click', () => {
        this.processText('translate');
      });
    }

    const improveBtn = document.getElementById('improveBtn');
    if (improveBtn) {
      improveBtn.addEventListener('click', () => {
        this.processText('improve');
      });
    }

    const summarizeBtn = document.getElementById('summarizeBtn');
    if (summarizeBtn) {
      summarizeBtn.addEventListener('click', () => {
        this.processText('summarize');
      });
    }

    // Main process button
    const processTextBtn = document.getElementById('processTextBtn');
    if (processTextBtn) {
      processTextBtn.addEventListener('click', () => {
        this.processText('custom');
      });
    }

    // Settings and help buttons
    const settingsBtn = document.getElementById('settingsBtn');
    if (settingsBtn) {
      settingsBtn.addEventListener('click', () => {
        chrome.runtime.openOptionsPage();
      });
    }

    const helpBtn = document.getElementById('helpBtn');
    if (helpBtn) {
      helpBtn.addEventListener('click', () => {
        this.showHelpDialog();
      });
    }

    // Options link
    const optionsLink = document.getElementById('optionsLink');
    if (optionsLink) {
      optionsLink.addEventListener('click', (e) => {
        e.preventDefault();
        chrome.runtime.openOptionsPage();
      });
    }
  }

  updateUI() {
    // Update provider selection
    const providerSelect = document.getElementById('providerSelect');
    if (providerSelect) {
      providerSelect.value = this.currentProvider;
    }
    
    // Update API key input with current key (masked)
    const currentKey = this.apiKeys[this.currentProvider];
    const apiKeyInput = document.getElementById('apiKeyInput');
    if (apiKeyInput) {
      if (currentKey) {
        apiKeyInput.placeholder = `API key saved (${currentKey.substring(0, 8)}...)`;
        apiKeyInput.value = '';
      } else {
        apiKeyInput.placeholder = 'Enter your API key';
        apiKeyInput.value = '';
      }
    }

    // Update language selections
    const sourceLanguageSelect = document.getElementById('sourceLanguage');
    if (sourceLanguageSelect) {
      sourceLanguageSelect.value = this.sourceLanguage;
    }

    const targetLanguageSelect = document.getElementById('targetLanguage');
    if (targetLanguageSelect) {
      targetLanguageSelect.value = this.targetLanguage;
    }

    // Update processing mode
    const modeRadio = document.querySelector(`input[name="processingMode"][value="${this.processingMode}"]`);
    if (modeRadio) {
      modeRadio.checked = true;
    }

    // Update auto transliteration button
    this.updateAutoButton();
  }

  updateAutoButton() {
    const toggleBtn = document.getElementById('toggleAutoBtn');
    const toggleBtnText = document.getElementById('toggleBtnText');
    const toggleBtnSubtext = document.getElementById('toggleBtnSubtext');

    if (toggleBtn && toggleBtnText && toggleBtnSubtext) {
      if (this.isAutoEnabled) {
        toggleBtn.className = 'btn btn-danger transliteration-btn';
        toggleBtnText.textContent = 'Disable Auto Transliteration';
        toggleBtnSubtext.textContent = 'Stop automatic processing';
      } else {
        toggleBtn.className = 'btn btn-success transliteration-btn';
        toggleBtnText.textContent = 'Enable Auto Transliteration';
        toggleBtnSubtext.textContent = 'Process all text automatically';
      }
    }
  }

  async saveApiKey() {
    const apiKey = document.getElementById('apiKeyInput').value.trim();
    const statusEl = document.getElementById('apiKeyStatus');
    
    if (!apiKey) {
      this.showStatus(statusEl, 'Please enter an API key', 'error');
      return;
    }

    try {
      this.apiKeys[this.currentProvider] = apiKey;
      await this.saveSettings();
      this.showStatus(statusEl, 'API key saved successfully!', 'success');
      this.updateUI();
    } catch (error) {
      console.error('Failed to save API key:', error);
      this.showStatus(statusEl, 'Failed to save API key', 'error');
    }
  }

  async testApiKey() {
    const apiKey = document.getElementById('apiKeyInput').value.trim() || this.apiKeys[this.currentProvider];
    const statusEl = document.getElementById('apiKeyStatus');
    
    if (!apiKey) {
      this.showStatus(statusEl, 'Please enter an API key first', 'error');
      return;
    }

    this.showStatus(statusEl, 'Testing API key...', 'info');
    
    try {
      const response = await chrome.runtime.sendMessage({
        action: 'testApiKey',
        provider: this.currentProvider,
        apiKey: apiKey
      });

      if (response.success) {
        this.showStatus(statusEl, 'API key is valid!', 'success');
      } else {
        this.showStatus(statusEl, `API test failed: ${response.error}`, 'error');
      }
    } catch (error) {
      console.error('API test error:', error);
      this.showStatus(statusEl, 'Failed to test API key', 'error');
    }
  }

  async toggleAutoTransliteration() {
    const statusEl = document.getElementById('autoStatus');
    
    // Check if API key is required and available for AI mode
    if (this.processingMode === 'ai') {
      const apiKey = this.apiKeys[this.currentProvider];
      if (!apiKey) {
        this.showStatus(statusEl, 'Please configure your API key first for AI mode, or switch to Free Translation mode', 'error');
        return;
      }
    }

    try {
      // Get current tab
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      if (!tab) {
        this.showStatus(statusEl, 'No active tab found', 'error');
        return;
      }

      // Toggle auto transliteration
      this.isAutoEnabled = !this.isAutoEnabled;
      await this.saveSettings();

      console.log('Sending message to content script:', {
        action: 'toggleAutoTransliteration',
        enabled: this.isAutoEnabled,
        settings: {
          provider: this.currentProvider,
          apiKey: this.apiKeys[this.currentProvider],
          sourceLanguage: this.sourceLanguage,
          targetLanguage: this.targetLanguage,
          processingMode: this.processingMode,
          translationProvider: this.translationProvider
        }
      });

      const response = await chrome.tabs.sendMessage(tab.id, {
        action: 'toggleAutoTransliteration',
        enabled: this.isAutoEnabled,
        settings: {
          provider: this.currentProvider,
          apiKey: this.apiKeys[this.currentProvider],
          sourceLanguage: this.sourceLanguage,
          targetLanguage: this.targetLanguage,
          processingMode: this.processingMode,
          translationProvider: this.translationProvider
        }
      });

      console.log('Response from content script:', response);

      if (response && response.success) {
        this.updateAutoButton();
        
        if (this.isAutoEnabled) {
          this.showStatus(statusEl, '⚡ INSTANT Auto transliteration enabled! All text will be processed in real-time with ZERO delay.', 'success');
        } else {
          this.showStatus(statusEl, 'Auto transliteration disabled.', 'info');
        }
      } else {
        throw new Error(response ? response.error : 'Content script not responding');
      }
    } catch (error) {
      console.error('Auto transliteration toggle error:', error);
      this.showStatus(statusEl, `Failed to toggle auto transliteration: ${error.message}`, 'error');
      
      // Revert on failure
      this.isAutoEnabled = !this.isAutoEnabled;
      await this.saveSettings();
      this.updateAutoButton();
    }
  }

  async processText(action) {
    const statusEl = document.getElementById('processStatus');
    
    // Check if API key is required and available for AI mode
    if (this.processingMode === 'ai') {
      const apiKey = this.apiKeys[this.currentProvider];
      if (!apiKey) {
        this.showStatus(statusEl, 'Please configure your API key first for AI mode, or switch to Free Translation mode', 'error');
        return;
      }
    }

    this.showStatus(statusEl, 'Processing text...', 'info');

    try {
      // Get selected text from active tab
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      if (!tab) {
        this.showStatus(statusEl, 'No active tab found', 'error');
        return;
      }

      const response = await chrome.tabs.sendMessage(tab.id, {
        action: 'getSelectedText'
      });

      if (!response || !response.text) {
        this.showStatus(statusEl, 'Please select some text first', 'error');
        return;
      }

      let processedText;
      
      if (this.processingMode === 'ai' && this.apiKeys[this.currentProvider]) {
        // Process text with AI
        const aiResponse = await chrome.runtime.sendMessage({
          action: 'processText',
          provider: this.currentProvider,
          apiKey: this.apiKeys[this.currentProvider],
          text: response.text,
          actionType: action
        });

        if (aiResponse.success) {
          processedText = aiResponse.result;
        } else {
          throw new Error(aiResponse.error);
        }
      } else {
        // Use free translation
        const translationResponse = await chrome.runtime.sendMessage({
          action: 'translateText',
          text: response.text,
          fromLang: this.sourceLanguage,
          toLang: this.targetLanguage,
          provider: this.translationProvider
        });

        if (translationResponse.success) {
          processedText = translationResponse.result;
        } else {
          throw new Error(translationResponse.error);
        }
      }

      if (processedText) {
        // Replace selected text with processed result
        await chrome.tabs.sendMessage(tab.id, {
          action: 'replaceSelectedText',
          text: processedText
        });

        this.showStatus(statusEl, 'Text processed successfully!', 'success');
      } else {
        throw new Error('No processed text received');
      }
    } catch (error) {
      console.error('Text processing error:', error);
      this.showStatus(statusEl, `Failed to process text: ${error.message}`, 'error');
    }
  }

  showHelpDialog() {
    const helpContent = `
      <h3>Keyboard Shortcuts:</h3>
      <ul>
        <li><strong>Ctrl+Shift+T:</strong> Toggle auto transliteration</li>
        <li><strong>Ctrl+Shift+P:</strong> Process selected text</li>
      </ul>
      
      <h3>Usage:</h3>
      <ol>
        <li>Configure your API key (for AI mode) or use Free mode</li>
        <li>Select source and target languages</li>
        <li>Enable auto transliteration for automatic processing</li>
        <li>Or select text and use quick actions</li>
      </ol>
      
      <h3>Processing Modes:</h3>
      <ul>
        <li><strong>AI Mode:</strong> Best quality, requires API key</li>
        <li><strong>Free Mode:</strong> Good quality, no API key needed</li>
      </ul>
    `;

    // Create a simple modal dialog
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
    `;

    modal.innerHTML = `
      <div style="
        background: white;
        padding: 24px;
        border-radius: 12px;
        max-width: 400px;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      ">
        ${helpContent}
        <button id="closeHelp" style="
          background: #667eea;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          margin-top: 16px;
          font-weight: 600;
        ">Close</button>
      </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector('#closeHelp').addEventListener('click', () => {
      document.body.removeChild(modal);
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });
  }

  showStatus(element, message, type) {
    if (!element) return;
    
    element.textContent = message;
    element.className = `status status-${type}`;
    element.classList.remove('hidden');
    
    // Auto-hide success and info messages
    if (type === 'success' || type === 'info') {
      setTimeout(() => {
        element.classList.add('hidden');
      }, 3000);
    }
  }
}

// Initialize popup when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new InstantPopupManager();
});