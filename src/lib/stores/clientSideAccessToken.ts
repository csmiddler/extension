import { persistedStore } from "~lib/persistedStore"

export const CLIENT_SIDE_ACCESS_TOKEN_STORAGE_KEY =
  "CSM_CLIENT_SIDE_ACCESS_TOKEN"

export const clientSideAccessToken = persistedStore(
  CLIENT_SIDE_ACCESS_TOKEN_STORAGE_KEY,
  false
)
