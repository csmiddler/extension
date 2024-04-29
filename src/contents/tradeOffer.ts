import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["*://*.steamcommunity.com/tradeoffer/*"],
  all_frames: true
}

const params = new URLSearchParams(window.location.search)
const description = params.get("description")
const items_to_give = params.get("items_to_give")
const items_to_receive = params.get("items_to_receive")

if (description) {
  ;(document.querySelector("#trade_offer_note") as HTMLTextAreaElement).value =
    decodeURI(description)
}

if (items_to_give) {
  console.log({ items_to_give })
}

if (items_to_receive) {
  console.log({ items_to_receive })
}
