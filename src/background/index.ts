import browser from "webextension-polyfill"

import { sendToBackground } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"

import { LAST_CLIENTSIDE_VERIFICATION_STORAGE_KEY } from "~contents/tradeOffers"
import { LAST_SERVERSIDE_VERIFICATION_STORAGE_KEY } from "~contents/verifyTrades"
import { CLIENT_SIDE_ACCESS_TOKEN_STORAGE_KEY } from "~lib/stores/clientSideAccessToken"
import { SERVER_SIDE_ACCESS_TOKEN_STORAGE_KEY } from "~lib/stores/serverSideAccessToken"

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension loaded and background service worker started")
})

browser.cookies.onChanged.addListener(async ({ removed, cookie }) => {
  if (removed) {
    // We don't care about removed cookies
    return
  }

  if (
    (cookie.name === "steamLoginSecure" &&
      cookie.domain === "steamcommunity.com") ||
    (cookie.name === "correlationId" && cookie.domain === "csmiddler.com")
  ) {
    // We have either a new steamLoginSecure cookie or a new correlationId cookie
    console.log("Cookie added", cookie)
    const storage = new Storage()

    const clientSideAccessEnabled = await storage.get(
      CLIENT_SIDE_ACCESS_TOKEN_STORAGE_KEY
    )
    if (clientSideAccessEnabled) {
      void sendToBackground({
        name: "getTradeOffers"
      })
      await storage.set(LAST_CLIENTSIDE_VERIFICATION_STORAGE_KEY, Date.now())
    }

    const serverSideAccessEnabled = await storage.get(
      SERVER_SIDE_ACCESS_TOKEN_STORAGE_KEY
    )
    if (serverSideAccessEnabled) {
      void sendToBackground({
        name: "verifyTrades"
      })
      await storage.set(LAST_SERVERSIDE_VERIFICATION_STORAGE_KEY, Date.now())
    }
  }
})

export {}
