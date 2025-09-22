class OptionsManager {
  constructor() {
    this.providers = ['openai', 'anthropic', 'google', 'cohere', 'together'];
    this.settings = {};
    this.apiKeys = {};
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
        'maxTokens',
        'temperature',
        'customPrompts',
        'enableNotifications',
        'enableContextMenu',
        'enableAutoSave',
        'sourceLanguage',
        'targetLanguage',
        'processingMode',
        'translationProvider',
        'minTextLength',
        'maxTextLength',
        'excludedElements'
      ]);
      
      this.selectedProvider = result.selectedProvider || 'google';
      this.apiKeys = result.apiKeys || {};
      this.settings = result.settings || {};
      this.maxTokens = result.maxTokens || 1000;
      this.temperature = result.temperature || 0.7;
      this.customPrompts = result.customPrompts || '';
      this.enableNotifications = result.enableNotifications || true;
      this.enableContextMenu = result.enableContextMenu || true;
      this.enableAutoSave = result.enableAutoSave || true;
      this.sourceLanguage = result.sourceLanguage || 'auto';
      this.targetLanguage = result.targetLanguage || 'en';
      this.processingMode = result.processingMode || 'ai';
      this.translationProvider = result.translationProvider || 'google_translate';
      this.minTextLength = result.minTextLength || 3;
      this.maxTextLength = result.maxTextLength || 500;
      this.excludedElements = result.excludedElements || ['script', 'style', 'code', 'pre', 'textarea', 'input'];
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  }

  async saveSettings() {
    try {
      await chrome.storage.local.set({
        selectedProvider: this.selectedProvider,
        apiKeys: this.apiKeys,
        settings: this.settings,
        maxTokens: this.maxTokens,
        temperature: this.temperature,
        customPrompts: this.customPrompts,
        enableNotifications: this.enableNotifications,
        enableContextMenu: this.enableContextMenu,
        enableAutoSave: this.enableAutoSave,
        sourceLanguage: this.sourceLanguage,
        targetLanguage: this.targetLanguage,
        processingMode: this.processingMode,
        translationProvider: this.translationProvider,
        minTextLength: this.minTextLength,
        maxTextLength: this.maxTextLength,
        excludedElements: this.excludedElements
      });
      
      this.showStatus('Settings saved successfully!', 'success');
    } catch (error) {
      console.error('Failed to save settings:', error);
      this.showStatus('Failed to save settings', 'error');
    }
  }

  setupEventListeners() {
    // Provider selection
    document.getElementById('defaultProvider').addEventListener('change', (e) => {
      this.selectedProvider = e.target.value;
      this.updateProviderConfig();
      this.saveSettings();
    });

    // API key inputs and testing
    this.providers.forEach(provider => {
      const keyInput = document.getElementById(`${provider}-key`);
      const modelSelect = document.getElementById(`${provider}-model`);
      
      if (keyInput) {
        keyInput.addEventListener('input', (e) => {
          this.apiKeys[provider] = e.target.value;
          document.getElementById(`${provider}-status`).textContent = 'Not tested';
          document.getElementById(`${provider}-status`).className = 'api-key-status unknown';
          
          if (this.enableAutoSave) {
            this.saveSettings();
          }
        });
      }

      if (modelSelect) {
        modelSelect.addEventListener('change', (e) => {
          if (!this.settings[provider]) this.settings[provider] = {};
          this.settings[provider].model = e.target.value;
          this.saveSettings();
        });
      }
    });

    // Processing settings
    document.getElementById('maxTokens').addEventListener('change', (e) => {
      this.maxTokens = parseInt(e.target.value);
      if (this.enableAutoSave) this.saveSettings();
    });

    document.getElementById('temperature').addEventListener('input', (e) => {
      this.temperature = parseFloat(e.target.value);
      if (this.enableAutoSave) this.saveSettings();
    });

    document.getElementById('customPrompts').addEventListener('input', (e) => {
      this.customPrompts = e.target.value;
      if (this.enableAutoSave) this.saveSettings();
    });

    // Advanced settings
    document.getElementById('enableNotifications').addEventListener('change', (e) => {
      this.enableNotifications = e.target.checked;
      if (this.enableAutoSave) this.saveSettings();
    });

    document.getElementById('enableContextMenu').addEventListener('change', (e) => {
      this.enableContextMenu = e.target.checked;
      if (this.enableAutoSave) this.saveSettings();
    });

    document.getElementById('enableAutoSave').addEventListener('change', (e) => {
      this.enableAutoSave = e.target.checked;
      this.saveSettings();
    });

    // Button handlers
    document.getElementById('testAllKeys').addEventListener('click', () => {
      this.testAllApiKeys();
    });

    document.getElementById('saveProviderConfig').addEventListener('click', () => {
      this.saveSettings();
    });

    document.getElementById('saveProcessingSettings').addEventListener('click', () => {
      this.saveSettings();
    });

    document.getElementById('saveAdvancedSettings').addEventListener('click', () => {
      this.saveSettings();
    });

    document.getElementById('resetSettings').addEventListener('click', () => {
      this.resetAllSettings();
    });

    document.getElementById('exportSettings').addEventListener('click', () => {
      this.exportSettings();
    });

    document.getElementById('importSettings').addEventListener('click', () => {
      document.getElementById('importFile').click();
    });

    document.getElementById('importFile').addEventListener('change', (e) => {
      this.importSettings(e.target.files[0]);
    });
  }

  updateUI() {
    // Update provider selection
    document.getElementById('defaultProvider').value = this.selectedProvider;
    this.updateProviderConfig();

    // Update API keys and models
    this.providers.forEach(provider => {
      const keyInput = document.getElementById(`${provider}-key`);
      const modelSelect = document.getElementById(`${provider}-model`);
      
      if (keyInput && this.apiKeys[provider]) {
        keyInput.value = this.apiKeys[provider];
      }

      if (modelSelect && this.settings[provider]?.model) {
        modelSelect.value = this.settings[provider].model;
      }
    });

    // Update processing settings
    document.getElementById('maxTokens').value = this.maxTokens;
    document.getElementById('temperature').value = this.temperature;
    document.getElementById('customPrompts').value = this.customPrompts;

    // Update advanced settings
    document.getElementById('enableNotifications').checked = this.enableNotifications;
    document.getElementById('enableContextMenu').checked = this.enableContextMenu;
    document.getElementById('enableAutoSave').checked = this.enableAutoSave;
  }

  updateProviderConfig() {
    // Hide all provider configs
    this.providers.forEach(provider => {
      const config = document.getElementById(`${provider}-config`);
      if (config) {
        config.classList.remove('active');
      }
    });

    // Show selected provider config
    const selectedConfig = document.getElementById(`${this.selectedProvider}-config`);
    if (selectedConfig) {
      selectedConfig.classList.add('active');
    }
  }

  async testAllApiKeys() {
    this.showStatus('Testing all API keys...', 'info');
    
    const testPromises = this.providers.map(async (provider) => {
      const apiKey = this.apiKeys[provider];
      if (!apiKey) return;

      const statusEl = document.getElementById(`${provider}-status`);
      statusEl.textContent = 'Testing...';
      statusEl.className = 'api-key-status unknown';

      try {
        const response = await chrome.runtime.sendMessage({
          action: 'testApiKey',
          provider: provider,
          apiKey: apiKey
        });

        if (response.success) {
          statusEl.textContent = 'Valid';
          statusEl.className = 'api-key-status valid';
        } else {
          statusEl.textContent = 'Invalid';
          statusEl.className = 'api-key-status invalid';
        }
      } catch (error) {
        statusEl.textContent = 'Error';
        statusEl.className = 'api-key-status invalid';
      }
    });

    await Promise.all(testPromises);
    this.showStatus('API key testing completed', 'success');
  }

  async resetAllSettings() {
    if (!confirm('Are you sure you want to reset all settings? This cannot be undone.')) {
      return;
    }

    try {
      await chrome.storage.local.clear();
      
      // Reset local values
      this.selectedProvider = 'google';
      this.apiKeys = {};
      this.settings = {};
      this.maxTokens = 1000;
      this.temperature = 0.7;
      this.customPrompts = '';
      this.enableNotifications = true;
      this.enableContextMenu = true;
      this.enableAutoSave = true;
      this.sourceLanguage = 'auto';
      this.targetLanguage = 'en';
      this.processingMode = 'ai';
      this.translationProvider = 'google_translate';
      this.minTextLength = 3;
      this.maxTextLength = 500;
      this.excludedElements = ['script', 'style', 'code', 'pre', 'textarea', 'input'];

      this.updateUI();
      this.showStatus('All settings have been reset', 'success');
    } catch (error) {
      console.error('Failed to reset settings:', error);
      this.showStatus('Failed to reset settings', 'error');
    }
  }

  exportSettings() {
    const exportData = {
      selectedProvider: this.selectedProvider,
      apiKeys: this.apiKeys,
      settings: this.settings,
      maxTokens: this.maxTokens,
      temperature: this.temperature,
      customPrompts: this.customPrompts,
      enableNotifications: this.enableNotifications,
      enableContextMenu: this.enableContextMenu,
      enableAutoSave: this.enableAutoSave,
      sourceLanguage: this.sourceLanguage,
      targetLanguage: this.targetLanguage,
      processingMode: this.processingMode,
      translationProvider: this.translationProvider,
      minTextLength: this.minTextLength,
      maxTextLength: this.maxTextLength,
      excludedElements: this.excludedElements,
      exportDate: new Date().toISOString(),
      version: '2.0.0'
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-transliterator-settings-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    URL.revokeObjectURL(url);
    this.showStatus('Settings exported successfully', 'success');
  }

  async importSettings(file) {
    if (!file) return;

    try {
      const text = await file.text();
      const importData = JSON.parse(text);

      // Validate import data
      if (!importData.version) {
        throw new Error('Invalid settings file format');
      }

      // Import settings
      this.selectedProvider = importData.selectedProvider || 'google';
      this.apiKeys = importData.apiKeys || {};
      this.settings = importData.settings || {};
      this.maxTokens = importData.maxTokens || 1000;
      this.temperature = importData.temperature || 0.7;
      this.customPrompts = importData.customPrompts || '';
      this.enableNotifications = importData.enableNotifications !== false;
      this.enableContextMenu = importData.enableContextMenu !== false;
      this.enableAutoSave = importData.enableAutoSave !== false;
      this.sourceLanguage = importData.sourceLanguage || 'auto';
      this.targetLanguage = importData.targetLanguage || 'en';
      this.processingMode = importData.processingMode || 'ai';
      this.translationProvider = importData.translationProvider || 'google_translate';
      this.minTextLength = importData.minTextLength || 3;
      this.maxTextLength = importData.maxTextLength || 500;
      this.excludedElements = importData.excludedElements || ['script', 'style', 'code', 'pre', 'textarea', 'input'];

      await this.saveSettings();
      this.updateUI();
      
      this.showStatus(`Settings imported successfully from ${importData.exportDate ? new Date(importData.exportDate).toLocaleDateString() : 'unknown date'}`, 'success');
    } catch (error) {
      console.error('Failed to import settings:', error);
      this.showStatus('Failed to import settings. Please check the file format.', 'error');
    }
  }

  showStatus(message, type) {
    const statusEl = document.getElementById('statusMessage');
    statusEl.textContent = message;
    statusEl.className = `status status-${type}`;
    statusEl.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      statusEl.style.display = 'none';
    }, 5000);
  }
}

// Initialize options manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new OptionsManager();
});