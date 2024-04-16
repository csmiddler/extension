import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["*://steamcommunity.com/*", "*://*.csmiddler.com/*"],
  all_frames: true
}

const timeBetweenChecks = 6 * 24 * 60 * 60 * 1000
console.log(
  `CSMiddler Helper installed (v${chrome.runtime.getManifest().version}). Read more on https://github.com/csmiddler/extension`
)

function verifyTrades() {
  chrome.runtime.sendMessage({ type: "verifyTrades" })
}

async function checkAndExecute() {
  // Get the current time
  const currentTime = Date.now()
  const lastChecked = (await chrome.storage.local.get(["lastExecuted"]))
    ?.lastExecuted

  // Check the last execution time stored in chrome.storage
  if (!lastChecked) {
    verifyTrades()
    chrome.storage.local.set({ lastExecuted: currentTime })
    return
  }

  const timeElapsed = currentTime - lastChecked

  if (timeElapsed >= timeBetweenChecks) {
    verifyTrades()
    chrome.storage.local.set({ lastExecuted: currentTime })
  }
}

const intervalChecker = setInterval(checkAndExecute, timeBetweenChecks)

checkAndExecute()

chrome.runtime.connect().onDisconnect.addListener(function () {
  clearInterval(intervalChecker)
})
