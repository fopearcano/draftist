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

The development server listens on all network interfaces on port `5146`. Open
`http://localhost:5146` on the same computer, or use
`http://<this-computer's-LAN-IP>:5146` from another device on the local network.
If the second address is not reachable, allow inbound TCP port `5146` in the host
firewall and confirm that both devices are connected to the same LAN.

### If npm reports `Missing script: "dev"`

That message means npm is reading a different `package.json`, usually because the
terminal is not inside the Draftist repository or because the local checkout is
out of date. Change into the directory containing this README and verify the
available scripts before starting:

```bash
cd /path/to/draftist
npm run
npm run doctor
npm run dev
```

`npm run` must list `dev`, `start`, `build`, `test`, and `doctor`. You can also
start Draftist with `npm start`. If `dev` is not listed, update or re-download the
repository; reinstalling packages will not add a missing script to an old or
unrelated `package.json`.

The shell prompt in the error is important. If it ends in a directory such as
`novelist-codex-adapt-outliner-to-novelist-with-enhancements`, that is the
original Novelist checkout—not this Draftist repository. Draftist's commands
cannot be run from that folder. Keep the repositories in separate directories
and run the command from the directory whose `package.json` has
`"name": "draftist"`:

```bash
cd ..
cd draftist
node -p "require('./package.json').name"
npm run dev
```

The third command must print `draftist`. If the Draftist directory has a
different name, use its actual path. As an unambiguous alternative, npm accepts
an explicit repository path from any directory:

```bash
npm --prefix /absolute/path/to/draftist run dev
```

Do not copy only `src/` into the old Novelist checkout: the Draftist
`package.json` and `scripts/` directory are required for its development server.

To use a different port temporarily, set `PORT` when starting the server:

```bash
PORT=8080 npm run dev
```

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
