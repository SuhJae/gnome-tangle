// SPDX-License-Identifier: GPL-2.0-or-later
// Copyright (C) 2026 Suhjae

import {ACTIONS_BY_ID} from './actions.js';

function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
}

function roundRect(rect) {
    return {
        x: Math.round(rect.x),
        y: Math.round(rect.y),
        width: Math.max(1, Math.round(rect.width)),
        height: Math.max(1, Math.round(rect.height)),
    };
}

function insetRect(rect, gap) {
    return roundRect({
        x: rect.x + gap,
        y: rect.y + gap,
        width: rect.width - gap * 2,
        height: rect.height - gap * 2,
    });
}

function gridRect(workArea, spec) {
    const colSpan = spec.colSpan ?? 1;
    const rowSpan = spec.rowSpan ?? 1;
    const cellW = workArea.width / spec.cols;
    const cellH = workArea.height / spec.rows;
    const x1 = workArea.x + cellW * spec.col;
    const y1 = workArea.y + cellH * spec.row;
    const x2 = workArea.x + cellW * (spec.col + colSpan);
    const y2 = workArea.y + cellH * (spec.row + rowSpan);

    return {
        x: x1,
        y: y1,
        width: x2 - x1,
        height: y2 - y1,
    };
}

function centeredRect(workArea, widthRatio, heightRatio) {
    const width = workArea.width * widthRatio;
    const height = workArea.height * heightRatio;

    return {
        x: workArea.x + (workArea.width - width) / 2,
        y: workArea.y + (workArea.height - height) / 2,
        width,
        height,
    };
}

function boundedCurrentRect(currentRect, workArea, transform) {
    if (!currentRect)
        return null;

    const next = transform({...currentRect});
    next.width = Math.min(next.width, workArea.width);
    next.height = Math.min(next.height, workArea.height);
    next.x = clamp(next.x, workArea.x, workArea.x + workArea.width - next.width);
    next.y = clamp(next.y, workArea.y, workArea.y + workArea.height - next.height);
    return next;
}

function expandByGap(rect, gap) {
    return {
        x: rect.x - gap,
        y: rect.y - gap,
        width: rect.width + gap * 2,
        height: rect.height + gap * 2,
    };
}

function clampRectToWorkArea(rect, workArea) {
    const width = Math.min(rect.width, workArea.width);
    const height = Math.min(rect.height, workArea.height);

    return {
        x: clamp(rect.x, workArea.x, workArea.x + workArea.width - width),
        y: clamp(rect.y, workArea.y, workArea.y + workArea.height - height),
        width,
        height,
    };
}

function normalizeCurrentRect(currentRect, workArea, gap) {
    return clampRectToWorkArea(expandByGap(currentRect, gap), workArea);
}

function normalizeHorizontalBand(currentRect, workArea, gap) {
    const expanded = expandByGap(currentRect, gap);
    const width = Math.min(expanded.width, workArea.width);

    return {
        x: clamp(expanded.x, workArea.x, workArea.x + workArea.width - width),
        width,
    };
}

function transformRect(workArea, currentRect, spec, gap) {
    if (!currentRect)
        return null;

    if (spec.axis === 'height') {
        const horizontal = normalizeHorizontalBand(currentRect, workArea, gap);
        const rowSpan = spec.rowSpan ?? 1;
        const cellH = workArea.height / spec.rows;
        const y1 = workArea.y + cellH * spec.row;
        const y2 = workArea.y + cellH * (spec.row + rowSpan);

        return {
            x: horizontal.x,
            y: y1,
            width: horizontal.width,
            height: y2 - y1,
        };
    }

    return null;
}

function specialRect(actionId, workArea, options, gap) {
    const currentRect = options.currentRect;
    const normalized = currentRect ? normalizeCurrentRect(currentRect, workArea, gap) : null;
    const almostMaximizePadding = Math.max(0, options.almostMaximizePadding ?? 24);
    const moveStep = Math.max(1, options.moveStep ?? 48);
    const resizeStep = Math.max(1, options.resizeStep ?? 96);

    switch (actionId) {
    case 'maximize':
        return {...workArea};
    case 'maximize-height':
        return normalized
            ? {x: normalized.x, y: workArea.y, width: normalized.width, height: workArea.height}
            : {...workArea};
    case 'almost-maximize':
        return {
            x: workArea.x + almostMaximizePadding,
            y: workArea.y + almostMaximizePadding,
            width: workArea.width - almostMaximizePadding * 2,
            height: workArea.height - almostMaximizePadding * 2,
        };
    case 'center':
        return normalized
            ? {
                x: workArea.x + (workArea.width - normalized.width) / 2,
                y: workArea.y + (workArea.height - normalized.height) / 2,
                width: normalized.width,
                height: normalized.height,
            }
            : centeredRect(workArea, 0.5, 0.5);
    case 'larger':
        return boundedCurrentRect(normalized, workArea, rect => {
            return {
                x: rect.x - resizeStep / 2,
                y: rect.y - resizeStep / 2,
                width: rect.width + resizeStep,
                height: rect.height + resizeStep,
            };
        });
    case 'smaller':
        return boundedCurrentRect(normalized, workArea, rect => {
            return {
                x: rect.x + resizeStep / 2,
                y: rect.y + resizeStep / 2,
                width: Math.max(160, rect.width - resizeStep),
                height: Math.max(120, rect.height - resizeStep),
            };
        });
    case 'larger-width':
        return boundedCurrentRect(normalized, workArea, rect => (
            {x: rect.x - resizeStep / 2, y: rect.y, width: rect.width + resizeStep, height: rect.height}
        ));
    case 'smaller-width':
        return boundedCurrentRect(normalized, workArea, rect => (
            {x: rect.x + resizeStep / 2, y: rect.y, width: Math.max(160, rect.width - resizeStep), height: rect.height}
        ));
    case 'move-left':
        return boundedCurrentRect(normalized, workArea, rect => ({...rect, x: rect.x - moveStep}));
    case 'move-right':
        return boundedCurrentRect(normalized, workArea, rect => ({...rect, x: rect.x + moveStep}));
    case 'move-up':
        return boundedCurrentRect(normalized, workArea, rect => ({...rect, y: rect.y - moveStep}));
    case 'move-down':
        return boundedCurrentRect(normalized, workArea, rect => ({...rect, y: rect.y + moveStep}));
    default:
        return null;
    }
}

export function rectForAction(actionId, workArea, options = {}) {
    const action = ACTIONS_BY_ID.get(actionId);
    if (!action)
        return null;

    const gap = Math.max(0, options.gap ?? 0);
    let rect = null;

    if (action.rect)
        rect = gridRect(workArea, action.rect);
    else if (action.transform)
        rect = transformRect(workArea, options.currentRect, action.transform, gap);
    else if (action.special)
        rect = specialRect(actionId, workArea, options, gap);

    return rect ? insetRect(rect, gap) : null;
}
