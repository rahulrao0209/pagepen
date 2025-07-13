import React, { useContext, useEffect } from 'react';
import Marker from '../../../marker';
import useHighlight from '../../hooks/useHighlight';
import { HIGHLIGHTER_COLORS } from '../../constants';
import { ColorContext } from '../../context';
import { DialogType, Position } from '../../context/dialog/interfaces';
import { Delete } from '../../icons';
import './index.css';

interface ColorOptionModal {
    range: Range;
    marker: Marker;
    id: string;
    dialogType: DialogType;
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
        if (!range) return updateHighlight(id, color);
        highlight(marker, range, color);
    };

    const handleDelete = () => {
        return deleteHighlight(id, marker);
    };

    useEffect(() => {
        // don't show the previously used color as selected,
        // if a range exists; which means user has selected a new piece of text.
        if (range) selectColor(null);
    }, [range]);

    return (
        <div className="color-option-modal" onClick={handleClick}>
            <div className="color-options">
                <button
                    className={`color-option yellow ${
                        currentColor === HIGHLIGHTER_COLORS.YELLOW
                            ? 'selected'
                            : ''
                    }`}
                    data-color={HIGHLIGHTER_COLORS.YELLOW}
                ></button>
                <button
                    className={`color-option orange ${
                        currentColor === HIGHLIGHTER_COLORS.ORANGE
                            ? 'selected'
                            : ''
                    }`}
                    data-color={HIGHLIGHTER_COLORS.ORANGE}
                ></button>
                <button
                    className={`color-option pink ${
                        currentColor === HIGHLIGHTER_COLORS.PINK
                            ? 'selected'
                            : ''
                    }`}
                    data-color={HIGHLIGHTER_COLORS.PINK}
                ></button>
                <button
                    className={`color-option green ${
                        currentColor === HIGHLIGHTER_COLORS.GREEN
                            ? 'selected'
                            : ''
                    }`}
                    data-color={HIGHLIGHTER_COLORS.GREEN}
                ></button>
                <button
                    className="delete-option"
                    onClick={handleDelete}
                    disabled={!id}
                >
                    <Delete className="delete-icon" />
                </button>
            </div>
        </div>
    );
};

export default ColorOptionModal;
