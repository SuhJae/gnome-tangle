import Meta from 'gi://Meta';
import St from 'gi://St';

import * as Main from 'resource:///org/gnome/shell/ui/main.js';

const UNCONSTRAINED_GRAB_FLAG = 1024;

function pointInRect(point, rect) {
    return point.x >= rect.x &&
        point.x <= rect.x + rect.width &&
        point.y >= rect.y &&
        point.y <= rect.y + rect.height;
}

export class SnapManager {
    constructor(settings, windowController) {
        this._settings = settings;
        this._windowController = windowController;
        this._displaySignals = [];
        this._positionChangedId = 0;
        this._grabEndId = 0;
        this._window = null;
        this._candidate = null;
        this._preview = null;
    }

    enable() {
        this._displaySignals.push(global.display.connect('grab-op-begin', (_display, window, grabOp) => {
            if (!this._settings.get_boolean('enable-drag-snapping'))
                return;

            grabOp &= ~UNCONSTRAINED_GRAB_FLAG;
            if (window && [Meta.GrabOp.MOVING, Meta.GrabOp.KEYBOARD_MOVING].includes(grabOp))
                this._start(window);
        }));
    }

    disable() {
        this._finish(false);

        for (const id of this._displaySignals)
            global.display.disconnect(id);

        this._displaySignals = [];
        this._destroyPreview();
    }

    _start(window) {
        if (!this._windowController.isMovableWindow(window))
            return;

        this._window = window;
        this._candidate = null;
        this._ensurePreview();

        this._positionChangedId = window.connect('position-changed', () => this._update());
        this._grabEndId = global.display.connect('grab-op-end', () => this._finish(true));
        this._update();
    }

    _finish(apply) {
        if (this._window && this._positionChangedId) {
            this._window.disconnect(this._positionChangedId);
            this._positionChangedId = 0;
        }

        if (this._grabEndId) {
            global.display.disconnect(this._grabEndId);
            this._grabEndId = 0;
        }

        const window = this._window;
        const candidate = this._candidate;
        this._window = null;
        this._candidate = null;
        this._hidePreview();

        if (apply && window && candidate)
            this._windowController.executeForWindow(candidate.actionId, window);
    }

    _update() {
        if (!this._window)
            return;

        const [x, y] = global.get_pointer();
        const pointer = {x, y};
        const workArea = this._windowController.workAreaForWindow(this._window);
        const monitorRect = this._windowController.monitorRectForWindow(this._window);

        if (!pointInRect(pointer, monitorRect)) {
            this._candidate = null;
            this._hidePreview();
            return;
        }

        const actionId = this._actionForPointer(pointer, monitorRect);
        if (!actionId) {
            this._candidate = null;
            this._hidePreview();
            return;
        }

        const target = this._windowController.rectForWindowAction(actionId, this._window);
        if (!target) {
            this._candidate = null;
            this._hidePreview();
            return;
        }

        this._candidate = {actionId, target};
        this._showPreview(target);
    }

    _actionForPointer(pointer, workArea) {
        const cornerSize = this._settings.get_int('snap-corner-size');
        const edgeSize = this._settings.get_int('snap-edge-size');
        const nearLeft = pointer.x <= workArea.x + edgeSize;
        const nearRight = pointer.x >= workArea.x + workArea.width - edgeSize;
        const nearTop = pointer.y <= workArea.y + edgeSize;
        const nearBottom = pointer.y >= workArea.y + workArea.height - edgeSize;
        const inTopCorner = pointer.y <= workArea.y + cornerSize;
        const inBottomCorner = pointer.y >= workArea.y + workArea.height - cornerSize;
        const inLeftCorner = pointer.x <= workArea.x + cornerSize;
        const inRightCorner = pointer.x >= workArea.x + workArea.width - cornerSize;

        if (inTopCorner && inLeftCorner)
            return 'top-left';
        if (inTopCorner && inRightCorner)
            return 'top-right';
        if (inBottomCorner && inLeftCorner)
            return 'bottom-left';
        if (inBottomCorner && inRightCorner)
            return 'bottom-right';
        if (nearLeft)
            return 'left-half';
        if (nearRight)
            return 'right-half';
        if (nearTop)
            return 'maximize';
        if (nearBottom)
            return 'bottom-half';

        return null;
    }

    _ensurePreview() {
        if (this._preview)
            return;

        this._preview = new St.Widget({
            reactive: false,
            visible: false,
            style_class: 'gnome-tangle-snap-preview',
            style: this._previewStyle(),
        });
        Main.uiGroup.add_child(this._preview);
        this._preview.set_opacity(Math.round(this._settings.get_double('snap-preview-opacity') * 255));
    }

    _previewStyle() {
        return [
            'background-color: rgba(53, 132, 228, 0.35);',
            'border: 2px solid rgba(153, 193, 241, 0.95);',
            'border-radius: 10px;',
        ].join(' ');
    }

    _showPreview(rect) {
        this._ensurePreview();
        this._preview.set_position(Math.round(rect.x), Math.round(rect.y));
        this._preview.set_size(Math.round(rect.width), Math.round(rect.height));
        this._preview.set_opacity(Math.round(this._settings.get_double('snap-preview-opacity') * 255));
        this._preview.show();
    }

    _hidePreview() {
        this._preview?.hide();
    }

    _destroyPreview() {
        this._preview?.destroy();
        this._preview = null;
    }
}
