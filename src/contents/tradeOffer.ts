import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["*://*.steamcommunity.com/tradeoffer/*"],
  all_frames: true,
  world: "MAIN"
}

const params = new URLSearchParams(window.location.search)
const description = params.get("description")
const items_to_give = params.getAll("items_to_give")
const items_to_receive = params.getAll("items_to_receive")

if (description) {
  ;(document.querySelector("#trade_offer_note") as HTMLTextAreaElement).value =
    decodeURI(description)
}

handleTradeItems()

async function handleTradeItems() {
  if (items_to_give) {
    document.getElementById("inventory_select_your_inventory").click()
    TradePageSelectInventory(UserYou, 730, 2)
    await processTradeItems(
      items_to_give,
      `inventory_${UserYou.strSteamId}_730_2`,
      "item730_2",
      true
    )
  }

  if (items_to_receive) {
    document.getElementById("inventory_select_their_inventory").click()
    TradePageSelectInventory(UserThem, 730, 2)
    await processTradeItems(
      items_to_receive,
      `inventory_${UserThem.strSteamId}_730_2`,
      "item730_2",
      false
    )
  }

  if (items_to_give || items_to_receive) {
    finalizeTradeSetup()
  }
}

async function processTradeItems(
  items: string[],
  inventorySelector: string,
  assetIdPrefix: string,
  isGive: boolean
) {
  await waitForElement(inventorySelector)

  items.forEach((assetId) => {
    const itemElement = document.getElementById(`${assetIdPrefix}_${assetId}`)
    if (itemElement) {
      MoveItemToTrade(itemElement)
    } else {
      if (isGive) {
        window.confirm(
          "We tried to add an item to the trade from your inventory, but it does not exist in your inventory."
        )
      } else {
        window.confirm(
          "We tried to add an item that you should receive, but it does not exist in the other user's inventory. Be careful."
        )
      }
    }
  })
}

// Finalize the trade setup
function finalizeTradeSetup() {
  ToggleReady(true)
  UserYou.bReady = true
  GTradeStateManager.ToggleReady(true)
  UpdateReadyButtons()

  const btnContinue = document.getElementsByClassName(
    "btn_green_steamui btn_medium"
  )

  if (btnContinue && btnContinue?.[0]) {
    ;(btnContinue[0] as HTMLElement).click()
  }
}

async function waitForElement(selector) {
  return new Promise((resolve, reject) => {
    const observer = new MutationObserver((mutations, observer) => {
      const element = document.getElementById(selector)
      if (element) {
        observer.disconnect()
        resolve(element)
      }
    })

    observer.observe(document.body, { childList: true, subtree: true })
  })
}

// Types for Steam functions, accessable via DevTools in Chrome -> Sources -> Page -> community.akamai.steamstatic.com files
declare function TradePageSelectInventory(
  user: any,
  appId: number,
  contextId: number
): void
declare function MoveItemToTrade(element: HTMLElement): void
declare function ToggleReady(ready: boolean): void
declare function UpdateReadyButtons(): void
declare const UserYou: any
declare const UserThem: any
declare const GTradeStateManager: any
