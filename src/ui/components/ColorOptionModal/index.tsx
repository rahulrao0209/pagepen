import React, { useContext, useEffect } from 'react';
import Marker from '../../../marker';
import { HIGHLIGHTER_COLORS } from '../../constants';
import { ColorContext } from '../../context';
import { getHighlightStyles } from '../Comment';
import './index.css';

interface ColorOptionModal {
    range: Range;
    setRange: any;
    marker: Marker;
    id: string;
    handleHighlightId: (id: string) => void;
}

const ColorOptionModal = ({
    range,
    setRange,
    marker,
    id,
    handleHighlightId,
}) => {
    const colorContext = useContext(ColorContext);
    const { color, selectColor } = colorContext;

    const getColor = (event: React.MouseEvent<HTMLElement>) => {
        const target = event.target as HTMLElement;
        const color = HIGHLIGHTER_COLORS[target.dataset.color];
        if (!color) return null;
        return color;
    };

    const highlight = (range: Range, color: HIGHLIGHTER_COLORS) => {
        const timestamp = Date.now();
        range?.toString().length > 0 &&
            marker.mark(range, getHighlightStyles(color), timestamp.toString());

        range.collapse();
        handleHighlightId(timestamp);
        setTimeout(() => setRange(null), 0);
    };

    // console.log('RANGE IN COLOR OPTION MODAL: ', range);

    const updateHighlight = (color: HIGHLIGHTER_COLORS) => {
        const nodes = document.querySelectorAll(`[data-id="${id}"]`);
        if (!nodes.length) return;

        nodes.forEach((node) => {
            node.classList.forEach((classname: string) => {
                if (classname.includes('highlight-')) {
                    node.classList.remove(classname);
                    node.classList.add(`highlight-${color.toLowerCase()}`);
                }
            });
        });
    };

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        const color = getColor(event);
        if (!color) return null;
        selectColor(color);
        if (!range) return updateHighlight(color);
        highlight(range, color);
    };

    // useEffect(() => {
    //     console.log('Update color');
    //     const nodes = document.querySelectorAll(`[data-id="${id}"]`);
    //     if (!nodes.length) return;

    //     nodes.forEach((node) => {
    //         node.classList.forEach((classname: string) => {
    //             if (classname.includes('highlight-')) {
    //                 node.classList.remove(classname);
    //                 node.classList.add(`highlight-${color.toLowerCase()}`);
    //             }
    //         });
    //     });
    // }, [color]);

    return (
        <div
            className="color-option-modal"
            aria-role="dialog"
            onClick={handleClick}
        >
            <div className="color-options">
                <span
                    className={`color-option yellow ${
                        color === HIGHLIGHTER_COLORS.YELLOW ? 'selected' : ''
                    }`}
                    aria-role="button"
                    data-color={HIGHLIGHTER_COLORS.YELLOW}
                ></span>
                <span
                    className={`color-option orange ${
                        color === HIGHLIGHTER_COLORS.ORANGE ? 'selected' : ''
                    }`}
                    aria-role="button"
                    data-color={HIGHLIGHTER_COLORS.ORANGE}
                ></span>
                <span
                    className={`color-option pink ${
                        color === HIGHLIGHTER_COLORS.PINK ? 'selected' : ''
                    }`}
                    aria-role="button"
                    data-color={HIGHLIGHTER_COLORS.PINK}
                ></span>
                <span
                    className={`color-option green ${
                        color === HIGHLIGHTER_COLORS.GREEN ? 'selected' : ''
                    }`}
                    aria-role="button"
                    data-color={HIGHLIGHTER_COLORS.GREEN}
                ></span>
            </div>
        </div>
    );
};

export default ColorOptionModal;
