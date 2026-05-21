// SPDX-License-Identifier: GPL-2.0-or-later
// Copyright (C) 2026 Suhjae

import Meta from 'gi://Meta';

import {rectForAction} from './geometry.js';

function cloneRect(rect) {
    return {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
    };
}

export class WindowController {
    constructor(settings) {
        this._settings = settings;
        this._history = new Map();
    }

    execute(actionId) {
        const window = global.display.focus_window;
        this.executeForWindow(actionId, window);
    }

    executeForWindow(actionId, window) {
        if (!this._isMovableWindow(window))
            return;

        if (actionId === 'restore') {
            this._restore(window);
            return;
        }

        if (actionId === 'next-display' || actionId === 'previous-display') {
            this._moveToDisplay(window, actionId === 'next-display' ? 1 : -1);
            return;
        }

        const target = this.rectForWindowAction(actionId, window);

        if (!target)
            return;

        this._remember(window);
        this._moveResize(window, target);
    }

    isMovableWindow(window) {
        return this._isMovableWindow(window);
    }

    rectForWindowAction(actionId, window) {
        const workArea = this._workAreaForWindow(window);
        return rectForAction(actionId, workArea, {
            currentRect: cloneRect(window.get_frame_rect()),
            gap: this._settings.get_int('gap-size'),
            almostMaximizePadding: this._settings.get_int('almost-maximize-padding'),
            moveStep: this._settings.get_int('move-step'),
            resizeStep: this._settings.get_int('resize-step'),
        });
    }

    workAreaForWindow(window) {
        return this._workAreaForWindow(window);
    }

    monitorRectForWindow(window) {
        return cloneRect(global.display.get_monitor_geometry(window.get_monitor()));
    }

    _isMovableWindow(window) {
        return window &&
            !window.is_skip_taskbar() &&
            window.get_window_type() === Meta.WindowType.NORMAL &&
            !window.is_override_redirect();
    }

    _stableId(window) {
        return window.get_id?.() ?? `${window.get_pid?.()}:${window.get_title()}`;
    }

    _remember(window) {
        this._history.set(this._stableId(window), cloneRect(window.get_frame_rect()));
    }

    _restore(window) {
        const rect = this._history.get(this._stableId(window));
        if (rect)
            this._moveResize(window, rect, false);
    }

    _workAreaForWindow(window) {
        const workspace = window.get_workspace();
        const monitor = window.get_monitor();
        return cloneRect(workspace.get_work_area_for_monitor(monitor));
    }

    _workAreaForMonitor(window, monitor) {
        return cloneRect(window.get_workspace().get_work_area_for_monitor(monitor));
    }

    _moveToDisplay(window, direction) {
        const monitorCount = global.display.get_n_monitors();
        if (monitorCount < 2)
            return;

        const currentMonitor = window.get_monitor();
        const nextMonitor = (currentMonitor + direction + monitorCount) % monitorCount;
        const currentArea = this._workAreaForMonitor(window, currentMonitor);
        const nextArea = this._workAreaForMonitor(window, nextMonitor);
        const frame = cloneRect(window.get_frame_rect());

        const xRatio = currentArea.width > frame.width
            ? (frame.x - currentArea.x) / Math.max(1, currentArea.width - frame.width)
            : 0;
        const yRatio = currentArea.height > frame.height
            ? (frame.y - currentArea.y) / Math.max(1, currentArea.height - frame.height)
            : 0;

        const width = Math.min(frame.width, nextArea.width);
        const height = Math.min(frame.height, nextArea.height);
        const x = nextArea.x + Math.round(Math.max(0, nextArea.width - width) * Math.min(1, Math.max(0, xRatio)));
        const y = nextArea.y + Math.round(Math.max(0, nextArea.height - height) * Math.min(1, Math.max(0, yRatio)));

        this._remember(window);
        this._moveResize(window, {x, y, width, height});
    }

    _moveResize(window, rect, unmaximize = true) {
        if (unmaximize)
            window.unmaximize(Meta.MaximizeFlags.BOTH);

        window.move_resize_frame(
            true,
            Math.round(rect.x),
            Math.round(rect.y),
            Math.round(rect.width),
            Math.round(rect.height)
        );
    }
}
