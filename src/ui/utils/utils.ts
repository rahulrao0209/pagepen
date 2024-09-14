import { HIGHLIGHTER_COLORS } from '../constants';

export const getHighlightStyles = (color: HIGHLIGHTER_COLORS) => {
    const styles = ['cursor-pointer'];

    switch (color) {
        case HIGHLIGHTER_COLORS.YELLOW:
            styles.push('highlight-yellow');
            break;
        case HIGHLIGHTER_COLORS.ORANGE:
            styles.push('highlight-orange');
            break;
        case HIGHLIGHTER_COLORS.PINK:
            styles.push('highlight-pink');
            break;
        case HIGHLIGHTER_COLORS.GREEN:
            styles.push('highlight-green');
            break;
        default:
            styles.push('highlight-orange');
    }

    return styles;
};

export const shouldCloseToolbar = (list: string[], classList: DOMTokenList) => {
    for (let elementClass of list) {
        if (classList.contains(elementClass)) return false;
    }
    return true;
};

export const isHighlighted = (element: HTMLSpanElement) => {
    const isSpan = element.nodeName.toLowerCase() === 'span';
    const isHighlighted = element?.className?.search(/highlight-/) !== -1;
    return isSpan && isHighlighted ? true : false;
};

export const restoreSelection = (range: Range) => {
    const selection = document.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
};
