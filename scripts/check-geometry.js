// SPDX-License-Identifier: GPL-2.0-or-later
// Copyright (C) 2026 Suhjae

import {rectForAction} from '../lib/geometry.js';

const workArea = {x: 0, y: 32, width: 1920, height: 1048};
const cases = new Map([
    ['left-half', {x: 0, y: 32, width: 960, height: 1048}],
    ['right-half', {x: 960, y: 32, width: 960, height: 1048}],
    ['top-left', {x: 0, y: 32, width: 960, height: 524}],
    ['bottom-right', {x: 960, y: 556, width: 960, height: 524}],
    ['first-third', {x: 0, y: 32, width: 640, height: 1048}],
    ['center-third', {x: 640, y: 32, width: 640, height: 1048}],
    ['last-third', {x: 1280, y: 32, width: 640, height: 1048}],
    ['top-center-sixth', {x: 640, y: 32, width: 640, height: 524}],
    ['middle-center-ninth', {x: 640, y: 381, width: 640, height: 349}],
    ['bottom-center-right-twelfth', {x: 960, y: 731, width: 480, height: 349}],
    ['lower-middle-center-left-sixteenth', {x: 480, y: 556, width: 480, height: 262}],
]);

function assertRect(action, expected) {
    const actual = rectForAction(action, workArea);
    const actualJson = JSON.stringify(actual);
    const expectedJson = JSON.stringify(expected);

    if (actualJson !== expectedJson)
        throw new Error(`${action}: expected ${expectedJson}, got ${actualJson}`);
}

for (const [action, expected] of cases)
    assertRect(action, expected);

const gapped = rectForAction('left-half', workArea, {gap: 8});
assertRect('left-half', {x: 0, y: 32, width: 960, height: 1048});

if (JSON.stringify(gapped) !== JSON.stringify({x: 8, y: 40, width: 944, height: 1032}))
    throw new Error(`gap inset failed: ${JSON.stringify(gapped)}`);

const currentRect = {x: 100, y: 100, width: 500, height: 400};
const centered = rectForAction('center', workArea, {currentRect});

if (JSON.stringify(centered) !== JSON.stringify({x: 710, y: 356, width: 500, height: 400}))
    throw new Error(`center failed: ${JSON.stringify(centered)}`);

const larger = rectForAction('larger', workArea, {currentRect, resizeStep: 80});

if (JSON.stringify(larger) !== JSON.stringify({x: 60, y: 60, width: 580, height: 480}))
    throw new Error(`larger failed: ${JSON.stringify(larger)}`);

const movedRight = rectForAction('move-right', workArea, {currentRect, moveStep: 32});

if (JSON.stringify(movedRight) !== JSON.stringify({x: 132, y: 100, width: 500, height: 400}))
    throw new Error(`move-right failed: ${JSON.stringify(movedRight)}`);

const leftHalfGapped = {x: 8, y: 40, width: 944, height: 1032};
const heightThirdTop = rectForAction('height-third-top', workArea, {currentRect: leftHalfGapped, gap: 8});

if (JSON.stringify(heightThirdTop) !== JSON.stringify({x: 8, y: 40, width: 944, height: 333}))
    throw new Error(`height-third-top failed: ${JSON.stringify(heightThirdTop)}`);

const heightHalfBottom = rectForAction('height-half-bottom', workArea, {currentRect: leftHalfGapped, gap: 8});

if (JSON.stringify(heightHalfBottom) !== JSON.stringify({x: 8, y: 564, width: 944, height: 508}))
    throw new Error(`height-half-bottom failed: ${JSON.stringify(heightHalfBottom)}`);

const heightThirdCenterAfterTop = rectForAction('height-third-center', workArea, {currentRect: heightThirdTop, gap: 8});

if (JSON.stringify(heightThirdCenterAfterTop) !== JSON.stringify({x: 8, y: 389, width: 944, height: 333}))
    throw new Error(`height-third-center after top failed: ${JSON.stringify(heightThirdCenterAfterTop)}`);

const heightHalfBottomAfterTop = rectForAction('height-half-bottom', workArea, {currentRect: heightThirdTop, gap: 8});

if (JSON.stringify(heightHalfBottomAfterTop) !== JSON.stringify({x: 8, y: 564, width: 944, height: 508}))
    throw new Error(`height-half-bottom after top failed: ${JSON.stringify(heightHalfBottomAfterTop)}`);

const fullHeight = rectForAction('maximize-height', workArea, {currentRect: leftHalfGapped, gap: 8});

if (JSON.stringify(fullHeight) !== JSON.stringify({x: 8, y: 40, width: 944, height: 1032}))
    throw new Error(`maximize-height should preserve visible width with gap: ${JSON.stringify(fullHeight)}`);

const resizeBase = {x: 208, y: 208, width: 384, height: 284};
const largerWithGap = rectForAction('larger', workArea, {currentRect: resizeBase, gap: 8, resizeStep: 80});
const smallerWithGap = rectForAction('smaller', workArea, {currentRect: resizeBase, gap: 8, resizeStep: 80});

if (largerWithGap.width - resizeBase.width !== 80 || largerWithGap.height - resizeBase.height !== 80)
    throw new Error(`larger should grow by resize-step with gap: ${JSON.stringify(largerWithGap)}`);

if (resizeBase.width - smallerWithGap.width !== 80 || resizeBase.height - smallerWithGap.height !== 80)
    throw new Error(`smaller should shrink by resize-step with gap: ${JSON.stringify(smallerWithGap)}`);

print('geometry checks passed');
