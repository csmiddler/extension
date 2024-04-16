(function(define){var __define; typeof define === "function" && (__define=define,define=null);
(() => {
const $a3eb920d0245eaee$export$e506a1d27d1eaa20 = {
    matches: [
        "*://steamcommunity.com/*",
        "*://*.csmiddler.com/*"
    ],
    all_frames: true
};
const $a3eb920d0245eaee$var$timeBetweenChecks = 518400000;
console.log(`CSMiddler Helper installed (v${chrome.runtime.getManifest().version}). Read more on https://github.com/csmiddler/extension`);
function $a3eb920d0245eaee$var$verifyTrades() {
    chrome.runtime.sendMessage({
        type: "verifyTrades"
    });
}
async function $a3eb920d0245eaee$var$checkAndExecute() {
    // Get the current time
    const currentTime = Date.now();
    const lastChecked = (await chrome.storage.local.get([
        "lastExecuted"
    ]))?.lastExecuted;
    // Check the last execution time stored in chrome.storage
    if (!lastChecked) {
        $a3eb920d0245eaee$var$verifyTrades();
        chrome.storage.local.set({
            lastExecuted: currentTime
        });
        return;
    }
    const timeElapsed = currentTime - lastChecked;
    if (timeElapsed >= $a3eb920d0245eaee$var$timeBetweenChecks) {
        $a3eb920d0245eaee$var$verifyTrades();
        chrome.storage.local.set({
            lastExecuted: currentTime
        });
    }
}
const $a3eb920d0245eaee$var$intervalChecker = setInterval($a3eb920d0245eaee$var$checkAndExecute, $a3eb920d0245eaee$var$timeBetweenChecks);
$a3eb920d0245eaee$var$checkAndExecute();
chrome.runtime.connect().onDisconnect.addListener(function() {
    clearInterval($a3eb920d0245eaee$var$intervalChecker);
});

})();
 globalThis.define=__define;  })(globalThis.define);