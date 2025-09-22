// LLM Provider configurations
const LLM_PROVIDERS = {
  openai: {
    name: 'OpenAI',
    baseUrl: 'https://api.openai.com/v1',
    models: ['gpt-4', 'gpt-4-turbo', 'gpt-3.5-turbo'],
    defaultModel: 'gpt-3.5-turbo',
    headers: (apiKey) => ({
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    }),
    testEndpoint: '/models',
    chatEndpoint: '/chat/completions'
  },
  anthropic: {
    name: 'Anthropic',
    baseUrl: 'https://api.anthropic.com/v1',
    models: ['claude-3-opus-20240229', 'claude-3-sonnet-20240229', 'claude-3-haiku-20240307'],
    defaultModel: 'claude-3-sonnet-20240229',
    headers: (apiKey) => ({
      'x-api-key': apiKey,
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01'
    }),
    testEndpoint: '/messages',
    chatEndpoint: '/messages'
  },
  google: {
    name: 'Google',
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
    models: ['gemini-pro', 'gemini-pro-vision'],
    defaultModel: 'gemini-pro',
    headers: (apiKey) => ({
      'Content-Type': 'application/json'
    }),
    testEndpoint: '/models',
    chatEndpoint: '/models/gemini-pro:generateContent',
    getUrl: (apiKey, endpoint) => `${this.baseUrl}${endpoint}?key=${apiKey}`
  },
  cohere: {
    name: 'Cohere',
    baseUrl: 'https://api.cohere.ai/v1',
    models: ['command', 'command-light', 'command-nightly'],
    defaultModel: 'command',
    headers: (apiKey) => ({
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    }),
    testEndpoint: '/models',
    chatEndpoint: '/generate'
  },
  together: {
    name: 'Together AI',
    baseUrl: 'https://api.together.xyz/v1',
    models: ['meta-llama/Llama-2-70b-chat-hf', 'mistralai/Mixtral-8x7B-Instruct-v0.1'],
    defaultModel: 'meta-llama/Llama-2-70b-chat-hf',
    headers: (apiKey) => ({
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    }),
    testEndpoint: '/models',
    chatEndpoint: '/chat/completions'
  }
};

// Translation API configurations
const TRANSLATION_PROVIDERS = {
  google_translate: {
    name: 'Google Translate',
    baseUrl: 'https://translate.googleapis.com/translate_a/single',
    free: true,
    getUrl: (text, fromLang, toLang) => 
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${fromLang}&tl=${toLang}&dt=t&q=${encodeURIComponent(text)}`,
    headers: () => ({}),
    parseResponse: (data) => {
      if (Array.isArray(data) && data[0] && Array.isArray(data[0])) {
        return data[0].map(item => item[0]).join('');
      }
      throw new Error('Invalid response format');
    }
  },
  mymemory: {
    name: 'MyMemory',
    baseUrl: 'https://api.mymemory.translated.net/get',
    free: true,
    getUrl: (text, fromLang, toLang) => 
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${fromLang}|${toLang}`,
    headers: () => ({}),
    parseResponse: (data) => {
      if (data && data.responseData && data.responseData.translatedText) {
        return data.responseData.translatedText;
      }
      throw new Error('Invalid response format');
    }
  },
  libretranslate: {
    name: 'LibreTranslate',
    baseUrl: 'https://libretranslate.de/translate',
    free: true,
    method: 'POST',
    headers: () => ({
      'Content-Type': 'application/json'
    }),
    getRequestBody: (text, fromLang, toLang) => ({
      q: text,
      source: fromLang,
      target: toLang,
      format: 'text'
    }),
    parseResponse: (data) => {
      if (data && data.translatedText) {
        return data.translatedText;
      }
      throw new Error('Invalid response format');
    }
  }
};

// Action prompts for different text processing tasks
const ACTION_PROMPTS = {
  summarize: 'Please provide a concise summary of the following text:',
  translate: 'Please translate the following text to English (if not already in English):',
  transliterate: 'Please transliterate the following text to English script while preserving the original meaning and pronunciation:',
  improve: 'Please improve the following text for clarity, grammar, and style:',
  explain: 'Please explain the following text in simple terms:',
  custom: 'Please process the following text according to your best judgment:'
};

class BackgroundService {
  constructor() {
    this.setupMessageListener();
    this.setupCommands();
    this.setupContextMenus();
  }

  setupMessageListener() {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      this.handleMessage(request, sender, sendResponse);
      return true; // Keep message channel open for async responses
    });
  }

  setupCommands() {
    chrome.commands.onCommand.addListener((command) => {
      switch (command) {
        case 'toggle-auto-transliteration':
          this.toggleAutoTransliteration();
          break;
        case 'process-selected-text':
          this.processSelectedText();
          break;
      }
    });
  }

  setupContextMenus() {
    chrome.runtime.onInstalled.addListener(() => {
      chrome.contextMenus.create({
        id: 'auto-transliterate',
        title: 'Auto Transliterate Text',
        contexts: ['selection']
      });
      
      chrome.contextMenus.create({
        id: 'translate-text',
        title: 'Translate Selection',
        contexts: ['selection']
      });
      
      chrome.contextMenus.create({
        id: 'improve-text',
        title: 'Improve Text',
        contexts: ['selection']
      });
      
      chrome.contextMenus.create({
        id: 'summarize-text',
        title: 'Summarize Text',
        contexts: ['selection']
      });
    });

    chrome.contextMenus.onClicked.addListener((info, tab) => {
      const actionMap = {
        'auto-transliterate': 'transliterate',
        'translate-text': 'translate',
        'improve-text': 'improve',
        'summarize-text': 'summarize'
      };
      
      const action = actionMap[info.menuItemId];
      if (action) {
        this.processContextMenuText(tab, info.selectionText, action);
      }
    });
  }

  async handleMessage(request, sender, sendResponse) {
    try {
      switch (request.action) {
        case 'testApiKey':
          await this.testApiKey(request, sendResponse);
          break;
        case 'processText':
          await this.processText(request, sendResponse);
          break;
        case 'translateText':
          await this.translateText(request, sendResponse);
          break;
        case 'getSettings':
          await this.getSettings(sendResponse);
          break;
        case 'saveSettings':
          await this.saveSettings(request, sendResponse);
          break;
        default:
          sendResponse({ success: false, error: 'Unknown action' });
      }
    } catch (error) {
      console.error('Background service error:', error);
      sendResponse({ success: false, error: error.message });
    }
  }

  async toggleAutoTransliteration() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab) {
        chrome.tabs.sendMessage(tab.id, { action: 'toggleAutoTransliteration' });
      }
    } catch (error) {
      console.error('Failed to toggle auto transliteration:', error);
    }
  }

  async processSelectedText() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab) {
        chrome.tabs.sendMessage(tab.id, { action: 'processSelectedText' });
      }
    } catch (error) {
      console.error('Failed to process selected text:', error);
    }
  }

  async processContextMenuText(tab, selectedText, action) {
    if (!selectedText) return;
    
    try {
      const settings = await this.getStoredSettings();
      const provider = settings.selectedProvider || 'google';
      const apiKey = settings.apiKeys?.[provider];
      
      if (!apiKey) {
        this.showNotification('API Key Required', 'Please configure your API key in the extension settings.');
        return;
      }

      const response = await this.processTextWithProvider(provider, apiKey, selectedText, action);
      
      if (response.success) {
        chrome.tabs.sendMessage(tab.id, {
          action: 'replaceSelectedText',
          text: response.result
        });
        
        this.showNotification('Text Processed', `Successfully ${action}ed the selected text.`);
      } else {
        this.showNotification('Processing Failed', response.error);
      }
    } catch (error) {
      console.error('Context menu processing error:', error);
      this.showNotification('Error', 'Failed to process text.');
    }
  }

  async getStoredSettings() {
    return new Promise((resolve) => {
      chrome.storage.local.get([
        'selectedProvider',
        'apiKeys',
        'settings',
        'translationProvider',
        'sourceLanguage',
        'targetLanguage',
        'autoTransliterate'
      ], resolve);
    });
  }

  showNotification(title, message) {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icon.jpg',
      title: title,
      message: message
    });
  }

  async testApiKey(request, sendResponse) {
    const { provider, apiKey } = request;
    const providerConfig = LLM_PROVIDERS[provider];

    if (!providerConfig) {
      sendResponse({ success: false, error: 'Invalid provider' });
      return;
    }

    try {
      let testUrl, headers, testRequest = { method: 'GET' };
      
      if (provider === 'google') {
        // Google uses API key as URL parameter
        testUrl = `${providerConfig.baseUrl}${providerConfig.testEndpoint}?key=${apiKey}`;
        headers = providerConfig.headers(apiKey);
      } else if (provider === 'anthropic') {
        // Anthropic requires a POST request for testing
        testUrl = `${providerConfig.baseUrl}${providerConfig.testEndpoint}`;
        headers = providerConfig.headers(apiKey);
        testRequest = {
          method: 'POST',
          body: JSON.stringify({
            model: providerConfig.defaultModel,
            max_tokens: 10,
            messages: [{ role: 'user', content: 'Hello' }]
          })
        };
      } else {
        // Other providers use standard approach
        testUrl = `${providerConfig.baseUrl}${providerConfig.testEndpoint}`;
        headers = providerConfig.headers(apiKey);
      }

      const response = await fetch(testUrl, {
        ...testRequest,
        headers
      });

      if (response.ok) {
        sendResponse({ success: true });
      } else {
        const errorData = await response.text();
        sendResponse({ 
          success: false, 
          error: `API test failed: ${response.status} ${response.statusText}` 
        });
      }
    } catch (error) {
      sendResponse({ 
        success: false, 
        error: `Network error: ${error.message}` 
      });
    }
  }

  async getSettings(sendResponse) {
    try {
      const settings = await this.getStoredSettings();
      sendResponse({ success: true, settings });
    } catch (error) {
      sendResponse({ success: false, error: error.message });
    }
  }

  async saveSettings(request, sendResponse) {
    try {
      await chrome.storage.local.set(request.settings);
      sendResponse({ success: true });
    } catch (error) {
      sendResponse({ success: false, error: error.message });
    }
  }

  async translateText(request, sendResponse) {
    const { text, fromLang = 'auto', toLang = 'en', provider = 'google_translate' } = request;
    const translationProvider = TRANSLATION_PROVIDERS[provider];

    if (!translationProvider) {
      sendResponse({ success: false, error: 'Invalid translation provider' });
      return;
    }

    try {
      let response;

      if (translationProvider.method === 'POST') {
        const requestBody = translationProvider.getRequestBody(text, fromLang, toLang);
        response = await fetch(translationProvider.baseUrl, {
          method: 'POST',
          headers: translationProvider.headers(),
          body: JSON.stringify(requestBody)
        });
      } else {
        const url = translationProvider.getUrl(text, fromLang, toLang);
        response = await fetch(url, {
          method: 'GET',
          headers: translationProvider.headers()
        });
      }

      if (!response.ok) {
        throw new Error(`Translation API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const translatedText = translationProvider.parseResponse(data);
      
      sendResponse({ success: true, result: translatedText });
    } catch (error) {
      console.error('Translation error:', error);
      sendResponse({ success: false, error: error.message });
    }
  }

  async processText(request, sendResponse) {
    const { provider, apiKey, text, actionType } = request;
    
    try {
      const response = await this.processTextWithProvider(provider, apiKey, text, actionType);
      sendResponse(response);
    } catch (error) {
      sendResponse({ success: false, error: error.message });
    }
  }

  async processTextWithProvider(provider, apiKey, text, actionType) {
    const providerConfig = LLM_PROVIDERS[provider];

    if (!providerConfig) {
      return { success: false, error: 'Invalid provider' };
    }

    try {
      const prompt = ACTION_PROMPTS[actionType] || ACTION_PROMPTS.custom;
      const fullPrompt = `${prompt}\n\n${text}`;

      const response = await this.callLLM(provider, providerConfig, apiKey, fullPrompt);
      return response;
    } catch (error) {
      return { success: false, error: `Processing error: ${error.message}` };
    }
  }

  async callLLM(provider, providerConfig, apiKey, prompt) {
    const headers = providerConfig.headers(apiKey);
    let url;
    
    if (provider === 'google') {
      // Google uses API key as URL parameter
      url = `${providerConfig.baseUrl}${providerConfig.chatEndpoint}?key=${apiKey}`;
    } else {
      url = `${providerConfig.baseUrl}${providerConfig.chatEndpoint}`;
    }

    let requestBody;

    switch (provider) {
      case 'openai':
      case 'together':
        requestBody = {
          model: providerConfig.defaultModel,
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 1000,
          temperature: 0.7
        };
        break;

      case 'anthropic':
        requestBody = {
          model: providerConfig.defaultModel,
          max_tokens: 1000,
          messages: [{ role: 'user', content: prompt }]
        };
        break;

      case 'google':
        requestBody = {
          contents: [{
            parts: [{ text: prompt }]
          }],
          generationConfig: {
            maxOutputTokens: 1000,
            temperature: 0.7
          }
        };
        break;

      case 'cohere':
        requestBody = {
          model: providerConfig.defaultModel,
          prompt: prompt,
          max_tokens: 1000,
          temperature: 0.7
        };
        break;

      default:
        throw new Error('Unsupported provider');
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API request failed: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      return this.extractResponseText(provider, data);
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  extractResponseText(provider, data) {
    try {
      let text;

      switch (provider) {
        case 'openai':
        case 'together':
          text = data.choices?.[0]?.message?.content;
          break;

        case 'anthropic':
          text = data.content?.[0]?.text;
          break;

        case 'google':
          text = data.candidates?.[0]?.content?.parts?.[0]?.text;
          break;

        case 'cohere':
          text = data.generations?.[0]?.text;
          break;

        default:
          throw new Error('Unsupported provider for response extraction');
      }

      if (!text) {
        throw new Error('No text found in API response');
      }

      return { success: true, result: text.trim() };
    } catch (error) {
      return { success: false, error: `Response parsing error: ${error.message}` };
    }
  }
}

// Initialize background service
new BackgroundService();