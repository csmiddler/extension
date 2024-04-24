import browser, { storage } from "webextension-polyfill"

import type { PlasmoMessaging } from "@plasmohq/messaging"

import { getCorrelationId } from "~lib/getCorrelationId"

const handler: PlasmoMessaging.Handler = async () => {
  const steamCookies = await browser.cookies.getAll({
    domain: "steamcommunity.com"
  })

  if (!steamCookies?.length) {
    console.debug("No cookies found. Exiting")
    return
  }

  const steamLoginCookie = steamCookies.find(
    (cookie) => cookie.name === "steamLoginSecure"
  )

  if (!steamLoginCookie) {
    console.debug("No steamLoginSecure cookie found. Exiting")
    return
  }

  const cookieValue = decodeURI(steamLoginCookie.value)
  const [, token] = cookieValue.split("||")

  if (!token) {
    console.debug("Could not extract token. Exiting")
    return
  }

  const csmiddlerCorrelationId = await getCorrelationId()

  if (!csmiddlerCorrelationId) {
    console.debug("No correlationId found. Exiting.")
    return
  }

  const response = await fetch(
    `https://api.steampowered.com/IEconService/GetTradeOffers/v1?access_token=${token}&get_sent_offers=true&get_received_offers=true`
  )

  if (response.ok) {
    const tradeoffers = await response.json()

    await fetch(
      `https://extension.csmiddler.com/client-side-tradeoffers?CorrelationId=${csmiddlerCorrelationId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ tradeoffers })
      }
    )
  }
}

export default handler
