// This file contains the background script for the Chrome extension. It manages the extension's lifecycle and handles events such as installation and updates. It communicates with content.js but minimizes variable exchange by using message passing only when necessary.

chrome.runtime.onInstalled.addListener(() => {
    console.log("Japanese Romanizer Extension installed.");
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "transliterate") {
        // Here we could handle any specific actions if needed
        sendResponse({ status: "received" });
    }
});