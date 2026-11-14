# Privacy Policy — Apeex Tools

_Last updated: November 13, 2026_

Apeex Tools is a Chrome extension that replaces the new tab page with your own visual bookmarks. This policy explains what data the extension handles. In short: **your data stays in your browser. We have no servers and collect nothing.**

## Data the extension stores

- Your links, section names and their order
- Your search engines and the selected one
- Your settings: theme, accent color, tile size, language, link behavior
- Custom icons you upload for links

All of this is saved locally with Chrome's `chrome.storage.local` API and the page's `localStorage` (used as an icon cache). It never leaves your device unless you export it to a backup file yourself. Uninstalling the extension deletes it.

## Data we collect

None. The extension has no analytics, no tracking, no advertising, no accounts and no backend server. We never sell or share data, because we never receive any.

## Network requests

The extension makes only the requests needed to show the page:

- **Site icons.** About 200 popular services have icons bundled inside the extension and need no request. For other links, the browser loads the icon from Google's public favicon service (`www.google.com/s2/favicons`) and from the linked website itself (for example `https://example.com/apple-touch-icon.png`). These requests include the link's domain name, nothing else.
- **Search.** When you search, you are sent to the search engine you picked (Google, Yandex, DuckDuckGo or any other), together with your query. That engine's own privacy policy applies.
- **Your links.** Clicking a tile opens that website, like any bookmark. The ready-made sets include a tile that links to the developer's site, Apeex (apeex.io); it is an ordinary tile that you can untick when choosing a set or delete at any time.

## Optional permissions

The extension asks for these only when you use the related feature, and you can refuse them:

- **Bookmarks** (`bookmarks`): read once, when you choose "Import Chrome bookmark folders", to show your folders so you can pick which ones to import. Bookmarks are never changed or sent anywhere.
- **Tabs** (`tabs`): read once, when you choose "Import open tabs", to list the titles and addresses of open tabs so you can pick which ones to add.

You can revoke them at any time on `chrome://extensions` → Apeex Tools → Details.

## Backups

"Download backup" creates a `.json` file on your computer. "Load from file" reads a file you select. These files are handled entirely in your browser.

## Children

The extension is not directed at children and collects no personal information from anyone.

## Changes

If this policy changes, the updated version will be published at the same address with a new date.

## Contact

Questions: info@apeex.io
