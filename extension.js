// SPDX-License-Identifier: GPL-2.0-or-later
// Copyright (C) 2026 Suhjae

import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';

import {ActionRegistry} from './lib/actions.js';
import {WindowController} from './lib/window.js';
import {KeybindingManager} from './lib/keybindings.js';
import {SnapManager} from './lib/snapping.js';
import {WindowThrowManager} from './lib/windowThrow.js';

export default class GnomeTangleExtension extends Extension {
    enable() {
        this._settings = this.getSettings();
        this._windowController = new WindowController(this._settings);
        this._actions = new ActionRegistry(this._windowController);
        this._keybindings = new KeybindingManager(this._settings, this._actions);
        this._snapping = new SnapManager(this._settings, this._windowController);
        this._windowThrow = new WindowThrowManager(this._settings, this._windowController);
        this._keybindings.enable();
        this._snapping.enable();
        this._windowThrow.enable();
    }

    disable() {
        this._windowThrow?.disable();
        this._snapping?.disable();
        this._keybindings?.disable();
        this._windowThrow = null;
        this._snapping = null;
        this._keybindings = null;
        this._actions = null;
        this._windowController = null;
        this._settings = null;
    }
}
