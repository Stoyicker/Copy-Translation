/*global chrome, alert, console, $*/
var requestBackup = function (activeInfo) {
    "use strict";
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            request: "backup"
        }, function (response) {
            console.log("Performed clipboard backup.");
        });
    });
};

chrome.tabs.onActivated.addListener(requestBackup);
chrome.windows.onFocusChanged.addListener(requestBackup);