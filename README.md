# Draftist

Draftist is a continuous-document writing workspace for novelists. It combines a
distraction-free manuscript editor with a heading-based outline, searchable story
bible, comments, and paper, sepia, and night viewing presets.

## Run locally

The application requires Node.js 20 or newer. It intentionally has no runtime or
build dependencies, so a package download is not required:

```bash
npm run dev
```

The development server prints the local URL after it starts.

## Browser runtime

A normal locally installed browser can open the development URL. For automated
browser checks and screenshots, Playwright is optional. Install it and its
managed Chromium runtime only when browser automation is needed:

```bash
npm install --save-dev playwright
npx playwright install --with-deps chromium
```

The second command installs Chromium as well as the system libraries it needs.
`--with-deps` is primarily intended for supported Linux hosts and can require
administrator privileges.

### macOS 12

Recent Playwright releases do not provide a managed Chromium build for macOS 12.
If the installer reports `Playwright does not support chromium on mac12`, the
Draftist application is still usable: run `npm run dev` and open the printed URL
in Safari, Chrome, Firefox, or Edge. No Playwright browser download is needed for
normal development.

For automated Playwright checks, use one of these supported approaches instead:

1. Upgrade the Mac to a macOS release supported by the current Playwright version,
   then run `npx playwright install chromium`.
2. Run the checks in a supported Linux CI runner or Playwright Docker container.

Avoid pinning an obsolete Playwright version merely to obtain an old macOS 12
browser binary, because that also pins an outdated browser engine. The operating
system browser is the safer option for local manual testing on that Mac.

To install only the operating-system browser on Ubuntu or Debian, use:

```bash
sudo apt-get update
sudo apt-get install chromium
```

Playwright-managed Chromium is recommended for reproducible automated checks.

## Why there is no `npm install` step

Draftist uses browser-native JavaScript and small Node-based development and build
scripts. This makes first-run setup instant in restricted or offline environments.
Running `npm install` is safe but unnecessary; npm should report that the project
is already up to date without downloading application packages.

## Production build

```bash
npm run build
```

The compiled application is written to `dist/`.
