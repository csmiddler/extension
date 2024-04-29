import type { PlasmoMessaging } from "@plasmohq/messaging"

import { getSteamLoginCookie } from "~lib/getSteamLoginCookie"

const handler: PlasmoMessaging.Handler = async (req, res) => {
  const { userId } = await getSteamLoginCookie()
  res.send(userId)
}

export default handler
