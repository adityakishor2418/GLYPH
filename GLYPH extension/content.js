class AutoTransliteratorAssistant {
  constructor() {
    this.isAutoTransliterateEnabled = false;
    this.isProcessing = false;
    this.originalTexts = new Map();
    this.processedNodes = new Set();
    this.observer = null;
    this.settings = {};
    this.textQueue = [];
    this.processingQueue = false;
    this.cache = new Map(); // Add instant cache
    this.processingSet = new Set(); // Track processing nodes
    
    console.log('⚡ INSTANT Auto Transliterator Assistant Pro initialized');
    this.init();
  }

  async init() {
    this.setupMessageListener();
    await this.loadSettings();
    this.setupSelectionListener();
    this.setupKeyboardShortcuts();
    console.log('⚡ INSTANT Auto Transliterator ready - ZERO DELAY MODE');
  }

  async loadSettings() {
    try {
      const result = await chrome.storage.local.get([
        'selectedProvider',
        'apiKeys',
        'autoTransliterate',
        'translationProvider',
        'sourceLanguage',
        'targetLanguage',
        'processingMode',
        'excludedElements',
        'minTextLength',
        'maxTextLength'
      ]);
      
      this.settings = {
        provider: result.selectedProvider || 'google',
        apiKey: result.apiKeys?.[result.selectedProvider || 'google'],
        autoTransliterate: result.autoTransliterate || false,
        translationProvider: result.translationProvider || 'google_translate',
        sourceLanguage: result.sourceLanguage || 'auto',
        targetLanguage: result.targetLanguage || 'en',
        processingMode: result.processingMode || 'smart', // smart, aggressive, conservative
        excludedElements: result.excludedElements || ['script', 'style', 'code', 'pre', 'textarea', 'input'],
        minTextLength: result.minTextLength || 3,
        maxTextLength: result.maxTextLength || 500
      };
      
      this.isAutoTransliterateEnabled = this.settings.autoTransliterate;
      
      if (this.isAutoTransliterateEnabled && this.settings.apiKey) {
        console.log('🚀 Auto-transliteration enabled with', this.settings.provider);
        this.startAutoTransliteration();
      } else {
        console.log('⏸️ Auto-transliteration disabled');
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  }

  setupMessageListener() {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      this.handleMessage(request, sender, sendResponse);
      return true;
    });
  }

  setupSelectionListener() {
    document.addEventListener('mouseup', this.handleTextSelection.bind(this));
    document.addEventListener('keyup', this.handleTextSelection.bind(this));
  }

  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Ctrl+Shift+T for toggling auto transliteration
      if (e.ctrlKey && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        this.toggleAutoTransliteration();
      }
      
      // Ctrl+Shift+P for processing selected text
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        this.processSelectedText();
      }
    });
  }

  async handleMessage(request, sender, sendResponse) {
    try {
      console.log('Content script received message:', request);
      
      switch (request.action) {
        case 'toggleAutoTransliteration':
          // Update settings if provided
          if (request.settings) {
            this.settings = { ...this.settings, ...request.settings };
          }
          await this.toggleAutoTransliteration(request.enabled);
          sendResponse({ success: true });
          break;
        case 'processSelectedText':
          await this.processSelectedText();
          sendResponse({ success: true });
          break;
        case 'getSelectedText':
          const selectedText = this.getSelectedText();
          sendResponse({ text: selectedText });
          break;
        case 'replaceSelectedText':
          await this.replaceSelectedText(request.text);
          sendResponse({ success: true });
          break;
        case 'updateSettings':
          await this.loadSettings();
          sendResponse({ success: true });
          break;
        default:
          sendResponse({ success: false, error: 'Unknown action' });
      }
    } catch (error) {
      console.error('Content script error:', error);
      sendResponse({ success: false, error: error.message });
    }
  }

  async toggleAutoTransliteration(enabled) {
    this.isAutoTransliterateEnabled = enabled !== undefined ? enabled : !this.isAutoTransliterateEnabled;
    
    // Save setting
    await chrome.storage.local.set({ autoTransliterate: this.isAutoTransliterateEnabled });
    
    if (this.isAutoTransliterateEnabled) {
      this.startAutoTransliteration();
      this.showStatusNotification('⚡ INSTANT Auto Transliteration Enabled', 'All text will be processed instantly with ZERO delay!', 'success');
    } else {
      this.stopAutoTransliteration();
      this.showStatusNotification('Auto Transliteration Disabled', 'Stopped automatic processing', 'info');
    }
  }

  async startAutoTransliteration() {
    console.log('⚡ INSTANT auto-transliteration starting with settings:', this.settings);
    this.isAutoTransliterateEnabled = true;
    
    // Check if we have the necessary configuration
    if (this.settings.processingMode === 'ai' && !this.settings.apiKey) {
      console.log('❌ No API key available for AI mode');
      this.showStatusNotification('Configuration Required', 'Please configure your API key for AI mode', 'warning');
      return;
    }
    
    // Process existing text on the page
    await this.processExistingText();
    
    // Start observing for new content
    this.startObserving();
  }

  stopAutoTransliteration() {
    console.log('⏹️ Stopping auto-transliteration...');
    this.isAutoTransliterateEnabled = false;
    this.stopObserving();
    this.restoreOriginalText();
    this.textQueue = [];
  }

  async processExistingText() {
    const textNodes = this.findTextNodes();
    console.log(`📝 Found ${textNodes.length} text nodes to process`);
    
    // Add nodes to queue for batch processing
    this.textQueue.push(...textNodes.map(node => ({ node, priority: 'normal' })));
    this.processQueue();
  }

  findTextNodes(root = document.body) {
    const walker = document.createTreeWalker(
      root,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          if (this.shouldSkipNode(node)) {
            return NodeFilter.FILTER_REJECT;
          }
          
          const text = node.textContent.trim();
          if (text.length >= this.settings.minTextLength && 
              text.length <= this.settings.maxTextLength && 
              !this.processedNodes.has(node)) {
            return NodeFilter.FILTER_ACCEPT;
          }
          
          return NodeFilter.FILTER_REJECT;
        }
      }
    );

    const textNodes = [];
    let node;
    while (node = walker.nextNode()) {
      textNodes.push(node);
    }

    return textNodes;
  }

  shouldSkipNode(textNode) {
    const parent = textNode.parentElement;
    if (!parent) return true;
    
    const tagName = parent.tagName.toLowerCase();
    if (this.settings.excludedElements.includes(tagName)) {
      return true;
    }
    
    // Skip elements with contenteditable
    if (parent.isContentEditable) return true;
    
    // Skip hidden elements
    const style = window.getComputedStyle(parent);
    if (style.display === 'none' || style.visibility === 'hidden') {
      return true;
    }
    
    // Skip elements that are likely UI components
    const classList = parent.classList;
    if (classList.contains('transliterator-processed') ||
        classList.contains('transliterator-original') ||
        parent.hasAttribute('data-transliterated')) {
      return true;
    }
    
    return false;
  }

  async processQueue() {
    if (this.processingQueue || this.textQueue.length === 0) return;
    
    this.processingQueue = true;
    
    while (this.textQueue.length > 0 && this.isAutoTransliterateEnabled) {
      const batch = this.textQueue.splice(0, 3); // Process 3 nodes at a time
      
      await Promise.all(batch.map(async ({ node, priority }) => {
        try {
          await this.processTextNode(node, priority === 'high');
        } catch (error) {
          console.error('Error processing text node:', error);
        }
      }));
      
      // Process instantly - no delays for INSTANT mode
      // await this.delay(200); // REMOVED FOR INSTANT MODE
    }
    
    this.processingQueue = false;
  }

  async processTextNode(textNode, isHighPriority = false) {
    if (this.processedNodes.has(textNode) || !this.isAutoTransliterateEnabled) {
      return;
    }

    const originalText = textNode.textContent.trim();
    if (originalText.length < this.settings.minTextLength) return;

    // ⚡ INSTANT CACHE CHECK - return immediately if cached
    if (this.cache.has(originalText)) {
      textNode.textContent = this.cache.get(originalText);
      this.processedNodes.add(textNode);
      this.flashSuccessInstant(textNode);
      return;
    }

    // Prevent duplicate processing
    if (this.processingSet.has(textNode)) return;
    this.processingSet.add(textNode);

    // Store original text
    this.originalTexts.set(textNode, originalText);

    try {
      // Show INSTANT processing indicator
      this.showInstantProcessingIndicator(textNode);
      
      let processedText;
      
      // Use appropriate processing method based on settings
      if (this.settings.processingMode === 'ai' && this.settings.apiKey) {
        // Use AI for transliteration with INSTANT timeout
        processedText = await this.processWithAIInstant(originalText, 'transliterate');
      } else {
        // Use free translation API with INSTANT timeout
        processedText = await this.translateWithFreeAPIInstant(originalText);
      }

      if (processedText && processedText !== originalText) {
        textNode.textContent = processedText;
        this.cache.set(originalText, processedText); // ⚡ Cache for instant future responses
        this.processedNodes.add(textNode);
        this.flashSuccessInstant(textNode);
        console.log(`⚡ INSTANT: "${originalText.substring(0, 30)}..." → "${processedText.substring(0, 30)}..."`);
      } else {
        this.processedNodes.delete(textNode);
      }
    } catch (error) {
      console.error('❌ Error processing text:', error);
      this.processedNodes.delete(textNode);
      this.removeProcessingIndicator(textNode);
    } finally {
      this.processingSet.delete(textNode); // ⚡ Always remove from processing set
    }
  }

  // ⚡ INSTANT PROCESSING METHODS
  async processWithAIInstant(text, action) {
    return new Promise((resolve) => {
      const timeout = setTimeout(() => resolve(text), 1000); // 1 second max for instant response
      
      this.processWithAI(text, action).then(result => {
        clearTimeout(timeout);
        resolve(result);
      }).catch(error => {
        clearTimeout(timeout);
        resolve(text); // Return original on error
      });
    });
  }

  async translateWithFreeAPIInstant(text) {
    return new Promise((resolve) => {
      const timeout = setTimeout(() => resolve(text), 800); // 800ms max for instant response
      
      this.translateWithFreeAPI(text).then(result => {
        clearTimeout(timeout);
        resolve(result);
      }).catch(error => {
        clearTimeout(timeout);
        resolve(text); // Return original on error
      });
    });
  }

  showInstantProcessingIndicator(textNode) {
    const parent = textNode.parentElement;
    if (parent) {
      parent.style.transition = 'all 0.05s';
      parent.style.backgroundColor = '#fff3cd';
      parent.style.borderLeft = '2px solid #ffc107';
    }
  }

  flashSuccessInstant(textNode) {
    const parent = textNode.parentElement;
    if (parent) {
      parent.style.backgroundColor = '#d4edda';
      parent.style.borderLeft = '2px solid #28a745';
      setTimeout(() => {
        parent.style.backgroundColor = '';
        parent.style.borderLeft = '';
        parent.style.transition = '';
      }, 150);
    }
  }

  async translateWithFreeAPI(text) {
    try {
      const response = await chrome.runtime.sendMessage({
        action: 'translateText',
        text: text,
        fromLang: this.settings.sourceLanguage || 'auto',
        toLang: this.settings.targetLanguage || 'en',
        provider: this.settings.translationProvider || 'google_translate'
      });

      if (response.success) {
        return response.result;
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error('Translation API error:', error);
      return null;
    }
  }

  async processWithAI(text, actionType) {
    try {
      const response = await chrome.runtime.sendMessage({
        action: 'processText',
        provider: this.settings.provider || 'google',
        apiKey: this.settings.apiKey,
        text: text,
        actionType: actionType
      });

      if (response.success) {
        return response.result;
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error('AI processing error:', error);
      return null;
    }
  }

  startObserving() {
    if (this.observer) return;

    // ⚡ INSTANT INPUT MONITORING - Add real-time input listeners
    this.setupInstantInputListeners();

    this.observer = new MutationObserver((mutations) => {
      const newNodes = [];
      
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE) {
              if (!this.shouldSkipNode(node)) {
                const text = node.textContent.trim();
                if (text.length >= this.settings.minTextLength && 
                    text.length <= this.settings.maxTextLength) {
                  newNodes.push({ node, priority: 'high' });
                }
              }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
              // Find text nodes in the added element
              const textNodes = this.findTextNodes(node);
              newNodes.push(...textNodes.map(textNode => ({ node: textNode, priority: 'normal' })));
            }
          });
        }
      });
      
      if (newNodes.length > 0) {
        this.textQueue.push(...newNodes);
        this.processQueue();
      }
    });

    this.observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  stopObserving() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  // ⚡ INSTANT INPUT LISTENERS for real-time processing
  setupInstantInputListeners() {
    // Monitor all input fields for instant processing
    document.addEventListener('input', (e) => {
      if (this.isAutoTransliterateEnabled && this.isTextInput(e.target)) {
        this.processInputInstantly(e.target);
      }
    }, true);

    document.addEventListener('keyup', (e) => {
      if (this.isAutoTransliterateEnabled && this.isTextInput(e.target)) {
        this.processInputInstantly(e.target);
      }
    }, true);

    document.addEventListener('paste', (e) => {
      if (this.isAutoTransliterateEnabled && this.isTextInput(e.target)) {
        setTimeout(() => this.processInputInstantly(e.target), 10);
      }
    }, true);
  }

  isTextInput(element) {
    return element && (
      element.tagName === 'INPUT' || 
      element.tagName === 'TEXTAREA' ||
      element.isContentEditable ||
      element.getAttribute('contenteditable') === 'true'
    );
  }

  async processInputInstantly(element) {
    if (!element || this.processingSet.has(element)) return;
    
    const text = element.value || element.textContent || element.innerText;
    if (!text || text.length < this.settings.minTextLength) return;

    // Check cache first for instant response
    if (this.cache.has(text)) {
      this.applyInstantResult(element, this.cache.get(text));
      return;
    }

    this.processingSet.add(element);
    
    try {
      const result = await this.translateTextInstantly(text);
      if (result && result !== text) {
        this.cache.set(text, result);
        this.applyInstantResult(element, result);
      }
    } catch (error) {
      console.error('⚡ Instant processing error:', error);
    } finally {
      this.processingSet.delete(element);
    }
  }

  applyInstantResult(element, translatedText) {
    const cursorPos = element.selectionStart;
    
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
      element.value = translatedText;
      if (cursorPos !== undefined) {
        element.setSelectionRange(cursorPos, cursorPos);
      }
    } else if (element.isContentEditable) {
      element.textContent = translatedText;
    }
    
    // Flash visual feedback for instant processing
    element.style.transition = 'background-color 0.1s';
    element.style.backgroundColor = '#e8f5e8';
    setTimeout(() => {
      element.style.backgroundColor = '';
    }, 100);
  }

  async translateTextInstantly(text) {
    try {
      if (this.settings.processingMode === 'ai' && this.settings.apiKey) {
        return await this.processWithAIInstant(text, 'transliterate');
      } else {
        return await this.translateWithFreeAPIInstant(text);
      }
    } catch (error) {
      console.error('⚡ Translation error:', error);
      return text;
    }
  }

  handleTextSelection(e) {
    const selectedText = this.getSelectedText();
    if (selectedText && selectedText.length > this.settings.minTextLength) {
      this.showSelectionTooltip(e);
    }
  }

  getSelectedText() {
    const selection = window.getSelection();
    return selection.toString().trim();
  }

  async processSelectedText() {
    const selectedText = this.getSelectedText();
    if (!selectedText) {
      this.showStatusNotification('No Selection', 'Please select some text first', 'warning');
      return;
    }

    try {
      let processedText;
      
      if (this.settings.processingMode === 'ai' && this.settings.apiKey) {
        processedText = await this.processWithAI(selectedText, 'transliterate');
      } else {
        processedText = await this.translateWithFreeAPI(selectedText);
      }

      if (processedText) {
        await this.replaceSelectedText(processedText);
        this.showStatusNotification('Text Processed', 'Selected text has been processed', 'success');
      } else {
        this.showStatusNotification('Processing Failed', 'Could not process the selected text', 'error');
      }
    } catch (error) {
      console.error('Selected text processing error:', error);
      this.showStatusNotification('Error', 'Failed to process selected text', 'error');
    }
  }

  async replaceSelectedText(newText) {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(document.createTextNode(newText));
      selection.removeAllRanges();
    }
  }

  restoreOriginalText() {
    this.originalTexts.forEach((originalText, textNode) => {
      if (textNode.parentNode) {
        textNode.textContent = originalText;
        this.removeProcessingIndicator(textNode);
      }
    });
    this.originalTexts.clear();
    this.processedNodes.clear();
  }

  showProcessingIndicator(textNode) {
    const parent = textNode.parentElement;
    if (parent && !parent.classList.contains('transliterator-processing')) {
      parent.classList.add('transliterator-processing');
      parent.style.setProperty('background', 'linear-gradient(120deg, #fff3cd 0%, #ffeaa7 100%)', 'important');
      parent.style.setProperty('border-left', '3px solid #007bff', 'important');
      parent.style.setProperty('transition', 'all 0.3s ease', 'important');
      parent.title = 'Processing with AI...';
    }
  }

  showSuccessIndicator(textNode) {
    const parent = textNode.parentElement;
    if (parent) {
      parent.classList.remove('transliterator-processing');
      parent.classList.add('transliterator-success');
      parent.style.setProperty('background', 'linear-gradient(120deg, #d1edff 0%, #a8e6cf 100%)', 'important');
      parent.style.setProperty('border-left', '3px solid #28a745', 'important');
      parent.title = 'Processed with AI';
      
      // Remove success indicator after 3 seconds
      setTimeout(() => {
        this.removeProcessingIndicator(textNode);
      }, 3000);
    }
  }

  removeProcessingIndicator(textNode) {
    const parent = textNode.parentElement;
    if (parent) {
      parent.classList.remove('transliterator-processing', 'transliterator-success');
      parent.style.removeProperty('background');
      parent.style.removeProperty('border-left');
      parent.style.removeProperty('transition');
      parent.removeAttribute('title');
    }
  }

  showSelectionTooltip(e) {
    // Remove existing tooltip
    const existingTooltip = document.querySelector('.transliterator-tooltip');
    if (existingTooltip) {
      existingTooltip.remove();
    }

    const tooltip = document.createElement('div');
    tooltip.className = 'transliterator-tooltip';
    tooltip.innerHTML = `
      <div style="
        position: absolute;
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 12px;
        z-index: 10000;
        pointer-events: none;
        white-space: nowrap;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      ">
        Press Ctrl+Shift+P to process selected text
      </div>
    `;
    
    tooltip.style.left = (e.pageX + 10) + 'px';
    tooltip.style.top = (e.pageY - 30) + 'px';
    
    document.body.appendChild(tooltip);
    
    // Remove tooltip after 3 seconds
    setTimeout(() => {
      if (tooltip.parentNode) {
        tooltip.parentNode.removeChild(tooltip);
      }
    }, 3000);
  }

  showStatusNotification(title, message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `transliterator-notification transliterator-notification-${type}`;
    
    const bgColor = {
      'success': '#d4edda',
      'error': '#f8d7da',
      'warning': '#fff3cd',
      'info': '#d1ecf1'
    }[type] || '#d1ecf1';
    
    const borderColor = {
      'success': '#28a745',
      'error': '#dc3545',
      'warning': '#ffc107',
      'info': '#007bff'
    }[type] || '#007bff';
    
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        border: 1px solid ${borderColor};
        border-left: 4px solid ${borderColor};
        padding: 12px 16px;
        border-radius: 6px;
        font-size: 14px;
        z-index: 10000;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        animation: slideInRight 0.3s ease-out;
      ">
        <div style="font-weight: bold; margin-bottom: 4px;">${title}</div>
        <div>${message}</div>
      </div>
    `;
    
    // Add animation styles
    if (!document.querySelector('#transliterator-styles')) {
      const styles = document.createElement('style');
      styles.id = 'transliterator-styles';
      styles.textContent = `
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
      `;
      document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
        setTimeout(() => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
          }
        }, 300);
      }
    }, 5000);
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Initialize the Auto Transliterator Assistant when the page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new AutoTransliteratorAssistant();
  });
} else {
  new AutoTransliteratorAssistant();
}