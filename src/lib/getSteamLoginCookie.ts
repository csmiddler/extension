import browser from "webextension-polyfill"

export const getSteamLoginCookie = async () => {
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

  const [userId, token] = cookieValue.split("||")

  return { userId, token }
}
