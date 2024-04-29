<script context="module" lang="ts">
  import cssText from "data-text:~/contents/listButton.css"
  import type { PlasmoCSConfig, PlasmoGetInlineAnchorList } from "plasmo"

  export const config: PlasmoCSConfig = {
    matches: ["*://*.steamcommunity.com/profiles/*/inventory*"],
    all_frames: true
  }

  export const getStyle = () => {
    const style = document.createElement("style")
    style.textContent = cssText
    return style
  }

  export const getInlineAnchorList: PlasmoGetInlineAnchorList = async () => {
    const anchors = [
      document.querySelector(
        "div#iteminfo0_content .item_desc_description div.item_desc_game_info"
      ),
      document.querySelector(
        "div#iteminfo1_content .item_desc_description div.item_desc_game_info"
      )
    ]
    return Array.from(anchors).map((element) => ({
      element,
      insertPosition: "afterend"
    }))
  }
</script>

<script lang="ts">
  import { onDestroy, onMount } from "svelte"

  import { sendToBackground } from "@plasmohq/messaging"

  const getOwnerId = () => {
    const steamLink = document.querySelector('a[href^="steam://"]')

    if (!steamLink) {
      console.debug("No steam link found. Exiting")
      return
    }

    const href = steamLink.getAttribute("href")
    const [, ownerId] = href.match(/csgo_econ_action_preview%20S(\d+)A/) ?? []
    return ownerId
  }

  const getUserId = async () => {
    const userId = await sendToBackground({
      name: "getUserId"
    })
    if (!userId) {
      console.debug("No userId found. Exiting")
      return
    }

    return userId
  }

  const getAssetId = (nodeId: string) => {
    const [, assetId] = nodeId.split("730_2_")
    return assetId
  }

  onMount(async () => {
    const domReady = () =>
      new Promise<void>((resolve) => {
        const checkInterval = setInterval(() => {
          const elementToFind = document.querySelector('a[href^="steam://"]')
          if (elementToFind) {
            clearInterval(checkInterval)
            resolve()
          }
        }, 137)
      })

    await domReady()
    ownerId = getOwnerId()
    if (!ownerId) {
      console.debug("No ownerId found. Exiting")
      return
    }

    userId = await getUserId()
    if (!userId) {
      console.debug("No userId found. Exiting")
      return
    }

    if (ownerId !== userId) {
      console.debug("User is not on own inventory page. Exiting")
      return
    }

    assetId = getAssetId(document.querySelector(".item.activeInfo")?.id)

    observer = new MutationObserver((mutationList, observer) => {
      const active = mutationList.find((mutation) => {
        if (mutation.type === "attributes") {
          return mutation.target.classList.contains("activeInfo")
        }
      })
      assetId = getAssetId(active.target.id)
    })

    observer.observe(document.getElementById("inventories"), {
      attributes: true,
      subtree: true
    })
  })

  onDestroy(() => {
    observer.disconnect()
  })

  let observer: MutationObserver
  let ownerId: string
  let userId: string
  let assetId: string
</script>

{#if ownerId && userId && ownerId === userId}
  <a href="https://csmiddler.com/u/sell?selected={assetId}" target="_blank"
    >List on CSMiddler</a>
{/if}
