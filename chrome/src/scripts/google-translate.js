/*global $, chrome, alert, console, readClipboard, copyTextToClipboard*/

var srcBox = document.getElementById("source"),
    resultBox = document.getElementById("result_box"),
    oldClipboardText;

chrome.runtime.onMessage.addListener(
    function (message, sender, sendResponse) {
        "use strict";
        if (message.request === "backup_clipboard") {
            oldClipboardText = readClipboard();
        }
    }
);

resultBox.addEventListener("DOMNodeInserted", function () {
    "use strict";
    copyTextToClipboard(resultBox.innerText);
    srcBox.focus();
}, false);

chrome.runtime.sendMessage({
    request: "insert_css",
    fileName: "css/toast.css"
});

chrome.runtime.sendMessage({
    request: "retrieve_url",
    fileName: "templates/toast.html"
}, function (url) {
    "use strict";
    $.ajax({
        url: url,
        dataType: "html",
        success: function (contents) {
            $("body").append(contents);
        }
    });
});
