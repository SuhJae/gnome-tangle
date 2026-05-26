// SPDX-License-Identifier: GPL-2.0-or-later
// Copyright (C) 2026 Suhjae

import Adw from 'gi://Adw';
import Gdk from 'gi://Gdk';
import Gio from 'gi://Gio';
import Gtk from 'gi://Gtk';

import {ExtensionPreferences} from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

import {ACTIONS, ACTION_CATEGORIES, shortcutKeyForAction} from './lib/actions.js';

function accelText(settings, key) {
    const value = settings.get_strv(key);
    if (value.length === 0)
        return 'Disabled';

    return value.map(accelerator => {
        const [valid, keyval, modifiers] = Gtk.accelerator_parse(accelerator);
        return valid ? Gtk.accelerator_get_label(keyval, modifiers) : accelerator;
    }).join(', ');
}

function assetPath(metadata, iconName) {
    return `${metadata.path}/assets/rectangle/WindowPositions/${iconName}`;
}

function addIconPrefix(row, metadata, iconName) {
    if (!iconName)
        return;

    const file = Gio.File.new_for_path(assetPath(metadata, iconName));
    const image = new Gtk.Image({
        gicon: new Gio.FileIcon({file}),
        pixel_size: 22,
        margin_start: 6,
        margin_end: 10,
    });
    row.add_prefix(image);
}

function isModifierKey(keyval) {
    return [
        Gdk.KEY_Shift_L,
        Gdk.KEY_Shift_R,
        Gdk.KEY_Control_L,
        Gdk.KEY_Control_R,
        Gdk.KEY_Alt_L,
        Gdk.KEY_Alt_R,
        Gdk.KEY_Meta_L,
        Gdk.KEY_Meta_R,
        Gdk.KEY_Super_L,
        Gdk.KEY_Super_R,
        Gdk.KEY_Hyper_L,
        Gdk.KEY_Hyper_R,
    ].includes(keyval);
}

export default class GnomeTanglePreferences extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        const settings = this.getSettings();

        window.add(this._buildSettingsPage(settings));
        window.add(this._buildShortcutsPage(window, settings));
        window.add(this._buildSnapAreasPage(settings));
        window.add(this._buildAboutPage());
    }

    _buildSettingsPage(settings) {
        const page = new Adw.PreferencesPage({
            title: 'Settings',
            icon_name: 'preferences-system-symbolic',
        });

        const behavior = new Adw.PreferencesGroup({title: 'Window Behavior'});
        page.add(behavior);

        const gapRow = new Adw.SpinRow({
            title: 'Gap Size',
            subtitle: 'Pixels to leave around moved windows',
            adjustment: new Gtk.Adjustment({
                lower: 0,
                upper: 80,
                step_increment: 1,
                page_increment: 8,
            }),
        });
        settings.bind('gap-size', gapRow, 'value', Gio.SettingsBindFlags.DEFAULT);
        behavior.add(gapRow);

        const almostRow = new Adw.SpinRow({
            title: 'Almost Maximize Padding',
            subtitle: 'Inset used by the almost-maximize action',
            adjustment: new Gtk.Adjustment({
                lower: 0,
                upper: 200,
                step_increment: 1,
                page_increment: 12,
            }),
        });
        settings.bind('almost-maximize-padding', almostRow, 'value', Gio.SettingsBindFlags.DEFAULT);
        behavior.add(almostRow);

        const moveStepRow = new Adw.SpinRow({
            title: 'Move Increment',
            subtitle: 'Pixels used by move-left, move-right, move-up, and move-down',
            adjustment: new Gtk.Adjustment({
                lower: 1,
                upper: 240,
                step_increment: 1,
                page_increment: 24,
            }),
        });
        settings.bind('move-step', moveStepRow, 'value', Gio.SettingsBindFlags.DEFAULT);
        behavior.add(moveStepRow);

        const resizeStepRow = new Adw.SpinRow({
            title: 'Resize Increment',
            subtitle: 'Pixels used by larger, smaller, larger-width, and smaller-width',
            adjustment: new Gtk.Adjustment({
                lower: 1,
                upper: 480,
                step_increment: 1,
                page_increment: 24,
            }),
        });
        settings.bind('resize-step', resizeStepRow, 'value', Gio.SettingsBindFlags.DEFAULT);
        behavior.add(resizeStepRow);

        const throwGroup = new Adw.PreferencesGroup({
            title: 'Window Throw',
            description: 'Hold Super+Alt and move the pointer to move the focused window by the same delta.',
        });
        page.add(throwGroup);

        const throwEnableRow = new Adw.SwitchRow({
            title: 'Enable Window Throw',
            subtitle: 'Move the focused window while Super+Alt is held',
        });
        settings.bind('enable-window-throw', throwEnableRow, 'active', Gio.SettingsBindFlags.DEFAULT);
        throwGroup.add(throwEnableRow);

        const throwIntervalRow = new Adw.SpinRow({
            title: 'Throw Polling Interval',
            subtitle: 'Milliseconds between pointer checks while the extension is enabled',
            adjustment: new Gtk.Adjustment({
                lower: 8,
                upper: 64,
                step_increment: 1,
                page_increment: 8,
            }),
        });
        settings.bind('window-throw-frame-interval', throwIntervalRow, 'value', Gio.SettingsBindFlags.DEFAULT);
        throwGroup.add(throwIntervalRow);

        return page;
    }

    _buildShortcutsPage(window, settings) {
        const page = new Adw.PreferencesPage({
            title: 'Shortcuts',
            icon_name: 'preferences-desktop-keyboard-shortcuts-symbolic',
        });

        for (const category of ACTION_CATEGORIES) {
            const group = new Adw.PreferencesGroup({title: category});
            page.add(group);

            for (const action of ACTIONS.filter(candidate => candidate.category === category)) {
                const key = shortcutKeyForAction(action.id);
                const row = new Adw.ActionRow({
                    title: action.label,
                    subtitle: accelText(settings, key),
                });
                addIconPrefix(row, this.metadata, action.icon);

                const button = new Gtk.Button({
                    label: accelText(settings, key),
                    valign: Gtk.Align.CENTER,
                });
                button.connect('clicked', () => this._openShortcutDialog(window, settings, key, action, row, button));
                row.add_suffix(button);
                row.activatable_widget = button;
                group.add(row);
            }
        }

        return page;
    }

    _openShortcutDialog(window, settings, key, action, row, button) {
        const dialog = new Adw.MessageDialog({
            transient_for: window,
            modal: true,
            heading: action.label,
            body: 'Press the new keyboard shortcut.',
        });
        dialog.add_response('clear', 'Clear');
        dialog.add_response('cancel', 'Cancel');
        dialog.set_response_appearance('clear', Adw.ResponseAppearance.DESTRUCTIVE);
        dialog.set_default_response('cancel');
        dialog.set_close_response('cancel');

        const keyController = new Gtk.EventControllerKey();
        keyController.connect('key-pressed', (_controller, keyval, _keycode, state) => {
            if (keyval === Gdk.KEY_Escape) {
                dialog.close();
                return Gdk.EVENT_STOP;
            }

            if (keyval === Gdk.KEY_BackSpace || keyval === Gdk.KEY_Delete) {
                settings.set_strv(key, []);
                this._refreshShortcutRow(settings, key, row, button);
                dialog.close();
                return Gdk.EVENT_STOP;
            }

            if (isModifierKey(keyval))
                return Gdk.EVENT_STOP;

            const modifiers = state & Gtk.accelerator_get_default_mod_mask();
            if (!Gtk.accelerator_valid(keyval, modifiers))
                return Gdk.EVENT_STOP;

            const accelerator = Gtk.accelerator_name(keyval, modifiers);
            settings.set_strv(key, [accelerator]);
            this._refreshShortcutRow(settings, key, row, button);
            dialog.close();
            return Gdk.EVENT_STOP;
        });
        dialog.add_controller(keyController);

        dialog.connect('response', (_dialog, response) => {
            if (response === 'clear') {
                settings.set_strv(key, []);
                this._refreshShortcutRow(settings, key, row, button);
            }
        });

        dialog.present();
    }

    _refreshShortcutRow(settings, key, row, button) {
        const text = accelText(settings, key);
        row.subtitle = text;
        button.label = text;
    }

    _buildSnapAreasPage(settings) {
        const page = new Adw.PreferencesPage({
            title: 'Snap Areas',
            icon_name: 'view-grid-symbolic',
        });

        const group = new Adw.PreferencesGroup({
            title: 'Drag Snapping',
            description: 'Drag a window to an edge or corner to preview and apply a layout.',
        });
        page.add(group);

        const enableRow = new Adw.SwitchRow({
            title: 'Enable Drag Snapping',
            subtitle: 'Edges snap to halves/maximize; corners snap to quarters',
        });
        settings.bind('enable-drag-snapping', enableRow, 'active', Gio.SettingsBindFlags.DEFAULT);
        group.add(enableRow);

        const edgeRow = new Adw.SpinRow({
            title: 'Edge Trigger Size',
            subtitle: 'Pixels from an edge that activate side snapping',
            adjustment: new Gtk.Adjustment({
                lower: 4,
                upper: 160,
                step_increment: 1,
                page_increment: 12,
            }),
        });
        settings.bind('snap-edge-size', edgeRow, 'value', Gio.SettingsBindFlags.DEFAULT);
        group.add(edgeRow);

        const cornerRow = new Adw.SpinRow({
            title: 'Corner Trigger Size',
            subtitle: 'Pixels from a corner that activate quarter snapping',
            adjustment: new Gtk.Adjustment({
                lower: 12,
                upper: 260,
                step_increment: 1,
                page_increment: 16,
            }),
        });
        settings.bind('snap-corner-size', cornerRow, 'value', Gio.SettingsBindFlags.DEFAULT);
        group.add(cornerRow);

        const opacityRow = new Adw.SpinRow({
            title: 'Preview Opacity',
            subtitle: 'Opacity for the snap footprint overlay',
            adjustment: new Gtk.Adjustment({
                lower: 0.05,
                upper: 1.0,
                step_increment: 0.05,
                page_increment: 0.10,
            }),
            digits: 2,
        });
        settings.bind('snap-preview-opacity', opacityRow, 'value', Gio.SettingsBindFlags.DEFAULT);
        group.add(opacityRow);

        return page;
    }

    _buildAboutPage() {
        const page = new Adw.PreferencesPage({
            title: 'About',
            icon_name: 'help-about-symbolic',
        });

        const assets = new Adw.PreferencesGroup({title: 'Assets'});
        page.add(assets);

        assets.add(new Adw.ActionRow({
            title: 'Rectangle Layout Icons',
            subtitle: 'Selected icon assets are copied from Rectangle under the MIT License.',
        }));

        assets.add(new Adw.ActionRow({
            title: 'License Notice',
            subtitle: 'See LICENSES/Rectangle-MIT.txt in the project directory.',
        }));

        return page;
    }
}
