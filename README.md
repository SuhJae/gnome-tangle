# GNOME Tangle

Rectangle-style window management for GNOME Shell on Ubuntu.

Inspired by Rectangle for macOS.

GNOME Tangle is a GNOME Shell extension that provides keyboard-driven window
layouts, drag snap areas, multi-monitor movement, restore history, and
interactive shortcut configuration, implemented with GNOME Shell and Mutter APIs.

## Status

GNOME Tangle currently targets GNOME Shell 46. Testing is focused on Ubuntu 24.04 / GNOME 46.

Implemented:

- 98 window actions covering halves, quarters, thirds, fourths, sixths,
  eighths, ninths, twelfths, sixteenths, transformations, adjustments, restore,
  and display movement.
- Interactive shortcut recorder in preferences.
- Gap-aware geometry, including state-dependent transformations.
- Drag snapping with footprint preview for edges and corners.
- Local packaging and GitHub Actions release artifacts.

## Install From A Release

Download `gnome-tangle@suhjae.dev.shell-extension.zip` from a GitHub release,
then install it with:

```sh
gnome-extensions install --force gnome-tangle@suhjae.dev.shell-extension.zip
```

If GNOME Shell does not show the extension immediately on Wayland, log out and
log back in once. Then enable it:

```sh
gnome-extensions enable gnome-tangle@suhjae.dev
```

Open preferences:

```sh
gnome-extensions prefs gnome-tangle@suhjae.dev
```

## Local Development Install

Install or update the extension from the working tree:

```sh
./scripts/install-local.sh
```

After the first install, most changes can be tested by disabling and enabling
the extension:

```sh
gnome-extensions disable gnome-tangle@suhjae.dev
gnome-extensions enable gnome-tangle@suhjae.dev
```

On Wayland, GNOME Shell may need one logout/login when discovering a new
extension UUID or when a previous load failure is cached.

## Preferences

Preferences are split into four pages:

- Settings: gap, almost-maximize padding, move increment, and resize increment.
- Shortcuts: grouped actions with click-to-record keybinding buttons.
- Snap Areas: drag snapping, edge size, corner size, and preview opacity.
- About: Rectangle asset attribution.

To set a shortcut, open the Shortcuts page, click an action's shortcut button,
and press the desired key combination. Press Backspace or Delete in the recorder
to clear the binding.

## Initial Shortcuts

- `<Super><Alt>Left`: left half
- `<Super><Alt>Right`: right half
- `<Super><Alt>Up`: top half
- `<Super><Alt>Down`: bottom half
- `<Super><Alt>Return`: maximize
- `<Super><Alt>BackSpace`: restore

Most additional actions are unbound by default to avoid conflicting with GNOME
and Ubuntu shortcuts.

## Drag Snapping

Drag a normal window to a monitor edge or corner:

- left edge: left half
- right edge: right half
- top edge: maximize
- bottom edge: bottom half
- corners: matching quarter

The blue footprint preview shows the target rectangle. Releasing the drag
applies the snap action.

Ubuntu's bundled `tiling-assistant@ubuntu.com` can overlap with this behavior.
Disable it while testing GNOME Tangle if snap results feel duplicated.

## Build And Validate

Run the validation checks:

```sh
gjs -m scripts/generate-schema.js > schemas/org.gnome.shell.extensions.gnome-tangle.gschema.xml
glib-compile-schemas --strict schemas
gjs -m scripts/check-geometry.js
```

Create a distributable extension zip:

```sh
./scripts/package.sh
```

The package is written to:

```text
dist/gnome-tangle@suhjae.dev.shell-extension.zip
```

## Release Management

CI runs on pushes and pull requests to validate schema generation, compile the
schema, run geometry checks, and package the extension.

To publish a release:

```sh
git tag v0.1.0
git push origin v0.1.0
```

The release workflow builds the extension zip and attaches it to a GitHub
release for that tag.

## Repository Layout

```text
extension.js        GNOME Shell extension entry point
prefs.js            Preferences UI
lib/actions.js      Action catalog
lib/geometry.js     Layout and transformation calculations
lib/keybindings.js  GNOME Shell keybinding registration
lib/snapping.js     Drag snapping and footprint preview
lib/window.js       Mutter window movement helpers
schemas/            GSettings schema
scripts/            Local validation, install, package scripts
assets/rectangle/   Selected Rectangle layout icon assets
```

## Rectangle Assets

Some layout icon assets are copied from Rectangle:

https://github.com/rxhanson/Rectangle

Rectangle is licensed under the MIT License. See
`LICENSES/Rectangle-MIT.txt`.

