import browser from "webextension-polyfill"

export const getCorrelationId = async () => {
  const csmiddlerCookies = await browser.cookies.getAll({
    domain: "csmiddler.com"
  })

  if (!csmiddlerCookies?.length) {
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

  return csmiddlerCorrelationId
}
