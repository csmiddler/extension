import type { PlasmoMessaging } from "@plasmohq/messaging"

import { getCorrelationId } from "~lib/getCorrelationId"
import { getSteamLoginCookie } from "~lib/getSteamLoginCookie"

const handler: PlasmoMessaging.Handler = async () => {
  const { token } = await getSteamLoginCookie()

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
