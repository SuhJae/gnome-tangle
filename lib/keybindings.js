import Meta from 'gi://Meta';
import Shell from 'gi://Shell';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';

import {ACTIONS, shortcutKeyForAction} from './actions.js';

export class KeybindingManager {
    constructor(settings, actions) {
        this._settings = settings;
        this._actions = actions;
        this._registered = [];
    }

    enable() {
        for (const action of ACTIONS) {
            const settingKey = shortcutKeyForAction(action.id);
            Main.wm.addKeybinding(
                settingKey,
                this._settings,
                Meta.KeyBindingFlags.NONE,
                Shell.ActionMode.NORMAL,
                () => this._actions.execute(action.id)
            );
            this._registered.push(settingKey);
        }
    }

    disable() {
        for (const name of this._registered)
            Main.wm.removeKeybinding(name);

        this._registered = [];
    }
}
