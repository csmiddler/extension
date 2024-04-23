# CSMiddler/extension

This Chrome extension is designed for CSMiddler users to improve their trading experience on csmiddler.com. The extension can be downloaded from the provided store links and source code is available for review and contributions here on Github.

## Store download links
Not yet.

## Features
Not yet.

## TODO
- Popup UI with settings to opt-in/opt-out for all items below.
- `server-sided access token usage` for verifying trades as quick as before on CSMiddler.com. (refreshing access token each 3 hours)
- `client-sided access token usage`: get tradeoffers via API with user's access-token locally, and post that to our server when visiting `steamcommunity.com/*/tradeoffers/*`
- Warning when visiting steamcommunity.com-phising sites.
  A real such login-page looks like: https://imgur.com/a/guDkJTA
  A fake such login-page looks the same way, but with a different URL. So make check HTML/text-elements and URL?
- "List on CSMiddler"-button on own Steam-inventory page. Like [CSFloat](https://github.com/csfloat/extension)
  Get `assetId` then POST-request to our API and I'll return a redirect URL that the extension sends the user to.
- `#description=x&items_to_take=xx&items_to_give=xx` parameters in Steam-tradeoffer URL to make it pre-fill on inventory-page.
- Build/release pipelines to make the process of building and publishing to the extension stores simpler.

## How it is built
Not yet.

## Changelog

To view the changelog, please read [Releases](https://github.com/csmiddler/extension/releases).
