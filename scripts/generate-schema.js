// SPDX-License-Identifier: GPL-2.0-or-later
// Copyright (C) 2026 Suhjae

import {ACTIONS, shortcutKeyForAction} from '../lib/actions.js';

const defaults = new Map([
    ['left-half', ['<Super><Alt>Left']],
    ['right-half', ['<Super><Alt>Right']],
    ['top-half', ['<Super><Alt>Up']],
    ['bottom-half', ['<Super><Alt>Down']],
    ['top-left', ['<Super><Alt>u']],
    ['top-right', ['<Super><Alt>i']],
    ['bottom-left', ['<Super><Alt>j']],
    ['bottom-right', ['<Super><Alt>k']],
    ['maximize', ['<Super><Alt>Return']],
    ['almost-maximize', ['<Super><Alt>m']],
    ['center', ['<Super><Alt>c']],
    ['first-third', ['<Super><Alt>d']],
    ['center-third', ['<Super><Alt>f']],
    ['last-third', ['<Super><Alt>g']],
    ['first-two-thirds', ['<Super><Alt>e']],
    ['last-two-thirds', ['<Super><Alt>t']],
    ['restore', ['<Super><Alt>BackSpace']],
    ['next-display', ['<Super><Alt>n']],
    ['previous-display', ['<Super><Alt>p']],
]);

function escapeXml(value) {
    return value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;');
}

function arrayDefault(values) {
    return `[${values.map(value => `'${escapeXml(value)}'`).join(', ')}]`;
}

print(`<?xml version="1.0" encoding="UTF-8"?>
<schemalist>
  <schema id="org.gnome.shell.extensions.gnome-tangle" path="/org/gnome/shell/extensions/gnome-tangle/">
    <key name="gap-size" type="i">
      <default>0</default>
      <summary>Window gap size</summary>
      <description>Pixels to inset target rectangles after calculating a window action.</description>
    </key>
    <key name="almost-maximize-padding" type="i">
      <default>24</default>
      <summary>Almost maximize padding</summary>
      <description>Pixels to inset windows for the almost-maximize action.</description>
    </key>
    <key name="move-step" type="i">
      <default>48</default>
      <summary>Move action step size</summary>
      <description>Pixels used by move adjustment actions.</description>
    </key>
    <key name="resize-step" type="i">
      <default>96</default>
      <summary>Resize action step size</summary>
      <description>Pixels used by larger and smaller resize adjustment actions.</description>
    </key>
    <key name="enable-window-throw" type="b">
      <default>true</default>
      <summary>Enable window throw</summary>
      <description>Move the focused window with pointer motion while Super and Alt are held.</description>
    </key>
    <key name="window-throw-frame-interval" type="i">
      <default>16</default>
      <summary>Window throw frame interval</summary>
      <description>Polling interval in milliseconds for window throw pointer motion.</description>
    </key>
    <key name="enable-drag-snapping" type="b">
      <default>true</default>
      <summary>Enable drag snapping</summary>
      <description>Enable Rectangle-style edge and corner snapping while dragging windows.</description>
    </key>
    <key name="snap-edge-size" type="i">
      <default>28</default>
      <summary>Snap edge size</summary>
      <description>Distance in pixels from an edge that activates side snapping.</description>
    </key>
    <key name="snap-corner-size" type="i">
      <default>96</default>
      <summary>Snap corner size</summary>
      <description>Distance in pixels from a corner that activates quarter snapping.</description>
    </key>
    <key name="snap-preview-opacity" type="d">
      <default>0.30</default>
      <summary>Snap preview opacity</summary>
      <description>Opacity setting for the snap footprint overlay.</description>
    </key>
`);

for (const action of ACTIONS) {
    const key = shortcutKeyForAction(action.id);
    const values = defaults.get(action.id) ?? [];
    print(`    <key name="${key}" type="as">
      <default>${arrayDefault(values)}</default>
      <summary>${escapeXml(action.label)} shortcut</summary>
      <description>Keyboard shortcut for the ${escapeXml(action.label)} window action.</description>
    </key>
`);
}

print(`  </schema>
</schemalist>`);
