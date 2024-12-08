import React, { useContext } from 'react';
import { HIGHLIGHTER_COLORS, TEXT } from '../../constants';
import { ColorContext } from '../../context';
import './index.css';

const ColorOptionModal = () => {
    const colorContext = useContext(ColorContext);
    const { selectColor, handleDisplayColors } = colorContext;

    const onSelectColor = (
        event: React.MouseEvent<HTMLElement>,
        selectColor: (color: HIGHLIGHTER_COLORS) => void
    ) => {
        const target = event.target as HTMLElement;
        const color = HIGHLIGHTER_COLORS[target.dataset.color];
        if (!color) return;
        selectColor(color);
    };

    return (
        <div
            className="color-option-modal"
            aria-role="dialog"
            onClick={(event: React.MouseEvent<HTMLElement>) =>
                onSelectColor(event, selectColor)
            }
        >
            <div className="color-options">
                <span
                    className="color-option yellow"
                    aria-role="button"
                    data-color={HIGHLIGHTER_COLORS.YELLOW}
                ></span>
                <span
                    className="color-option orange"
                    aria-role="button"
                    data-color={HIGHLIGHTER_COLORS.ORANGE}
                ></span>
                <span
                    className="color-option pink"
                    aria-role="button"
                    data-color={HIGHLIGHTER_COLORS.PINK}
                ></span>
                <span
                    className="color-option green"
                    aria-role="button"
                    data-color={HIGHLIGHTER_COLORS.GREEN}
                ></span>
            </div>
            <div className="color-options-back">
                <button
                    className="back-btn"
                    onClick={() => handleDisplayColors(false)}
                >
                    {TEXT.BACK}
                </button>
            </div>
        </div>
    );
};

export default ColorOptionModal;
