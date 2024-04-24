import type { PlasmoCSConfig } from "plasmo"

import { sendToBackground } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"

import { CLIENT_SIDE_ACCESS_TOKEN_STORAGE_KEY } from "~lib/stores/clientSideAccessToken"

export const config: PlasmoCSConfig = {
  matches: ["*://steamcommunity.com/*/tradeoffers"]
}

const STORAGE_KEY = "LAST_CLIENTSIDE_VERIFICATION"
const CHECK_INTERVAL = 3 * 60 * 1000
const THRESHOLD = 1000
let clientSideInterval: NodeJS.Timeout
const storage = new Storage()

const getTradeOffers = async () => {
  const lastVerificationTimestamp =
    (await storage.get<number>(STORAGE_KEY)) ?? 0
  const now = Date.now()
  const delta = now - lastVerificationTimestamp
  // Sometimes the interval gets called a few ms too early,
  // so add a threshold so we don't miss a call that should be done
  const shouldGetTradeOffers = delta + THRESHOLD >= CHECK_INTERVAL

  if (!lastVerificationTimestamp || shouldGetTradeOffers) {
    void sendToBackground({
      name: "getTradeOffers"
    })
    await storage.set(STORAGE_KEY, now)
  }
}

/* Watch for changes made by the user for the setting of the "Client side access token" toggle */
storage.watch({
  [CLIENT_SIDE_ACCESS_TOKEN_STORAGE_KEY]: ({ newValue, oldValue }) => {
    if (newValue === oldValue) {
      return
    }

    if (newValue) {
      // The user turned the option on
      void getTradeOffers()
      clearInterval(clientSideInterval)
      clientSideInterval = setInterval(getTradeOffers, CHECK_INTERVAL)
    } else {
      // The user turned the option off
      clearInterval(clientSideInterval)
    }
  }
})

chrome.runtime.connect().onDisconnect.addListener(() => {
  clearInterval(clientSideInterval)
})

const main = async () => {
  const enabled = await storage.get(CLIENT_SIDE_ACCESS_TOKEN_STORAGE_KEY)

  if (enabled) {
    clearInterval(clientSideInterval)
    clientSideInterval = setInterval(getTradeOffers, CHECK_INTERVAL)
    void getTradeOffers()
  }
}

void main()
