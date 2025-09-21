document.addEventListener('DOMContentLoaded', function() {
    const romanizeButton = document.getElementById('romanize-button');
    const outputArea = document.getElementById('output-area');
    const toggleBtn = document.getElementById('toggleBtn');

    romanizeButton.addEventListener('click', function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'romanize' }, function(response) {
                if (response && response.transliteratedText) {
                    outputArea.value = response.transliteratedText;
                } else {
                    outputArea.value = 'No Japanese text found.';
                }
            });
        });
    });

    toggleBtn.addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'toggle' }, (response) => {
                if (response && response.enabled) {
                    toggleBtn.textContent = 'Disable Romanization';
                    toggleBtn.classList.add('active');
                } else {
                    toggleBtn.textContent = 'Enable Romanization';
                    toggleBtn.classList.remove('active');
                }
            });
        });
    });
});