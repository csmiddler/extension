import type { PlasmoCSConfig } from "plasmo"

import { sendToBackground } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"

import { SERVER_SIDE_ACCESS_TOKEN_STORAGE_KEY } from "~lib/stores/serverSideAccessToken"

export const config: PlasmoCSConfig = {
  matches: ["*://steamcommunity.com/*", "*://*.csmiddler.com/*"],
  all_frames: true
}

const STORAGE_KEY = "LAST_SERVERSIDE_VERIFICATION"
const CHECK_INTERVAL = 3 * 60 * 60 * 1000
const THRESHOLD = 1000
let serverSideInterval: NodeJS.Timeout

const storage = new Storage()

const verifyServerSideToken = async () => {
  const lastVerificationTimestamp =
    (await storage.get<number>(STORAGE_KEY)) ?? 0
  const now = Date.now()
  const delta = now - lastVerificationTimestamp
  // Sometimes the interval gets called a few ms too early,
  // so add a threshold so we don't miss a call that should be done
  const shouldVerifyToken = delta + THRESHOLD >= CHECK_INTERVAL

  if (!lastVerificationTimestamp || shouldVerifyToken) {
    void sendToBackground({
      name: "verifyTrades"
    })
    await storage.set(STORAGE_KEY, now)
  }
}

/* Watch for changes made by the user for the setting of the "Server side access token" toggle */
storage.watch({
  [SERVER_SIDE_ACCESS_TOKEN_STORAGE_KEY]: ({ newValue, oldValue }) => {
    if (newValue === oldValue) {
      return
    }

    if (newValue) {
      // The user turned the option on, so make a call and setup a fresh new interval
      void verifyServerSideToken()
      clearInterval(serverSideInterval)
      serverSideInterval = setInterval(verifyServerSideToken, CHECK_INTERVAL)
    } else {
      // The user turned the option off, so clear any current interval
      clearInterval(serverSideInterval)
    }
  }
})

chrome.runtime.connect().onDisconnect.addListener(() => {
  clearInterval(serverSideInterval)
})

console.log(
  `CSMiddler Helper installed (v${chrome.runtime.getManifest().version}). Read more on https://github.com/csmiddler/extension`
)

const main = async () => {
  const enabled = await storage.get(SERVER_SIDE_ACCESS_TOKEN_STORAGE_KEY)

  if (enabled) {
    clearInterval(serverSideInterval)
    serverSideInterval = setInterval(verifyServerSideToken, CHECK_INTERVAL)
    void verifyServerSideToken()
  }
}

void main()
