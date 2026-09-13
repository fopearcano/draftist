# Draftist

Draftist is a continuous-document writing workspace for novelists. It combines a
distraction-free manuscript editor with a heading-based outline, searchable story
bible, comments, and paper, sepia, and night viewing presets.

## Run locally

The application requires Node.js 20 or newer and npm:

```bash
npm install
npm run dev
```

Vite prints the local URL after the development server starts.

## Browser runtime

A normal locally installed browser can open the Vite URL. For automated browser
checks and screenshots, install Playwright and its managed Chromium runtime:

```bash
npm install --save-dev playwright
npx playwright install --with-deps chromium
```

The second command installs Chromium as well as the Linux system libraries it
needs. If system packages cannot be installed from an unprivileged shell, run it
with the privileges appropriate for your development machine or ask the
environment administrator to provide Chromium and its dependencies.

To install only the operating-system browser on Ubuntu or Debian instead, use:

```bash
sudo apt-get update
sudo apt-get install chromium
```

Playwright-managed Chromium is recommended for reproducible automated checks.

## Production build

```bash
npm run build
```

The compiled application is written to `dist/`.
