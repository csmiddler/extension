<script context="module" lang="ts">
  import cssText from "data-text:~/contents/loginWarningOverlay.css"
  import type { PlasmoCSConfig } from "plasmo"

  export const config: PlasmoCSConfig = {
    matches: ["<all_urls>"],
    css: ["font.css"],
    exclude_matches: [
      "*://*.steamcommunity.com/*",
      "*://*.steampowered.com/*",
      "*://*.steam.tv/*"
    ],
    all_frames: true
  }

  export const getStyle = () => {
    const style = document.createElement("style")
    style.textContent = cssText
    return style
  }
</script>

<script lang="ts">
  let steamPageMatches = 0

  // Find Steam's header logo inside #global_header
  let globalHeader = document.getElementById("global_header")
  if (globalHeader) {
    let headerImages = globalHeader.getElementsByTagName("img")
    ;[...headerImages].some((img) => {
      if (
        img.src?.match(
          /community\.akamai\.steamstatic\.com\/public\/shared\/images\/header\/logo_steam\.svg/gi
        )
      ) {
        console.log("Found header logo")
        steamPageMatches++
        return true
      }
    })
  }

  // Look for links to Steam's CDN in link tags
  let stylesheets = document.getElementsByTagName("link")
  ;[...stylesheets].some((stylesheet) => {
    if (
      stylesheet.href?.match(
        /(?:community\.akamai\.steamstatic\.com)\/public(?:\/shared)?\/css/gi
      )
    ) {
      console.log("Found Steam's css CDN")
      steamPageMatches++
      return true
    }
  })

  // Look for links to Steam's CDN in script tags
  let scripts = document.getElementsByTagName("script")
  ;[...scripts].some((script) => {
    if (
      script.src?.match(
        /(?:community\.akamai\.steamstatic\.com)\/public(?:\/shared)?\/javascript/gi
      )
    ) {
      console.log("Found Steam's javascript CDN")
      steamPageMatches++
      return true
    }
  })

  // Look for text in #footerText
  let footerText =
    document.getElementById("footerText") ||
    document.getElementById("footer_text")
  if (
    footerText &&
    footerText.innerText.match(
      /©(?: 20[0-9][0-9])? Valve Corporation\. All rights reserved\./gi
    )
  ) {
    console.log("Found Steam's footer text")
    steamPageMatches++
  }

  // Look for text in #global_action_menu
  let globalActionMenu = document.getElementById("global_action_menu")
  if (globalActionMenu && globalActionMenu.innerText.match(/Install Steam/gi)) {
    console.log("Found the Install Steam button")
    steamPageMatches++
  }

  let show = steamPageMatches >= 2

  const hide = () => (show = false)
</script>

{#if show}
  <div class="modal">
    <div class="message">
      <div class="text">
        <h1>This is a potential scam-website</h1>
        <p>
          CSMiddler has detected that this website is trying to impersonate
          Steam and has therefore blocked it for you. We do not recommend
          visiting or logging into this website. We have identified that this
          webpage looks very similar to an official Steam page, but it is not
          owned or operated by Steam.
        </p>
      </div>
      <a href="https://csmiddler.com/">Go to CSMiddler.com instead</a>
      <button on:click={hide}>I want to visit the site anyway.</button>
    </div>
  </div>
{/if}
