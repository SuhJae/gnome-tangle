import Clutter from 'gi://Clutter';
import GLib from 'gi://GLib';

const DEBUG = false;

function maskValues(...values) {
    return values.filter(value => typeof value === 'number' && value !== 0);
}

const ALT_MASKS = maskValues(
    Clutter.ModifierType.MOD1_MASK,
    Clutter.ModifierType.ALT_MASK,
    8
);
const SUPER_MASKS = maskValues(
    Clutter.ModifierType.SUPER_MASK,
    Clutter.ModifierType.MOD4_MASK,
    Clutter.ModifierType.META_MASK,
    64,
    1 << 26,
    1 << 28
);

export class WindowThrowManager {
    constructor(settings, windowController) {
        this._settings = settings;
        this._windowController = windowController;
        this._timerId = 0;
        this._window = null;
        this._lastX = 0;
        this._lastY = 0;
        this._capturedEventId = 0;
        this._lastModifierLog = null;
        this._lastActive = false;
        this._moveLogCount = 0;
    }

    enable() {
        if (this._timerId)
            return;

        const interval = Math.max(8, this._settings.get_int('window-throw-frame-interval'));
        this._debug(`enabled interval=${interval} altMasks=${ALT_MASKS.join('|')} superMasks=${SUPER_MASKS.join('|')}`);
        this._timerId = GLib.timeout_add(GLib.PRIORITY_DEFAULT, interval, () => {
            this._update();
            return GLib.SOURCE_CONTINUE;
        });
        this._capturedEventId = global.stage.connect('captured-event', (_actor, event) => {
            this._handleEvent(event);
            return Clutter.EVENT_PROPAGATE;
        });
    }

    disable() {
        if (this._capturedEventId) {
            global.stage.disconnect(this._capturedEventId);
            this._capturedEventId = 0;
        }

        if (this._timerId) {
            GLib.Source.remove(this._timerId);
            this._timerId = 0;
        }

        this._stop();
        this._debug('disabled');
    }

    _update() {
        if (!this._settings.get_boolean('enable-window-throw')) {
            this._stop();
            return;
        }

        const [x, y, pointerModifiers] = global.get_pointer();
        const modifiers = this._currentModifiers(pointerModifiers);
        this._logModifierState('poll', pointerModifiers, modifiers);
        const active = this._isActive(modifiers);
        this._logActiveChange(active, 'poll');

        if (!active) {
            this._stop();
            return;
        }

        if (!this._window) {
            this._start(x, y);
            return;
        }

        const dx = x - this._lastX;
        const dy = y - this._lastY;
        this._lastX = x;
        this._lastY = y;

        if (dx !== 0 || dy !== 0) {
            this._logMove(dx, dy, 'poll');
            this._windowController.moveWindowByDeltaAcrossMonitors(this._window, dx, dy);
        }
    }

    _handleEvent(event) {
        if (!this._settings.get_boolean('enable-window-throw')) {
            this._stop();
            return;
        }

        const type = event.type();
        if (type !== Clutter.EventType.MOTION &&
            type !== Clutter.EventType.KEY_RELEASE &&
            type !== Clutter.EventType.KEY_PRESS)
            return;

        const eventModifiers = event.get_state();
        const modifiers = this._currentModifiers(eventModifiers);
        this._logModifierState(`event:${type}`, eventModifiers, modifiers);
        if (!this._isActive(modifiers)) {
            this._logActiveChange(false, `event:${type}`);
            this._stop();
            return;
        }
        this._logActiveChange(true, `event:${type}`);

        if (type !== Clutter.EventType.MOTION)
            return;

        const [x, y] = event.get_coords();
        if (!this._window) {
            this._start(x, y);
            return;
        }

        const dx = x - this._lastX;
        const dy = y - this._lastY;
        this._lastX = x;
        this._lastY = y;

        if (dx !== 0 || dy !== 0) {
            this._logMove(dx, dy, 'event');
            this._windowController.moveWindowByDeltaAcrossMonitors(this._window, dx, dy);
        }
    }

    _isActive(modifiers) {
        const hasAlt = ALT_MASKS.some(mask => modifiers & mask);
        const hasSuper = SUPER_MASKS.some(mask => modifiers & mask);
        return hasAlt && hasSuper;
    }

    _currentModifiers(modifiers = 0) {
        return modifiers | (global.display.get_compositor_modifiers?.() ?? 0);
    }

    _start(x, y) {
        const window = global.display.focus_window;
        if (!this._windowController.isMovableWindow(window)) {
            this._debug(`start failed title=${window?.get_title?.() ?? 'none'} type=${window?.get_window_type?.() ?? 'none'}`);
            return;
        }

        this._window = window;
        this._lastX = x;
        this._lastY = y;
        this._debug(`start title=${window.get_title()} at=${x},${y}`);
    }

    _stop() {
        if (this._window)
            this._debug(`stop title=${this._window.get_title()}`);
        this._window = null;
    }

    _logModifierState(source, rawModifiers, modifiers) {
        const key = `${source}:${rawModifiers}:${modifiers}`;
        if (this._lastModifierLog === key)
            return;

        this._lastModifierLog = key;
        this._debug(`${source} rawModifiers=${rawModifiers} modifiers=${modifiers} hasAlt=${ALT_MASKS.some(mask => modifiers & mask)} hasSuper=${SUPER_MASKS.some(mask => modifiers & mask)}`);
    }

    _logActiveChange(active, source) {
        if (this._lastActive === active)
            return;

        this._lastActive = active;
        this._debug(`active=${active} source=${source}`);
    }

    _logMove(dx, dy, source) {
        this._moveLogCount++;
        if (this._moveLogCount % 10 === 1)
            this._debug(`move source=${source} dx=${dx} dy=${dy}`);
    }

    _debug(message) {
        if (DEBUG)
            log(`[gnome-tangle window-throw] ${message}`);
    }
}
