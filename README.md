# mono-toolbox

A **privacy-first developer toolbox** — six practical utilities that run entirely in
your browser. No backend, no build step, no dependencies. **Nothing leaves your device.**

[![license](https://img.shields.io/badge/license-MIT-black?style=flat-square)](LICENSE)
[![offline](https://img.shields.io/badge/works-offline-black?style=flat-square)](#privacy)
[![network](https://img.shields.io/badge/network%20requests-0-black?style=flat-square)](#privacy)

**Live:** https://kapcha0.github.io/mono-toolbox/

---

## Tools

| Tool | What it does |
| --- | --- |
| **JSON** | Format, minify and validate JSON with a readable error message. |
| **Base64** | Encode/decode UTF-8 text (correct for non-Latin input). |
| **URL** | `encodeURI`, `encodeURIComponent` and decode. |
| **Hash** | SHA-1 / SHA-256 / SHA-384 / SHA-512 via `crypto.subtle`. |
| **JWT** | Decode header and payload — **signature is not verified**, and no token is sent anywhere. |
| **Regex** | Live tester with flags and a match list. |

## Privacy

- **Zero network requests at runtime.** No CDN, no fonts, no analytics, no telemetry.
- The only thing stored is your theme and language choice in `localStorage`.
- Verify it yourself: open DevTools → **Network**, load the page and run any tool.

## Stack

Vanilla HTML, CSS and JavaScript. The stylesheet is a vendored copy of
[`mono-ui`](https://github.com/kapcha0/mono-ui) (`assets/mono.css`), so the app is
self-contained and works offline.

```
mono-toolbox/
├── index.html            # UI: tabs for the six tools
├── 404.html
├── assets/
│   ├── mono.css          # vendored from mono-ui
│   └── app.js            # all tool logic, no dependencies
├── .github/workflows/    # Pages deploy
└── LICENSE
```

## Keyboard

- `Alt` + `1`…`6` — switch between tools.
- `Ctrl`/`Cmd` + `Enter` — run the active tool.

## Run locally

```sh
# any static server works
python -m http.server 8081

# or, from the repository root, the PowerShell server in this project
powershell -ExecutionPolicy Bypass -File ../serve.ps1 -Port 5500
```

Then open http://localhost:5500/mono-toolbox/.

## Deploy

Pushing to `main` runs `.github/workflows/pages.yml` and publishes the repository root
to GitHub Pages. Set **Pages → Build and deployment → Source** to *GitHub Actions*.

## License

MIT — see [LICENSE](LICENSE).

---

### Русская версия

**mono-toolbox** — приватный инструментарий разработчика: JSON, Base64, URL, хеши,
JWT и regex. Работает полностью в браузере, без запросов в сеть и без трекинга.
Проверить можно через DevTools → Network: запросов нет.
