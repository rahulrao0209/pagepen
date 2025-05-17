import React, { useContext } from 'react';
import Marker from '../../../marker';
import useHighlight from '../../hooks/useHighlight';
import { HIGHLIGHTER_COLORS } from '../../constants';
import { ColorContext } from '../../context';
import './index.css';
import { DialogType, Position } from '../../context/dialog/interfaces';

interface ColorOptionModal {
    range: Range;
    marker: Marker;
    id: string;
    handleRange: (range: Range | null) => void;
    handleHighlightId: (id: string) => void;
    handleDialogDisplay: (type?: DialogType, position?: Position) => void;
}

const ColorOptionModal = ({
    range,
    marker,
    id,
    handleRange,
    handleHighlightId,
    handleDialogDisplay,
}) => {
    const colorContext = useContext(ColorContext);
    const { highlight, updateHighlight, deleteHighlight } = useHighlight({
        handleHighlightId,
        handleRange,
        handleDialogDisplay,
    });
    const { color: currentColor, selectColor } = colorContext;

    const getColor = (event: React.MouseEvent<HTMLElement>) => {
        const target = event.target as HTMLElement;
        const color = HIGHLIGHTER_COLORS[target.dataset.color];
        if (!color) return null;
        return color;
    };

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        const color = getColor(event);
        if (!color) return null;
        selectColor(color);
        if (!range && color === currentColor)
            return deleteHighlight(id, marker);
        if (!range) return updateHighlight(id, color);
        highlight(marker, range, color);
    };

    return (
        <div
            className="color-option-modal"
            aria-role="dialog"
            onClick={handleClick}
        >
            <div className="color-options">
                <span
                    className={`color-option yellow ${
                        currentColor === HIGHLIGHTER_COLORS.YELLOW
                            ? 'selected'
                            : ''
                    }`}
                    aria-role="button"
                    data-color={HIGHLIGHTER_COLORS.YELLOW}
                ></span>
                <span
                    className={`color-option orange ${
                        currentColor === HIGHLIGHTER_COLORS.ORANGE
                            ? 'selected'
                            : ''
                    }`}
                    aria-role="button"
                    data-color={HIGHLIGHTER_COLORS.ORANGE}
                ></span>
                <span
                    className={`color-option pink ${
                        currentColor === HIGHLIGHTER_COLORS.PINK
                            ? 'selected'
                            : ''
                    }`}
                    aria-role="button"
                    data-color={HIGHLIGHTER_COLORS.PINK}
                ></span>
                <span
                    className={`color-option green ${
                        currentColor === HIGHLIGHTER_COLORS.GREEN
                            ? 'selected'
                            : ''
                    }`}
                    aria-role="button"
                    data-color={HIGHLIGHTER_COLORS.GREEN}
                ></span>
            </div>
        </div>
    );
};

export default ColorOptionModal;
