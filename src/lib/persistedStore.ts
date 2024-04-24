import { writable } from "svelte/store"

import { Storage } from "@plasmohq/storage"

export const persistedStore = <T>(key: string, initialValue?: T) => {
  const storage = new Storage()

  // Since the retrieval of the value from storage is asynchronous we need to
  // do a bit of workaround when setting up the Svelte store
  const store = writable(initialValue, (set) => {
    const getStoredValue = async () => {
      const storedValue = await storage.get<T>(key)
      set(storedValue)
      // Once we have got the actual value from storage,
      // create a listener so any changes made to the Svelte store
      // gets persisted in storage
      store.subscribe((value) => {
        void storage.set(key, value)
      })
    }

    void getStoredValue()
  })

  return store
}
