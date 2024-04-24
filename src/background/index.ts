export {}

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension loaded and background service worker started")
})
