# MailSense

> A Chrome extension that adds AI-driven categorisation and tabs to the Gmail
> web interface, using an AI provider key you supply yourself.

[![Lint](https://github.com/nyuchi/mailsense/actions/workflows/lint.yml/badge.svg)](https://github.com/nyuchi/mailsense/actions/workflows/lint.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
![Chrome Extension](https://img.shields.io/badge/Chrome-Manifest_V3-4285F4?style=flat-square&logo=googlechrome&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-vanilla-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

**Version:** 2.1.0 | **Manifest:** V3 | **Host:** `https://mail.google.com/*` | **Distribution:** unpacked only — not on the Chrome Web Store

---

## What it is

MailSense is a Manifest V3 Chrome extension that injects a content script into
the Gmail web interface and re-organises the inbox around AI-assigned
categories. It is about 3,000 lines of dependency-free JavaScript: a service
worker (`background.js`), the Gmail content script (`content.js`), an AI client
(`ai-service.js`), a popup and an options page.

**You bring your own AI key.** The extension ships with no credentials and no
backend of its own. `ai-service.js` talks directly from the browser to whichever
provider you configure on the options page:

| Provider      | Endpoint                                     | Default model             |
| ------------- | -------------------------------------------- | ------------------------- |
| OpenAI        | `api.openai.com/v1/chat/completions`         | `gpt-3.5-turbo`           |
| Anthropic     | `api.anthropic.com/v1/messages`              | `claude-3-haiku-20240307` |
| Google Gemini | `generativelanguage.googleapis.com/v1beta/…` | `gemini-pro`              |
| Custom        | any OpenAI-compatible endpoint you supply    | `gpt-3.5-turbo`           |

Requests are rate-limited per provider and endpoint in `ai-service.js`. Because
calls are made from the extension, your key and the email text sent for
classification go directly to the provider you chose.

The extension requests `storage`, `tabs`, `activeTab` and `scripting`, and its
only host permission is `https://mail.google.com/*`.

### Known gap: the icons are missing

`manifest.json` declares `icon16.png`, `icon48.png` and `icon128.png`, and none
of the three are in the repository — `ICONS.md` is a placeholder note describing
what they should be rather than the assets themselves. Chrome loads the
extension anyway and falls back to a default icon.

## Install

MailSense is not published to the Chrome Web Store. Load it unpacked:

1. Clone this repository.
2. Open `chrome://extensions/`.
3. Turn on **Developer mode** (top right).
4. Click **Load unpacked** and select the repository directory.
5. Open the extension's **Options** page and enter an AI provider and API key.

```bash
git clone https://github.com/nyuchi/mailsense.git
cd mailsense
```

Open Gmail; the content script runs at `document_start` on
`https://mail.google.com/*`.

## Commands

There is no build step — the repository is the extension.

| Command            | Description                                               |
| ------------------ | --------------------------------------------------------- |
| `npm run validate` | Check `manifest.json` with `scripts/validate-manifest.js` |
| `npm run build`    | Runs `validate`; there is nothing to compile              |
| `npm run lint`     | ESLint over the top-level `.js` files                     |
| `npm run package`  | Zip the extension for distribution, excluding dev files   |

## Architecture

| File              | Role                                                                   |
| ----------------- | ---------------------------------------------------------------------- |
| `manifest.json`   | MV3 manifest — permissions, content script registration, action, icons |
| `background.js`   | Service worker                                                         |
| `content.js`      | Injected into Gmail; builds the tab UI and reads the message list      |
| `ai-service.js`   | Provider configuration, rate limiting, request and response shaping    |
| `popup.html/js`   | Toolbar popup                                                          |
| `options.html/js` | Provider, API key and category settings                                |
| `welcome.html`    | First-run page                                                         |
| `styles.css`      | Styles injected into Gmail                                             |

## Licence

Licensed under the [MIT License](https://opensource.org/licenses/MIT); see
[LICENSE](https://github.com/nyuchi/mailsense/blob/main/LICENSE).

© Nyuchi Web Services. Developed by Bryan Fawcett
([@bryanfawcett](https://github.com/bryanfawcett)).
