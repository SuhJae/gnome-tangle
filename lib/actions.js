export const ACTIONS = [
    {id: 'left-half', label: 'Left Half', category: 'Halves', icon: 'leftHalfTemplate.png', rect: {cols: 2, rows: 1, col: 0, row: 0}},
    {id: 'right-half', label: 'Right Half', category: 'Halves', icon: 'rightHalfTemplate.png', rect: {cols: 2, rows: 1, col: 1, row: 0}},
    {id: 'top-half', label: 'Top Half', category: 'Halves', icon: 'topHalfTemplate.png', rect: {cols: 1, rows: 2, col: 0, row: 0}},
    {id: 'bottom-half', label: 'Bottom Half', category: 'Halves', icon: 'bottomHalfTemplate.png', rect: {cols: 1, rows: 2, col: 0, row: 1}},

    {id: 'top-left', label: 'Top Left', category: 'Quarters', icon: 'topLeftTemplate.png', rect: {cols: 2, rows: 2, col: 0, row: 0}},
    {id: 'top-right', label: 'Top Right', category: 'Quarters', icon: 'topRightTemplate.png', rect: {cols: 2, rows: 2, col: 1, row: 0}},
    {id: 'bottom-left', label: 'Bottom Left', category: 'Quarters', icon: 'bottomLeftTemplate.png', rect: {cols: 2, rows: 2, col: 0, row: 1}},
    {id: 'bottom-right', label: 'Bottom Right', category: 'Quarters', icon: 'bottomRightTemplate.png', rect: {cols: 2, rows: 2, col: 1, row: 1}},

    {id: 'first-third', label: 'First Third', category: 'Thirds', icon: 'firstThirdTemplate.png', rect: {cols: 3, rows: 1, col: 0, row: 0}},
    {id: 'center-third', label: 'Center Third', category: 'Thirds', icon: 'centerThirdTemplate.png', rect: {cols: 3, rows: 1, col: 1, row: 0}},
    {id: 'last-third', label: 'Last Third', category: 'Thirds', icon: 'lastThirdTemplate.png', rect: {cols: 3, rows: 1, col: 2, row: 0}},
    {id: 'first-two-thirds', label: 'First Two Thirds', category: 'Thirds', icon: 'firstTwoThirdsTemplate.png', rect: {cols: 3, rows: 1, col: 0, row: 0, colSpan: 2}},
    {id: 'center-two-thirds', label: 'Center Two Thirds', category: 'Thirds', icon: 'centerTwoThirdsTemplate.png', rect: {cols: 6, rows: 1, col: 1, row: 0, colSpan: 4}},
    {id: 'last-two-thirds', label: 'Last Two Thirds', category: 'Thirds', icon: 'lastTwoThirdsTemplate.png', rect: {cols: 3, rows: 1, col: 1, row: 0, colSpan: 2}},
    {id: 'top-third', label: 'Top Third', category: 'Thirds', icon: 'topThirdTemplate.png', rect: {cols: 1, rows: 3, col: 0, row: 0}},
    {id: 'middle-third', label: 'Middle Third', category: 'Thirds', icon: 'centerThirdHorizontalTemplate.png', rect: {cols: 1, rows: 3, col: 0, row: 1}},
    {id: 'bottom-third', label: 'Bottom Third', category: 'Thirds', icon: 'bottomThirdTemplate.png', rect: {cols: 1, rows: 3, col: 0, row: 2}},
    {id: 'top-two-thirds', label: 'Top Two Thirds', category: 'Thirds', icon: 'topTwoThirdsTemplate.png', rect: {cols: 1, rows: 3, col: 0, row: 0, rowSpan: 2}},
    {id: 'bottom-two-thirds', label: 'Bottom Two Thirds', category: 'Thirds', icon: 'bottomTwoThirdsTemplate.png', rect: {cols: 1, rows: 3, col: 0, row: 1, rowSpan: 2}},

    {id: 'first-fourth', label: 'First Fourth', category: 'Fourths', icon: 'leftFourthTemplate.png', rect: {cols: 4, rows: 1, col: 0, row: 0}},
    {id: 'second-fourth', label: 'Second Fourth', category: 'Fourths', icon: 'centerLeftFourthTemplate.png', rect: {cols: 4, rows: 1, col: 1, row: 0}},
    {id: 'third-fourth', label: 'Third Fourth', category: 'Fourths', icon: 'centerRightFourthTemplate.png', rect: {cols: 4, rows: 1, col: 2, row: 0}},
    {id: 'last-fourth', label: 'Last Fourth', category: 'Fourths', icon: 'rightFourthTemplate.png', rect: {cols: 4, rows: 1, col: 3, row: 0}},
    {id: 'first-three-fourths', label: 'First Three Fourths', category: 'Fourths', icon: 'firstThreeFourthsTemplate.png', rect: {cols: 4, rows: 1, col: 0, row: 0, colSpan: 3}},
    {id: 'center-three-fourths', label: 'Center Three Fourths', category: 'Fourths', icon: 'centerThreeFourthsTemplate.png', rect: {cols: 8, rows: 1, col: 1, row: 0, colSpan: 6}},
    {id: 'last-three-fourths', label: 'Last Three Fourths', category: 'Fourths', icon: 'lastThreeFourthsTemplate.png', rect: {cols: 4, rows: 1, col: 1, row: 0, colSpan: 3}},

    {id: 'top-left-sixth', label: 'Top Left Sixth', category: 'Sixths', icon: 'topLeftSixthTemplate.png', rect: {cols: 3, rows: 2, col: 0, row: 0}},
    {id: 'top-center-sixth', label: 'Top Center Sixth', category: 'Sixths', icon: 'topCenterSixthTemplate.png', rect: {cols: 3, rows: 2, col: 1, row: 0}},
    {id: 'top-right-sixth', label: 'Top Right Sixth', category: 'Sixths', icon: 'topRightSixthTemplate.png', rect: {cols: 3, rows: 2, col: 2, row: 0}},
    {id: 'bottom-left-sixth', label: 'Bottom Left Sixth', category: 'Sixths', icon: 'bottomLeftSixthTemplate.png', rect: {cols: 3, rows: 2, col: 0, row: 1}},
    {id: 'bottom-center-sixth', label: 'Bottom Center Sixth', category: 'Sixths', icon: 'bottomCenterSixthTemplate.png', rect: {cols: 3, rows: 2, col: 1, row: 1}},
    {id: 'bottom-right-sixth', label: 'Bottom Right Sixth', category: 'Sixths', icon: 'bottomRightSixthTemplate.png', rect: {cols: 3, rows: 2, col: 2, row: 1}},

    {id: 'top-left-eighth', label: 'Top Left Eighth', category: 'Eighths', icon: 'tlEighthTemplate.png', rect: {cols: 4, rows: 2, col: 0, row: 0}},
    {id: 'top-center-left-eighth', label: 'Top Center Left Eighth', category: 'Eighths', icon: 'ctlEighthTemplate.png', rect: {cols: 4, rows: 2, col: 1, row: 0}},
    {id: 'top-center-right-eighth', label: 'Top Center Right Eighth', category: 'Eighths', icon: 'ctrEighthTemplate.png', rect: {cols: 4, rows: 2, col: 2, row: 0}},
    {id: 'top-right-eighth', label: 'Top Right Eighth', category: 'Eighths', icon: 'trEighthTemplate.png', rect: {cols: 4, rows: 2, col: 3, row: 0}},
    {id: 'bottom-left-eighth', label: 'Bottom Left Eighth', category: 'Eighths', icon: 'blEighthTemplate.png', rect: {cols: 4, rows: 2, col: 0, row: 1}},
    {id: 'bottom-center-left-eighth', label: 'Bottom Center Left Eighth', category: 'Eighths', icon: 'cblEighthTemplate.png', rect: {cols: 4, rows: 2, col: 1, row: 1}},
    {id: 'bottom-center-right-eighth', label: 'Bottom Center Right Eighth', category: 'Eighths', icon: 'cbrEighthTemplate.png', rect: {cols: 4, rows: 2, col: 2, row: 1}},
    {id: 'bottom-right-eighth', label: 'Bottom Right Eighth', category: 'Eighths', icon: 'brEighthTemplate.png', rect: {cols: 4, rows: 2, col: 3, row: 1}},

    {id: 'top-left-ninth', label: 'Top Left Ninth', category: 'Ninths', icon: 'topLeftNinthTemplate.png', rect: {cols: 3, rows: 3, col: 0, row: 0}},
    {id: 'top-center-ninth', label: 'Top Center Ninth', category: 'Ninths', icon: 'topCenterNinthTemplate.png', rect: {cols: 3, rows: 3, col: 1, row: 0}},
    {id: 'top-right-ninth', label: 'Top Right Ninth', category: 'Ninths', icon: 'topRightNinthTemplate.png', rect: {cols: 3, rows: 3, col: 2, row: 0}},
    {id: 'middle-left-ninth', label: 'Middle Left Ninth', category: 'Ninths', icon: 'middleLeftNinthTemplate.png', rect: {cols: 3, rows: 3, col: 0, row: 1}},
    {id: 'middle-center-ninth', label: 'Middle Center Ninth', category: 'Ninths', icon: 'middleCenterNinthTemplate.png', rect: {cols: 3, rows: 3, col: 1, row: 1}},
    {id: 'middle-right-ninth', label: 'Middle Right Ninth', category: 'Ninths', icon: 'middleRightNinthTemplate.png', rect: {cols: 3, rows: 3, col: 2, row: 1}},
    {id: 'bottom-left-ninth', label: 'Bottom Left Ninth', category: 'Ninths', icon: 'bottomLeftNinthTemplate.png', rect: {cols: 3, rows: 3, col: 0, row: 2}},
    {id: 'bottom-center-ninth', label: 'Bottom Center Ninth', category: 'Ninths', icon: 'bottomCenterNinthTemplate.png', rect: {cols: 3, rows: 3, col: 1, row: 2}},
    {id: 'bottom-right-ninth', label: 'Bottom Right Ninth', category: 'Ninths', icon: 'bottomRightNinthTemplate.png', rect: {cols: 3, rows: 3, col: 2, row: 2}},

    {id: 'top-left-twelfth', label: 'Top Left Twelfth', category: 'Twelfths', icon: 'topLeftTwelfthTemplate.png', rect: {cols: 4, rows: 3, col: 0, row: 0}},
    {id: 'top-center-left-twelfth', label: 'Top Center Left Twelfth', category: 'Twelfths', icon: 'topCenterLeftTwelfthTemplate.png', rect: {cols: 4, rows: 3, col: 1, row: 0}},
    {id: 'top-center-right-twelfth', label: 'Top Center Right Twelfth', category: 'Twelfths', icon: 'topCenterRightTwelfthTemplate.png', rect: {cols: 4, rows: 3, col: 2, row: 0}},
    {id: 'top-right-twelfth', label: 'Top Right Twelfth', category: 'Twelfths', icon: 'topRightTwelfthTemplate.png', rect: {cols: 4, rows: 3, col: 3, row: 0}},
    {id: 'middle-left-twelfth', label: 'Middle Left Twelfth', category: 'Twelfths', icon: 'middleLeftTwelfthTemplate.png', rect: {cols: 4, rows: 3, col: 0, row: 1}},
    {id: 'middle-center-left-twelfth', label: 'Middle Center Left Twelfth', category: 'Twelfths', icon: 'middleCenterLeftTwelfthTemplate.png', rect: {cols: 4, rows: 3, col: 1, row: 1}},
    {id: 'middle-center-right-twelfth', label: 'Middle Center Right Twelfth', category: 'Twelfths', icon: 'middleCenterRightTwelfthTemplate.png', rect: {cols: 4, rows: 3, col: 2, row: 1}},
    {id: 'middle-right-twelfth', label: 'Middle Right Twelfth', category: 'Twelfths', icon: 'middleRightTwelfthTemplate.png', rect: {cols: 4, rows: 3, col: 3, row: 1}},
    {id: 'bottom-left-twelfth', label: 'Bottom Left Twelfth', category: 'Twelfths', icon: 'bottomLeftTwelfthTemplate.png', rect: {cols: 4, rows: 3, col: 0, row: 2}},
    {id: 'bottom-center-left-twelfth', label: 'Bottom Center Left Twelfth', category: 'Twelfths', icon: 'bottomCenterLeftTwelfthTemplate.png', rect: {cols: 4, rows: 3, col: 1, row: 2}},
    {id: 'bottom-center-right-twelfth', label: 'Bottom Center Right Twelfth', category: 'Twelfths', icon: 'bottomCenterRightTwelfthTemplate.png', rect: {cols: 4, rows: 3, col: 2, row: 2}},
    {id: 'bottom-right-twelfth', label: 'Bottom Right Twelfth', category: 'Twelfths', icon: 'bottomRightTwelfthTemplate.png', rect: {cols: 4, rows: 3, col: 3, row: 2}},

    {id: 'top-left-sixteenth', label: 'Top Left Sixteenth', category: 'Sixteenths', icon: 'topLeftSixteenthTemplate.png', rect: {cols: 4, rows: 4, col: 0, row: 0}},
    {id: 'top-center-left-sixteenth', label: 'Top Center Left Sixteenth', category: 'Sixteenths', icon: 'topCenterLeftSixteenthTemplate.png', rect: {cols: 4, rows: 4, col: 1, row: 0}},
    {id: 'top-center-right-sixteenth', label: 'Top Center Right Sixteenth', category: 'Sixteenths', icon: 'topCenterRightSixteenthTemplate.png', rect: {cols: 4, rows: 4, col: 2, row: 0}},
    {id: 'top-right-sixteenth', label: 'Top Right Sixteenth', category: 'Sixteenths', icon: 'topRightSixteenthTemplate.png', rect: {cols: 4, rows: 4, col: 3, row: 0}},
    {id: 'upper-middle-left-sixteenth', label: 'Upper Middle Left Sixteenth', category: 'Sixteenths', icon: 'upperMiddleLeftSixteenthTemplate.png', rect: {cols: 4, rows: 4, col: 0, row: 1}},
    {id: 'upper-middle-center-left-sixteenth', label: 'Upper Middle Center Left Sixteenth', category: 'Sixteenths', icon: 'upperMiddleCenterLeftSixteenthTemplate.png', rect: {cols: 4, rows: 4, col: 1, row: 1}},
    {id: 'upper-middle-center-right-sixteenth', label: 'Upper Middle Center Right Sixteenth', category: 'Sixteenths', icon: 'upperMiddleCenterRightSixteenthTemplate.png', rect: {cols: 4, rows: 4, col: 2, row: 1}},
    {id: 'upper-middle-right-sixteenth', label: 'Upper Middle Right Sixteenth', category: 'Sixteenths', icon: 'upperMiddleRightSixteenthTemplate.png', rect: {cols: 4, rows: 4, col: 3, row: 1}},
    {id: 'lower-middle-left-sixteenth', label: 'Lower Middle Left Sixteenth', category: 'Sixteenths', icon: 'lowerMiddleLeftSixteenthTemplate.png', rect: {cols: 4, rows: 4, col: 0, row: 2}},
    {id: 'lower-middle-center-left-sixteenth', label: 'Lower Middle Center Left Sixteenth', category: 'Sixteenths', icon: 'lowerMiddleCenterLeftSixteenthTemplate.png', rect: {cols: 4, rows: 4, col: 1, row: 2}},
    {id: 'lower-middle-center-right-sixteenth', label: 'Lower Middle Center Right Sixteenth', category: 'Sixteenths', icon: 'lowerMiddleCenterRightSixteenthTemplate.png', rect: {cols: 4, rows: 4, col: 2, row: 2}},
    {id: 'lower-middle-right-sixteenth', label: 'Lower Middle Right Sixteenth', category: 'Sixteenths', icon: 'lowerMiddleRightSixteenthTemplate.png', rect: {cols: 4, rows: 4, col: 3, row: 2}},
    {id: 'bottom-left-sixteenth', label: 'Bottom Left Sixteenth', category: 'Sixteenths', icon: 'bottomLeftSixteenthTemplate.png', rect: {cols: 4, rows: 4, col: 0, row: 3}},
    {id: 'bottom-center-left-sixteenth', label: 'Bottom Center Left Sixteenth', category: 'Sixteenths', icon: 'bottomCenterLeftSixteenthTemplate.png', rect: {cols: 4, rows: 4, col: 1, row: 3}},
    {id: 'bottom-center-right-sixteenth', label: 'Bottom Center Right Sixteenth', category: 'Sixteenths', icon: 'bottomCenterRightSixteenthTemplate.png', rect: {cols: 4, rows: 4, col: 2, row: 3}},
    {id: 'bottom-right-sixteenth', label: 'Bottom Right Sixteenth', category: 'Sixteenths', icon: 'bottomRightSixteenthTemplate.png', rect: {cols: 4, rows: 4, col: 3, row: 3}},

    {id: 'height-half-top', label: 'Height Half Top', category: 'Transformation', transform: {axis: 'height', rows: 2, row: 0}},
    {id: 'height-half-bottom', label: 'Height Half Bottom', category: 'Transformation', transform: {axis: 'height', rows: 2, row: 1}},
    {id: 'height-third-top', label: 'Height Third Top', category: 'Transformation', transform: {axis: 'height', rows: 3, row: 0}},
    {id: 'height-third-center', label: 'Height Third Center', category: 'Transformation', transform: {axis: 'height', rows: 3, row: 1}},
    {id: 'height-third-bottom', label: 'Height Third Bottom', category: 'Transformation', transform: {axis: 'height', rows: 3, row: 2}},

    {id: 'maximize', label: 'Maximize', category: 'Special', icon: 'maximizeTemplate.png', special: 'maximize'},
    {id: 'maximize-height', label: 'Maximize Height', category: 'Special', icon: 'maximizeHeightTemplate.png', special: 'maximize-height'},
    {id: 'almost-maximize', label: 'Almost Maximize', category: 'Special', icon: 'almostMaximizeTemplate.png', special: 'almost-maximize'},
    {id: 'center', label: 'Center', category: 'Special', icon: 'centerTemplate.png', special: 'center'},
    {id: 'center-half', label: 'Center Half', category: 'Special', icon: 'halfWidthCenterTemplate.png', rect: {cols: 4, rows: 1, col: 1, row: 0, colSpan: 2}},
    {id: 'larger', label: 'Larger', category: 'Adjustments', icon: 'makeLargerTemplate.png', special: 'larger'},
    {id: 'smaller', label: 'Smaller', category: 'Adjustments', icon: 'makeSmallerTemplate.png', special: 'smaller'},
    {id: 'larger-width', label: 'Larger Width', category: 'Adjustments', icon: 'largerWidthTemplate.png', special: 'larger-width'},
    {id: 'smaller-width', label: 'Smaller Width', category: 'Adjustments', icon: 'smallerWidthTemplate.png', special: 'smaller-width'},
    {id: 'move-left', label: 'Move Left', category: 'Adjustments', icon: 'moveLeftTemplate.png', special: 'move-left'},
    {id: 'move-right', label: 'Move Right', category: 'Adjustments', icon: 'moveRightTemplate.png', special: 'move-right'},
    {id: 'move-up', label: 'Move Up', category: 'Adjustments', icon: 'moveUpTemplate.png', special: 'move-up'},
    {id: 'move-down', label: 'Move Down', category: 'Adjustments', icon: 'moveDownTemplate.png', special: 'move-down'},
    {id: 'restore', label: 'Restore', category: 'Special', icon: 'restoreTemplate.png', special: 'restore'},
    {id: 'next-display', label: 'Next Display', category: 'Displays', icon: 'nextDisplayTemplate.png', special: 'next-display'},
    {id: 'previous-display', label: 'Previous Display', category: 'Displays', icon: 'prevDisplayTemplate.png', special: 'previous-display'},
];

export const ACTIONS_BY_ID = new Map(ACTIONS.map(action => [action.id, action]));
export const ACTION_CATEGORIES = [...new Set(ACTIONS.map(action => action.category))];

export function shortcutKeyForAction(actionId) {
    return `shortcut-${actionId}`;
}

export class ActionRegistry {
    constructor(windowController) {
        this._windowController = windowController;
    }

    execute(actionId) {
        this._windowController.execute(actionId);
    }
}
