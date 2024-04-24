import { persistedStore } from "~lib/persistedStore"

export const SERVER_SIDE_ACCESS_TOKEN_STORAGE_KEY =
  "CSM_SERVERS_SIDE_ACCESS_TOKEN"

export const serverSideAccessToken = persistedStore(
  SERVER_SIDE_ACCESS_TOKEN_STORAGE_KEY,
  false
)
