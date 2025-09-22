// Popup Script for Multilingual Transliterator Extension
console.log('🌍 Multilingual Transliterator - Popup script loaded');

class TransliteratorPopup {
    constructor() {
        this.settings = {};
        this.currentTab = null;
        
        this.init();
    }

    async init() {
        try {
            // Load current settings
            await this.loadSettings();
            
            // Get current tab information
            await this.getCurrentTab();
            
            // Initialize UI
            this.initializeUI();
            
            // Set up event listeners
            this.setupEventListeners();
            
            // Update UI with current settings
            this.updateUI();
            
            console.log('✅ Popup initialized successfully');
        } catch (error) {
            console.error('❌ Failed to initialize popup:', error);
            this.showError('Failed to load extension settings');
        }
    }

    async loadSettings() {
        return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage({ action: 'getSettings' }, (response) => {
                if (chrome.runtime.lastError) {
                    reject(new Error(chrome.runtime.lastError.message));
                } else {
                    this.settings = response || {
                        enabled: true,
                        languages: {
                            arabic: { enabled: true, system: 'ala' },
                            russian: { enabled: true, system: 'bgn' },
                            japanese: { enabled: true, system: 'hepburn' },
                            mandarin: { enabled: true, system: 'pinyin' }
                        },
                        displayMode: 'hover',
                        autoDetection: true,
                        sensitivity: 'medium',
                        excludedSites: [],
                        theme: 'auto'
                    };
                    resolve(this.settings);
                }
            });
        });
    }

    async getCurrentTab() {
        return new Promise((resolve) => {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                this.currentTab = tabs[0];
                resolve(this.currentTab);
            });
        });
    }

    initializeUI() {
        // Update current site display
        if (this.currentTab) {
            const hostname = new URL(this.currentTab.url).hostname;
            const siteNameElement = document.getElementById('currentSite').querySelector('.site-name');
            siteNameElement.textContent = hostname;
            siteNameElement.title = this.currentTab.url;
        }
    }

    setupEventListeners() {
        // Extension toggle
        document.getElementById('toggleExtension').addEventListener('click', () => {
            this.toggleExtension();
        });

        // Language toggles
        document.querySelectorAll('.toggle-switch input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.toggleLanguage(e.target.dataset.language, e.target.checked);
            });
        });

        // System selectors
        document.querySelectorAll('.system-select').forEach(select => {
            select.addEventListener('change', (e) => {
                this.changeSystem(e.target.dataset.language, e.target.value);
            });
        });

        // Display mode
        document.getElementById('displayMode').addEventListener('change', (e) => {
            this.changeDisplayMode(e.target.value);
        });

        // Sensitivity
        document.getElementById('sensitivity').addEventListener('change', (e) => {
            this.changeSensitivity(e.target.value);
        });

        // Auto-detection
        document.getElementById('autoDetection').addEventListener('change', (e) => {
            this.toggleAutoDetection(e.target.checked);
        });

        // Quick actions
        document.getElementById('toggleSite').addEventListener('click', () => {
            this.toggleCurrentSite();
        });

        document.getElementById('clearCache').addEventListener('click', () => {
            this.clearCache();
        });

        document.getElementById('openOptions').addEventListener('click', () => {
            this.openOptions();
        });

        // Footer links
        document.getElementById('helpLink').addEventListener('click', (e) => {
            e.preventDefault();
            this.openHelp();
        });

        document.getElementById('feedbackLink').addEventListener('click', (e) => {
            e.preventDefault();
            this.openFeedback();
        });
    }

    updateUI() {
        // Update extension status
        const toggleBtn = document.getElementById('toggleExtension');
        const toggleIcon = toggleBtn.querySelector('.toggle-icon');
        const statusIndicator = document.getElementById('statusIndicator');
        const statusDot = statusIndicator.querySelector('.status-dot');
        const statusText = statusIndicator.querySelector('.status-text');

        if (this.settings.enabled) {
            toggleBtn.classList.remove('disabled');
            toggleBtn.title = 'Stop Extension';
            toggleIcon.textContent = '⚡'; // Active icon
            statusDot.classList.remove('disabled');
            statusText.classList.remove('disabled');
            statusText.textContent = 'Active';
        } else {
            toggleBtn.classList.add('disabled');
            toggleBtn.title = 'Start Extension';
            toggleIcon.textContent = '⭕'; // Disabled icon
            statusDot.classList.add('disabled');
            statusText.classList.add('disabled');
            statusText.textContent = 'Stopped';
        }

        // Update language settings
        Object.entries(this.settings.languages || {}).forEach(([language, config]) => {
            const languageItem = document.querySelector(`.language-item[data-language="${language}"]`);
            if (languageItem) {
                const checkbox = languageItem.querySelector('input[type="checkbox"]');
                const select = languageItem.querySelector('.system-select');
                
                if (checkbox) checkbox.checked = config.enabled;
                if (select) select.value = config.system;
                
                if (config.enabled && this.settings.enabled) {
                    languageItem.classList.remove('disabled');
                } else {
                    languageItem.classList.add('disabled');
                }
            }
        });

        // Update display options
        document.getElementById('displayMode').value = this.settings.displayMode || 'hover';
        document.getElementById('sensitivity').value = this.settings.sensitivity || 'medium';
        document.getElementById('autoDetection').checked = this.settings.autoDetection !== false;

        // Update site-specific button
        if (this.currentTab) {
            const hostname = new URL(this.currentTab.url).hostname;
            const excludedSites = this.settings.excludedSites || [];
            const isExcluded = excludedSites.includes(hostname);
            
            const toggleSiteBtn = document.getElementById('toggleSite');
            const btnText = toggleSiteBtn.querySelector('.btn-text');
            
            if (isExcluded) {
                btnText.textContent = 'Enable Site';
                toggleSiteBtn.title = `Enable transliteration for ${hostname}`;
            } else {
                btnText.textContent = 'Disable Site';
                toggleSiteBtn.title = `Disable transliteration for ${hostname}`;
            }
        }
    }

    async saveSettings() {
        return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage({ 
                action: 'updateSettings', 
                settings: this.settings 
            }, (response) => {
                if (chrome.runtime.lastError) {
                    reject(new Error(chrome.runtime.lastError.message));
                } else {
                    resolve(response);
                }
            });
        });
    }

    async toggleExtension() {
        try {
            this.settings.enabled = !this.settings.enabled;
            await this.saveSettings();
            
            // Send message to content script to start/stop transliteration
            if (this.currentTab) {
                chrome.tabs.sendMessage(this.currentTab.id, {
                    action: 'toggleTransliterator',
                    enabled: this.settings.enabled
                }).catch(() => {
                    console.log('Content script not ready yet');
                });
            }
            
            this.updateUI();
            this.showNotification(
                this.settings.enabled ? '🟢 Extension started' : '🔴 Extension stopped'
            );
        } catch (error) {
            console.error('Failed to toggle extension:', error);
            this.showError('Failed to update settings');
        }
    }

    async toggleLanguage(language, enabled) {
        try {
            if (!this.settings.languages[language]) {
                this.settings.languages[language] = { enabled: false, system: 'ala' };
            }
            
            this.settings.languages[language].enabled = enabled;
            await this.saveSettings();
            this.updateUI();
            
            const langNames = {
                arabic: 'Arabic',
                russian: 'Russian', 
                japanese: 'Japanese',
                mandarin: 'Mandarin'
            };
            
            this.showNotification(
                `${langNames[language]} ${enabled ? 'enabled' : 'disabled'}`
            );
        } catch (error) {
            console.error('Failed to toggle language:', error);
            this.showError('Failed to update language settings');
        }
    }

    async changeSystem(language, system) {
        try {
            if (!this.settings.languages[language]) {
                this.settings.languages[language] = { enabled: true, system: system };
            } else {
                this.settings.languages[language].system = system;
            }
            
            await this.saveSettings();
            this.showNotification(`${language} system changed to ${system.toUpperCase()}`);
        } catch (error) {
            console.error('Failed to change system:', error);
            this.showError('Failed to update system settings');
        }
    }

    async changeDisplayMode(mode) {
        try {
            this.settings.displayMode = mode;
            await this.saveSettings();
            this.showNotification(`Display mode changed to ${mode}`);
        } catch (error) {
            console.error('Failed to change display mode:', error);
            this.showError('Failed to update display settings');
        }
    }

    async changeSensitivity(sensitivity) {
        try {
            this.settings.sensitivity = sensitivity;
            await this.saveSettings();
            this.showNotification(`Detection sensitivity set to ${sensitivity}`);
        } catch (error) {
            console.error('Failed to change sensitivity:', error);
            this.showError('Failed to update sensitivity settings');
        }
    }

    async toggleAutoDetection(enabled) {
        try {
            this.settings.autoDetection = enabled;
            await this.saveSettings();
            this.showNotification(
                `Auto-detection ${enabled ? 'enabled' : 'disabled'}`
            );
        } catch (error) {
            console.error('Failed to toggle auto-detection:', error);
            this.showError('Failed to update detection settings');
        }
    }

    async toggleCurrentSite() {
        if (!this.currentTab) return;
        
        try {
            const hostname = new URL(this.currentTab.url).hostname;
            const excludedSites = this.settings.excludedSites || [];
            
            if (excludedSites.includes(hostname)) {
                // Remove from excluded sites
                this.settings.excludedSites = excludedSites.filter(site => site !== hostname);
                this.showNotification(`Enabled for ${hostname}`);
            } else {
                // Add to excluded sites
                this.settings.excludedSites = [...excludedSites, hostname];
                this.showNotification(`Disabled for ${hostname}`);
            }
            
            await this.saveSettings();
            this.updateUI();
            
        } catch (error) {
            console.error('Failed to toggle current site:', error);
            this.showError('Failed to update site settings');
        }
    }

    async clearCache() {
        try {
            // Send message to content script to clear processed nodes cache
            if (this.currentTab) {
                chrome.tabs.sendMessage(this.currentTab.id, { 
                    action: 'clearCache' 
                });
            }
            
            this.showNotification('Cache cleared successfully');
        } catch (error) {
            console.error('Failed to clear cache:', error);
            this.showError('Failed to clear cache');
        }
    }

    openOptions() {
        chrome.runtime.openOptionsPage();
        window.close();
    }

    openHelp() {
        chrome.tabs.create({ 
            url: 'https://github.com/multilingual-transliterator/help' 
        });
        window.close();
    }

    openFeedback() {
        chrome.tabs.create({ 
            url: 'https://github.com/multilingual-transliterator/feedback' 
        });
        window.close();
    }

    showNotification(message) {
        // Create temporary notification
        const notification = document.createElement('div');
        notification.className = 'popup-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 10px;
            left: 10px;
            right: 10px;
            background: #28a745;
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 12px;
            text-align: center;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.style.opacity = '1';
        }, 10);
        
        // Hide and remove notification
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 2000);
    }

    showError(message) {
        console.error('Popup error:', message);
        
        // Create error notification
        const notification = document.createElement('div');
        notification.className = 'popup-notification error';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 10px;
            left: 10px;
            right: 10px;
            background: #dc3545;
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 12px;
            text-align: center;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.style.opacity = '1';
        }, 10);
        
        // Hide and remove notification
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }
}

// Initialize popup when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TransliteratorPopup();
});